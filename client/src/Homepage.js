import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react"
import backgroundImage from "./Backgrounds/homepagebackground.jpg"
import divbackgroundImage from "./Backgrounds/divbackground.png"

const Homepage = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem("isLoggedIn")
    setIsLoggedIn(storedLoggedInStatus === "true")
}, [])

const handleCreateCharButtonClick = () => {
    if (isLoggedIn) {
        navigate("/sheetmaker")
    } else {
        navigate("/login")
    }
}

const handleLoadCharButtonClick = () => {
    if (isLoggedIn) {
        navigate("/sheetloader")
    } else {
        navigate("/login")
    }
}

    const handleCalculatorButtonClick = () => {
        navigate("/calculator")
    }

    const handleEncyclopediaButtonClick = () => {
        navigate("/encyclopedia")
    }

    return (
        <Wrapper>
            <H2>
                Welcome to Character Check! You can use the D&D 5th Edition Point buy 
                calculator without making an account. If you make an account on the website, 
                you can then use the character sheet management buttons to create a character 
                sheet and then save it and later on load that same character sheet.
            </H2>
            <SheetManagmentDiv>
                <InsideDiv>
                <CreateCharBtn onClick={handleCreateCharButtonClick}>Create Character</CreateCharBtn>
                <Para>{isLoggedIn ? "Create a new character sheet." : "Must be logged in!"}</Para>
                </InsideDiv>
                <InsideDiv>
                <LoadCharBtn onClick={handleLoadCharButtonClick}>Load Character</LoadCharBtn>
                <Para>{isLoggedIn ? "Load an existing character sheet." : "Must be logged in!"}</Para>
                </InsideDiv>
            </SheetManagmentDiv>
            <CalculatorButton onClick={handleCalculatorButtonClick}> Point-buy Calculator </CalculatorButton>
            <EncyclopediaButton onClick={handleEncyclopediaButtonClick}> Encyclopedia </EncyclopediaButton>
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

const H2 = styled.p`
background-image: url(${divbackgroundImage});
border: 2px solid #ccaa00;
box-shadow: 0px 5px 12px 5px black;
max-width: 500px;
color: white;
padding: 20px;
display: flex;
flex-direction: column;
justify-content: center ;
margin-top: 100px;
text-align: center;
`

const Para = styled.p`
color: white;
margin-top: 10px;
background-color: black;
padding: 5px 10px;
text-decoration: underline;
`

const SheetManagmentDiv = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin-top:30px;
`

const InsideDiv = styled.div`
margin: 20px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const CreateCharBtn = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 20px 0px;
width: 300px;
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

const LoadCharBtn = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 20px 0px;
width: 300px;
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

const CalculatorButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 20px 30px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
transition: 0.12s;
margin-top: 20px;
margin-bottom: 75px;
font-family: 'Tangerine', cursive;
font-size: 30px;
font-weight: bold;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0)
}
`

const EncyclopediaButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 15px 30px;
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

export default Homepage
