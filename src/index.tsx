import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeProvider } from 'styled-components'
import { THEME } from './theme'
import { Field } from './components/Field'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <ThemeProvider theme={THEME}>
      <Field />
    </ThemeProvider>
  </React.StrictMode>,
)
