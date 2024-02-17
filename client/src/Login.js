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
            <H1>Login Page</H1>
            <InputDiv>
                <label>Account Name:</label>
                <Input placeholder="Enter your Username" type="text" value={account} onChange={(event) => setaccount(event.target.value)} />
                <label>Password:</label>
                <Input placeholder="Enter your Password" type={showPassword ? "text" : "password"} value={userPassword} onChange={(event) => setUserPassword(event.target.value)} />
                    <Showpassword onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "Hide password" : "Show password"}
                    </Showpassword >
            </InputDiv>

            <LoginButton onClick={handleLogin}>Login</LoginButton>
            <ErrorMessage className={errorBox ? "show" : "hide"}>Invalid Account name or Password.</ErrorMessage>
            <p>Don't have an account?</p><RegisterButton onClick={handleRegisterButtonClick}>Register</RegisterButton>
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

const H1 = styled.h1`
font-size: 50px;
font-weight: bold;
margin-bottom: 40px;
background-color: rgb(125,0,0);
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
padding: 10px 20px;
border: 3px solid rgb(25,25,25);
`

const InputDiv  = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const Input = styled.input`
width: 200px;
height: 20px;
color: white;
text-align: center;
border: 3px solid rgb(25,25,25);
background-color: rgb(120,0,0);
box-shadow: inset 0px -0px 0px 2px rgb(80,0,0);

&:focus{
    border: 4px solid rgb(100,0,0);
}
`

const Showpassword = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
margin-top: 10px;
margin-bottom: 15px;
padding:  5px 12px;
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

const LoginButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 10px 40px;
margin-top: 10px;
margin-bottom: 15px;
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

const RegisterButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 10px 20px;
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

const HomeButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 5px 20px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
transition: 0.12s;
margin-top:15px;
font-family: 'Tangerine', cursive;
font-size: 30px;
font-weight: bold;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0);
}
`

const ErrorMessage = styled.p`
color: red;
margin-top: 10px;
display: none;
padding: 15px;
margin: 10px;
background-color:  black;
border: 2px solid rgb(50,50,50);
&.show {
    display: block;
}
`

export default Login