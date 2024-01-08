import React, { useState } from "react";
import { useNavigate } from "react-router"
import styled from "styled-components"

const Calculator = () => {
    const [currentStrenghtPoints, setCurrentStrenghtPoints] = useState(8)
    const [currentDexterityPoints, setCurrentDexterityPoints] = useState(8)
    const [currentConstitutionPoints, setCurrentConstitutionPoints] = useState(8)
    const [currentIntelligencePoints, setCurrentIntelligencePoints] = useState(8)
    const [currentWisdomPoints, setCurrentWisdomPoints] = useState(8)
    const [currentCharismaPoints, setCurrentCharismaPoints] = useState(8)


    const navigate = useNavigate()

    const handleHomeButtonClick = () => {
        navigate("/")
    }

    return (
        <div>
            <h1>Calculator</h1>
            <p>Total Points: </p>
                <ButtonContainer>
                    <PointButton >Add 1 Point</PointButton>
                    <PointButton >Minus 1 Point</PointButton>
                </ButtonContainer>
            <HomeButton onClick={handleHomeButtonClick} > Home </HomeButton>
        </div>
    )
}

const ButtonContainer = styled.div`
display: flex;
gap: 10px;
`

const PointButton = styled.button`

`

const HomeButton = styled.button`

`

export default Calculator