import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import styled from "styled-components"
import backgroundImage from "./Backgrounds/divbackground.png"

const Header = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [account, setaccount] = useState("")

    useEffect(() => {
        const storedLoggedInStatus = localStorage.getItem("isLoggedIn")
        const storedaccount = localStorage.getItem("account")
        setIsLoggedIn(storedLoggedInStatus === "true")
        setaccount(storedaccount || "")
    }, [])

    const handleLoginButtonClick = () => {
        navigate("/login")
    }

    const handleRegisterButtonClick = () => {
        navigate("/register")
    }

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("account")
        setIsLoggedIn(false)
        setaccount("")
        navigate("/")
        window.location.reload()
    }

    return (
        <Wrapper>
            <H1>Character Check</H1>
            {isLoggedIn ? (
                <UserInfo>
                    <span>Hello, {account}!</span>
                    <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                </UserInfo>
            ) : (
                <ButtonDiv>
                    <Login onClick={handleLoginButtonClick}>Login</Login>
                    <Register onClick={handleRegisterButtonClick}>Register</Register>
                </ButtonDiv>
            )}
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
position: absolute;
right: 0px;
`

const Login = styled.button`

`

const Register = styled.button`

`

const UserInfo = styled.div`
color: lightgray;
font-size: 16px;

span {
    margin-right: 10px;
}
`

const LogoutButton = styled.button`
background: none;
border: none;
color: lightgray;
cursor: pointer;
`

export default Header