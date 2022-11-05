var 
var stateArr = [];
var isLoaded = false;

fetch("https://raw.githubusercontent.com/Nolancchu/project/main/stateinfo4.txt").then(res => res.text()).then(text => {
    var array = text.split("\n");
    for (var i = 0; i < array.length; i++) {
        array[i] = array[i].split(" ");
    }
    console.log(array);
    stateArr = array;
    isLoaded = true;
});

function change(stateID) {
    if (isLoaded) {
        var intensity = getIntensity(stateID, stateArr);
        var colors = ["#ff8a8a", "#ff5c5c", "ff2e2e", "#ff0000", "#800000"];
        var color = colors[intensity - 1];
        console.log(stateID,intensity,color);
        document.getElementById(stateID).style.setProperty("fill", color, "important");
    }
}

function changeBack(stateID) {
    if (isLoaded) {
        document.getElementById(stateID).style.setProperty("fill", 'rgb(158, 178, 184)', "important");
    }
}

function getIntensity(stateID, stateArr) {
    var numString = stateArr.find(line => line[0] === stateID)[1];
    return +numString;
}