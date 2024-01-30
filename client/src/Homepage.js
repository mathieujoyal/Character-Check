import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import React from "react";

const Homepage = () => {
    const navigate = useNavigate();

    const handleCalculatorButtonClick = () => {
        navigate("/calculator");
    };

    const handleEncyclopediaButtonClick = () => {
        navigate("/encyclopedia");
    };

    return (
        <div>
            <h1>Title Here</h1>
            <h2>Brief Description of what this site can offer.</h2>
            <button>Create A Character</button>
            <p>Must be logged in!</p>
            <button>Load A Character</button>
            <p>Must be logged in!</p>
            <CalculatorButton onClick={handleCalculatorButtonClick}> Point-buy Calculator </CalculatorButton>
            <EncyclopediaButton onClick={handleEncyclopediaButtonClick}> Encyclopedia </EncyclopediaButton>
        </div>
    )
}

const CalculatorButton = styled.button`

`

const EncyclopediaButton = styled.button`

`

export default Homepage