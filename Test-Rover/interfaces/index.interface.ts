// @ts-ignore
type Position = { x: number, y: number }

enum Orientation {'N', 'S', 'E', 'O'}

type Rover = { position: Position, orientation: Orientation }

type Command = string
