async function scanReceipt(image) {

    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();
  

    const [result] = await client.textDetection(image);
    const [detections] = result.textAnnotations;
    const text = detections ? detections.description.trim() : '';
    console.log('Text:');
    console.log(text)
  }