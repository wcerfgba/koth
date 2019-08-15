import { _if } from './Utils'

export interface Game {
  grid: Grid,
  players: Array<Player>,
  tick: number,
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
  previousOwner: Player,
  owner: Player,
  value: number,
}

export interface Player {
  id: PlayerId,
  name: string,
  colour: string,
  location: Location,
  ticksInLocation: number,
}

export type PlayerId = string

export type Location = WallLocation | CornerLocation
export type WallLocation = [LayerIndex, WallIndex, CellIndex]
export type CornerLocation = [LayerIndex, CornerIndex]
export type LayerIndex = number
export enum WallIndex { n = 'n', e = 'e', s = 's', w = 'w' }
export type CellIndex = number
export enum CornerIndex { ne = 'ne', se = 'se', sw = 'sw', nw = 'nw' }

const isWallLocation = (location: Location): location is WallLocation => location.length === 3

export type Update = AddPlayerUpdate | SetCellUpdate | RemovePlayerUpdate

interface BaseUpdate {
  tick: number,
  type: UpdateType,
}

enum UpdateType {
  AddPlayerUpdate,
  SetCellUpdate,
  RemovePlayerUpdate,
}

export interface AddPlayerUpdate extends BaseUpdate {
  type: UpdateType.AddPlayerUpdate,
  id: PlayerId,
  name: string,
  colour: string,
}

export interface SetCellUpdate extends BaseUpdate {
  type: UpdateType.SetCellUpdate,
  location: Location,
  owner: PlayerId,
  value: number,
}

export interface RemovePlayerUpdate extends BaseUpdate {
  type: UpdateType.RemovePlayerUpdate,
  id: PlayerId,
}

export const create = (): Game => ({
  grid: [
    {
      n: [],
      e: [],
      s: [],
      w: [],
      ne: { previousOwner: null, owner: null, value: 0 },
      se: { previousOwner: null, owner: null, value: 0 },
      sw: { previousOwner: null, owner: null, value: 0 },
      nw: { previousOwner: null, owner: null, value: 0 },
    }
  ],
  players: [],
  tick: 0,
})

const generateActivePlayerUpdates = (game: Game): Array<SetCellUpdate> =>
  game.players
    .filter(player => player.ticksInLocation > 0)
    .map(player => ({
      tick: game.tick + 1,
      type: UpdateType.SetCellUpdate,
      location: player.location,
      owner: tickCell(game)(player.location).owner.id,
      value: tickCell(game)(player.location).value,
    }))

const tickCell = (game: Game) => (location: Location): Cell => ({})

const cell = (grid: Grid) => (location: Location): Cell =>
  _if(isWallLocation(location))
    (grid[location[0]][location[1]][location[2]])
    (grid[location[0]][location[1]])

const neighbours = (location: Location): [Location, Location, Location, Location] => []