import React from 'react'
import './App.css'

import { Field } from './components/Field'
import { ThemeProvider } from 'styled-components'
import { THEME } from './theme'

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <div className='App'>
        <Field />
      </div>
    </ThemeProvider>
  )
}

export default App
