// @ts-ignore
import {Command, Orientation, Position, Rover} from './interfaces/index.interface';

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRover(position: Position, orientation: Orientation) {
    return {orientation, position}
}

function proceedMultipleInput(rover: Rover, listInput: any) {
    const list = listInput;
    // @ts-ignore
    const reducer = (accumulator, currentValue) => proceedInput(currentValue);

// 1 + 2 + 3 + 4
    console.log(list.reduce(reducer));
// expected output: 10

}




function proceedInput(rover: Rover, command: Command) {
    let input = {
        a: updatePositionRover(rover, 'a'),
        r: updatePositionRover(rover, 'r'),
        g: updateOrientationRover(rover, 'g'),
        d: updateOrientationRover(rover, 'd')
    };

    // @ts-ignore
    return input[command];
}

function move(coord: any, orientation: Orientation, mapSize: any, orientationMap: any) {
    return (coord + orientationMap[orientation] + mapSize) % mapSize;

}

function updatePositionRover(rover: Rover, command: Command) {
    const mapDeMaps = {
        a: {x: {E: 1, O: -1, N: 0, S: 0}, y: {E: 0, O: 0, N: 1, S: -1}},
        r: {x: {E: -1, O: 1, N: 0, S: 0}, y: {E: 0, O: 0, N: -1, S: 1}}
    };


    const position = {
        // @ts-ignore
        x: move(rover.position.x, rover.orientation, 50, mapDeMaps[command].x),
        // @ts-ignore
        y: move(rover.position.y, rover.orientation, 50, mapDeMaps[command].y)
    };
    return {...rover, position}
}


function updateOrientationRover(rover: Rover, command: Command) {
    const orientations = ['N', 'E', 'S', 'O'];
    const commandMap = {d: 1, g: -1};
    const currentIndexOrientation = orientations.indexOf(rover.orientation);
    // @ts-ignore
    const updatedIndex = ((currentIndexOrientation + commandMap[command]) + 4) % 4;
    let updatedOrientation = orientations[updatedIndex];
    return {...rover, orientation: updatedOrientation}
}

describe('Rover movement', () => {
    it('Should update rover orientation - N to O', () => {
        let position: Position = {x: 0, y: 0};
        const orientation = 'N';
        const rover = createRover(position, orientation);
        const updateRover = updateOrientationRover(rover, 'g');
        expect(updateRover.orientation).toEqual('O');
    });


    it('Should update rover orientation - N to E', () => {
        let position: Position = {x: 0, y: 0};
        const orientation = 'N';
        const rover = createRover(position, orientation);
        const updateRover = updateOrientationRover(rover, 'd');
        expect(updateRover.orientation).toEqual('E');
    });

    it('Should update rover orientation - S to O', () => {
        let position: Position = {x: 0, y: 0};
        const orientation = 'S';
        const rover = createRover(position, orientation);
        const updateRover = updateOrientationRover(rover, 'd');
        expect(updateRover.orientation).toEqual('O');
    });

    it('Should update rover orientation - S to E', () => {
        let position: Position = {x: 0, y: 0};
        const orientation = 'S';
        const rover = createRover(position, orientation);
        const updateRover = updateOrientationRover(rover, 'g');
        expect(updateRover.orientation).toEqual('E');
    });

    it('Should get a random int between 0 -> 50', () => {
        const randomInt = getRandomInt(0, 50);
        expect(randomInt).toBeGreaterThanOrEqual(0);
        expect(randomInt).toBeLessThanOrEqual(50);
    });

    // it('Should avance : Orientation -> N Position: y: 49', () => {
    //     let position = {x: 0, y: 49};
    //     const orientation = 'N';
    //     const rover = createRover(position, orientation);
    //     const updateRover = updatePositionRover(rover, 'd');
    //     expect(updateRover.position.y).toEqual(0);
    // });
    //
    it('Should proceeed one input', () => {
        let position = {x: 10, y: 10};
        const orientation = 'N';
        const rover = createRover(position, orientation);
        const updateRover = proceedInput(rover, 'd');
        expect(updateRover.orientation).toEqual('E');
    });

    it('Should proceed multiple input', () => {
        let position = {x: 10, y: 10};
        const orientation = 'N';
        const listInput = ['a', 'a', 'a', 'r', 'a', 'g', 'a', 'a', 'a', 'd', 'a', 'a', 'g'];
        const rover = createRover(position, orientation);
        const updateRover = proceedMultipleInput(rover, listInput);
    });
});
