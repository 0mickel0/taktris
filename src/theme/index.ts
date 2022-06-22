interface IColors {
  bgGameOver: string
  border: string
  element: string
  elementAvailable: string
  elementBorder: string
  elementDisabled: string
  elementHover: string
  elementSecond: string
  font: string
  shadow: string
  transparent: string
}

export interface ITheme {
  colors: IColors
}

export const THEME: ITheme = {
  colors: {
    bgGameOver: '#CECECED4',
    border: '#BBADA0',
    element: '#F59563',
    elementAvailable: '#EDE0C8',
    elementBorder: '#ED8E5D',
    elementDisabled: '#8590a4d4',
    elementHover: '#EDE0C8',
    elementSecond: '#F2B179',
    font: '#776E65',
    shadow: '#48484832',
    transparent: '#00000000',
  },
}
