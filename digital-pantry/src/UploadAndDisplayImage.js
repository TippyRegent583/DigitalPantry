import React, { useState } from "react";

const textFromImg = async (image) => {
  const { createWorker } = require('tesseract.js');
  const worker = await createWorker('eng');

  (async () => {
    const { data: { text } } = await worker.recognize(image);
    console.log(text);
    await worker.terminate();
  })();
}

const UploadAndDisplayImage = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <h1>Upload and Display Image using React Hook's</h1>

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
