var api = 'live_V14EuqsPFtYSMyNins6DmX2QeyrvrQj0xYsLLJAGQp3bV5xzRRCtE2U08S8Ja1Zx'


function fetchCatImage(){
    let image = document.getElementById("cat-image");
    fetch('https://api.thecatapi.com/v1/images/search?api_key='+api)
    .then(resp => resp.json())
    .then (json => image.src = json[0].url);
}

    let button = document.getElementById("new-cat-btn");
    button.addEventListener("click", fetchCatImage);
    console.log ("hello")

