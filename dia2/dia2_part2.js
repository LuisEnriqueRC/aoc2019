"use strict";

let program = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,9,19,1,13,19,23,2,23,9,27,1,6,27,31,2,10,31,35,1,6,35,39,2,9,39,43,1,5,43,47,2,47,13,51,2,51,10,55,1,55,5,59,1,59,9,63,1,63,9,67,2,6,67,71,1,5,71,75,1,75,6,79,1,6,79,83,1,83,9,87,2,87,10,91,2,91,10,95,1,95,5,99,1,99,13,103,2,103,9,107,1,6,107,111,1,111,5,115,1,115,2,119,1,5,119,0,99,2,0,14,0];


console.time();
for (let noun = 0; noun <= 99; noun++) {
    // console.log('noun', noun);
    for (let verb = 0; verb <= 99; verb++) {
        // console.log('verb', verb);
        let programLocal = program.slice();
        programLocal[1] = noun;
        programLocal[2] = verb;
        programLocal = intCodeComputer(programLocal);
        if (programLocal[0] == 19690720) {
            console.log('Se encontró el resultado esperado!!');
            console.log('noun', noun);
            console.log('verb', verb);
            console.log('100 * noun + verb = ', 100 * noun + verb);
            // 9342
            break;
        }
    }
}
console.timeEnd();



function intCodeComputer(program) {
    for (let i = 0; i < program.length; i+=4) {
        let parameters = program.slice(i, i+4);
        // console.log(parameters);
        let opcode = parameters[0];
        if (opcode == 1) { // suma
            let suma = program[parameters[1]] + program[parameters[2]];
            program[parameters[3]] = suma;
        } else if (opcode == 2) { // producto
            let producto = program[parameters[1]] * program[parameters[2]];
            program[parameters[3]] = producto;
        } else if (opcode == 99) {
            console.log('Finaliza programa');
            break;
        } else {
            console.error('Algo va mal con el programa');
            break;
        }
    }
    return program;
}