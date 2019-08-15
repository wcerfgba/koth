export interface Game {
  grid: Grid,
  players: Map<PlayerId, Player>,
}

// We build the Grid like an onion, so we can add extra Layers of Cells
// around the edge.
export type Grid = Array<Layer>

// To simplify relative positioning and finding neighbours of a Cell, we 
// build the Layers around compass points.
//
// Layer 1
//
// (nw)(ne)
// (sw)(se)
//
// Layer 2
//
// (nw)(n)(n)(ne)
// (w)  .  .  (e)
// (w)  .  .  (e)
// (sw)(s)(s)(se)
//
export interface Layer {
  n: Wall,
  e: Wall,
  s: Wall,
  w: Wall,
  ne: Cell,
  se: Cell,
  sw: Cell,
  nw: Cell,
}

export type Wall = Array<Cell>

export interface Cell {
  player: Player,
  value: Number,
}

export interface Player {
  id: PlayerId,
  name: string,
  colour: string,
  location: Location,
}

export type PlayerId = string

export type Location = WallLocation | CornerLocation
export type WallLocation = [LayerIndex, WallIndex, CellIndex]
export type CornerLocation = [LayerIndex, CornerIndex]
export type LayerIndex = Number
export type WallIndex = 'n' | 'e' | 's' | 'w'
export type CellIndex = Number
export type CornerIndex = 'ne' | 'se' | 'sw' | 'nw'

export interface Update {

}

export const create = (): Game => ({})

export const update = (updates: Array<Update>): Game => ({})



const addPlayer = (g: Game): Game => {
  
}