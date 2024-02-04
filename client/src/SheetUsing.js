import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router"
import styled from 'styled-components'
import backgroundImage from "./Backgrounds/homepagebackground.jpg"
import divbackgroundImage from "./Backgrounds/divbackground.png"

const SheetUsing = () => {
  const { sheetId } = useParams();
  const [sheet, setSheet] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {

    fetch(`/api/sheets/details/${sheetId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setSheet(data))
      .catch(error => console.error('Error fetching sheet details:', error))
  }, [sheetId])

  const handleHomeButtonClick = () => {
    navigate('/')
}

  if (!sheet) {
    return <Wrapper>Loading Character...</Wrapper>
  }

  return (
    <Wrapper>
      <h1>{sheet.characterName}</h1>
      {/* Other info to be added. Just the char name for testing rn. ADD MORE MATHIEU */}
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

export default SheetUsing;