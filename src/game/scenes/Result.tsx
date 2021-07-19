import React from 'react'

type Props = {
  score: number
  onClickRetry: () => void
}

export const Result: React.FC<Props> = ({ score, onClickRetry }) => {
  return (
    <>
      <p className="result__title">Game Over</p>
      <p className="result__point">{score} pt</p>
      <button className="result__button" onClick={onClickRetry}>
        RETRY
      </button>
    </>
  )
}
