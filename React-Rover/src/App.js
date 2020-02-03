import React, { useState } from "react";
import "./App.css";
import { Stage, Layer, Rect, Arrow } from "react-konva";
import { AppBar, Button, TextField } from "@material-ui/core";
import Konva from "konva";

const getRandomInt = (min, max) => {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};

const position = { x: 3, y: 3 };
const orientation = "N";
const obstacles = [
  { position: { x: 3, y: 3 } },
  { position: { x: getRandomInt(4, 6), y: getRandomInt(4, 6) } },
  { position: { x: getRandomInt(4, 6), y: getRandomInt(4, 6) } },
  { position: { x: getRandomInt(4, 6), y: getRandomInt(4, 6) } },
  { position: { x: getRandomInt(4, 6), y: getRandomInt(4, 6) } },
  { position: { x: getRandomInt(4, 6), y: getRandomInt(4, 6) } },
  { position: { x: getRandomInt(4, 6), y: getRandomInt(4, 6) } }
];

const App = () => {
  const initRover = createRover(position, orientation);
  const [command, setCommand] = useState("");
  const [orientationRover, setOrientationRover] = useState(270);
  const [color, setColor] = useState("yellowgreen");
  const [initialRover, setInitialRover] = useState(initRover);

  function changeOrientation(orientation) {
    const orientationMap = {
      r: 0,
      a: 0,
      g: 90,
      d: -90
    };
    setOrientationRover(orientationRover + orientationMap[orientation]);
  }

  const validateCommand = () => {
    let commandSplitted = command.split("");
    proceedMultipleInput(commandSplitted);
  };

  const handleClick = () => {
    setColor(Konva.Util.getRandomColor());
  };

  function createRover(position, orientation) {
    return { orientation, position };
  }

  function proceedMultipleInput(commands) {
    commands.map((input, index) => {
      console.log(initialRover);
      let updatedRover = proceedInput(initialRover, input);
      setInitialRover(updatedRover);
    });
  }

  function proceedInput(rover, command) {
    const input = {
      a: updatePositionRover(rover, "a"),
      r: updatePositionRover(rover, "r"),
      g: updateOrientationRover(rover, "g"),
      d: updateOrientationRover(rover, "d")
    };

    changeOrientation(command);
    return input[command];
  }

  const isInCollision = () => {
    return obstacles.filter(obstacle => {
      return obstacle.position === initialRover.position;
    });
  };

  function moveRover(coord, orientation, mapSize, orientationMap) {
    let collision = isInCollision();
    if (collision.length > 0) {
      alert("Obstacle !");
    }
    return (coord + orientationMap[orientation] + mapSize) % mapSize;
  }

  function updatePositionRover(rover, command) {
    const mapDeMaps = {
      r: { x: { E: 1, O: -1, N: 0, S: 0 }, y: { E: 0, O: 0, N: 1, S: -1 } },
      a: { x: { E: -1, O: 1, N: 0, S: 0 }, y: { E: 0, O: 0, N: -1, S: 1 } }
    };

    const position = {
      x: moveRover(
        rover.position.x,
        rover.orientation,
        50,
        mapDeMaps[command].x
      ),
      y: moveRover(
        rover.position.y,
        rover.orientation,
        50,
        mapDeMaps[command].y
      )
    };
    return { ...rover, position };
  }

  function updateOrientationRover(rover, command) {
    const orientations = ["N", "E", "S", "O"];
    const commandMap = { d: 1, g: -1 };
    const currentIndexOrientation = orientations.indexOf(rover.orientation);
    const updatedIndex =
      (currentIndexOrientation + commandMap[command] + 4) % 4;
    let updatedOrientation = orientations[updatedIndex];
    return { ...rover, orientation: updatedOrientation };
  }

  return (
    <>
      <AppBar style={{ display: "flex", backgroundColor: "beige" }}>
        <TextField
          variant="outlined"
          style={{ width: "200px", height: "40px", margin: "10px auto" }}
          value={command}
          onChange={e => setCommand(e.target.value)}></TextField>
        <Button
          style={{ width: "200px", height: "40px", margin: "10px auto" }}
          color="primary"
          variant="contained"
          onClick={validateCommand}>
          RUN FOREST !
        </Button>
      </AppBar>

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ backgroundColor: "grey" }}>
        <Layer>
          {obstacles.map(obstacle => {
            return (
              <Rect
                x={obstacle.position.x * 100}
                y={obstacle.position.y * 100}
                width={20}
                height={20}
                fill={color}
                shadowBlur={5}
                onClick={handleClick}></Rect>
            );
          })}

          <Arrow
            x={initialRover.position.x * 100}
            y={initialRover.position.y * 100}
            fill="black"
            shadowBlur={2}
            width={20}
            height={20}
            onClick={handleClick}
            rotation={orientationRover}
            scale={{ x: 3, y: 3 }}></Arrow>
        </Layer>
      </Stage>
    </>
  );
};

export default App;
