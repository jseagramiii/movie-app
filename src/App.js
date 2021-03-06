import React, { useState } from 'react'
import './App.css'
import Particles from 'react-particles-js'
import axios from 'axios'
import SearchBox from './SearchBox'
import Details from './Details'
import MovieCard from './MovieCard'

function App() {
  const [movies, setMovies] = useState([])
  const apiKey = '2d3d8ff5'
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState(false)
  const [show, setShow] = useState(false)

  // axios request movies in OMDB database
  const searchMovies = async (text) => {
    setLoading(true)

    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${text}`
      )
      setMovies(res.data.Search)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const particlesOptions = {
    particles: { number: { value: 100 }, size: { value: 0.3 } },
  }

  if (movies === undefined) {
    return (
      <h1 style={{ color: 'white' }}>
        something went wrong... refresh the page and try entering more letters
        in the search
      </h1>
    )
  }

  return (
    <div className='app'>
      <Particles params={particlesOptions} className='particles' />
      <h1 className='header'>OMDB Movies and Videogames</h1>
      <SearchBox searchMovies={searchMovies} loading={loading} />
      <div className='grid'>
        {movies.map((movie, index) => (
          <MovieCard
            apiKey={apiKey}
            movie={movie}
            key={index}
            show={show}
            setShow={setShow}
            setDetails={setDetails}
            loading={loading}
            setLoading={setLoading}
          />
        ))}
      </div>
      {show ? (
        <Details details={details} setShow={setShow} show={show} />
      ) : null}
    </div>
  )
}

export default App
