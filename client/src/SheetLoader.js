import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import backgroundImage from "./Backgrounds/homepagebackground.jpg"
import divbackgroundImage from "./Backgrounds/divbackground.png"

const SheetLoader = () => {
  const [sheets, setSheets] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
        <button key={sheet._id} onClick={() => handleSheetClick(sheet._id)}>
          {sheet.characterName}
        </button>
      ))}
      <HomeButton onClick={handleHomeButtonClick}> Home </HomeButton>
    </Wrapper>
  )
}

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

const HomeButton = styled.button`

`

export default SheetLoader;