import React from 'react';

function DrinkDetail({ drink, onBack }) {
  
  const getIngredients = () => {
    let ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${measure ? measure : ''} ${ingredient}`);
      }
    }
    return ingredients;
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-light mb-4" onClick={onBack}>
        ⬅ Voltar à lista
      </button>

      {/* bg-dark e text-white para o cartão de detalhe */}
      <div className="card shadow-lg bg-dark text-white border-secondary">
        <div className="row g-0">
          <div className="col-md-5">
            <img 
              src={drink.strDrinkThumb} 
              className="img-fluid rounded-start h-100" 
              style={{ objectFit: 'cover', minHeight: '400px' }} 
              alt={drink.strDrink} 
            />
          </div>

          <div className="col-md-7">
            <div className="card-body p-5">
              <h1 className="display-4 fw-bold mb-2" style={{ color: '#ff5e62' }}>{drink.strDrink}</h1>
              <p className="text-muted text-uppercase small tracking-wide">
                {drink.strCategory} | {drink.strAlcoholic}
              </p>
              
              <hr className="border-secondary my-4" />

              <h5 className="text-info mb-3">Instruções</h5>
              <p className="card-text lead fs-6">{drink.strInstructions}</p>

              <div className="mt-4">
                <h5 className="text-warning mb-3">Ingredientes</h5>
                <ul className="list-group list-group-flush">
                  {getIngredients().map((item, index) => (
                    // Fundo transparente e texto branco na lista
                    <li key={index} className="list-group-item bg-transparent text-white border-secondary ps-0">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrinkDetail;