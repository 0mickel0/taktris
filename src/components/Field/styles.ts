import styled, { css } from 'styled-components'

interface IElementStyleProps {
  isAvailable?: boolean
  isFilled: boolean
  isActive?: boolean
  isDisabled?: boolean
}

interface IPreview {
  top: number
  left: number
  isHidden: boolean
}

interface IFigureContainer {
  isDisabled?: boolean
}

const centeredFlex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

const sharedElement = css`
  display: block;
  width: 40px;
  height: 40px;
`

export const GameContainer = styled.div`
  padding: 20px;
`

export const GameOverContainer = styled.div`
  ${centeredFlex};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000000d9;
`

export const Element = styled.div<IElementStyleProps>`
  ${sharedElement};
  border: 2px solid #0c0d13;
  background-color: ${({ isFilled, isAvailable }) =>
    isFilled ? '#738bbb' : isAvailable ? '#ff79ad' : '#fbfdff'};
`

export const PreviewElement = styled.div<IElementStyleProps>`
  ${sharedElement};
  background-color: ${({ isFilled }) => (isFilled ? '#738bbb' : '#fbfdff00')};
`

export const FigureElement = styled.div<IElementStyleProps>`
  ${sharedElement};
  background-color: ${({ isFilled, isActive, isDisabled }) =>
    isDisabled && isFilled
      ? '#8590a4d4'
      : isActive && isFilled
      ? '#ff79ad'
      : isFilled
      ? '#738bbb'
      : '#fbfdff00'};
`

export const FieldContainer = styled.div`
  ${centeredFlex};
`

export const Row = styled.div`
  ${centeredFlex};
`

export const Preview = styled.div<IPreview>`
  position: absolute;
  top: ${({ top }) => `${top - 3}px`};
  left: ${({ left }) => `${left + 3}px`};
  opacity: ${({ isHidden }) => (isHidden ? '0' : '0.8')};
`

export const NextFigures = styled.div`
  ${centeredFlex};
  padding: 20px;
`

export const FigureContainer = styled.div<IFigureContainer>`
  display: block;
  margin: 0 20px;
  cursor: ${({ isDisabled }) => (isDisabled ? 'cursor' : 'pointer')};
`
const test = styled.div`
  background-image: linear-gradient(
    330deg,
    hsl(0deg 0% 0%) 0%,
    hsl(21deg 100% 9%) 7%,
    hsl(32deg 100% 13%) 13%,
    hsl(33deg 72% 19%) 20%,
    hsl(31deg 54% 27%) 27%,
    hsl(31deg 43% 35%) 33%,
    hsl(36deg 38% 34%) 40%,
    hsl(42deg 32% 34%) 47%,
    hsl(49deg 25% 34%) 53%,
    hsl(59deg 18% 34%) 60%,
    hsl(72deg 14% 36%) 67%,
    hsl(79deg 13% 33%) 73%,
    hsl(86deg 12% 29%) 80%,
    hsl(94deg 11% 25%) 87%,
    hsl(103deg 10% 22%) 93%,
    hsl(113deg 9% 18%) 100%
  );
`
