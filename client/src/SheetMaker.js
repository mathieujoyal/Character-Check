import React from 'react'
import { useNavigate } from "react-router"
import styled from 'styled-components'

const SheetMaker = () => {

  const navigate = useNavigate()

  const handleHomeButtonClick = () => {
      navigate("/")
  }

  return (
    <div>
        <h1>Create Your Character</h1>
        <HomeButton onClick={handleHomeButtonClick} > Home </HomeButton>
    </div>
)
}

const HomeButton = styled.button`

`

export default SheetMaker