// src/services/cocktailService.js

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

export const searchDrinksByName = async (term) => {
  const response = await fetch(`${BASE_URL}/search.php?s=${term}`);
  const data = await response.json();
  return data.drinks || [];
};

export const searchDrinksByIngredient = async (ingredient) => {
  const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.drinks || [];
};

export const filterDrinksByCategory = async (category) => {
  const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
  const data = await response.json();
  return data.drinks || [];
};

export const searchDrinksByLetter = async (letter) => {
  const response = await fetch(`${BASE_URL}/search.php?f=${letter}`);
  const data = await response.json();
  return data.drinks || [];
};

export const getRandomDrink = async () => {
  const response = await fetch(`${BASE_URL}/random.php`);
  const data = await response.json();
  return data.drinks ? data.drinks[0] : null;
};

export const getDrinkDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await response.json();
  return data.drinks ? data.drinks[0] : null;
};