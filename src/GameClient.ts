import * as Store from './Store'

interface GameClientState {

}

export const boot = (): void => {
  const s = Store.create({})
  Store.map(s)(mountDOM(s))
}

const mountDOM = (store: Store.Store<GameClientState>) => (s: GameClientState): GameClientState => {
  startBtn.addEventListener('click', () => Store.map(store)(onDOMStartGame))
}

const onDOMStartGame = (s: GameClientState): GameClientState => null
const onNetworkReceiveGameState: (gcs: GameClientState) => (gs: GameState): GameClientState => null