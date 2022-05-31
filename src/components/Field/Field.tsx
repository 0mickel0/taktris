import React from 'react'

import { Row, FieldContainer, Element, NextElement } from './styles'
import { NEXTELEMENT, INDEX_DIVIDER, FIELD_SIZE } from './constants'

export const Field = (): React.ReactElement => {
  const deepClone = (arr: number[][]): number[][] => JSON.parse(JSON.stringify(arr))
  const initField = Array.from({ length: FIELD_SIZE }, () =>
    Array.from({ length: FIELD_SIZE }, () => 0),
  )

  const [field, setField] = React.useState<number[][]>(deepClone(initField))
  const [supposedField, setSupposedField] = React.useState<number[][]>(deepClone(initField))

  const checkIsAvailable = (currI: number, currJ: number): void => {
    const nextHeight = NEXTELEMENT.length
    const nextWidth = NEXTELEMENT[0].length
    // console.log(`____________${currI}${currJ}____________`)
    let breakCheck = false
    let indexesForHover = []

    if (currI - nextHeight + 1 < 0 || currJ + nextWidth > FIELD_SIZE) {
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
            indexesForHover.push(`${currI - (nextHeight - 1) + i}${INDEX_DIVIDER}${currJ + j}`)
          }
        }
      }
      if (breakCheck) break
    }

    if (indexesForHover.length > 0) {
      const newSupposed = deepClone(field)
      indexesForHover.map((index) => {
        const [i, j] = index.split(INDEX_DIVIDER)
        newSupposed[Number(i)][Number(j)] = 2
      })
      setSupposedField(deepClone(newSupposed))
    } else {
      setSupposedField(deepClone(field))
    }
  }

  const getClearableRows = (arr: number[][]): number[] => {
    const rows = []
    for (let i = 0; i < FIELD_SIZE; i++) {
      if (arr[i].every((el) => el === 1)) {
        rows.push(i)
      }
    }
    return rows
  }

  const handleItemClick = (): void => {
    const newField = deepClone(field)
    for (let i = 0; i < FIELD_SIZE; i++) {
      for (let j = 0; j < FIELD_SIZE; j++) {
        if (supposedField[i][j] === 2) {
          newField[i][j] = 1
        }
      }
    }

    const rows = getClearableRows(newField)
    const cols = getClearableRows(
      newField[0].map((val, index) => newField.map((row) => row[index]).reverse()),
    )
    for (let i = 0; i < FIELD_SIZE; i++) {
      if (rows.length && rows.some((row) => row === i)) {
        newField[i] = Array.from({ length: FIELD_SIZE }, () => 0)
      }
    }
    console.log(rows, cols)

    setField(newField)
  }

  const handleMouseOut = (): void => {
    setSupposedField(deepClone(field))
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
                  onClick={handleItemClick}
                >
                  {i}
                  {j}
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
