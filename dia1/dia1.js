// 3401852
// 5099916
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
    // rows = [1969];
    let totalFuel = 0;
    for (let mass of rows) {
        console.log(mass);
        mass = parseInt(mass);
        let fuel = getFuel(mass);
        let fuelParaFuel = fuel;
        fuelParaFuel += fuelForFuel(fuel);
        // console.log('fuel para el fuel', fuelParaFuel);
        // totalFuel += fuel;
        totalFuel += fuelParaFuel;
    }
    console.log(totalFuel);
}

function fuelForFuel(fuelMass) {
    let fuelExtra = 0;
    if (fuelMass >= 6) {
        fuelExtra = getFuel(fuelMass);
        fuelExtra += fuelForFuel(fuelExtra);
    }
    return fuelExtra;
}

function getFuel(masa) {
    return parseInt(masa / 3) - 2;
}