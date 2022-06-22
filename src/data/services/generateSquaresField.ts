import {
  FIELD_SIZE,
  FIELD_SQUARE_SIZE,
  INDEX_DIVIDER,
  SQUARES_COUNT,
} from '../../components/Field/constants'

export const generateSquaresField = (): string[][] => {
  const res = Array.from({ length: SQUARES_COUNT }, () => [] as string[])
  const squaresInRow = Math.sqrt(SQUARES_COUNT)
  for (let i = 0; i < FIELD_SIZE; i++) {
    const squaresRowNumber = Math.trunc(i / FIELD_SQUARE_SIZE)
    for (let j = 0; j < FIELD_SIZE; j++) {
      const squareNumberInRow = j >= FIELD_SQUARE_SIZE ? Math.trunc(j / FIELD_SQUARE_SIZE) : 0
      const arrOfSquaresInRow = Array.from({ length: squaresInRow }, () => 0)
      for (let sq = 0; sq < squaresInRow; sq++) {
        arrOfSquaresInRow[sq] = sq + squaresRowNumber * squaresInRow
      }
      res[arrOfSquaresInRow[squareNumberInRow]].push(`${i}${INDEX_DIVIDER}${j}`)
    }
  }
  return res
}
