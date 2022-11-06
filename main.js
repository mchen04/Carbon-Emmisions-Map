var databaseIndices = {
    STATE_ABBREV: 0,
    STATE_NAME: 1,
    INTENSITY: 3,
    URL: 6,
    PERCENT: 4,
    CO: 2
};

var mouseCoords = {
    x: 0,
    y: 0
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

window.addEventListener("mousemove", e=>{
    mouseCoords.x = e.clientX;
    mouseCoords.y = e.clientY;
    var dataBoxes = document.getElementsByClassName("dataBox");
    for(var i = 0; i < dataBoxes.length; ++i) {
        var dataBox = dataBoxes[i];
        dataBox.style.top = mouseCoords.y + 40 + "px";
        dataBox.style.left = mouseCoords.x + 25 + "px";
    }
})

function change(stateID) {
    if (isLoaded) {
        var intensity = getIntensity(stateID, stateArr);
        var colors = ["#ffcbcb", "#fc7676", "#ff2400", "#960018", "#722f37"];
        var color = colors[intensity - 1];
        //console.log(stateID, intensity, color);
        document.getElementById(stateID).style.setProperty("fill", color, "important");
        
        var dataBox = document.getElementById(stateID + "-dataBox") || document.createElement("div");

        dataBox.id = stateID + "-dataBox";
        dataBox.classList.add("dataBox");
        
        document.body.appendChild(dataBox);
        dataBox.innerHTML = "Million Metric Tons of Energy-Related CO2: " + getCO(stateID, stateArr) + "<br />" + "Percent Change in Energy-Related Carbon Emmision From 1970 to 2020: " + getPercent(stateID, stateArr);
        dataBox.style.position = "absolute";
        dataBox.style.zIndex = 1000;
        dataBox.style.backgroundColor = "#f9f9f9";
        //dataBox.style.top = mouseCoords.y + "px";
        //dataBox.style.left = mouseCoords.x + "px";
    }
}

function changeBack(stateID) {
    if (isLoaded) {
        document.getElementById(stateID).style.setProperty("fill", 'rgb(158, 178, 184)', "important");
        var dataBox = document.getElementById(stateID + "-dataBox");
        document.body.removeChild(dataBox);
    }
}

function getIntensity(stateID, stateArr) {
    var numString = stateArr.find(line => line[databaseIndices.STATE_ABBREV] === stateID)[databaseIndices.INTENSITY];
    return +numString;
}

function getPercent(stateID, stateArr) {
    var numString = stateArr.find(line => line[databaseIndices.STATE_ABBREV] === stateID)[databaseIndices.PERCENT];
    return numString;
}

function getCO(stateID, stateArr) {
    var numString = stateArr.find(line => line[databaseIndices.STATE_ABBREV] === stateID)[databaseIndices.CO];
    return numString;
}

function getURL(stateID, stateArr) {
    var numString = stateArr.find(line => line[databaseIndices.STATE_ABBREV] === stateID)[databaseIndices.URL];
    console.log(numString);
    return numString;
}
function openURL(stateID) {
    window.open(getURL(stateID, stateArr));
}