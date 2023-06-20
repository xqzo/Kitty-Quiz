//TheCatAPI
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

//Meowfacts API
//Plugin Code
const url = 'https://meowfacts.p.rapidapi.com/?lang=eng';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4ff8fe998cmsh7ce924a6c86cbc7p1d5426jsn51573375760f',
		'X-RapidAPI-Host': 'meowfacts.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

//Same method used to pull cat img plugged in for fact. (I got desperate.)
function fetchCatFact(){
    let fact = document.getElementById("cat-fact");
    fetch('4ff8fe998cmsh7ce924a6c86cbc7p1d5426jsn51573375760f'+api)
    .then(resp => resp.json())
    .then (json => fact.src = json[0].url);

    let button = document.getElementById("cat-fact-btn");
    button.addEventListener("click", fetchCatImage);
    console.log ("hello")
}

