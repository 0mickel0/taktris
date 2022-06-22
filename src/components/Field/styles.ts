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

export const Wrapper = styled.div`
  color: ${({ theme }) => theme.colors.font};
`

export const GameContainer = styled.div`
  padding: 20px;
  flex-direction: row;
`

export const GameOverContainer = styled.div`
  ${centeredFlex};
  flex-direction: column;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.bgGameOver};
  font-size: 60px;
  font-weight: 700;
  animation: fade-in 800ms ease 1200ms;
`

export const Element = styled.div<IFigureStyleProps>`
  ${sharedElement};
  border: 1px solid
    ${({ isFilled, theme }) => (isFilled ? theme.colors.elementBorder : theme.colors.border)};
  background-color: ${({ isFilled, isAvailable, theme }) =>
    isFilled
      ? theme.colors.element
      : isAvailable
      ? theme.colors.elementAvailable
      : theme.colors.transparent};
  box-shadow: ${({ isFilled, isAvailable }) => (isFilled || isAvailable) && 'none !important'};
`

export const PreviewElement = styled.div<IFigureStyleProps>`
  ${sharedElement};
  background-color: ${({ isFilled, theme }) =>
    isFilled ? theme.colors.elementSecond : theme.colors.transparent};
`

export const FigureElement = styled.div<IFigureStyleProps>`
  ${sharedElement};
  background-color: ${({ isFilled, isActive, isDisabled, theme }) =>
    isDisabled && isFilled
      ? theme.colors.shadow
      : isActive && isFilled
      ? theme.colors.element
      : isFilled
      ? theme.colors.elementHover
      : theme.colors.transparent};
`

export const Row = styled.div`
  ${centeredFlex};
`

export const Controls = styled.div`
  ${centeredFlex};
  flex-direction: column;
`

export const FieldContainer = styled.div<Partial<IFigureStyleProps>>`
  ${centeredFlex};

  & ${Element}:first-child {
    border-left: 4px ${({ theme }) => theme.colors.border} solid;
  }

  & ${Row}:first-child {
    border-top: 4px ${({ theme }) => theme.colors.border} solid;
  }

  & ${Row}:nth-child(6n),
  ${Row}:nth-child(6n-3) {
    border-bottom: 4px ${({ theme }) => theme.colors.border} solid;
  }

  & ${Element}:nth-child(6n),
  ${Element}:nth-child(6n-3) {
    border-right: 4px ${({ theme }) => theme.colors.border} solid;
  }

  & ${Row}:nth-child(6n),
  ${Row}:nth-child(6n-1),
  ${Row}:nth-child(6n-2) {
    & ${Element}:nth-child(6n),
    ${Element}:nth-child(6n-1),
    ${Element}:nth-child(6n-2) {
      box-shadow: ${({ isFilled, isAvailable, theme }) =>
        isFilled || isAvailable ? 'none' : `0 0 40px 40px ${theme.colors.shadow} inset`};
    }
  }

  & ${Row}:nth-child(6n-3),
  ${Row}:nth-child(6n-4),
  ${Row}:nth-child(6n-5) {
    & ${Element}:nth-child(6n-3),
    ${Element}:nth-child(6n-4),
    ${Element}:nth-child(6n-5) {
      box-shadow: ${({ isFilled, isAvailable, theme }) =>
        isFilled || isAvailable ? 'none' : `0 0 40px 40px ${theme.colors.shadow} inset`};
    }
  }
`

export const FieldBorder = styled.div`
  border: 4px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
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
