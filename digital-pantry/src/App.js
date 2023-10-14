import logo from './logo.svg';
import './App.css';
import UploadAndDisplayImage from './UploadAndDisplayImage';
import React, { useState } from "react";

//import UploadImage from './UploadImage';


function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}



const ItemList = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.name}>
          {item.name} {item.quantity} {item.unit}
        </li>
      ))}
    </ul>
  );
};

const RecipeBox = ({ recipe }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="recipe-box" onClick={handleClick}>
      <h3>{recipe.name}</h3>
      {isOpen && <p>{recipe.instructions}</p>}
    </div>
  );
};



const App = () => {

  const items = [
    { name: "Apple", quantity: 1, unit: "lb" },
    { name: "Banana", quantity: 2, unit: "pcs" },
    { name: "Milk", quantity: 1, unit: "gal" },
  ];

  const recipes = [
    {
      name: "Chocolate Chip Cookies",
      instructions:
        "Preheat oven to 350 degrees F (175 degrees C). Cream together 1 cup butter and 1 cup sugar until light and fluffy. Beat in 2 eggs one at a time, then stir in 2 1/4 cups all-purpose flour, 1 teaspoon baking soda, and 1 teaspoon salt. Fold in 1 cup semisweet chocolate chips. Drop by rounded tablespoons onto ungreased baking sheets. Bake for 10-12 minutes, or until golden brown. Let cool on baking sheets for a few minutes before transferring to a wire rack to cool completely.",
    },
    {
      name: "Banana Bread",
      instructions:
        "Preheat oven to 350 degrees F (175 degrees C). Grease and flour a 9x5 inch loaf pan. In a large bowl, mash 3 ripe bananas. In a separate bowl, cream together 1/2 cup butter and 1 cup sugar until light and fluffy. Beat in 2 eggs one at a time, then stir in 1 1/2 cups all-purpose flour, 1 teaspoon baking soda, 1/2 teaspoon salt, and 1/2 teaspoon ground cinnamon. Fold in the mashed bananas. Pour batter into prepared loaf pan and bake for 50-60 minutes, or until a toothpick inserted into the center comes out clean. Let cool in pan for 10 minutes before removing and cooling completely on a wire rack.",
    },
  ];

  return (

    <div className="app">
      <div className="all-containers">
        <div className="left-side">
          <ItemList items={items} />
        </div>
        
        <div className="right-side">
          {recipes.map((recipe) => (
            <RecipeBox key={recipe.name} recipe={recipe} />
          ))}
        </div>
        
        <div className="right-side">
          {/*<UploadImage />*/}
          <UploadAndDisplayImage />
        </div>
      </div>
      
    </div>
  );
}

export default App;



/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
