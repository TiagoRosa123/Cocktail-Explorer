import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DrinkDetail from './components/DrinkDetail';
import Home from './pages/Home';
import * as api from './services/cocktailService'; 

function App() {
  // --- ESTADOS ---
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Favorites System
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('cocktails_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [viewFavorites, setViewFavorites] = useState(false);

  const [searchTerm, setSearchTerm] = useState('margarita');
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [searchType, setSearchType] = useState('name'); 

  const [currentPage, setCurrentPage] = useState(1);
  const drinksPerPage = 12; 

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");


  // 1. Pesquisa Principal
  useEffect(() => {
    if (viewFavorites) return; // Don't fetch if viewing favorites

    const loadDrinks = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (searchType === 'name') {
          data = await api.searchDrinksByName(searchTerm);
        } else {
          data = await api.searchDrinksByIngredient(searchTerm);
        }
        setDrinks(data);
        setCurrentPage(1);
      } catch (err) {
        console.error(err);
        setDrinks([]);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm.trim() !== '') {
      loadDrinks();
    }
  }, [searchTerm, searchType, viewFavorites]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('cocktails_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (drink) => {
    const isFav = favorites.some(f => f.idDrink === drink.idDrink);
    if (isFav) {
      setFavorites(favorites.filter(f => f.idDrink !== drink.idDrink));
    } else {
      setFavorites([...favorites, drink]);
    }
  };


  // 2. Filtro Categoria
  const handleCategory = async (category) => {
    setViewFavorites(false); // Exit favorites view
    setLoading(true); setSearchTerm(''); 
    try {
      const data = await api.filterDrinksByCategory(category);
      setDrinks(data);
      setCurrentPage(1);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  // 2.1 Filtro Alcool
  const handleAlcoholicFilter = async (type) => {
    setViewFavorites(false);
    setLoading(true); setSearchTerm('');
    try {
      const data = await api.filterDrinksByAlcoholic(type);
      setDrinks(data);
      setCurrentPage(1);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  // 3. Filtro Letra
  const handleLetter = async (letter) => {
    setViewFavorites(false);
    setLoading(true); setSearchTerm(''); 
    try {
      const data = await api.searchDrinksByLetter(letter);
      setDrinks(data);
      setCurrentPage(1);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  // 4. Random
  const handleRandom = async () => {
    setLoading(true);
    try {
      const drink = await api.getRandomDrink();
      if (drink) setSelectedDrink(drink);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  // 5. Select Drink
  const handleSelectDrink = async (drink) => {
    if (drink.strInstructions) { setSelectedDrink(drink); return; }
    setLoading(true);
    try {
      const fullDrink = await api.getDrinkDetails(drink.idDrink);
      if (fullDrink) setSelectedDrink(fullDrink);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  // 6. Handle Favorites View
  const handleShowFavorites = () => {
    setViewFavorites(true);
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleHome = () => {
     setViewFavorites(false);
     setSearchTerm('margarita');
     setSearchType('name');
     setCurrentPage(1);
  };


  // --- CÁLCULOS PAGINAÇÃO ---
  // If viewing favorites, use favorites array instead of drinks
  const displayDrinks = viewFavorites ? favorites : drinks;

  const indexOfLastDrink = currentPage * drinksPerPage;
  const indexOfFirstDrink = indexOfLastDrink - drinksPerPage;
  const currentDrinks = Array.isArray(displayDrinks) ? displayDrinks.slice(indexOfFirstDrink, indexOfLastDrink) : [];
  const totalPages = Math.ceil((displayDrinks?.length || 0) / drinksPerPage);

  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll suave para o topo
  };


  // 7. Enrich Data (Buscar detalhes em falta para a página atual)
  useEffect(() => {
    const fetchMissingDetails = async () => {
      // Identifica bebidas na página atual que não têm a info 'strAlcoholic'
      const missing = currentDrinks.filter(d => !d.strAlcoholic);
      
      if (missing.length === 0) return;

      try {
        // Busca detalhes em paralelo
        const responses = await Promise.all(
          missing.map(d => api.getDrinkDetails(d.idDrink))
        );

        // Cria um mapa para acesso rápido: id -> detalhes
        const detailsMap = {};
        responses.forEach(d => {
          if (d) detailsMap[d.idDrink] = d;
        });

        // Função auxiliar para atualizar a lista correta
        const updateList = (list) => list.map(item => 
          detailsMap[item.idDrink] ? { ...item, ...detailsMap[item.idDrink] } : item
        );

        if (viewFavorites) {
          setFavorites(prev => updateList(prev));
        } else {
          setDrinks(prev => updateList(prev));
        }
      } catch (err) {
        console.error("Failed to fetch missing details", err);
      }
    };

    fetchMissingDetails();
  }, [currentDrinks, viewFavorites]);


  // --- RENDERIZAÇÃO ---
  
  // Se tiver bebida selecionada, mostra Detalhe
  if (selectedDrink) {
    return (
      <div className="bg-dark min-vh-100 text-white">
        <Navbar 
            onHome={() => { setSelectedDrink(null); handleHome(); }} 
            onRandom={handleRandom} 
            onCategory={handleCategory} 
            onAlcoholicFilter={handleAlcoholicFilter}
            onShowFavorites={() => { setSelectedDrink(null); handleShowFavorites(); }}
        />
        <DrinkDetail 
          drink={selectedDrink} 
          onBack={() => setSelectedDrink(null)} 
          isFavorite={favorites.some(f => f.idDrink === selectedDrink.idDrink)}
          onToggleFavorite={() => toggleFavorite(selectedDrink)}
          onSelect={handleSelectDrink}
        />
      </div>
    );
  }

  // Se não, mostra a Home
  return (
    <div className="bg-dark min-vh-100 text-white">
      <Navbar 
        onHome={handleHome}
        onRandom={handleRandom}
        onCategory={handleCategory}
        onAlcoholicFilter={handleAlcoholicFilter}
        onShowFavorites={handleShowFavorites}
      />
      
      <div className={viewFavorites ? "container mt-4" : ""}>
        {viewFavorites && <h2 className="text-center text-danger mb-4">My Favorite Cocktails ({favorites.length})</h2>}
      </div>

      <Home 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchType={searchType}
        setSearchType={setSearchType}
        onCategory={handleCategory}
        onAlcoholicFilter={handleAlcoholicFilter}
        onRandom={handleRandom}
        loading={loading}
        error={error}
        drinks={currentDrinks} 
        onSelectDrink={handleSelectDrink}
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        alphabet={alphabet}
        onLetterClick={handleLetter}
        // Props for favorites
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        isFavoritesView={viewFavorites}
      />

      <footer className="text-center py-4 text-white-50 border-top border-secondary mt-auto">
        <p className="mb-0 small">&copy; 2025 Cocktail Explorer by Tiago Rosa V1.3</p>
      </footer>
    </div>
  );
}

export default App;