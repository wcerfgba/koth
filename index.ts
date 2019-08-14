export default {
  Store: {
    new: <T>(value?: T): Store<T> => ({ value }),
    get: <T>(s: Store<T>): T => s.value,
    set: <T>(s: Store<T>) => (value?: T): T => s.value = value,
    map: <T>(s: Store<T>) => (f: (value: T) => T): T => Store.set(f(Store.get(s))),
  },
  GameClient: {
    boot: (): void => {
      const s = Store.new(State.new())
    },
    State: {
      new: (): GameClient.State => ({}),
    },
    mountDOM: (store: Store<GameClient.State>) => (s: GameClient.State): GameClient.State => {
      startBtn.addEventListener('click', () => Store.map(store)(onDOMStartGame))
    },
    onDOMStartGame: (s: GameClient.State): GameClient.State => null,
    onNetworkReceiveGameState: (gcs: GameClient.State) => (gs: GameState): GameClient.State => null,
  }
}























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