"use strict";

let openFile = function(event) {
    let input = event.target;

    let reader = new FileReader();
    reader.onload = function(){
        let text = reader.result;
        proceso(text);
    };
    reader.readAsText(input.files[0]);
};


function proceso(texto) {
    let rows = texto.split('\n');
    let totalFuel = 0;
    for (let mass of rows) {
        console.log(mass);
        mass = parseInt(mass);
        let fuel = getFuel(mass);
        let fuelParaFuel = fuel;
        totalFuel += fuel;
    }
    // 3401852
    console.log(totalFuel);
}

function getFuel(masa) {
    return parseInt(masa / 3) - 2;
}