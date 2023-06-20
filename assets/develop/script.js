const url = 'https://api.thecatapi.com';
const options = {
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
    picButton.addEventListener("click", fetchCatImage);
}

function processImage() {
    var imgSource = currentImage.getAttribute("src");
    localStorage.setItem("recent-image", imgSource);
}

function displayRecentImage() {
    const recentImageSrc = localStorage.getItem("recent-image");
    if (recentImageSrc) {
        document.querySelector("#img-preview").setAttribute("src", recentImageSrc);
    }
}

document.querySelector("#save-button").addEventListener("click", processImage);
document.querySelector("#save-button").addEventListener("click", displayRecentImage);

// code for save button and associated functions inspired by this youtube video: https://www.youtube.com/watch?v=8K2ihr3NC40

document.addEventListener("DOMContentLoaded", () => {
    fetchCatImage();
    picBtnClick();
    displayRecentImage();
})
