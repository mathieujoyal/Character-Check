import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import styled from "styled-components"
import backgroundImage from "./backgrounds/divbackground.png"
import Globalstyles from "./Globalstyles"

const Header = () => {
    const navigate = useNavigate()

    const handleLoginButtonClick = () => {
        navigate("/login");
    };

    const handleSignupButtonClick = () => {
        navigate("/signup");
    };

    return (
        <Wrapper>
            <H1>Character Check</H1>
            <ButtonDiv>
                <Login onClick={handleLoginButtonClick}>Login</Login>
                <Signup onClick={handleSignupButtonClick}>Sign in</Signup>
            </ButtonDiv>
        </Wrapper>
    )
}

const Wrapper = styled.div`
background-image: url(${backgroundImage});
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
border-bottom: 2px solid #ccaa00;
box-shadow: 0px 5px 12px 5px black;
height: 70px;
`

const H1 = styled.h1`
font-size: 40px;
color: lightgray;
`

const ButtonDiv = styled.div`
position: fixed;
right: 0px;
`

const Login = styled.button`

`

const Signup = styled.button`

`

export default Header