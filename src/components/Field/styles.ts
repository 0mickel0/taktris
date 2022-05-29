import styled from 'styled-components'

interface IElementStyleProps {
  isAvailable: boolean
  isFilled: boolean
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

export const NextElement = styled.div<Omit<IElementStyleProps, 'isAvailable'>>`
  display: block;
  width: 40px;
  height: 40px;
  text-align: center;
  background-color: ${({ isFilled }) => (isFilled ? '#738bbb' : '#fbfdff')};
`

export const FieldContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Row = styled.div`
  display: flex;
`
