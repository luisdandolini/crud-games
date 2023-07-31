import { useState, useEffect } from 'react'
import './App.css'
import Axios from "axios";
import Cards from './components/Cards';

function App() {
  const [values, setValues] = useState({});
  const [listGames, setListGames] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const handleChangeValues = (value) => {
    setValues(prevValue =>({
      ...prevValue,
      [value.target.name]: value.target.value,
    }))
  }

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category
    }).then((response) => {
      console.log(response)
    })
  }

  const handleEdit = (id) => {
    console.log("ID passed to handleEdit: ", id);
    const item = listGames.find(item => item.idgames === id);
    console.log("Item found: ", item);
    setEditMode(true);
    setCurrentItem(item);
  }
  
  const handleChangeEditValues = (e) => {
    setCurrentItem(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleClickEditButton = () => {
    Axios.put(`http://localhost:3001/update/${currentItem.idgames}`, currentItem)
      .then(response => {
        setEditMode(false);
        setListGames(listGames.map(item => item.idgames === currentItem.idgames ? currentItem : item));
      });
  }

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
        .then(response => {
            setListGames(listGames.filter(item => item.idgames !== id));
        });
}

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards")
      .then((response) => {
        setListGames(response.data)
      })
  }, [])

  return (
    <div className='app--container'>
      <div className='register--container'>
        <h1 className='register--title'>Scrim Shop</h1>
        <input 
          type="text" 
          name='name' 
          placeholder='Nome' 
          className='register--input'
          onChange={handleChangeValues}
        />

        <input 
          type="text" 
          name='cost' 
          placeholder='Preço' 
          className='register--input'
          onChange={handleChangeValues}
        />

        <input 
          type="text" 
          name='category' 
          placeholder='Categoria' 
          className='register--input'
          onChange={handleChangeValues}
        />

        <button className='register--button' onClick={() => handleClickButton()}>Cadastrar</button>
      </div>

      {
        listGames.map((item) => {
          return (
            <Cards 
              key={item.idgames} 
              listCard={listGames} 
              setListCard={setListGames} 
              id={item.idgames}
              name={item.name}
              cost={item.cost}
              category={item.category}
              onEdit={() => handleEdit(item.idgames)}
              onDelete={() => handleDelete(item.idgames)}
            />
          ) 
        })
      }

      {editMode ? (
        <>
          <div className="modal-background"></div>
          <div className='edit--container'>
            <button className='close-modal' onClick={() => setEditMode(false)}>X</button>
            <h1 className='edit--title'>Editar Jogo</h1>
            <input 
              type="text" 
              name='name' 
              placeholder='Nome' 
              className='edit--input'
              value={currentItem ? currentItem.name : ''}
              onChange={handleChangeEditValues}
            />

            <input 
              type="text" 
              name='cost' 
              placeholder='Preço' 
              className='edit--input'
              value={currentItem ? currentItem.cost : ''}
              onChange={handleChangeEditValues}
            />

            <input 
              type="text" 
              name='category' 
              placeholder='Categoria' 
              className='edit--input'
              value={currentItem ? currentItem.category : ''}
              onChange={handleChangeEditValues}
            />

            <button className='edit--button' onClick={() => handleClickEditButton()}>Atualizar</button>
          </div>
        </>
      ) : null}

    </div>
  )
}

export default App
