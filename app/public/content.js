const queryImages = () => {
    let urls = [];
    document.querySelectorAll('img').forEach((tag) => {
        urls.push(tag.src);
      });
    return urls
}

chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse) {
        if (request.type == "getImages") {
            sendResponse(queryImages());
        }
})