async function scanReceipt() {

    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();
  

    const [result] = await client.textDetection('./digital-pantry/resources/receipt.jpg');
    const [detections] = result.textAnnotations;
    const text = detections ? detections.description.trim() : '';
    console.log('Text:');
    console.log(text)
  }
  scanReceipt();