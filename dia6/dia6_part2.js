"use strict";

let mapa = ['COM)B','B)C','C)D','D)E','E)F','B)G','G)H','D)I','E)J','J)K','K)L'];
mapa = document.getElementById('input').textContent.split('\n');
console.log(mapa);

let found = false;
let baseOrbitas = [];
baseOrbitas = interpretaMapa(mapa, baseOrbitas);
console.log('baseOrbitas', baseOrbitas);


let from = '2LZ';
let to = 'LKM';


let padresFrom = [];
let actual = from;
while (true) {
    actual = baseOrbitas.filter( orbita => orbita.objeto == actual )[0].objeto_padre;
    if (actual == null) break;
    padresFrom.push(actual);
}
// console.log('padresFrom', padresFrom);

let padresTo = [];
actual = to;
while (true) {
    actual = baseOrbitas.filter( orbita => orbita.objeto == actual )[0].objeto_padre;
    if (actual == null) break;
    padresTo.push(actual);
}
// console.log('padresTo', padresTo);

let comun = '';
for (let i of padresFrom) {
    for (let j of padresTo) {
        if (i == j) {
            comun = i;
            break;
        }
    }
    if (comun != '') break;
}
// console.log('comun', comun);

// console.log(padresFrom.findIndex( value => value == comun ) + 1);
// console.log(padresTo.findIndex( value => value == comun ) + 1);
let pasos = (padresFrom.findIndex( value => value == comun ) + 1) + (padresTo.findIndex( value => value == comun ) + 1);
console.log('pasos', pasos);



function getPuntosProximos(bOrbitas, objeto, except = '') {
    let padres = baseOrbitas.filter( orbita => orbita.objeto == objeto );
    // console.log('padres de '+objeto, padres);
    let hijos = baseOrbitas.filter( orbita => orbita.objeto_padre == objeto );
    // console.log('hijos de '+objeto, hijos);
    
    let proximos = [];
    for (let i of padres) proximos.push(i.objeto_padre);
    for (let i of hijos) proximos.push(i.objeto);
    if (except != '') if (proximos.indexOf(except) != -1) proximos.splice(proximos.indexOf(except), 1);
    return proximos;
}


function getNumeroOrbitas(bOrbitas, objeto) {
    let orbitas = 0;
    let row = bOrbitas.filter( orbita => objeto == orbita.objeto );
    // console.log('row', row);
    if (row.length > 0) {
        if (row[0].objeto_padre != null) {
            orbitas++;
            orbitas += getNumeroOrbitas(bOrbitas, row[0].objeto_padre);
        }
    }
    return orbitas;
}


function interpretaMapa(mapa, baseOrbitas) {
    for (let orbita of mapa) {
        let datos = orbita.split(')');
        let existente1 = baseOrbitas.filter( orbita => datos[0] == orbita.objeto );
        if (existente1.length == 0) baseOrbitas.push( {'objeto': datos[0], 'objeto_padre': null} );
        
        let existente2 = baseOrbitas.filter( orbita => datos[1] == orbita.objeto );
        if (existente2.length == 0) baseOrbitas.push( {'objeto': datos[1], 'objeto_padre': datos[0]} );
        else {
            let index = baseOrbitas.findIndex(row => row.objeto == datos[1] && row.objeto_padre == null)
            if (index != -1) baseOrbitas[index] = { 'objeto': datos[1], 'objeto_padre': datos[0] };
        }
    }
    return baseOrbitas;
}
