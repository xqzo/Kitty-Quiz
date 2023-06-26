function fetchCatImage() {
    let image = document.getElementById("cat-image");
    fetch('https://api.thecatapi.com/v1/images/search')
    // this api does not require a key, source: https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t
    .then(resp => resp.json())
    .then(json => image.src = json[0].url);
    // in this case, json is a one-entry array with four objects: {id: url: width: height: }. the url object is the image url, so this line creates a src field for the img with the id "cat-image" and sets it to the image url.

    return image;
}

var currentImage = fetchCatImage(); // this variable will be used in another function later

function setBoxcatWidth() {
    document.getElementById("boxcat-container").style.width = document.getElementById("new-cat-btn").offsetWidth + "px";
    // the offset width is a measure of an element's width, including padding and border but not including margin, rounded to the nearest pixel. source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth
    // source for setting style attributes in JavaScript: https://www.w3schools.com/jsref/prop_html_style.asp
}
// the purpose of this function is to match the width of the container that holds the saved image preview to the width of the "Click for a random cat and fact" button. even if the text in the button were changed, the saved image container would still be aligned with it.
// side note: in all comments after this one, "Click for a random cat and fact" has been shortened to 'random cat and fact'

setBoxcatWidth();

function picBtnClick() {
    let picButton = document.getElementById("new-cat-btn");
    picButton.addEventListener("click", function() {fetchCatImage();
    fetchCatFact()});
    // the random cat and fact button has an event listener with two functions attached to it. these functions generate a new cat image and a new fact about cats every time the button is clicked.
}

const fact_url = 'https://meowfacts.p.rapidapi.com/?lang=eng';
const fact_options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '41afa2b638msh3f22d0547e8ca2ap195e88jsn66cc9c003763',
        // this API key was created by TA Michael Seaman. without a valid API key, clicking on the random cat and fact button produces an error message in the console: "You are not subscribed to this API".
        'X-RapidAPI-Host': 'meowfacts.p.rapidapi.com',
    }
}

function fetchCatFact() {
    let fact = document.getElementById("cat-fact");
    fetch(fact_url, fact_options)
    .then(resp => resp.json())
    .then(json => fact.textContent = json.data); // sets the text content of the element with the id "cat-fact" to the data retrieved by fetching. the fact element is empty until the random cat and fact button is clicked.
}

function imgDownload(inputUrl) {
    axios({
        url: inputUrl, // this url will be the current image url every time the save button is clicked
        method: 'GET',
        responseType: 'blob', // blob stands for Binary Large Object. it is a mass of binary data that is not restricted to any one file format. this allows information to be stored in large, unstructured pools of data, which makes blob storage flexible and scalable. source: https://www.cloudflare.com/learning/cloud/what-is-blob-storage/
    }).then((response) => {
        // create file link in browser's memory
        const file_href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = file_href;
        link.setAttribute('download', inputUrl.split('/')[inputUrl.split('/').length-1]); // the second parameter of setAttribute ensures that the name of the downloaded file will only be the last part of the image url. for example, splitting 'https://cdn2.thecatapi.com/images/b0s.jpg' by '/' yields an array with 'b0s.jpg' as the last entry, which is obtained using the index [length-1].
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(file_href);
    })
}
// this function was inspired by the first answer to this Stack Overflow post: https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios

function processImage() {
    var imgSource = currentImage.getAttribute("src"); // currentImage is the html element whose source is modified when the random cat and fact button is clicked. this line sets the value of the imgSource variable to the src part of that element.
    localStorage.setItem("recent-image", imgSource); // stores imgSource in localStorage
}

function displayRecentImage() {
    const recentImageSrc = localStorage.getItem("recent-image"); // gets the most recent imgSource from localStorage
    if (recentImageSrc) {
        document.querySelector("#img-preview").setAttribute("src", recentImageSrc); // sets the image source for the preview of the most recently saved image

        imgDownload(recentImageSrc);
        // force download of the image source url
    }
}

function displayRecentImageNoDownload() {
    const recentImageSource = localStorage.getItem("recent-image");
    if (recentImageSource) {
        document.querySelector("#img-preview").setAttribute("src", recentImageSource);
    }
}
// this function is the same as displayRecentImage but with imgDownload removed. it is needed because it is called in the event listener that responds to the document being loaded. without this function, the preview of the most recently saved image would be blank even if an image was previously saved to localStorage before the page was refreshed/reopened. we want the preview to show but we do not want the latest saved image to be downloaded as soon as the page is loaded.

document.querySelector("#save-button").addEventListener("click", function() {processImage();
    displayRecentImage()});
// when the save button is clicked, two event listeners are attached to it: processImage, which saves the image to localStorage; and displayRecentImage, which displays the most recent saved image under "Most recent image:" and is intended to download the image to the user's computer

// code for save button and associated functions was inspired by this youtube video: https://www.youtube.com/watch?v=8K2ihr3NC40

document.addEventListener("DOMContentLoaded", () => {
    fetchCatImage();
    picBtnClick();
    displayRecentImageNoDownload();
    // these functions are ready to be used as soon as the page is loaded, without waiting for stylesheets and images to load, source: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
});
