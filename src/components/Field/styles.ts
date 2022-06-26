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

export const Value = styled.a`
  color: ${({ theme }) => theme.colors.fontSecond};
  font-weight: 700;
  border-radius: 3px;
  cursor: default;
  height: 25px;
  text-align: center;
  position: relative;
  font-size: 25px;
  padding: 15px 25px 0 25px;
  background-color: ${({ theme }) => theme.colors.elementSecond};

  & span {
    position: absolute;
    width: 100%;
    top: 5px;
    left: 0;
    text-transform: uppercase;
    font-size: 10px;
    text-align: center;
  }
`

export const Button = styled.a`
  cursor: pointer;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  padding: 0 20px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.fontSecond};
  height: 40px;
  line-height: 42px;
  font-weight: 700;

  :hover {
    background-color: ${({ theme }) => theme.colors.borderSecond};
  }
`

export const Wrapper = styled.div`
  height: calc(100% - 40px);
  padding: 20px;
  color: ${({ theme }) => theme.colors.font};
`

export const GameContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

export const Title = styled.p`
  font-size: 45px;
  font-weight: 700;
`

export const Header = styled.div`
  ${centeredFlex};
  margin-bottom: 20px;

  & ${Value} {
    margin-right: 20px;
  }

  & ${Button} {
    margin-left: 30px;
  }
`

export const GameOverContainer = styled.div`
  ${centeredFlex};
  flex-direction: column;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.bgGameOver};
  animation: fade-in 800ms ease 1200ms;

  & ${Title} {
    margin-bottom: 30px;
  }
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

export const FigureContainer = styled.div<IFigureContainer>`
  display: block;
  margin: 0 20px;
  cursor: ${({ isDisabled }) => (isDisabled ? 'cursor' : 'pointer')};
`

export const NextFigures = styled.div`
  ${centeredFlex};
  padding: 20px;
  flex-direction: column;
  flex-wrap: wrap;
  & ${FigureContainer} {
    margin-bottom: 10px;
  }
  @media (min-width: 757px) {
    width: 250px;
    height: 400px;
  }
  @media (max-width: 757px) {
    flex-direction: row;
    & ${FigureContainer} {
      margin-bottom: 0;
    }
  }
`
