# 🍹 Cocktail Explorer - Premium Edition

Projeto desenvolvido no âmbito da disciplina **UC00610: Projeto 1 - React + Rest API**.
Esta aplicação é um explorador de cocktails moderno e responsivo, desenvolvido com **React** e **Bootstrap 5**, apresentando um design "Dark Mode" com estética Glassmorphism.

A aplicação consome a API pública **TheCocktailDB** para permitir aos utilizadores descobrir receitas, filtrar bebidas e encontrar inspiração.

## ✨ Funcionalidades Implementadas

O projeto cumpre todos os requisitos obrigatórios e inclui várias **funcionalidades extra**:

### 🔍 Pesquisa e Navegação
* **Pesquisa Híbrida:** Permite alternar entre pesquisar por **Nome** da bebida (ex: "Margarita") ou por **Ingrediente** (ex: "Vodka").
* **Filtros Rápidos:** Botões para filtrar por categorias: *Cocktails*, *Bebidas Comuns* e *Sem Álcool*.
* **Índice A-Z:** Barra de navegação alfabética para listar bebidas pela primeira letra.
* **Botão "Surpreende-me":** Funcionalidade *Random* que carrega uma bebida aleatória.

### 📄 Organização de Dados
* **Paginação no Cliente:** Os resultados são paginados (12 por página) para melhor performance e organização visual.
* **Listagem e Detalhe:** Navegação fluida entre a grelha de resultados e a página de detalhes da receita.
* **Tratamento de Dados:** Lógica para juntar ingredientes e medidas que vêm separados na API.

### 🎨 Interface (UI/UX)
* **Dark Mode Premium:** Design escuro com contraste cuidado.
* **Glassmorphism:** Cartões com efeito de vidro e sombras "neon".
* **Hero Section:** Cabeçalho imersivo com imagem de fundo.
* **Feedback Visual:** Indicadores de carregamento (*Loading*), mensagens de erro e estados vazios.

## 🚀 Como executar o projeto

Pré-requisitos: Ter o [Node.js](https://nodejs.org/) instalado.

1.  **Instalar dependências**
    Abre o terminal na pasta do projeto e corre:
    ```bash
    npm install
    ```

2.  **Iniciar a aplicação**
    Corre o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

3.  **Aceder**
    Abre o link fornecido no terminal (habitualmente `http://localhost:5173`).

## 🔗 Sobre a API

Utilizada a **TheCocktailDB** (Free Tier).
Documentação: [https://www.thecocktaildb.com/api.php](https://www.thecocktaildb.com/api.php)

**Endpoints utilizados no projeto:**
* `search.php?s={nome}` - Pesquisa por nome.
* `filter.php?i={ingrediente}` - Pesquisa por ingrediente.
* `filter.php?c={categoria}` - Filtros de categoria.
* `search.php?f={letra}` - Índice alfabético.
* `random.php` - Bebida aleatória.
* `lookup.php?i={id}` - Detalhes específicos da bebida.

## 🛠️ Tecnologias

* **Core:** React (Vite)
* **Estilos:** Bootstrap 5 + CSS Personalizado (Glassmorphism & Animations)
* **Ícones/Fontes:** Google Fonts (Poppins)

---
**Autor:** Tiago Rosa
**Data:** Dezembro 2025
**Instituição:** ATEC