import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';

import { Pokemons, Pokemon, Items } from './pages';

import PokemonNotfound from './components/PokemonNotfound';

function App() {

  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Pokemons />} />
          <Route path='/pokemons' element={<Pokemons />} />
          <Route path='/pokemons/:name' element={<Pokemon />} />
          <Route path='/items' element={<Items />} />
          <Route path='*' element={<PokemonNotfound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
