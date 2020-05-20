"use strict";

let mapa = ['COM)B','B)C','C)D','D)E','E)F','B)G','G)H','D)I','E)J','J)K','K)L'];
mapa = document.getElementById('input').textContent.split('\n')
console.log(mapa);

let baseOrbitas = [];
baseOrbitas = interpretaMapa(mapa, baseOrbitas);
console.log('baseOrbitas', baseOrbitas);

console.time();
let total = 0;
for (let row of baseOrbitas) {
    total += getNumeroOrbitas(baseOrbitas, row.objeto);
}
console.log('total', total);
console.timeEnd();


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
