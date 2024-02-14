import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import backgroundImage from "./Backgrounds/homepagebackground.jpg"
import divbackgroundImage from "./Backgrounds/divbackground.png"

const SheetLoader = () => {
  const [sheets, setSheets] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sheetIdToDelete, setSheetIdToDelete] = useState(null);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
        navigate('/login')
    }
    }, [navigate])


  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      setLoading(false)
      return
    }

    fetch(`/api/sheets/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': userId
      }
    })
      .then(response => response.json())
      .then(data => {
        setSheets(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching sheets:', error)
        setLoading(false)
      })
  }, [])

  const handleDeleteButtonClick = (sheetId) => {
    setShowConfirmation(true);
    setSheetIdToDelete(sheetId);
};

const handleDelete = async (sheetId) => {
  try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`/api/delete-sheet/${sheetId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': userId
          }
      });

      if (response.ok) {
          console.log('Character sheet deleted successfully');
          window.location.reload();
      } else {
          console.error('Failed to delete character sheet');
      }
  } catch (error) {
      console.error('Error deleting sheet:', error);
  }
};


  const handleSheetClick = (sheetId) => {
    navigate(`/sheetUsing/${sheetId}`)
  }

  const handleHomeButtonClick = () => {
    navigate('/')
  }

  if (loading) {
    return <Wrapper>Loading Characters...</Wrapper>
  }

  return (
    <Wrapper>
        {sheets.map(sheet => (
            <div key={sheet._id}>
                <CharacterSheetbtn onClick={() => handleSheetClick(sheet._id)}>
                    {sheet.characterName}
                </CharacterSheetbtn>
                {showConfirmation && (
                    <div>
                        <p>Are you sure you want to delete this character sheet?</p>
                        <button onClick={() => handleDelete(sheetIdToDelete)}>Yes</button>
                        <button onClick={() => setShowConfirmation(false)}>No</button>
                    </div>
                )}
                {!showConfirmation && <button onClick={() => handleDeleteButtonClick(sheet._id)}>Delete Character Sheet</button>}
            </div>
        ))}
        <HomeButton onClick={handleHomeButtonClick}> Home </HomeButton>
    </Wrapper>
);
};

const Wrapper = styled.div`
background-image: url(${backgroundImage});
background-size: cover;
background-position: center;
height: calc(100vh - 70px);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
box-shadow: inset 0px 20px 12px 2px black;
`

const CharacterSheetbtn = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 10px 0px;
width: 300px;
margin: 10px 0px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
transition: 0.12s;
font-family: 'Tangerine', cursive;
font-size: 30px;
font-weight: bold;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0)
}
`

const HomeButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 10px 0px;
width: 200px;
margin-top: 40px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
transition: 0.12s;
font-family: 'Tangerine', cursive;
font-size: 30px;
font-weight: bold;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0)
}
`

export default SheetLoader;