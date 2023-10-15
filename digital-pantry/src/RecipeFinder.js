import React, { useState } from 'react';

const RecipeFinder = (props) => {
  const [apiKey] = useState('c915c42ef4e84983b197eb7cc6421be6');
  const [ingredient, setIngredient] = useState('');
  const { pantry } = props;
  const { recipes } = props;
  const[searchRecipe, setSearchRecipe] = useState([]);
  const { merge } = props;
  const [ins, setIns] = useState('');

  const getPantry = () => {
    return pantry;
  };

  const handleSearch = async () => {
    try {
      const str = pantry ? pantry.map(item => item.name).join(',+') : "";
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${str}&number=20&ranking=2`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      props.setRecipes(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchR = async () => {
    try {
      const str = pantry ? pantry.map(item => item.name).join(',+') : "";
      setSearchRecipe('');
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchRecipe}&number=20&includeIngredients${str}&fillIngredients=true&sort=min-missing-ingredients`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data.results);
      props.setRecipes(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAdd = async () => {
    // Create an object representing the ingredient and add it to the pantry
    const newIngredient = { name: ingredient, count: 1, unit: 'unit' };
    props.setPantry([...pantry, newIngredient]);
    setIngredient('');
  };

  const handleMerge = async () => {
    // Create an object representing the ingredient and add it to the pantry
    console.log(merge)
    merge.forEach((m) => {
      const newIngredient = { name: m, count: 1, unit: 'unit' };
      props.setPantry((prevPantry) => [...prevPantry, newIngredient]);
      console.log("Pantry "+ pantry)
    })
    props.setMerge('')
  };


  const handleInfo = async ({ id }) => {
    console.log(id)
    try {
      setSearchRecipe('')
      const response = await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      setIns(data[0].steps);
    } catch (error) { 
      console.error('Error fetching data:', error);
    }
  };

  const instructions = (data) => {
    if (!data || !data[0] || !data[0].steps) {
      return <p>No instructions available.</p>;
    }

    const steps = data[0].steps;

    if (steps.length === 0) {
      return <p>No steps available for this recipe.</p>;
    }

    return (
      <ul>
        {steps.map((step, index) => (
          <p key={index}>{step.step}</p>
        ))}
      </ul>
    );
  };

  return (
    <div>
      {/*}
      <h1>Ingredients:</h1>
      
      <ul>
        {pantry ? (
          pantry.map((item, index) => (
            <li key={index}>
              {item.name} - {item.count} {item.unit}
            </li>
          ))
        ) : (
          <p>Loading pantry data...</p>
        )}
      </ul>
        */}
      <h1>Find Recipes</h1>
      <input
        type="text"
        placeholder="Enter an ingredient"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <div>
        <button onClick={handleSearch}>Find Recipes</button>
        <button onClick={handleMerge}>Merge</button>
        <div>
          <input
            type="text"
            placeholder="Search by Recipe"
            value={searchRecipe}
            onChange={(e) => setSearchRecipe(e.target.value)}
          />
          <button onClick={handleSearchR}>Search</button>
        </div>
        <div>
          {Array.isArray(ins) ? (
            <div>
              {ins.map((step, index) => (
                <p key={index}>{step.step}</p>
              ))}
            </div>
          ) : null}
        </div>
        {/*}
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index}>
              <h2>{recipe.title}</h2>
              <button onClick={() => handleInfo(recipe)}>More Info</button>
              <p>Missing Ingredients: {recipe.missedIngredientCount}</p>
              <p>Used Ingredients: {recipe.usedIngredientCount}</p>
              <p>Unused Ingredients: {recipe.unusedIngredients.length}</p>
            </div>
          ))
        ) : (
          <p>No recipes found with this ingredient.</p>
        )}
        */}
      </div>
    </div>
  );
};

export default RecipeFinder;