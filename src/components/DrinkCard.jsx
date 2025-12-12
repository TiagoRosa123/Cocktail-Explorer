import React from 'react';

function DrinkCard({ drink, onSelect, isFavorite, onToggleFavorite }) {
  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card h-100 shadow-sm border-0 position-relative">
        <button 
          className="btn position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
            border: 'none', 
            width: '40px', 
            height: '40px',
            zIndex: 10,
            color: isFavorite ? '#ff4757' : '#ccc',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem',
            transition: 'all 0.2s'
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(drink);
          }}
        >
          {isFavorite ? '❤' : '🤍'}
        </button>

        <img 
          src={drink.strDrinkThumb} 
          className="card-img-top" 
          alt={drink.strDrink} 
          style={{ cursor: 'pointer' }}
          onClick={() => onSelect(drink)}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate" title={drink.strDrink}>{drink.strDrink}</h5>
          
          {/* SÓ mostra a categoria se ela existir (não existe na pesquisa por ingrediente) */}
          {drink.strCategory && (
            <p className="card-text text-muted small">{drink.strCategory}</p>
          )}

          <div className="mt-auto">
            {/* SÓ mostra o badge se existir */}
            {drink.strAlcoholic && (
               <span className="badge bg-info text-dark mb-2">{drink.strAlcoholic}</span>
            )}
            
            <button 
                className="btn btn-primary w-100 mt-2"
                onClick={() => onSelect(drink)} 
            >
                Check Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrinkCard;