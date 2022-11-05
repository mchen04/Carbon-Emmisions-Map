var databaseIndices = {
    STATE_ABBREV: 0,
    STATE_NAME: 1,
    INTENSITY: 3
};
var stateArr = [];
var isLoaded = false;

fetch("https://raw.githubusercontent.com/Nolancchu/Carbon-Emmisions-Map/main/data.txt").then(res => res.text()).then(text => {
    var array = text.split("\n");
    for (var i = 0; i < array.length; i++) {
        array[i] = array[i].split(",");
    }
    stateArr = array;
    isLoaded = true;
});

function change(stateID) {
    if (isLoaded) {
        var intensity = getIntensity(stateID, stateArr);
        var colors = ["#ffcbcb", "#fc7676", "#ff2400", "#960018", "#722f37"];
        var color = colors[intensity - 1];
        //console.log(stateID, intensity, color);
        document.getElementById(stateID).style.setProperty("fill", color, "important");
    }
}

function changeBack(stateID) {
    if (isLoaded) {
        document.getElementById(stateID).style.setProperty("fill", 'rgb(158, 178, 184)', "important");
    }
}

function getIntensity(stateID, stateArr) {
    var numString = stateArr.find(line => line[databaseIndices.STATE_ABBREV] === stateID)[databaseIndices.INTENSITY];
    return +numString;
}