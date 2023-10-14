import Tesseract from 'tesseract.js'

const worker = await Tesseract.createWorker("eng", 1, {
  corePath: '../../node_modules/tesseract.js-core',
  workerPath: "/dist/worker.min.js",
  logger: function(m){console.log(m);}
});

const recognize = async function(evt){
const files = evt.target.files;

for (let i=0; i<files.length; i++) {
  const ret = await worker.recognize(files[i]);
  console.log(ret.data.text);
}
}