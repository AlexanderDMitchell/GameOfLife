import './App.css'

import { Grid } from './components/Grid/Grid'
import { Navbar } from './components/Navbar/Navbar'

export function App() {
  return (
    <div className={'App'}>
      <Navbar />
      <Grid />
    </div>
  )
}
