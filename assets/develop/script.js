const pic_url = 'https://api.thecatapi.com';
const pic_options = {
    method: 'GET',
    headers: {
        'x-api-key': 'live_V14EuqsPFtYSMyNins6DmX2QeyrvrQj0xYsLLJAGQp3bV5xzRRCtE2U08S8Ja1Zx',
    }
};

function fetchCatImage() {
    let image = document.getElementById("cat-image");
    fetch('https://api.thecatapi.com/v1/images/search')
    .then(resp => resp.json())
    .then(json => image.src = json[0].url);

    return image;
}

var currentImage = fetchCatImage();

function picBtnClick() {
    let picButton = document.getElementById("new-cat-btn");
    picButton.addEventListener("click", function() {fetchCatImage();
    fetchCatFact()});
}

const fact_url = 'https://meowfacts.p.rapidapi.com/?lang=eng';
const fact_options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4ff8fe998cmshce924a6c86cbc7p1d5426jsn51573375760f',
        'X-RapidAPI-Host': 'meowfacts.p.rapidapi.com',
    }
}

function fetchCatFact() {
    console.log("was called");
    let fact = document.getElementById("cat-fact");
    fetch(fact_options.headers["X-RapidAPI-Host"]) //come back to this line
    .then(resp => resp.json())
    .then(json =>{
        console.log(json);
        fact.textContent = json[0].url});

    
    //console.log(fact);
}

//function forceDownload(url, fileName){
//    var xhr = new XMLHttpRequest();
//    xhr.open("GET", url, true);
//    xhr.responseType = "blob";
//    xhr.onload = function(){
//        var urlCreator = window.URL || window.webkitURL;
//        var imageUrl = urlCreator.createObjectURL(this.response);
//        var tag = document.createElement('a');
//        tag.href = imageUrl;
//        tag.download = fileName;
//        document.body.appendChild(tag);
//        tag.click();
//        document.body.removeChild(tag);
//    }
//    xhr.send();
//}

//var link = document.createElement('a');
//link.href = 'images.jpg';
//link.download = 'Download.jpg';
//document.body.appendChild(link);
//link.click();
//document.body.removeChild(link);

//function downloadImage(url, fileName) {
//    var link = document.createElement('a');
//    link.href = url;
//    link.download = fileName;
//    document.body.appendChild(link);
//    link.click();
//    document.body.removeChild(link);
//}

//var stringy = 'fjjf/ew.kfoew.ifo/nfdisfo.sd/dkmfdsf/somethign.jpg';
//console.log(stringy.split('/'));
//console.log(stringy.split('/')[stringy.split('/').length - 1]);

function imgDownload(inputUrl) {
    axios({
        url: inputUrl, //your url
        method: 'GET',
        responseType: 'blob', // important
    }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', inputUrl.split('/')[inputUrl.split('/').length - 1]); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    })
}

function processImage() {
    var imgSource = currentImage.getAttribute("src"); // currentImage is the html element whose source is modified when the "Click for a random cat and fact" button is clicked. this line sets the value of the imgSource variable to the src part of that element.
    localStorage.setItem("recent-image", imgSource); // stores imgSource in localStorage
}

function displayRecentImage() {
    const recentImageSrc = localStorage.getItem("recent-image"); // gets the most recent imgSource from localStorage
    if (recentImageSrc) {
        document.querySelector("#img-preview").setAttribute("src", recentImageSrc); // sets the image source for the preview of the most recently saved image

        imgDownload(recentImageSrc);
        //downloadImage(recentImageSrc, recentImageSrc.split('/')[recentImageSrc.split('/').length-1]) // force download of the image source url with only the last part (e.g. ___.jpg) as the file name
    }
}

document.querySelector("#save-button").addEventListener("click", processImage);  
document.querySelector("#save-button").addEventListener("click", displayRecentImage);
// when the save button is clicked, two event listeners are attached to it: processImage, which saves the image to localStorage; and displayRecentImage, which displays the most recent saved image under "Most recent image:" and is intended to download the image to the user's computer

// code for save button and associated functions inspired by this youtube video: https://www.youtube.com/watch?v=8K2ihr3NC40

document.addEventListener("DOMContentLoaded", () => {
    fetchCatImage();
    picBtnClick();
    //displayRecentImage();
})
