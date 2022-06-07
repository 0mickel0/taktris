import React from 'react'

import {
  GameContainer,
  Row,
  FieldContainer,
  Element,
  NextElement,
  Preview,
  NextElements,
  NextElementContainer,
} from './styles'
import {
  NEXT_ELEMENTS_ARR,
  INDEX_DIVIDER,
  FIELD_SIZE,
  NEW_ELEMENTS_AMOUNT,
  FIELD_HOVERED_VALUE,
  FIELD_FILLED_VALUE,
  FIELD_EMPTY_VALUE,
} from './constants'

export const Field = (): React.ReactElement => {
  const deepClone = (arr: number[][]): number[][] => JSON.parse(JSON.stringify(arr))
  const initField = Array.from({ length: FIELD_SIZE }, () =>
    Array.from({ length: FIELD_SIZE }, () => FIELD_EMPTY_VALUE),
  )

  const [field, setField] = React.useState<number[][]>([])
  const [supposedField, setSupposedField] = React.useState<number[][]>(deepClone(initField))
  const [isPreviewShown, setPreviewShown] = React.useState(false)
  const [isGameEnd, setIsGameEnd] = React.useState(false)
  const [nextElements, setNextElements] = React.useState<number[][][]>([])
  const [activeNextElementIndex, setActiveNextElementIndex] = React.useState(0)
  const [usedElements, setUsedElements] = React.useState<number[]>([])
  const [x, setX] = React.useState(0)
  const [y, setY] = React.useState(0)
  const currentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    resetGame()
  }, [])

  React.useEffect(() => {
    setIsGameEnd(checkIsGameEnd())
    if (usedElements.length === NEW_ELEMENTS_AMOUNT) {
      initNewNextElements()
    } else {
      setActiveNextElementIndex(getNextElementIndex())
    }
  }, [usedElements])

  const resetGame = (): void => {
    setField(deepClone(initField))
    initNewNextElements()
  }

  const getNextElementIndex = (): number => {
    for (let i = 0; i < NEW_ELEMENTS_AMOUNT; i++) {
      if (usedElements.every((el) => el !== i)) {
        return i
      }
    }
    return 0
  }

  const checkIsGameEnd = (): boolean => {
    let isEnded = false
    for (let elN = 0; elN < nextElements.length; elN++) {
      if (usedElements.every((el) => el !== elN)) {
        const checkedElement = nextElements[elN]
        for (let i = 0; i < FIELD_SIZE; i++) {
          for (let j = 0; j < FIELD_SIZE; j++) {
            if (findIndexesForHover(i, j, checkedElement).length > 0) {
              isEnded = false
              return false
            } else {
              isEnded = true
            }
          }
        }
      }
    }
    return isEnded
  }

  const initNewNextElements = (): void => {
    const randomNextElements = NEXT_ELEMENTS_ARR.sort(() => 0.5 - Math.random()).slice(
      0,
      NEW_ELEMENTS_AMOUNT,
    )
    setNextElements(randomNextElements)
    setUsedElements([])
  }

  const findIndexesForHover = (currI: number, currJ: number, nextElement: number[][]): string[] => {
    const nextHeight = nextElement.length
    const nextWidth = nextElement[0].length
    let breakCheck = false
    let indexesForHover: string[] = []

    if (currI - nextHeight + 1 < 0 || currJ + nextWidth > FIELD_SIZE) {
      return indexesForHover
    }

    for (let i = 0; i < nextHeight; i++) {
      for (let j = 0; j < nextWidth; j++) {
        if (nextElement[i][j] + field[currI - (nextHeight - 1) + i][currJ + j] > 1) {
          indexesForHover = []
          breakCheck = true
          break
        } else {
          if (nextElement[i][j] === FIELD_FILLED_VALUE) {
            indexesForHover.push(`${currI - (nextHeight - 1) + i}${INDEX_DIVIDER}${currJ + j}`)
          }
        }
      }
      if (breakCheck) break
    }

    return indexesForHover
  }

  const checkIsAvailable = (currI: number, currJ: number): void => {
    const nextElement = nextElements[activeNextElementIndex]
    const indexesForHover = findIndexesForHover(currI, currJ, nextElement)

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
      if (arr[i].every((el) => el === FIELD_FILLED_VALUE)) {
        rows.push(i)
      }
    }
    return rows
  }

  const handleItemClick = (): void => {
    if (supposedField.some((el) => el.some((el) => el === FIELD_HOVERED_VALUE))) {
      const newField = deepClone(field)
      for (let i = 0; i < FIELD_SIZE; i++) {
        for (let j = 0; j < FIELD_SIZE; j++) {
          if (supposedField[i][j] === FIELD_HOVERED_VALUE) {
            newField[i][j] = FIELD_FILLED_VALUE
          }
        }
      }

      const rows = getClearableRows(newField)
      const cols = getClearableRows(
        newField[0].map((val, index) => newField.map((row) => row[index]).reverse()),
      )
      for (let i = 0; i < FIELD_SIZE; i++) {
        if (rows.length && rows.some((row) => row === i)) {
          newField[i] = Array.from({ length: FIELD_SIZE }, () => FIELD_EMPTY_VALUE)
        }
        if (cols.length) {
          for (let j = 0; j < FIELD_SIZE; j++) {
            if (cols.some((el) => el === j)) {
              newField[i][j] = FIELD_EMPTY_VALUE
            }
          }
        }
      }

      setSupposedField(deepClone(newField))
      setUsedElements([...usedElements, activeNextElementIndex])
      setField(newField)
    }
  }

  const handleMouseOut = (): void => {
    setSupposedField(deepClone(field))
  }

  const handleMouseMove = (e: any): void => {
    setX(e.clientX)
    setY(e.clientY - (currentRef?.current?.clientHeight || 0))
  }

  const handleNextElementSelect = (index: number): void => {
    if (usedElements.some((el) => el === index)) {
      return
    }
    setActiveNextElementIndex(index)
  }

  return (
    <GameContainer onMouseMove={handleMouseMove}>
      {isGameEnd && (
        <div>
          <h1>GAME OVER</h1> <span onClick={resetGame}>start new</span>
        </div>
      )}

      <FieldContainer>
        <div
          onMouseOut={handleMouseOut}
          onMouseLeave={() => setPreviewShown(false)}
          onMouseEnter={() => setPreviewShown(true)}
        >
          {field.map((row, i) => (
            <Row key={`${i}row`}>
              {row.map((el, j) => (
                <Element
                  key={`${j}element`}
                  isFilled={el === FIELD_FILLED_VALUE}
                  isAvailable={supposedField[i][j] === FIELD_HOVERED_VALUE}
                  onMouseOver={() => checkIsAvailable(i, j)}
                  onClick={handleItemClick}
                />
              ))}
            </Row>
          ))}
        </div>
      </FieldContainer>

      {nextElements[activeNextElementIndex] && (
        <Preview left={x} top={y} ref={currentRef} isHidden={!isPreviewShown}>
          {nextElements[activeNextElementIndex].map((row, i) => (
            <Row key={`${i}row`}>
              {row.map((el, j) => (
                <NextElement key={`${j}element`} isFilled={!!el} />
              ))}
            </Row>
          ))}
        </Preview>
      )}

      <NextElements>
        {nextElements.map((elementContainer, elementContainerIndex) => (
          <NextElementContainer
            key={`${elementContainerIndex}nextElementContainer`}
            onClick={() => handleNextElementSelect(elementContainerIndex)}
          >
            {elementContainer.map((row, elementI) => (
              <Row key={`${elementI}row`}>
                {row.map((el, j) => (
                  <NextElement
                    key={`${j}element`}
                    isFilled={!!el}
                    isActive={activeNextElementIndex === elementContainerIndex}
                    isDisabled={usedElements.some((el) => el === elementContainerIndex)}
                  />
                ))}
              </Row>
            ))}
          </NextElementContainer>
        ))}
      </NextElements>
    </GameContainer>
  )
}
