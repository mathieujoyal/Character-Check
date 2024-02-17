import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import backgroundImage from "./Backgrounds/homepagebackground.jpg"

const SheetLoader = () => {
  const [sheets, setSheets] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [sheetIdToDelete, setSheetIdToDelete] = useState(null)
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
    setSheetIdToDelete(sheetId)
}

const handleDelete = async (sheetId) => {
  try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`/api/delete-sheet/${sheetId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': userId
          }
      })

      if (response.ok) {
          window.location.reload()
      } else {
          console.error('Failed to delete character sheet')
      }
  } catch (error) {
      console.error('Error deleting sheet:', error)
  }
}


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
            <CharactersheetDiv key={sheet._id}>
                <CharacterSheetbtn onClick={() => handleSheetClick(sheet._id)}>
                    {sheet.characterName}
                </CharacterSheetbtn>
                {!showConfirmation && <DeleteButton onClick={() => handleDeleteButtonClick(sheet._id)}>Delete</DeleteButton>}
            </CharactersheetDiv>
          ))}
            {showConfirmation && (
                    <ConfirmationDiv>
                        <ConfirmationText>Are you sure you want to delete this character sheet?</ConfirmationText>
                        <ConfirmButton onClick={() => handleDelete(sheetIdToDelete)}>Yes</ConfirmButton>
                        <CancelButton onClick={() => setShowConfirmation(false)}>No</CancelButton>
                    </ConfirmationDiv>
                )}
                
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

const CharactersheetDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const DeleteButton = styled.button`
display: ${({ showDeleteModal }) => showDeleteModal ? 'none' : 'block'};
border: 3px solid rgb(5,5,5);
background-color: rgb(200,0,0);
padding: 5px 5px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
font-family: 'Tangerine', cursive;
font-size: 25px;
font-weight: bold;
margin-left: 20px;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0)
}
`

const ConfirmationDiv = styled.div`
position: absolute;
right:0;
margin-right: 200px;
width: ${({ showDeleteModal }) => showDeleteModal ? '300px' : '320px'};
height: ${({ showDeleteModal }) => showDeleteModal ? '200px' : '150px'};
background-color: rgb(25,25,25);
border: 3px solid rgb(5,5,5);
padding: 20px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
opacity: ${({ showDeleteModal }) => showDeleteModal ? '0' : '1'};
margin-left: 20px;
`

const ConfirmationText = styled.p`
opacity: ${({ showDeleteModal }) => showDeleteModal ? '0' : '1'};
transition: opacity 0.5s ease;
font-size: 25px;
`

const ConfirmButton = styled.button`
opacity: ${({ showDeleteModal }) => showDeleteModal ? '0' : '1'};
transition: opacity 0.5s ease;
border: 3px solid rgb(5,5,5);
background-color: rgb(200,0,0);
padding: 5px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
font-family: 'Tangerine', cursive;
font-size: 25px;
font-weight: bold;
margin-left: 70px;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0)
}
`

const CancelButton = styled.button`
opacity: ${({ showDeleteModal }) => showDeleteModal ? '0' : '1'};
transition: opacity 0.5s ease;
border: 3px solid rgb(5,5,5);
background-color: rgb(200,0,0);
padding: 5px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
font-family: 'Tangerine', cursive;
font-size: 25px;
font-weight: bold;
margin-left: 30px;
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