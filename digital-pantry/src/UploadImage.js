/*import React from 'react';
import { useState } from 'react';

function useImage() {



const [file, setFile] = useState(null);

const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
};

<input type="file" onChange={handleFileChange} />

const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });
  
    if (response.status === 200) {
      // File uploaded successfully
    } else {
      // File upload failed
    }
};

<button onClick={uploadFile}>Upload Image</button>
}

export default UploadImage;
*/