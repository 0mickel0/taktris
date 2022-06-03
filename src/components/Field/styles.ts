import styled from 'styled-components'

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

export const Element = styled.div<IElementStyleProps>`
  display: block;
  width: 40px;
  height: 40px;
  border: 2px solid #0c0d13;
  text-align: center;
  background-color: ${({ isFilled, isAvailable }) =>
    isFilled ? '#738bbb' : isAvailable ? '#ff79ad' : '#fbfdff'};
`

export const NextElement = styled.div<IElementStyleProps>`
  display: block;
  width: 40px;
  height: 40px;
  text-align: center;
  background-color: ${({ isFilled, isActive }) =>
    isActive && isFilled ? 'red' : isFilled ? '#738bbb' : '#fbfdff00'};
`

export const GameContainer = styled.div`
  padding: 20px;
`

export const FieldContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Row = styled.div`
  display: flex;
`

export const Preview = styled.div<IPreview>`
  position: absolute;
  top: ${({ top }) => `${top - 3}px`};
  left: ${({ left }) => `${left + 3}px`};
  opacity: ${({ isHidden }) => (isHidden ? '0' : '0.8')};
`

export const NextElements = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`

export const NextElementContainer = styled.div`
  display: block;
  margin: 0 20px;
  cursor: pointer;
`
