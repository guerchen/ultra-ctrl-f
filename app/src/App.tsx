import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  let urls:string[] = [];
  let pageData = {
    'url': null as string|unknown,
    'images': urls,
    'timestamp': null as number|unknown
  };
  const regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);
  let reference_image:string;

  function logURL(requestDetails:any) {
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

  const analyseImages = () => {
    let dateTimeNow = Date.now();
    pageData.timestamp = dateTimeNow
    axios.post(`http://localhost:8000/save`, pageData)
      .then(res => {
        console.log('save',res.data);
        axios.post(`http://localhost:8000/compare`, {"url": pageData.url,"reference_image":reference_image})
          .then(res => {
            console.log('compare',res.data);
          })
      })
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={analyseImages}>
          Analyse images
        </button>
      </header>
    </div>
  );
}

export default App;
