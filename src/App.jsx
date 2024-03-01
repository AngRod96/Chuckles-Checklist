import { useEffect, useState } from "react"
import { newJokePosted, getAllJokes, editJoke, deleteJoke } from "./services/jokeService"
import "./App.css"
import stevePic from "./assets/steve.png"

export const App = () => {
  const [newUsersInput, setNewUsersInput] = useState("")
  const [showNewUserJoke, setNewUserJoke] = useState(false)
  const [allJokes, setAllJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])


  useEffect(() => {
    refreshFunction()
  }, [])

  const refreshFunction = async () => {
    getAllJokes().then((jokesArray) => {
     setAllJokes(jokesArray)
  })}

    useEffect(() => {
      const allTheJokesTold = allJokes.filter(joke => joke.told === true)
      setToldJokes(allTheJokesTold)
      const allUntoldJokes = allJokes.filter(joke => joke.told === false)
      setUntoldJokes(allUntoldJokes)
    }, [allJokes])


    return (
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <div className="app-heading-text">
          <h1>Chuckle Checklist</h1>
        </div>
        <h2>Add Joke</h2>

        <input
          className="joke-add-form" type="text" id="users-input" placeholder="New One Liner" value={newUsersInput} onChange={(event) => {
            setNewUsersInput(event.target.value)
          }}
        />
        <div>
          <button className="joke-input-submit:hover"
            onClick={() => {
              newJokePosted(newUsersInput)
              setNewUsersInput("")
              refreshFunction()
            }}
          >Add</button>
        </div>

        <div className="joke-lists-container">
          <div className="joke-list-container">
            <div className="joke-list-container-heading">
              <h2 className="joke-label">Untold 😐</h2>
              {untoldJokes.map(joke => {
                return <li className="joke-list-item" >
                  <p className="joke-list-item-text">{joke.text}</p>
                  <div className="joke-btns">
                  <button 
                  onClick={ async () => {
                    editJoke(joke)
                    await refreshFunction() 
                  }}> 😐 </button>
                  <button onClick={() => {
                    deleteJoke(joke)
                    refreshFunction()
                  }}> 🗑️ </button>

                  </div>
                </li>
              })}
            </div>
          </div>




          <div className="joke-list-container">
            <div className="joke-list-container-heading">
              <h2 className="joke-label">Told 😃<span className="told-count"></span></h2>
              {toldJokes.map(joke => {
                return <li className="joke-list-item">
                  <p className="joke-list-item-text">{joke.text}</p>
                  <div className="joke-btns">
                  <button className=""
                  onClick={ async () => {
                    editJoke(joke)
                    await refreshFunction()
                  }}> 😃 </button>
                  <button onClick={() => {
                    deleteJoke(joke)
                    refreshFunction()
                  }}> 🗑️ </button>
                  </div>
                </li>
              })}
            </div>
          </div>
        </div>
      </div>
    
  )
            
}
