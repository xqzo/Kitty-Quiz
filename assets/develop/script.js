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
}

function btnClick() {
    let button = document.getElementById("new-cat-btn");
    button.addEventListener("click", fetchCatImage);
}

document.addEventListener("DOMContentLoaded", () => {
    fetchCatImage();
    btnClick();
})
