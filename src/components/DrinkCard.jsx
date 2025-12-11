import React from 'react';

function DrinkCard({ drink, onSelect }) {
  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <img 
          src={drink.strDrinkThumb} 
          className="card-img-top" 
          alt={drink.strDrink} 
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{drink.strDrink}</h5>
          
          {/* SÓ mostramos a categoria se ela existir (não existe na pesquisa por ingrediente) */}
          {drink.strCategory && (
            <p className="card-text text-muted">{drink.strCategory}</p>
          )}

          <div className="mt-auto">
            {/* SÓ mostramos o badge se existir */}
            {drink.strAlcoholic && (
               <span className="badge bg-info text-dark mb-2">{drink.strAlcoholic}</span>
            )}
            
            <button 
                className="btn btn-primary w-100 mt-2"
                onClick={() => onSelect(drink)} 
            >
                Ver Receita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrinkCard;