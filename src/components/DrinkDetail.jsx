import React from 'react';

function DrinkDetail({ drink, onBack, isFavorite, onToggleFavorite }) {
  
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

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(drink.strVideo);

  // --- Language Toggle Logic ---
  const [language, setLanguage] = React.useState('EN');

  // Map of language codes to API fields
  const langMap = {
    'EN': 'strInstructions',
    'ES': 'strInstructionsES',
    'DE': 'strInstructionsDE',
    'FR': 'strInstructionsFR',
    'IT': 'strInstructionsIT'
  };

  // Get available languages for this drink
  const availableLanguages = Object.keys(langMap).filter(lang => drink[langMap[lang]]);

  // Reset language to EN if the current language is not available for a new drink
  React.useEffect(() => {
    if (!drink[langMap[language]]) {
        setLanguage('EN');
    }
  }, [drink]);

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-light mb-4" onClick={onBack}>
        ⬅ Back to list
      </button>

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
              <div className="d-flex justify-content-between align-items-start">
                  <h1 className="display-4 fw-bold mb-2" style={{ color: '#ff5e62' }}>{drink.strDrink}</h1>
                  <button 
                    className="btn btn-lg rounded-circle shadow-sm"
                    style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        border: '1px solid #ff5e62',
                        color: isFavorite ? '#ff5e62' : 'white',
                        width: '50px', height: '50px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                    onClick={() => onToggleFavorite(drink)}
                  >
                    {isFavorite ? '❤' : '🤍'}
                  </button>
              </div>
              
              <p className="text-muted text-uppercase small tracking-wide">
                {drink.strCategory} | {drink.strAlcoholic}
              </p>
              
              <hr className="border-secondary my-4" />

              <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="text-info mb-0">Instructions</h5>
                  
                  {availableLanguages.length > 1 && (
                      <div className="btn-group">
                          {availableLanguages.map(lang => (
                              <button 
                                key={lang} 
                                className={`btn btn-sm ${language === lang ? 'btn-light' : 'btn-outline-secondary'}`}
                                onClick={() => setLanguage(lang)}
                              >
                                  {lang === 'EN' ? '🇬🇧' : 
                                   lang === 'ES' ? '🇪🇸' : 
                                   lang === 'DE' ? '🇩🇪' : 
                                   lang === 'FR' ? '🇫🇷' : 
                                   lang === 'IT' ? '🇮🇹' : lang}
                              </button>
                          ))}
                      </div>
                  )}
              </div>
              
              <p className="card-text lead fs-6">
                {drink[langMap[language]] || drink.strInstructions}
              </p>

              <div className="mt-4">
                <h5 className="text-warning mb-3">Ingredients</h5>
                <ul className="list-group list-group-flush">
                  {getIngredients().map((item, index) => (
                    <li key={index} className="list-group-item bg-transparent text-white border-secondary ps-0">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              {videoId && (
                <div className="mt-5">
                  <h5 className="text-danger mb-3">Video Tutorial</h5>
                  <div className="ratio ratio-16x9 shadow-lg rounded overflow-hidden border border-secondary">
                    <iframe 
                      src={`https://www.youtube.com/embed/${videoId}`} 
                      title="YouTube video player" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrinkDetail;