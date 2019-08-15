import { test } from './Testing'

import * as Game from './Game'

test('tickCell', () => {
  const setupGame = () => {
    let game = Game.create()
    game = Game.applyUpdate(game)({
      tick: 0,
      type: Game.UpdateType.AddPlayerUpdate
    })

    // TODO: mock three people on the cell with two charged neighbours, all different feedIn
  }

  test('uncharged and unowned', () => {
    let game = setupGame()

    game = Game.applyUpdate(game)({
      tick: 0,
      type: Game.UpdateType.SetCell,
      location: [0, Game.CornerIndex.nw],
      owner: null,
      value: 0,
    })

    assert.deepEqual(Game.tickCell(game)([0, Game.CornerIndex.nw], {
      previousOwner: null,
      owner: MostFeedIn,
      value: feedInDiff,
    })
  })
  
  test('uncharged and owned, owner has highest feed-in', () => {
    let game = setupGame()

    game = Game.applyUpdate(game)({
      tick: 0,
      type: Game.UpdateType.SetCell,
      location: [0, Game.CornerIndex.nw],
      owner: MostFeedIn,
      value: 0,
    })

    assert.deepEqual(Game.tickCell(game)([0, Game.CornerIndex.nw], {
      previousOwner: null,
      owner: MostFeedIn,
      value: feedInDiff,
    })
  })

  test('uncharged and owned, non-owner has highest feed-in', () => {
    let game = setupGame()

    game = Game.applyUpdate(game)({
      tick: 0,
      type: Game.UpdateType.SetCell,
      location: [0, Game.CornerIndex.nw],
      owner: NotEnough,
      value: 0,
    })

    assert.deepEqual(Game.tickCell(game)([0, Game.CornerIndex.nw], {
      previousOwner: null,
      owner: MostFeedIn,
      value: feedInDiff,
    })
  })
  
  test('charged and unowned, total feed-in below value', () => {
    let game = setupGame()

    game = Game.applyUpdate(game)({
      tick: 0,
      type: Game.UpdateType.SetCell,
      location: [0, Game.CornerIndex.nw],
      owner: null,
      value: 123,
    })

    assert.deepEqual(Game.tickCell(game)([0, Game.CornerIndex.nw], {
      previousOwner: null,
      owner: null,
      value: 123 - feedInTotal,
    })
  })

  test('charged and unowned, total feed-in above value', () => {
    let game = setupGame()

    game = Game.applyUpdate(game)({
      tick: 0,
      type: Game.UpdateType.SetCell,
      location: [0, Game.CornerIndex.nw],
      owner: null,
      value: 100,
    })

    assert.deepEqual(Game.tickCell(game)([0, Game.CornerIndex.nw], {
      previousOwner: null,
      owner: MostFeedIn,
      value: feedInDiff,
    })
  })
  
  test('charged and owned, owner feed-in exceeds non-owners', () => {
    let game = setupGame()

    game = Game.applyUpdate(game)({
      tick: 0,
      type: Game.UpdateType.SetCell,
      location: [0, Game.CornerIndex.nw],
      owner: LoadsaFeedIn,
      value: 101,
    })

    assert.deepEqual(Game.tickCell(game)([0, Game.CornerIndex.nw], {
      previousOwner: null,
      owner: LoadsaFeedIn,
      value: 101 + feedInDiff,
    })
  })

  test('charged and owned, total non-owner feed-in exceeds owner', () => {
    let game = setupGame()

    game = Game.applyUpdate(game)({
      tick: 0,
      type: Game.UpdateType.SetCell,
      location: [0, Game.CornerIndex.nw],
      owner: NotEnoughFeedIn,
      value: 101,
    })

    assert.deepEqual(Game.tickCell(game)([0, Game.CornerIndex.nw], {
      previousOwner: null,
      owner: NotEnoughFeedIn,
      value: 101 - feedInDiff,
    })
  })

  test('charged and owned, total non-owner feed-in exceeds owner and value, owner has highest feed-in', () => {
    let game = setupGame()

    game = Game.applyUpdate(game)({
      tick: 0,
      type: Game.UpdateType.SetCell,
      location: [0, Game.CornerIndex.nw],
      owner: MostFeedIn,
      value: 90,
    })

    assert.deepEqual(Game.tickCell(game)([0, Game.CornerIndex.nw], {
      previousOwner: null,
      owner: MostFeedIn,
      value: feedInDiff,
    })
  })

  test('charged and owned, total non-owner feed-in exceeds owner and value, non-owner has highest feed-in', () => {
    let game = setupGame()

    game = Game.applyUpdate(game)({
      tick: 0,
      type: Game.UpdateType.SetCell,
      location: [0, Game.CornerIndex.nw],
      owner: NotEnoughFeedIn,
      value: 90,
    })

    assert.deepEqual(Game.tickCell(game)([0, Game.CornerIndex.nw], {
      previousOwner: null,
      owner: MostFeedIn,
      value: feedInDiff,
    })
  })
})