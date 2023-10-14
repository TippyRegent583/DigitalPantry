import React, { useState, useEffect, useRef } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import UploadAndDisplayImage from './UploadAndDisplayImage';
import CameraInput from './CameraInput';
import Webcam from "react-webcam";



const PopupBox = () => {
  

    const [selectedImage, setSelectedImage] = useState(null);

    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
  
    /*
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
    */

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    function resetImages() {
        setSelectedImage(null);
    }
    

    return (
        <Popup trigger={<button>Open Popup</button>} modal>
        <div>
            <h1>Popup</h1>
    
            {/* UPLOAD AND DISPLAY */}
            {selectedImage && (
            <div>
                <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
                />
                <br />
                {/*<button onClick={() => setSelectedImage(null) }>Remove</button>*/}
                <button onClick={() => resetImages() }>Remove</button>
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
                //<scanReceipt image={event.target.files[0]}/>
            }}
            />

            {/* WEBCAM UPLOAD */}
            <>
                <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{ width: "50%", height: "50%" }}
                />
                <button onClick={capture}>Capture photo</button>
                {imgSrc && (
                    <img
                        src={imgSrc}
                    />
                )}
            </>
        </div>
        <div>
            <h1>Scan Receipt</h1>
            <div className='webcam-view'>
                {/*<CameraInput />*/}
            </div>
        </div>
        </Popup>
    );
};

export default PopupBox;