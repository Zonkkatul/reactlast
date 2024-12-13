import React, { useEffect, useState } from 'react';
import './App.css';
import robotImage from '../images/img.png';

function App() {
  const [movies, setMovies] = useState([])
  const [books, setBooks] = useState([])
  const [characters, setCharacters] = useState([])

  const [inputValue, setInputValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const headers = { Authorization: `Bearer ${import.meta.env.VITE_LOTR_API_TOKEN}` }

      try {
        const movieRes = await fetch('https://the-one-api.dev/v2/movie', { headers })
        const movieData = await movieRes.json()
        setMovies(movieData.docs)

        const bookRes = await fetch('https://the-one-api.dev/v2/book', { headers })
        const bookData = await bookRes.json()
        setBooks(bookData.docs)

        const charRes = await fetch('https://the-one-api.dev/v2/character', { headers })
        const charData = await charRes.json()
        setCharacters(charData.docs)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredMovies = movies.filter(movie =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSearch = () => {
    setSearchQuery(inputValue)
  }

  const hasAnyResults =
    filteredBooks.length > 0 || filteredMovies.length > 0 || filteredCharacters.length > 0

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-logo">Seker</div>
        <ul className="navbar-menu">
          <li>Home</li>
          <li>Services</li>
          <li>Contact</li>
          <li>About</li>
        </ul>
        <div className="navbar-icons">
        <img src="../images/mdi_github.png" alt="GitHub" className="icon" />
        <img src="../images/mdi_discord.png" alt="Discord" className="icon" />
         <img src="../images/mdi_reddit.png" alt="Reddit" className="icon" />
        </div>
      </nav>
      
      <div className="main-content">
        <div className="text-container">
          <h1>Ask me a question about {`{ ONE API TO RULE THEM ALL!! }`}</h1>
          <div className="search-row">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className="search-button" onClick={handleSearch}>Search</button>
          </div>
        </div>

        <div className="robot-container">
          <img 
            src={robotImage} 
            alt="Robot"
            className="robot-img"
          />
        </div>
      </div>

      {searchQuery && (
        <div className="items-container">
          {hasAnyResults ? (
            <>
              {filteredBooks.length > 0 && (
                <>
                  <h2>Books</h2>
                  {filteredBooks.map((book) => (
                    <div key={book._id} className="item-card">
                      <h3>{book.name}</h3>
                    </div>
                  ))}
                </>
              )}

              {filteredMovies.length > 0 && (
                <>
                  <h2>Movies</h2>
                  {filteredMovies.map((movie) => (
                    <div key={movie._id} className="item-card">
                      <h3>{movie.name}</h3>
                      <p>Runtime: {movie.runtimeInMinutes} min</p>
                      <p>Budget: {movie.budgetInMillions} million</p>
                      <p>Box Office: ${movie.boxOfficeRevenueInMillions} million</p>
                      <p>Awards: {movie.academyAwardWins} wins, {movie.academyAwardNominations} nominations</p>
                    </div>
                  ))}
                </>
              )}

              {filteredCharacters.length > 0 && (
                <>
                  <h2>Characters</h2>
                  {filteredCharacters.map((character) => (
                    <div key={character._id} className="item-card">
                      <h3>{character.name}</h3>
                      <p>Race: {character.race}</p>
                    </div>
                  ))}
                </>
              )}
            </>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default App;
