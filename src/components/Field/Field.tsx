import React from 'react'

import {
  Element,
  Button,
  FieldBorder,
  FieldContainer,
  FigureContainer,
  FigureElement,
  GameContainer,
  GameOverContainer,
  NextFigures,
  Preview,
  PreviewElement,
  Row,
  Controls,
  Wrapper,
  Title,
} from './styles'
import {
  EMPTY_FIELD,
  FIELD_EMPTY_VALUE,
  FIELD_FILLED_VALUE,
  FIELD_HOVERED_VALUE,
  FIELD_SIZE,
  INDEX_DIVIDER,
  NEW_ELEMENTS_AMOUNT,
  NEXT_ELEMENTS_ARR,
  SQUARES_COUNT,
} from './constants'
import useLocalStorage from '../../data/hooks/useLocalStorage'
import { generateSquaresField } from '../../data/services'
import { Score } from './components/Score'

export const Field: React.FC = () => {
  const deepClone = (arr: number[][]): number[][] => JSON.parse(JSON.stringify(arr))
  const randomNextFigures = NEXT_ELEMENTS_ARR.sort(() => 0.5 - Math.random()).slice(
    0,
    NEW_ELEMENTS_AMOUNT,
  )
  const SQUARES_FIELD = generateSquaresField()
  const [score, setScore] = useLocalStorage('gameScore', 0)
  const [bestScore, setBestScore] = useLocalStorage('gameBestScore', 0)
  const [field, setField] = useLocalStorage<number[][]>('gameField', EMPTY_FIELD)
  const [isGameEnd, setIsGameEnd] = useLocalStorage('gameIsEnd', false)
  const [nextFigures, setNextFigures] = useLocalStorage<number[][][]>(
    'gameNextFigures',
    randomNextFigures,
  )
  const [activeNextFigureIndex, setActiveNextFigureIndex] = useLocalStorage(
    'gameActiveNextFigureIndex',
    0,
  )
  const [usedFigures, setUsedFigures] = useLocalStorage<number[]>('gameUsedFigures', [])

  const [isPreviewShown, setPreviewShown] = React.useState(true)
  const [supposedField, setSupposedField] = React.useState<number[][]>(deepClone(EMPTY_FIELD))
  const [x, setX] = React.useState(0)
  const [y, setY] = React.useState(0)
  const currentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setIsGameEnd(checkIsGameEnd())
    if (usedFigures.length === NEW_ELEMENTS_AMOUNT) {
      initNewNextFigures()
    } else {
      setActiveNextFigureIndex(getNextFigureIndex())
    }
  }, [usedFigures])

  React.useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
    }
  }, [score])

  const resetGame = (): void => {
    setScore(0)
    setField(deepClone(EMPTY_FIELD))
    initNewNextFigures()
    setIsGameEnd(false)
  }

  const getElementPoints = (figure: number[][]): number =>
    figure.flatMap((el) => el).filter((el) => el === FIELD_FILLED_VALUE).length

  const getNextFigureIndex = (): number => {
    for (let i = 0; i < NEW_ELEMENTS_AMOUNT; i++) {
      if (usedFigures.every((el) => el !== i)) {
        return i
      }
    }
    return 0
  }

  const checkIsGameEnd = (): boolean => {
    let isEnded = false
    for (let elN = 0; elN < nextFigures.length; elN++) {
      if (usedFigures.every((el) => el !== elN)) {
        const checkedElement = nextFigures[elN]
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

  const initNewNextFigures = (): void => {
    setNextFigures(randomNextFigures)
    setUsedFigures([])
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
    const nextElement = nextFigures[activeNextFigureIndex]
    const indexesForHover = findIndexesForHover(currI, currJ, nextElement)

    if (indexesForHover.length > 0) {
      const newSupposed = deepClone(field)
      indexesForHover.map((index) => {
        const [i, j] = index.split(INDEX_DIVIDER)
        newSupposed[Number(i)][Number(j)] = FIELD_HOVERED_VALUE
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

  const getClearableSquares = (arr: number[][]): number[] => {
    const elements = Array.from({ length: SQUARES_COUNT }, () => true)
    SQUARES_FIELD.map((row, squareIndex) => {
      let squareFilled = true
      row.map((index) => {
        const [i, j] = index.split(INDEX_DIVIDER)
        if (arr[Number(i)][Number(j)] === FIELD_EMPTY_VALUE) {
          squareFilled = false
        }
      })
      elements[squareIndex] = squareFilled
    })

    return elements.reduce<number[]>(function (acc, el, i) {
      if (el) acc.push(i)
      return acc
    }, [])
  }

  const handleItemClick = (): void => {
    if (supposedField.some((el) => el.some((el) => el === FIELD_HOVERED_VALUE))) {
      let newPoints = getElementPoints(nextFigures[activeNextFigureIndex])
      const newField = deepClone(field)
      for (let i = 0; i < FIELD_SIZE; i++) {
        for (let j = 0; j < FIELD_SIZE; j++) {
          if (supposedField[i][j] === FIELD_HOVERED_VALUE) {
            newField[i][j] = FIELD_FILLED_VALUE
          }
        }
      }

      const squares = getClearableSquares(newField)
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
      if (squares.length) {
        squares.map((square) => {
          SQUARES_FIELD[square].map((index) => {
            const [i, j] = index.split(INDEX_DIVIDER)
            newField[Number(i)][Number(j)] = FIELD_EMPTY_VALUE
          })
        })
      }
      newPoints += rows.length * FIELD_SIZE
      newPoints += cols.length * FIELD_SIZE
      newPoints += squares.length * FIELD_SIZE
      setScore(newPoints + score)
      setSupposedField(deepClone(newField))
      setUsedFigures([...usedFigures, activeNextFigureIndex])
      setField(newField)
    }
  }

  const handleMouseOut = (): void => {
    setSupposedField(deepClone(field))
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>): void => {
    setX(e.clientX)
    setY(e.clientY - (currentRef?.current?.clientHeight || 0))
  }

  const handleNextElementSelect = (index: number): void => {
    if (usedFigures.some((el) => el === index)) {
      return
    }
    setActiveNextFigureIndex(index)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>): void => {
    console.log(e.relatedTarget, currentRef)
    console.log(e.relatedTarget === currentRef.current)
  }

  return (
    <Wrapper onMouseMove={handleMouseMove}>
      {isGameEnd && (
        <GameOverContainer>
          <Title>Game over</Title>
          <Button onClick={resetGame}>Try again</Button>
        </GameOverContainer>
      )}
      <Score score={score} bestScore={bestScore} onReset={resetGame} />
      <GameContainer>
        <FieldContainer>
          <FieldBorder
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
          </FieldBorder>
        </FieldContainer>

        <Controls>
          <NextFigures>
            {nextFigures.map((figure, containerI) => (
              <FigureContainer
                key={`${containerI}nextFigureContainer`}
                onClick={() => handleNextElementSelect(containerI)}
                isDisabled={usedFigures.some((el) => el === containerI)}
              >
                {figure.map((row, figureI) => (
                  <Row key={`${figureI}row`}>
                    {row.map((el, j) => (
                      <FigureElement
                        key={`${j}element`}
                        isFilled={!!el}
                        isActive={activeNextFigureIndex === containerI}
                        isDisabled={usedFigures.some((el) => el === containerI)}
                      />
                    ))}
                  </Row>
                ))}
              </FigureContainer>
            ))}
          </NextFigures>
        </Controls>
      </GameContainer>

      {nextFigures[activeNextFigureIndex] && (
        <Preview ref={currentRef} isHidden={!isPreviewShown} style={{ top: y - 3, left: x + 3 }}>
          {nextFigures[activeNextFigureIndex].map((row, i) => (
            <Row key={`${i}row`}>
              {row.map((el, j) => (
                <PreviewElement key={`${j}element`} isFilled={!!el} />
              ))}
            </Row>
          ))}
        </Preview>
      )}
    </Wrapper>
  )
}
