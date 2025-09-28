import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HeroApp } from './HeroApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroApp />
  </StrictMode>,
)
