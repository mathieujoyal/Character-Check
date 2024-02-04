import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router"
import styled from 'styled-components'
import backgroundImage from "./Backgrounds/homepagebackground.jpg"
import divbackgroundImage from "./Backgrounds/divbackground.png"

const SheetMaker = () => {
    const navigate = useNavigate()

    const [characterData, setCharacterData] = useState({
        characterName: "",
        characterClass: "",
        subclass: "",
        race: "",
        level: ""
    })

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        if (!userId) {
            navigate('/login')
        }
        }, [navigate])

    const handleInputChange = (field, value) => {
        setCharacterData((prevData) => ({ ...prevData, [field]: value }))
    }

    const saveCharacterSheet = async () => {
        try {
            const userId = localStorage.getItem('userId')
            if (!userId) {
            navigate('/login')
            return
            }
    
            const response = await fetch('/api/sheets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userId
                },
                body: JSON.stringify({ userId, ...characterData })
            })
    
            if (response.ok) {
            const sheetData = await response.json()
            console.log('Character sheet saved successfully')
            console.log('SheetId:', sheetData.sheetId)
            } else {
            console.error('Failed to save character sheet')
            }
        } catch (error) {
            console.error('Error during sheet save:', error)
        }
    }

    const handleHomeButtonClick = () => {
        navigate('/')
    }

    return (
        <Wrapper>
            <h1>Create Your Character</h1>
            <label>Character Name: <input type="text" onChange={(event) => handleInputChange('characterName', event.target.value)} /></label>
            <label>Class: <input type="text" onChange={(event) => handleInputChange('characterClass', event.target.value)} /></label>
            <label>Subclass: <input type="text" onChange={(event) => handleInputChange('subclass', event.target.value)} /></label>
            <label>Race: <input type="text" onChange={(event) => handleInputChange('race', event.target.value)} /></label>
            <label>Level: <input type="text" onChange={(event) => handleInputChange('level', event.target.value)} /></label>
            {/* Other info to be added. Just the BASIC INFO for testing rn. ADD MORE MATHIEU */}
            <button onClick={saveCharacterSheet}>Save Character Sheet</button>
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

export default SheetMaker