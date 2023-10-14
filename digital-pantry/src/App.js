import logo from './logo.svg';
import './App.css';
import UploadAndDisplayImage from './UploadAndDisplayImage';
import RecipeFinder from './RecipeFinder';
import React, { useEffect, useState } from 'react';



//import UploadImage from './UploadImage';
const apiKey = '94c3a65b06f84d5fb0a512206092b8e2'

function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}



const ItemList = ({ items }) => {
  console.log(":D")
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


const App = () => {

  const items = [
    { name: "Apple", quantity: 1, unit: "lb" },
    { name: "Banana", quantity: 2, unit: "pcs" },
    { name: "Milk", quantity: 1, unit: "gal" },
  ];

  return (

    <div className="app">
      <div className="left-side">
        <ItemList items={items} />
      </div>
      {/*}
      <div className="right-side">
        {recipes.map((recipe) => (
          <RecipeBox key={recipe.name} recipe={recipe} />
        ))}
      </div>
        */}
      <div className="right-side">
        {/*<UploadImage />*/}
        <UploadAndDisplayImage />
      </div>
      <div className="App">
      <RecipeFinder items={items} />

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
