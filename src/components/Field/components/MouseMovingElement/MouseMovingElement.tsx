import React from 'react'

import { Preview, PreviewElement, Row } from '../../styles'

interface IProps {
  isHidden: boolean
  y: number
  x: number
  figure: number[][]
}

export const MouseMovingElement: React.FC<IProps> = (props) => {
  const currentRef = React.useRef<HTMLDivElement>(null)

  return (
    <Preview
      ref={currentRef}
      isHidden={props.isHidden}
      style={{ top: props.y - 3 - (currentRef?.current?.clientHeight || 0), left: props.x + 3 }}
    >
      {props.figure.map((row, i) => (
        <Row key={`${i}row`}>
          {row.map((el, j) => (
            <PreviewElement key={`${j}element`} isFilled={!!el} />
          ))}
        </Row>
      ))}
    </Preview>
  )
}
