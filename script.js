var api = '4ff8fe998cmsh7ce924a6c86cbc7p1d5426jsn51573375760f'
function fetchCatFact(){
    fetch('https://meowfacts.p.rapidapi.com/?lang=eng')
    .then(resp => resp.text())
    .then (json => image.src = json[0].url);
}
function btnClick(){
    let button = document.getElementById("new-fact-button");
    button.addEventListener("click", fetchCatFact);
    console.log ("helloo");
}
document.addEventListener("DOMContentLoaded", () => {
    fetchCatFact()
    btnClick();
});
