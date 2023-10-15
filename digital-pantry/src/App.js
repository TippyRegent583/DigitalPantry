import logo from './logo.svg';
import './App.css';
//import UploadAndDisplayImage from './UploadAndDisplayImage';
import React, { useEffect, useState, useMemo } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from '@material-ui/core/Button';
//import PopupBox from './PopupBox';
//import PopupBoxUltimate from './PopupBoxUltimate';
import RecipeFinder from './RecipeFinder';
import MergedArrayObjs from './MergedArrayObjs';
//import ItemList from './ItemListMaker';
import Stats from './Stats.js';
import CameraInput from './CameraInput';
import palImg from './ThePal.png';


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


//========================================================================



//========================================================================
function DisplayScannedText({ scannedText }) {
  return (
    <div className="scanned-text">
      <h2>Scanned Text</h2>
      <p>{scannedText}</p>
    </div>
  );
}

const App = () => {
  console.log("Hey")
  console.log("Data", RecipeFinder.getPantry)

  const [pantry, setPantry] = useState([])
  const [recipes, setRecipes] = useState([])
  const [ins, setIns] = useState('')
  const [merge, setMerge] = useState([])
  const [scannedText, setScannedText] = useState([]);

  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    const text = await textFromImg(image);
    setScannedText(text);
  };

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

  const textFromImg = async (image) => {
    const { createWorker } = require('tesseract.js');
    const worker = await createWorker('eng');
  
    (async () => {
      const { data: { text } } = await worker.recognize(image);
      const lines = text.split("\n");
  
      const regEx0 = /\d+(\.\d+)/;
      const numbs = []
      const regEx1 = /\s(F|B)\s/g;
      const foodLines = []
      lines.forEach((line) => {
        if (regEx1.test(line)) {
          foodLines.push(line)
        }
  
        const prices = line.match(regEx0)
        if (prices != null) {
          prices.forEach((num) => {
            numbs.push(parseFloat(num))
          })
        }
      });
  
      let max = 0.0
      numbs.forEach((num) => {
        if (num > max) {
          max = num
        }
      })
      console.log(max)
      //updateTrips(max)
  
      const regEx2 = /\b[a-zA-Z]{2,}\b/g;
      const ingredients = []
      foodLines.forEach((line) => {
        const matches = line.match(regEx2)
        let item = ""
  
        if (matches != null) {
          matches.forEach((word) => {
            if (word != null) {
              item += (word + ' ')
            }
          })
          ingredients.push(item)
        }
      })
      console.log("DONE!!!")
      await worker.terminate();
      console.log(ingredients)
      setMerge(ingredients)
    })();
  }
  
  const UploadAndDisplayImage = (props) => {
    const {handleImageUpload} = props
  
    const [selectedImage, setSelectedImage] = useState(null);
  
    return (
      <div className="upload-columns">
  
        {selectedImage && (
          <div>
            <img
              alt="not found"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
        <handleImageUpload/>
        <br />
        <br />
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
            textFromImg(event.target.files[0]);
          }}
        />
      </div>
      
    );
  };

  return (

    <div className="app">
      <nav><h1>PANTRY PAL</h1></nav>
      <div className="main-container">
        <div className="column">
          <div className="item">
            <h2>Pantry</h2>
          </div>

          
          
          {pantry.length > 0 ? ( // Conditional rendering based on pantry data
          <ItemList items={pantry} />
          ) : (
          <p>Enter ingredients to begin!</p>
          )}
          
          
          

          
          
          
        </div>
        <div className="column">
          
          <div className='upload-view'>
              <UploadAndDisplayImage/> 
          </div>
          <div className="item">
            <div className='webcam-view'>
              <div className="item"><p>or</p></div>
              <CameraInput scannedText/>
            </div>
          </div>
          <div>
            <hr></hr>
            <DisplayScannedText scannedText={scannedText} />
            <hr></hr>
          </div>
          <div>
            {merge}
          </div>
          <div>
          <RecipeFinder pantry = {pantry} setPantry = {setPantry} recipes = {recipes} setRecipes = {setRecipes} ins = {ins} setIns = {setIns} merge = {merge} setMerge = {setMerge}/>
          </div>
        </div>
        
        
        
        <div className="column">
          <div className="item">
            <h2>Recipes</h2>
          </div>
          <ul>
            {recipes.map((recipe) => (
              <RecipeBox key={recipe.id} recipe={recipe} handleInfo = {handleInfo} ins = {ins} />
            ))}
          </ul>
          
        </div>
      </div>
    </div>
    

    
    
  );
}

export default App;
