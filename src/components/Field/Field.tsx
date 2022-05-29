import React from 'react'

import { Row, FieldContainer, Element, NextElement } from './styles'

const FIELD = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 1, 0],
]

export const Field = (): React.ReactElement => {
  const [field, setField] = React.useState(FIELD)
  const [supposedField, setSupposedField] = React.useState(FIELD)
  // supposed position [2, 3]

  const NEXTELEMENT = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ]

  const checkIsAvailable = (currI: number, currJ: number): void => {
    const nextHeight = NEXTELEMENT.length
    const nextWidth = NEXTELEMENT[0].length
    console.log(`____________${currI}${currJ}____________`)

    const isNextSuiteToField = () => {
      let breakCheck = false
      let indexesForHover = []
      if (currI - nextHeight + 1 < 0 || currJ + nextWidth > field[0].length) {
        return
      }
      for (let i = 0; i < nextHeight; i++) {
        for (let j = 0; j < nextWidth; j++) {
          if (NEXTELEMENT[i][j] + field[currI - (nextHeight - 1) + i][currJ + j] > 1) {
            indexesForHover = []
            breakCheck = true
            break
          } else {
            if (NEXTELEMENT[i][j] === 1) {
              indexesForHover.push(`${currI - (nextHeight - 1) + i}${currJ + j}`)
            }
          }
        }
        if (breakCheck) break
      }
      if (indexesForHover.length > 0) {
        const newSupposed = [...supposedField]
        indexesForHover.map((index) => {
          const [i, j] = index.split('')
          newSupposed[Number(i)][Number(j)] = 2
        })
        setSupposedField([...newSupposed])
      } else {
        console.log('clear', field)
        setSupposedField([...field])
      }
    }

    isNextSuiteToField()
  }

  const handleItemClick = (i: number, j: number): void => {
    if (!FIELD[i][j]) {
      const test = [...field]
      test[i][j] = 1
      setField([...test])
    }
  }

  const handleMouseOut = (): void => {
    setSupposedField([...field])
  }

  return (
    <div>
      <FieldContainer>
        <div onMouseOut={handleMouseOut}>
          {field.map((row, i) => (
            <Row key={`${i}row`}>
              {row.map((el, j) => (
                <Element
                  key={`${j}element`}
                  isFilled={el === 1}
                  isAvailable={supposedField[i][j] === 2}
                  onMouseOver={() => checkIsAvailable(i, j)}
                  onClick={() => handleItemClick(i, j)}
                >
                  {el}
                </Element>
              ))}
            </Row>
          ))}
        </div>
      </FieldContainer>
      <div>
        {NEXTELEMENT.map((row, i) => (
          <Row key={`${i}row`}>
            {row.map((el, j) => (
              <NextElement key={`${j}element`} isFilled={!!el}>
                {i}
                {j}
              </NextElement>
            ))}
          </Row>
        ))}
      </div>
    </div>
  )
}
