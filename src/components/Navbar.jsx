import React, { useState, useEffect } from 'react';

function Navbar({ onHome, onRandom, onCategory }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- NOVA FUNÇÃO: Rola suavemente para o topo ---
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Faz o movimento deslizar em vez de saltar
    });
  };

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark bg-black py-3 border-bottom border-secondary fixed-top"
      style={{ 
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)', 
        transition: 'transform 0.4s ease-in-out',
        opacity: isVisible ? 1 : 0
      }}
    >
      <div className="container">
        
        {/* LOGO (Agora também leva ao topo) */}
        <a 
          className="navbar-brand fw-bold text-uppercase" 
          href="#" 
          onClick={(e) => { 
            e.preventDefault(); 
            scrollToTop(); // <--- Rola para cima
            onHome();      // <--- Reseta a pesquisa
          }} 
          style={{ letterSpacing: '2px', color: '#ff5e62' }}
        >
           Cocktail Explorer
        </a>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          style={{ borderColor: '#ff5e62' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            
            {/* BOTÃO INÍCIO (Agora também leva ao topo) */}
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link text-white" 
                onClick={() => {
                    scrollToTop(); // <--- Rola para cima
                    onHome();      // <--- Reseta a pesquisa
                }}
              >
                Início
              </button>
            </li>

            <li className="nav-item">
              <button className="nav-link btn btn-link text-white" onClick={() => onCategory('Cocktail')}>
                Cocktails
              </button>
            </li>

            <li className="nav-item">
              <button className="nav-link btn btn-link text-white" onClick={() => onCategory('Soft_Drink')}>
                Sem Álcool
              </button>
            </li>

            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <button 
                className="btn btn-sm fw-bold px-3" 
                onClick={onRandom}
                style={{ 
                  // MUDANÇA AQUI: Degradê Roxo Misterioso
                  background: 'linear-gradient(45deg, #8E2DE2, #4A00E0)', 
                  color: 'white', 
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(138, 45, 226, 0.4)' // Sombra roxa brilhante
                }}
              >
                Pick my poison!
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;