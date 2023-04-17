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

  const getImagesFromPage = async ():Promise<string[]> => {
    const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true});
    var tabId = tabs[0].id as any;
    const response = await chrome.tabs.sendMessage(tabId,{type: 'getImages'});
    return response
  }

  const [selectedFile, setSelectedFile] = useState("");
  const [similarImages,setSimilarImages] = useState([]);

  const analyseImages = async () => {
    let dateTimeNow = Date.now();
    urls = await getImagesFromPage();
    console.log(pageData);
    pageData.timestamp = dateTimeNow;
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
