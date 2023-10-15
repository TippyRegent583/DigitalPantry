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
import Stats from './Stats.js';

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


const RecipeBox = ({ recipe }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="recipe-box" onClick={handleClick}>
      <h3>{recipe.name}</h3>
      <p>{"# of # ingredients available"}</p>
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

  const items2 = [
    { name: "Apple", quantity: 1, unit: "lb" },
    { name: "Orange", quantity: 2, unit: "pcs" },
    { name: "Milk", quantity: 4, unit: "gal" },
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
      <div className="title">
        <h1>App</h1>
      </div>
      <div className="all-containers">
        <div className="left-side">
          <h2>Pantry</h2>
          <ItemList items={items} />
          <ItemList items={items2} />
          {/*<CombinedList items={items} items2={items2}/>*/}
          <CombinedList map1={items} map2={items2} />
          <PopupBox />
          <Stats/>
        </div>
        
        <div className="right-side">
          <h2>Recipes</h2>
          {recipes.map((recipe) => (
            <RecipeBox key={recipe.name} recipe={recipe} />
          ))}
        </div>
      </div>
      <div className="App">
      <RecipeFinder items={items} />

    </div>
      
    </div>
  );
}

export default App;




