import React, { useEffect, useState } from 'react'
import PokemonThumb from './components/PokemonThumb'

const App = () => {

   const[allPokemons, setAllPokemons] = useState([])
   const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=10')

  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)
    console.log(data);

    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
        setAllPokemons( currentList => [...currentList, data])
        await allPokemons.sort((a, b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)
  }

 useEffect(() => {
  getAllPokemons()
 }, [])

  return (
    <div className="color-change-2x">
    <div className="app-container">
      <h1>Pokemon Evolutions</h1>
      <div className="pokemon-container">
        <div className="all-container">
        {allPokemons
          .sort((a, b) => a.id > b.id? 1 : -1)
          .map((pokemon, index) =>
            <PokemonThumb
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              key={index}
            />
          )}
        </div>
          <button className="load-more" onClick={() => getAllPokemons()}>Load More</button>
      </div>
    </div>
    <div className="footer">
      &copy; 2021 Oscar Jansson
    </div> 
    </div>
  );
}

export default App;