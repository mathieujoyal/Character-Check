import { useState, useEffect } from "react";
import { useNavigate } from "react-router"
import styled from "styled-components"
import backgroundImage from "./Backgrounds/homepagebackground.jpg"

const Login = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ errorBox, setErrorBox ] = useState(false)
    const [ account, setaccount ] = useState("")
    const [ userPassword, setUseruserPassword ] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        const storedLoggedInStatus = localStorage.getItem("isLoggedIn")
        setIsLoggedIn(storedLoggedInStatus === "true")
        if (isLoggedIn) {
            navigate("/")
        }
    }, [isLoggedIn, navigate])

    const handleRegisterButtonClick = () => {
        navigate("/register")
    }

    const handleHomeButtonClick = () => {
        navigate("/")
    }

    const handleLogin = async () => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ account, userPassword })
            });
            if (response.ok) {
                localStorage.setItem("isLoggedIn", "true")
                localStorage.setItem("account", account)
                setIsLoggedIn(true)
                navigate("/")
                window.location.reload()
            } else {
                setErrorBox(true)
                setTimeout(() => {
                    setErrorBox(false)
                }, 8000)
            }
        } catch (error) {
            console.error("Error during login:", error)
            setErrorBox(true)
            setTimeout(() => {
                setErrorBox(false)
            }, 8000)
        }
    }

    return (
        <Wrapper>
            <h1>Login Page</h1>
            <label>Account Name:<input type="text" value={account} onChange={(event) => setaccount(event.target.value)} /></label>
            <label>Password:<input type="password" value={userPassword} onChange={(event) => setUseruserPassword(event.target.value)} /></label>
            <button onClick={handleLogin}>Login</button>
            <ErrorMessage className={errorBox ? "show" : "hide"}>Invalid Account name or Password.</ErrorMessage>
            <p>Don't have an account?<RegisterButton onClick={handleRegisterButtonClick}>Register</RegisterButton></p>
            <HomeButton onClick={handleHomeButtonClick}>Home</HomeButton>
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

const RegisterButton = styled.button`

`

const ErrorMessage = styled.p`
color: red;
margin-top: 10px;
display: none;

&.show {
    display: block;
}
`

export default Login