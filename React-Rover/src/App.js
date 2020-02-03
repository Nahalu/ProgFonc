import React, { useState } from "react";
import "./App.css";
import { Stage, Layer, Rect, Arrow } from "react-konva";
import { AppBar, Button, TextField } from "@material-ui/core";
import Konva from "konva";

const getRandomInt = (min, max) => {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};

const obstacles = [
  { position: { x: getRandomInt(1, 10), y: getRandomInt(1, 10) } },
  { position: { x: getRandomInt(1, 10), y: getRandomInt(1, 10) } },
  { position: { x: getRandomInt(1, 10), y: getRandomInt(1, 10) } },
  { position: { x: getRandomInt(1, 10), y: getRandomInt(1, 10) } }
];
const position = { x: 5, y: 5 };
const orientation = "N";

const App = () => {
  const initRover = createRover(position, orientation);
  const [command, setCommand] = useState("");
  const [commands, setCommands] = useState([]);
  const [orientationRover, setOrientationRover] = useState(0);
  const [color, setColor] = useState("white");
  const [initialRover, setInitialRover] = useState(initRover);

  const changeOrientation = orientation => {
    const orientationMap = {
      d: 90,
      g: -90,
      a: 0,
      r: 0
    };

    setOrientationRover(orientationRover + orientationMap[orientation]);
  };

  const validateCommand = () => {
    let commandSplitted = command.split("");
    setCommands(commandSplitted);
    multipleProceedInput();
  };

  const handleClick = () => {
    setColor(Konva.Util.getRandomColor());
  };

  function createRover(position, orientation) {
    return { orientation, position };
  }

  const multipleProceedInput = () => {
    commands.forEach((input, index) => {
      setInitialRover(proceedInput(initialRover, input));
    });
  };

  function proceedInput(rover, command) {
    let input = {
      a: updatePositionRover(rover, "a"),
      r: updatePositionRover(rover, "r"),
      g: updateOrientationRover(rover, "g"),
      d: updateOrientationRover(rover, "d")
    };
    return input[command];
  }

  const isInCollision = () => {
    return obstacles.filter(obstacle => {
      return obstacle.position === initialRover.position;
    });
  };

  function move(coord, orientation, mapSize, orientationMap) {
    let collision = isInCollision();
    if (collision.length > 0) {
      alert("Obstacle !");
    }
    return (coord + orientationMap[orientation] + mapSize) % mapSize;
  }

  function updatePositionRover(rover, command) {
    const mapDeMaps = {
      a: { x: { E: 1, O: -1, N: 0, S: 0 }, y: { E: 0, O: 0, N: 1, S: -1 } },
      r: { x: { E: -1, O: 1, N: 0, S: 0 }, y: { E: 0, O: 0, N: -1, S: 1 } }
    };

    const position = {
      x: move(rover.position.x, rover.orientation, 50, mapDeMaps[command].x),
      y: move(rover.position.y, rover.orientation, 50, mapDeMaps[command].y)
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
    changeOrientation(command);
    return { ...rover, orientation: updatedOrientation };
  }

  const handleChange = e => {
    setCommand(e);
  };

  return (
    <>
      <AppBar style={{ display: "flex", backgroundColor: "beige" }}>
        <TextField
          variant="outlined"
          style={{ width: "200px", height: "40px", margin: "10px auto" }}
          value={command}
          onChange={e => handleChange(e.target.value)}></TextField>
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
            fill={color}
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
