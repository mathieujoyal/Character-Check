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
                    <span>{account}</span>
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
margin-top:15px ;
font-size: 60px;
color: rgb(200,0,0) ;
`

const ButtonDiv = styled.div`
position: absolute;
right: 0px;
`

const Login = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 5px 20px;
margin-right: 20px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
transition: 0.12s;
font-family: 'Tangerine', cursive;
font-size: 30px;
font-weight: bold;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0);
}
`

const Register = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 5px 20px;
margin-right: 20px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
transition: 0.12s;
font-family: 'Tangerine', cursive;
font-size: 30px;
font-weight: bold;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0);
}
`

const UserInfo = styled.div`
color: lightgray;
font-size: 16px;

span {
    margin-right: 10px;
    position: absolute;
    top: 15px;
    right: 100px;
    font-size: 40px;
    font-weight: bold;
}
`

const LogoutButton = styled.button`
background: none;
border: none;
position: absolute;
padding: 10px 10px;
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
top: 5px;
right: 10px;
font-size: 30px;
font-family: 'Tangerine', cursive;
color: lightgray;
cursor: pointer;
`

export default Header