// src/pages/Home.jsx
import React from 'react';
import DrinkCard from '../components/DrinkCard';
import { Analytics } from "@vercel/analytics/next"

function Home({ 
  searchTerm, setSearchTerm, 
  searchType, setSearchType, 
  onCategory, onRandom, 
  loading, error, 
  drinks, 
  onSelectDrink, 
  currentPage, totalPages, paginate,
  alphabet, onLetterClick 
}) {
  
  return (
    <div>
      {/* HERO SECTION */}
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title">Cocktail Explorer</h1>
          <p className="lead text-white-50">If life gives you lemons, make a margarita.</p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-40px' }}>
        
        {/* CARD DE PESQUISA */}
        <div className="card p-4 mb-5 shadow-lg border-0 bg-dark">
            <div className="row justify-content-center">
              <div className="col-md-8">
                {/* Seletor Tipo */}
                <div className="d-flex justify-content-center gap-4 mb-3 text-white">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" checked={searchType === 'name'} onChange={() => setSearchType('name')} id="type1"/>
                    <label className="form-check-label" htmlFor="type1">By <b>Name</b></label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" checked={searchType === 'ingredient'} onChange={() => setSearchType('ingredient')} id="type2"/>
                    <label className="form-check-label" htmlFor="type2">By <b>Ingredient</b></label>
                  </div>
                </div>

                <input 
                  type="text" 
                  className="form-control form-control-lg text-center"
                  placeholder={searchType === 'name' ? "Search (ex: Margarita)..." : "Ingredient (ex: Vodka)..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Botões de Categoria */}
            <div className="d-flex justify-content-center gap-2 mt-4 flex-wrap">
              <button className="btn btn-outline-primary rounded-pill" onClick={() => onCategory('Cocktail')}>🍸 Cocktails</button>
              <button className="btn btn-outline-success rounded-pill" onClick={() => onCategory('Ordinary_Drink')}>🍹 Usuals</button>
              <button className="btn btn-outline-info rounded-pill" onClick={() => onCategory('Soft_Drink')}>🥤 Non-alcoholic</button>
              
              <button 
                className="btn btn-sm fw-bold px-3 py-2" 
                onClick={onRandom}
                style={{ 
                  background: 'linear-gradient(45deg, #8E2DE2, #4A00E0)',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(138, 45, 226, 0.4)'
                }}
              >
                Pick my poison!
              </button>
            </div>
        </div>

        {/* LOADING / ERROR */}
        {loading && <div className="text-center py-5 text-white"><h3>Shaking... ⏳</h3></div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && drinks.length === 0 && searchTerm !== '' && (
           <div className="text-center text-muted py-5"><h3>Nothing found. 😕</h3></div>
        )}
        
        {/* LISTAGEM */}
        <div className="row">
          {!loading && drinks.map((drink) => (
            <DrinkCard key={drink.idDrink} drink={drink} onSelect={onSelectDrink} />
          ))}
        </div>

        {/* PAGINAÇÃO */}
        {!loading && totalPages > 1 && (
          <nav className="d-flex justify-content-center mt-5">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage - 1)}>⬅</button>
              </li>
              <li className="page-item disabled">
                <span className="page-link bg-transparent border-0 text-white">
                  {currentPage} / {totalPages}
                </span>
              </li>
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage + 1)}>➡</button>
              </li>
            </ul>
          </nav>
        )}

        {/* BARRA ALFABÉTICA (A-Z) */}
        <div className="mt-5 mb-5 pb-5">
            <h5 className="text-center mb-3 text-muted">Índice A-Z</h5>
            <div className="d-flex flex-wrap justify-content-center gap-1">
                {alphabet.map((letter) => (
                    <button 
                        key={letter}
                        className="btn btn-sm btn-outline-secondary text-white"
                        onClick={() => onLetterClick(letter)}
                        style={{ width: '30px' }} 
                    >
                        {letter}
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;