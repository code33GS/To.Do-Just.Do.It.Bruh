import { useState, useEffect } from 'react'
import './App.css'
import Navbar from "./components/Navbar.jsx"
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [demTodos, setDemTodos] = useState("")
  const [allOfDemTodos, setAllOfDemTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("allOfDemTodos")
    if (todoString) {
      let allOfDemTodos = JSON.parse(localStorage.getItem("allOfDemTodos"))
      setAllOfDemTodos(allOfDemTodos)
    }
  }, [])


  const saveEmTodosToLS = (params) => {
    localStorage.setItem("allOfDemTodos", JSON.stringify(allOfDemTodos))
  }
  
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  const handleAddToDo = () => {
    setAllOfDemTodos([...allOfDemTodos, { id: uuidv4(), demTodos, isCompleted: false }])
    setDemTodos("")
    document.querySelector('.tdm-at-symb').innerHTML = "+"
    document.querySelector('.tdm-at-symb').style.fontSize = "3vw"
    saveEmTodosToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = allOfDemTodos.findIndex(item => {
      return item.id === id;
    })
    let newallOFDemTodos = [...allOfDemTodos];
    newallOFDemTodos[index].isCompleted = !newallOFDemTodos[index].isCompleted;
    setAllOfDemTodos(newallOFDemTodos)
    saveEmTodosToLS()
  }

  const handleEdit = (e, id) => {
    let t = allOfDemTodos.filter(i => i.id === id)
    setDemTodos(t[0].demTodos)
    let newallOFDemTodos = allOfDemTodos.filter(item => {
      return item.id !== id
    });
    setAllOfDemTodos(newallOFDemTodos)
    document.querySelector('.tdm-at-area').focus()
    document.querySelector('.tdm-at-symb').innerHTML = "✎"
    document.querySelector('.tdm-at-symb').style.fontSize = "2vw"
    saveEmTodosToLS()
  }

  const handleDelete = (e, id) => {
    let newallOFDemTodos = allOfDemTodos.filter(item => {
      return item.id !== id
    });
    setAllOfDemTodos(newallOFDemTodos)
    saveEmTodosToLS()
  }

  const handleChange = (e) => {
    setDemTodos(e.target.value)
  }

  return (
    <>
      <Navbar />
      <div className="todo-main flex">
        <img src="https://usclubsoccer.org/wp-content/uploads/2021/05/nike.png" alt="logo" className="tdm-swoosh" />
        <div className="td-main">
          <div className="add-todo flex">
            <button className="tdm-at-symb" onClick={() => { document.querySelector('.tdm-at-area').focus() }}>+</button>
            <textarea onChange={handleChange} value={demTodos} name="text" className='tdm-at-area pointer' cols="30" rows="10" placeholder='Add  a  ToDo'></textarea>
            <button onClick={handleAddToDo} disabled={demTodos.length<=1} className="tdm-at-symb"><img src="https://usclubsoccer.org/wp-content/uploads/2021/05/nike.png" alt="done" /></button>
          </div>
          <div className="tdm-yo-todos flex">
            <div className="tdm-yotd-txt">Y·  O·  U·  R &nbsp; · &nbsp; &nbsp; T·  O·  D·  O·  S</div>
            <div className="tdm-yotd-main flex">
              {allOfDemTodos.length === 0 && <div style={{ color: "#00000069" }} className="tdm-yotd-txt">Y O U R ·&nbsp; T O D O ·&nbsp; L I S T ·&nbsp; I S ·&nbsp; E M P T Y</div>}
              {allOfDemTodos.map(indivTodos => {
                return <div key={indivTodos.id} className="tdm-ytdm flex">
                  <div className={indivTodos.isCompleted ? "tdm-ytdm-todotxt-fade" : "tdm-ytdm-todotxt"}>
                    <input name={indivTodos.id} onChange={handleCheckbox} class="tdm-ytdm-chkbx" type="checkbox" value="demTodos.isCompleted"></input>
                    <div className='wtf-isda-todo'>{indivTodos.demTodos}</div>
                  </div>
                  <button onClick={(e) => { handleEdit(e, indivTodos.id) }} className="tdm-ytdm-symb pointer">EDIT</button>
                  <button onClick={(e) => { handleDelete(e, indivTodos.id) }} className="tdm-ytdm-symb pointer">DELETE</button>
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
