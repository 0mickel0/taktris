import React from 'react'

interface IProps {
  score: number
  onReset: () => void
}

export const Score: React.FC<IProps> = (props) => {
  return (
    <React.Fragment>
      <h1>{props.score}</h1>
      <h1 onClick={props.onReset}>New Game</h1>
    </React.Fragment>
  )
}
