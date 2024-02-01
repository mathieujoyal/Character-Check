import { useState } from "react"
import { useNavigate } from "react-router"
import styled from "styled-components"
import backgroundImage from "./Backgrounds/homepagebackground.jpg"

const Register = () => {
    const [ account, setAccount ] = useState("")
    const [ userPassword, setUserPassword ] = useState("")
    const navigate = useNavigate()

    const handleHomeButtonClick = () => {
        navigate("/")
    }

    const handleLoginButtonClick = () => {
        navigate("/login")
    }

    const handleRegister = async () => {
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ account, userPassword })
            })

            if (response.ok) {
                console.log("registered successfully")
                navigate("/login")
            } else {
                console.error("register failed")
            }
        } catch (error) {
            console.error("Error during register:", error)
        }
    }

    return (
        <Wrapper>
            <h1>Sign Up Page</h1>
            <label>Account Name: <input type="text" value={account} onChange={(event) => setAccount(event.target.value)} /></label>
            <label>Password: <input type="password" value={userPassword} onChange={(event) => setUserPassword(event.target.value)} /></label>
            <button onClick={handleRegister}>Register</button>
            <p>Already have an account? <LoginButton onClick={handleLoginButtonClick}>Login</LoginButton></p>
            <HomeButton onClick={handleHomeButtonClick}>Home</HomeButton>
        </Wrapper>
    );
};

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

const LoginButton = styled.button`

`

const HomeButton = styled.button`

`

export default Register