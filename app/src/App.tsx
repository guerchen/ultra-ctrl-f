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

  function logURL(requestDetails:any) {
    const regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);
    if (regex.test(requestDetails.url)) {
      urls.push(requestDetails.url);
      console.log(pageData);
    }
  }

  chrome.tabs.query({active:true},function(tab){
    let currentTabUrl = tab[0].url;
    pageData.url = currentTabUrl;
    console.log(currentTabUrl)
  });

  chrome.webRequest.onBeforeRequest.addListener(
    logURL,
    {urls: ["<all_urls>"]}
  );

  const [selectedFile, setSelectedFile] = useState("");
  const [similarImages,setSimilarImages] = useState([]);

  const analyseImages = () => {
    let dateTimeNow = Date.now();
    pageData.timestamp = dateTimeNow
    axios.post(`http://localhost:8000/save`, pageData)
      .then(res => {
        console.log('save',res.data);
        console.log('selected',selectedFile)
        axios.post(`http://localhost:8000/compare`, {"url": pageData.url,"reference_image":selectedFile})
          .then(res => {
            console.log('compare',res.data);
            setSimilarImages(res.data.similar);
          })
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
