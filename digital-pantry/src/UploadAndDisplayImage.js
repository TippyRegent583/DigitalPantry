import React, { useState } from "react";
import { handeMerge } from "./RecipeFinder.js";

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
    await worker.terminate();
    handeMerge(ingredients)
  })();
}

const UploadAndDisplayImage = () => {

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

      <br />
      <br />

      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
          textFromImg(event.target.files[0]);}}
      />
    </div>
    
  );
};

export default UploadAndDisplayImage;
