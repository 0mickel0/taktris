interface IColors {
  bgGameOver: string
  border: string
  borderSecond: string
  element: string
  elementAvailable: string
  elementBorder: string
  elementDisabled: string
  elementHover: string
  elementSecond: string
  font: string
  fontSecond: string
  shadow: string
  transparent: string
}

export interface ITheme {
  colors: IColors
}

export const THEME: ITheme = {
  colors: {
    bgGameOver: '#FFFFFF73',
    border: '#A68E77',
    borderSecond: '#857461',
    element: '#F59563',
    elementAvailable: '#EDE0C8',
    elementBorder: '#ED8E5D',
    elementDisabled: '#8590a4d4',
    elementHover: '#EDE0C8',
    elementSecond: '#F2B179',
    font: '#776E65',
    fontSecond: '#F9F6F2',
    shadow: '#48484832',
    transparent: '#00000000',
  },
}
