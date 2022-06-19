import styled, { css } from 'styled-components'

interface IFigureStyleProps {
  isAvailable?: boolean
  isFilled: boolean
  isActive?: boolean
  isDisabled?: boolean
}

interface IPreview {
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
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #aea3a3c7;
  color: #776e65;
  font-size: 60px;
  font-weight: 700;
  animation: fade-in 800ms ease 1200ms;
`

export const Element = styled.div<IFigureStyleProps>`
  ${sharedElement};
  border: 1px solid #0c0d13;
  background-color: ${({ isFilled, isAvailable }) =>
    isFilled ? '#738bbb' : isAvailable ? '#ff79ad' : '#fbfdff'};
  box-shadow: ${({ isFilled, isAvailable }) => (isFilled || isAvailable) && 'none !important'};
`

export const PreviewElement = styled.div<IFigureStyleProps>`
  ${sharedElement};
  background-color: ${({ isFilled }) => (isFilled ? '#738bbb' : '#fbfdff00')};
`

export const FigureElement = styled.div<IFigureStyleProps>`
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

export const Row = styled.div`
  ${centeredFlex};
`

export const FieldContainer = styled.div<Partial<IFigureStyleProps>>`
  ${centeredFlex};

  & ${Row}:nth-child(6n),
  ${Row}:nth-child(6n-1),
  ${Row}:nth-child(6n-2) {
    & ${Element}:nth-child(6n),
    ${Element}:nth-child(6n-1),
    ${Element}:nth-child(6n-2) {
      box-shadow: ${({ isFilled, isAvailable }) =>
        isFilled || isAvailable ? 'none' : '0 0 40px 40px rgb(72 72 72 / 20%) inset'};
    }
  }
  & ${Row}:nth-child(6n-3),
  ${Row}:nth-child(6n-4),
  ${Row}:nth-child(6n-5) {
    & ${Element}:nth-child(6n-3),
    ${Element}:nth-child(6n-4),
    ${Element}:nth-child(6n-5) {
      box-shadow: ${({ isFilled, isAvailable }) =>
        isFilled || isAvailable ? 'none' : '0 0 40px 40px rgb(72 72 72 / 20%) inset'};
    }
  }
`

export const FieldBorder = styled.div`
  border: 1px solid #0c0d13;
`

export const Preview = styled.div<IPreview>`
  position: absolute;
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
