import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import styled from "styled-components"
import backgroundImage from "./Backgrounds/homepagebackground.jpg"

const Login = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ errorBox, setErrorBox ] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)
    const [ account, setaccount ] = useState("")
    const [ userId, setUserId ] = useState("")
    const [ userPassword, setUserPassword ] = useState("")

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

    const handleForgotPassword = () => {
        navigate("/password-recovery")
    }

    const handleLogin = async () => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ account, userPassword })
            })
    
            if (response.ok) {
                const data = await response.json()
    
                localStorage.setItem("isLoggedIn", "true")
                localStorage.setItem("account", account)
                localStorage.setItem("userId", data.userId)
    
                setUserId(data.userId)
    
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
            <label>Password: <input type={showPassword ? "text" : "password"} value={userPassword} onChange={(event) => setUserPassword(event.target.value)} /></label>
            <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide Password" : "Show Password"}
            </button>
            <button onClick={handleLogin}>Login</button>
            <ErrorMessage className={errorBox ? "show" : "hide"}>Invalid Account name or Password.</ErrorMessage>
            <p>Don't have an account?<RegisterButton onClick={handleRegisterButtonClick}>Register</RegisterButton></p>
            <ForgotPasswordButton onClick={handleForgotPassword}>Forgot your account/password?</ForgotPasswordButton>
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

const RegisterButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 25px 60px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
transition: 0.12s;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0)
}
`

const ForgotPasswordButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 25px 60px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
transition: 0.12s;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0)
}
`

const HomeButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 25px 60px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
transition: 0.12s;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0)
}
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