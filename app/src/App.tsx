import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let urls:string[] = [];
  let pageData = {
    'url': null as string|unknown,
    'images': urls
  };
  const regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);

  function logURL(requestDetails:any) {
    console.log(requestDetails.url,regex.test(requestDetails.url))
    if (regex.test(requestDetails.url) == true) {
      urls.push(requestDetails.url);
      console.log(pageData);
    }
  }

  chrome.tabs.query({active:true},function(tab){
    let currentTabUrl = tab[0].url;
    pageData.url = currentTabUrl
    console.log(currentTabUrl)
  });

  chrome.webRequest.onBeforeRequest.addListener(
    logURL,
    {urls: ["<all_urls>"]}
  );
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
