import {
  FIELD_SIZE,
  FIELD_SQUARE_SIZE,
  INDEX_DIVIDER,
  SQUARES_COUNT,
} from '../../components/Field/constants'

export const generateSquaresField = (): string[][] => {
  const res = Array.from({ length: SQUARES_COUNT }, () => [] as string[])
  for (let i = 0; i < FIELD_SIZE; i++) {
    const squareNumberInRow = i >= FIELD_SQUARE_SIZE ? Math.trunc(i / FIELD_SQUARE_SIZE) : 0
    for (let j = 0; j < FIELD_SIZE; j++) {
      const squareNumberInCol = j >= FIELD_SQUARE_SIZE ? Math.trunc(j / FIELD_SQUARE_SIZE) : 0
      const currSquareNumber = squareNumberInRow * FIELD_SQUARE_SIZE + squareNumberInCol
      res[currSquareNumber].push(`${i}${INDEX_DIVIDER}${j}`)
    }
  }
  return res
}
