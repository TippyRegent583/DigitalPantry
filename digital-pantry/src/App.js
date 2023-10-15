import logo from './logo.svg';
import './App.css';
import UploadAndDisplayImage from './UploadAndDisplayImage';
import React, { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from '@material-ui/core/Button';
import PopupBox from './PopupBox';
import PopupBoxUltimate from './PopupBoxUltimate';
import RecipeFinder from './RecipeFinder';

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

const ItemList = ({ items }) => {
  console.log(":D")
  return (
    <ul>
      {items.map((item) => (
        <li key={item.name}>
          <span className="name">{item.name}</span>
          <span className="count">{item.quantity}</span>
          <span className="unit">{item.unit}</span>
        </li>
      ))}
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

