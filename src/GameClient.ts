import * as Store from './Store'
import * as Game from './Game'
import { pipeline } from './Utils'

interface GameClientState {
  game: Game.Game
  dom: {
    startBtn: Element,
  },
  network: {
    peerConnection: RTCPeerConnection,
    dataChannel: RTCDataChannel,
  }
}

export const boot = (): void => {
  const s = Store.create<GameClientState>({
    game: Game.create(),
    dom: {
      startBtn: null,
    },
    network: {
      peerConnection: null,
      dataChannel: null,
    }
  })
  Store.map(s)(pipeline([
    mountDOM(s),
    connectNetwork(s),
  ]))
  
}

const mountDOM = (store: Store.Store<GameClientState>) => (s: GameClientState): GameClientState => {
  document.body.innerHTML = `
  <button id="start">Start</button>
  `

  const startBtn = document.querySelector('#start')

  startBtn.addEventListener('click', () => Store.map(store)(onDOMStartGame))

  return {
    ...s,
    dom: {
      startBtn
    }
  }
}

const connectNetwork = (store: Store.Store<GameClientState>) => (s: GameClientState): GameClientState => {
}

const onDOMStartGame = (s: GameClientState): GameClientState => {
  return {
    ...s
  }
}

const onNetworkReceiveGameState: (gcs: GameClientState) => (gs: GameState): GameClientState => null











// export default {
//   GameState: {
//     new: (gs?: GameState): GameState => null,
//     addPlayer: (gs: GameState): GameState => null,
//       expandGrid: (gs: GameState): GameState => null,
//     setPlayerLocation: (gs: GameState): GameState => null,
//     removePlayer: (gs: GameState): GameState => null,
//     tick: (gs: GameState): GameState => null, // XXXXXX
//   },
//   AbstractRender: {
//     render: (gs: GameState): AbstractRender => null,
//   },
//   WebGLRender: {
//     init: (opts: WebGLRender.Options): WebGLRender => null,
//     render: (wglr: WebGLRender) => (ar: AbstractRender) => null,
//   },
//   GameClient: {
//     boot: () => null,
//       initGameState: (): GameState => null,
//       initNetwork: (): GameClient.Network => null,
      
//       initDOM: (): GameClient.DOM => null,
//       bindDOMEvents: (gcdom: GameClient.DOM) => null,
//       initServer: (): GameClient.Server => null,
//       connectServer: (gcserv: GameClient.Server) => null,
//     updateDOM: () => null,
//     onDOMStartGame: () => null,
//     onServerConnected: () => null,
//     onServerGameState: () => null,
//     onServerGameStateUpdates: () => null,
//   },
//   GameStateServer: {
//     boot: () => null,
//       connectRedis: () => null,
//     tick: () => null,
//   },
//   GameClientServer: {
//     boot: () => null,
//       connectRedis: () => null,
//       bindListenEvents: () => null,
//       startListen: () => null,
//     tick: () => null,
//     onClientConnect: () => null,
//     onClientAddPlayer: () => null,

//   }

//   // TODO
//   // Architecture is not quite right yet. We now realise we need to store game state on the server entirely in Redis, 
//   // so we want a GameStateChange type to record a series of changes (eg incrementing/setting cells), which we can then 
//   // take a list of and either transform into a Redis transaction or apply to a GameState object.
//   // Client and Servers are not functional enough yet. boot() still seems OK, but we need to minimise globals and write 
//   // functionally...
// }