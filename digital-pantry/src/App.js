import logo from './logo.svg';
import './App.css';
import UploadAndDisplayImage from './UploadAndDisplayImage';
import React, { useEffect, useState, useMemo } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from '@material-ui/core/Button';
import PopupBox from './PopupBox';
import PopupBoxUltimate from './PopupBoxUltimate';
import RecipeFinder from './RecipeFinder';
import MergedArrayObjs from './MergedArrayObjs';
import ItemList from './ItemListMaker';

//import UploadImage from './UploadImage';
const apiKey = '94c3a65b06f84d5fb0a512206092b8e2'

function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

function MUIComponent() {
  return (
    <Button variant="contained" color="primary">
      Click Me!
    </Button>
  );
}


//function mergeMapsWithCounts(map1, map2) {
const CombinedList = ({ map1, map2 }) => {
  const mergedMap = new Map();

  for (const [key, count] of Object.entries(map1)) {
    mergedMap.set(key, count);
  }

  for (const [key, count] of Object.entries(map2)) {
    if (mergedMap.has(key)) {
      mergedMap.set(key, mergedMap.get(key) + count);
    } else {
      mergedMap.set(key, count);
    }
  }

  return mergedMap;
}



const ItemList = ({ items }) => {
  const [counts, setCounts] = useState(() => {
    const initialCounts = {};
    for (const item of items) {
      initialCounts[item.name] = 0;
    }
    return initialCounts;
  });

  const handleCountChange = (name, value) => {
    const updatedCounts = { ...counts };
    updatedCounts[name] = value;
    setCounts(updatedCounts);
  };

  const countsMap = useMemo(() => {
    const countsMap = {};
    for (const item of items) {
      countsMap[item.name] = counts[item.name];
    }
    return countsMap;
  }, [counts]);

  return (
    <ul>
      {items.map((item) => {
        const count = countsMap[item.name];

        return (
          <li key={item.name}>
            <span className="name">{item.name}</span>
            <input
              type="number"
              className="count"
              value={count}
              onChange={(e) => handleCountChange(item.name, e.target.value)}
            />
            <span className="unit">{item.unit}</span>
          </li>
        );
      })}
    </ul>
  );
};

const RecipeBox = ({ recipe , handleInfo , ins}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    handleInfo(recipe.id)
  };

  return (
    <div className="recipe-box" onClick={handleClick}>
      <h3>{recipe.title}</h3>
      <p>Missing Ingredients: {recipe.missedIngredientCount}</p>
      <p>Used Ingredients: {recipe.usedIngredientCount}</p>
      <p>Unused Ingredients: {recipe.unusedIngredients.length}</p>
      {isOpen && (
        <div>
          {Array.isArray(ins) ? (
            <div>
              {ins.map((step, index) => (
                <p key={index}>{step.step}</p>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};


const App = () => {
  console.log("Hey")
  console.log("Data", RecipeFinder.getPantry)

  const [pantry, setPantry] = useState([])
  const [recipes, setRecipes] = useState([])
  const [ins, setIns] = useState('')

  const handleInfo = async (id) => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setIns(data[0].steps);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (

    <div className="app">
      <div className="title">
        <h1>App</h1>
      </div>
      <div className="all-containers">
        <div className="left-side">
          <h2>Pantry</h2>
          
          {pantry.length > 0 ? ( // Conditional rendering based on pantry data
          <ItemList items={pantry} />
          ) : (
          <p>Loading pantry data...</p>
          )}
          {/*<ItemList items={items} />*/}
          {/*<ItemList items={items2} />*/}
          
          <MergedArrayObjs array1={items} array2={items}/>
          <PopupBox />
          <RecipeFinder pantry = {pantry} setPantry = {setPantry} recipes = {recipes} setRecipes = {setRecipes} ins = {ins} setIns = {setIns}/>
        </div>
        
        <div className="right-side">
          <h2>Recipes</h2>
          {recipes.map((recipe) => (
            <RecipeBox key={recipe.id} recipe={recipe} handleInfo = {handleInfo} ins = {ins} />
          ))}
        </div>
      </div>
      <div className="App">
    </div>
      
    </div>
  );
}

export default App;

