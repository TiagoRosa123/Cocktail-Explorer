import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DrinkDetail from './components/DrinkDetail';
import Home from './pages/Home'; // Importamos a página Home

// Importamos as funções da API da nossa nova pasta services
import * as api from './services/cocktailService'; 

function App() {
  // --- ESTADOS ---
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('margarita');
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [searchType, setSearchType] = useState('name'); 

  const [currentPage, setCurrentPage] = useState(1);
  const drinksPerPage = 12; 

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // --- FUNÇÕES DE LÓGICA (Agora usam o 'api.') ---

  // 1. Pesquisa Principal
  useEffect(() => {
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
  }, [searchTerm, searchType]);

  // 2. Filtro Categoria
  const handleCategory = async (category) => {
    setLoading(true); setSearchTerm(''); 
    try {
      const data = await api.filterDrinksByCategory(category);
      setDrinks(data);
      setCurrentPage(1);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  // 3. Filtro Letra
  const handleLetter = async (letter) => {
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

  // --- CÁLCULOS PAGINAÇÃO ---
  // --- CÁLCULOS PAGINAÇÃO ---
  const indexOfLastDrink = currentPage * drinksPerPage;
  const indexOfFirstDrink = indexOfLastDrink - drinksPerPage;
  const currentDrinks = Array.isArray(drinks) ? drinks.slice(indexOfFirstDrink, indexOfLastDrink) : [];
  const totalPages = Math.ceil((drinks?.length || 0) / drinksPerPage);

  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll suave para o topo
  };


  // --- RENDERIZAÇÃO ---
  
  // Se tiver bebida selecionada, mostra Detalhe
  if (selectedDrink) {
    return (
      <div className="bg-dark min-vh-100 text-white">
        <Navbar 
            onHome={() => { setSelectedDrink(null); setSearchTerm('margarita'); }} 
            onRandom={handleRandom} 
            onCategory={handleCategory} 
        />
        <DrinkDetail drink={selectedDrink} onBack={() => setSelectedDrink(null)} />
      </div>
    );
  }

  // Se não, mostra a Home
  return (
    <div className="bg-dark min-vh-100 text-white">
      <Navbar 
        onHome={() => { setSearchTerm('margarita'); setSearchType('name'); setCurrentPage(1); }}
        onRandom={handleRandom}
        onCategory={handleCategory}
      />
      
      {/* Agora passamos tudo para o componente Home */}
      <Home 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchType={searchType}
        setSearchType={setSearchType}
        onCategory={handleCategory}
        onRandom={handleRandom}
        loading={loading}
        error={error}
        drinks={currentDrinks} // Passamos só os drinks da página atual
        onSelectDrink={handleSelectDrink}
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        alphabet={alphabet}
        onLetterClick={handleLetter}
      />

      <footer className="text-center py-4 text-white-50 border-top border-secondary mt-auto">
        <p className="mb-0 small">&copy; 2025 Cocktail Explorer | Projeto React</p>
      </footer>
    </div>
  );
}

export default App;