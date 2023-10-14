import React, { useState } from "react";

const textFromImg = async (image) => {
  const { createWorker } = require('tesseract.js');
  const worker = await createWorker('eng', 1, {
    logger: m => console.log(m), // Add logger here
  });

  (async () => {
    const { data: { text } } = await worker.recognize(image);
    const lines = text.split("\n");
    await worker.terminate();
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
