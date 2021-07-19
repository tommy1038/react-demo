import React, { useEffect, useState } from 'react'

import { stageRect } from '../../constants'

type Props = {
  onCountOvered: () => void
}

export const CountDown: React.FC<Props> = ({ onCountOvered }) => {
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count === 0) {
      onCountOvered()
    }
  }, [count, onCountOvered])

  useEffect(() => {
    let timerID: number
    const step = () => {
      setCount((current: number) => current - 1)
      timerID = window.setTimeout(step, 1000)
    }
    timerID = window.setTimeout(step, 1000)
    return () => {
      clearTimeout(timerID)
    }
  }, [onCountOvered])

  if (count === 0) {
    return null
  }

  return (
    <p
      className="count"
      style={{ width: stageRect.width, height: stageRect.height }}
    >
      {count}
    </p>
  )
}
