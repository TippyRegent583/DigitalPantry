import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import UploadAndDisplayImage from './UploadAndDisplayImage';
import CameraInput from './CameraInput';



/*
const PopupBox = () => {

  return (

  <Popup trigger={<button> Trigger</button>} position="right center">
    <div>Popup content here !!</div>
  </Popup>
  ); 
}

export default PopupBox;
*/



const PopupBox = () => {
  
  return (
    <Popup trigger={<button>Scan Receipt</button>} modal>
      <div className='popup-box'>
        <h1>Scan Receipt</h1>
        <div className='upload-view'>
          <UploadAndDisplayImage /> 
        </div>
        <div className='webcam-view'>
          <p>or</p>
          <CameraInput />
        </div>
      </div>
    </Popup>
  );
};

export default PopupBox;


/*
import React from 'react';
import Popup from 'reactjs-popup';

const PopupBox = () => {
  const [textFieldValue, setTextFieldValue] = React.useState('');

  
  const handleChange = (event) => {
    setTextFieldValue(event.target.value);
  };
  

  return (
    <Popup trigger={<button>Open Popup</button>}>
      <div>
        <h1>Popup Box</h1>
        <input
          type="text"
          value={textFieldValue}
          onChange={handleChange}
        />
      </div>
    </Popup>
  );
};

export default PopupBox;
*/