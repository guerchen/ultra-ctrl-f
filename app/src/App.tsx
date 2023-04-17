import React, {useState} from 'react';
import axios from 'axios';
import './App.css';
import Uploader from './components/uploader';

function App() {
  let urls:string[] = [];
  let pageData = {
    'url': null as string|unknown,
    'images': urls,
    'timestamp': null as number|unknown
  };

  //TODO: move this logic to content script
  const getImagesFromPage = () => {
    document.querySelectorAll('img').forEach((tag) => {
      urls.push(tag.src);
    });
  }

  const [selectedFile, setSelectedFile] = useState("");
  const [similarImages,setSimilarImages] = useState([]);

  const analyseImages = () => {
    let dateTimeNow = Date.now();
    pageData.timestamp = dateTimeNow
    axios.post(`http://localhost:8000/compare`, {"url": pageData.url,"reference_image":selectedFile})
      .then(res => {
        console.log('compare',res.data);
        setSimilarImages(res.data.similar);
      })
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <Uploader setSelectedFile={setSelectedFile}/>
        {selectedFile == ''  ? '' :
            <div>
                <img className="uploadedImage" src={selectedFile} alt="reference_image"/>
            </div>
            }  
        <button onClick={analyseImages}>
          Analyse images
        </button>
        <div>
          {similarImages.map((image,index) =>
          <img src={image} alt={`result_${index}`}/>)}
        </div>
      </header>
    </div>
  );
}

export default App;
