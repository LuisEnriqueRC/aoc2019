"use strict";

console.time();
let wire1 = [];
let wire2 = [];
let input = document.getElementById('divInput').textContent.split('\n')
let instrucciones = [];
instrucciones = (input[0]).split(',');
for (let instruccion of instrucciones) {
    wire1.push(instruccion);
}
instrucciones = (input[1]).split(',');
for (let instruccion of instrucciones) {
    wire2.push(instruccion);
}

console.log('wire1', wire1);
console.log('wire2', wire2);


let coordenadasW1 = getCoordenadas(wire1);
console.log('coordenadasW1', coordenadasW1);

let coordenadasW2 = getCoordenadas(wire2);
console.log('coordenadasW2', coordenadasW2);


let intersecciones = [];
let i = 0;
for (let datos1 of coordenadasW1) {
    let interseccion = [];
    interseccion = coordenadasW2.filter( coordenadasW2 =>
        coordenadasW2.x == datos1.x && coordenadasW2.y == datos1.y
    );
    if (interseccion.length > 0) intersecciones.push(interseccion[0]);
    i++;
}
console.log('intersecciones', intersecciones);

let distancias = [];
for (let interseccion of intersecciones) {
    let x = interseccion.x < 0 ? interseccion.x * -1 : interseccion.x;
    let y = interseccion.y < 0 ? interseccion.y * -1 : interseccion.y;
    let distancia = x + y;
    if (distancia > 0) distancias.push(distancia);
}
console.log('distancias', distancias);
let menorDistancia = Math.min.apply(Math, distancias);
console.log('La distancia más corta al punto central es ', menorDistancia);

console.timeEnd();




function getCoordenadas(wire) {
    let coordenadas = [];
    let x = 0, y = 0; // tomamos como partida un sistema de coordenadas x,y
    for (let punto of wire) {
        // console.log(punto);
        let direccion = punto[0];
        let distancia = punto.slice(1);
        if (direccion == 'R') { // si va a la derecha, trabajamos sobre x
            for (let i = 0; i <= distancia; i++) {
                coordenadas.push(getParCoordenada(x, y));
                x += 1;
            }
            x--;
            coordenadas.splice(-1,1); // para no repetir coordenadas
        } else if (direccion == 'L') { // si va la izquierda, trabajamos sobre x en negativo
            for (let i = 0; i <= distancia; i++) {
                coordenadas.push(getParCoordenada(x, y));
                x -= 1;
            }
            x++;
            coordenadas.splice(-1,1);
        } else if (direccion == 'U') { // si va hacia arriba, trabajamos sobre y
            for (let i = 0; i <= distancia; i++) {
                coordenadas.push(getParCoordenada(x, y));
                y += 1;
            }
            y--;
            coordenadas.splice(-1,1);
        } else if (direccion == 'D') { // si va hacia abajo, trabajamos sobre y en negativo
            for (let i = 0; i <= distancia; i++) {
                coordenadas.push(getParCoordenada(x, y));
                y -= 1;
            }
            y++;
            coordenadas.splice(-1,1);
        }
    }
    coordenadas.push(getParCoordenada(x, y));
    return coordenadas;
}

function getParCoordenada(x, y) {
    return {
        'x': x,
        'y': y
    }
}