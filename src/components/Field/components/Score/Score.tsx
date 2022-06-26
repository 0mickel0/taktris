import React from 'react'

import { Button, Header, Value } from '../../styles'

interface IProps {
  score: number
  bestScore: number
  onReset: () => void
}

export const Score: React.FC<IProps> = (props) => {
  return (
    <Header>
      <Value>
        {props.score}
        <span>score</span>
      </Value>
      <Value>
        {props.bestScore}
        <span>best</span>
      </Value>
      <Button onClick={props.onReset}>New Game</Button>
    </Header>
  )
}
