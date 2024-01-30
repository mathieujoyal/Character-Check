import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import React from "react";
import backgroundImage from "./backgrounds/homepagebackground.jpg"

const Homepage = () => {
    const navigate = useNavigate()

    const handleCalculatorButtonClick = () => {
        navigate("/calculator");
    };

    const handleEncyclopediaButtonClick = () => {
        navigate("/encyclopedia");
    };

    return (
        <Wrapper>
            <H2>Brief Description of what this site can offer.</H2>
            <CreateCharBtn>Create A Character</CreateCharBtn>
            <Para>Must be logged in!</Para>
            <LoadCharBtn>Load A Character</LoadCharBtn>
            <Para>Must be logged in!</Para>
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
color: white;
`

const Para = styled.p`
color: white;
`

const CreateCharBtn = styled.button`

`

const LoadCharBtn = styled.button`

`

const CalculatorButton = styled.button`

`

const EncyclopediaButton = styled.button`

`

export default Homepage