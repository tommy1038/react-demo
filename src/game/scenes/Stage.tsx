import React, { FC, useEffect, useState } from 'react'

import { bulletSize, characterSize } from '../../constants'
import {
  GameState,
  initialGameState,
  updateGameState,
} from '../state/gameState'

const MS_PER_FRAME = 15

type Props = {
  onGameOvered: (score: number) => void
}

export const Stage: FC<Props> = ({ onGameOvered }) => {
  const [gameOvered, setGameOvered] = useState(false)
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState<GameState>(initialGameState)
  const { frameTime, player, bullets, enemies } = gameState

  useEffect(() => {
    if (gameOvered) {
      onGameOvered(score)
    }
  }, [score, gameOvered, onGameOvered])

  useEffect(() => {
    let timerID: number

    function step() {
      setGameState((current) =>
        updateGameState(current, (finalScore) => {
          setScore(finalScore)
          setGameOvered(true)
        }),
      )
      timerID = window.setTimeout(step, MS_PER_FRAME)
    }

    step()

    return () => {
      clearTimeout(timerID)
    }
  }, [onGameOvered])

  if (gameOvered) {
    return null
  }

  return (
    <>
      <div
        className="player"
        style={{
          top: player.position.y,
          left: player.position.x,
          transform: `rotate(${player.angle}deg)`,
          width: characterSize,
          height: characterSize,
        }}
      />

      {bullets.map((bullet, i) => (
        <div
          key={i}
          className="bullet"
          style={{
            top: bullet.position.y,
            left: bullet.position.x,
            width: bulletSize,
            height: bulletSize,
          }}
        />
      ))}

      {enemies.map((enemy, i) => (
        <div
          key={i}
          className="enemy"
          style={{
            top: enemy.position.y,
            left: enemy.position.x,
            width: characterSize,
            height: characterSize,
          }}
        />
      ))}

      <p className="fps">{frameTime.fps} FPS</p>
    </>
  )
}
