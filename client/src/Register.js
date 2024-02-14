import { useState } from "react"
import { useNavigate } from "react-router"
import styled from "styled-components"
import backgroundImage from "./Backgrounds/homepagebackground.jpg"

const Register = () => {
    const [ account, setAccount ] = useState("")
    const [ userPassword, setUserPassword ] = useState("")
    const [ userEmail, setUserEmail ] = useState("")
    const [ showPassword, setShowPassword ] = useState(false)
    const [ passwordStrength, setPasswordStrength ] = useState("");
    const [ registerError, setRegisterError ] = useState("");
    const [ isPasswordFocused, setIsPasswordFocused ]  = useState(false);
    const navigate = useNavigate()

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        setUserPassword(password);
    
        const requirements = [
            password.length < 8 ? <span style={{ color: 'red' }}>Password must be at least 8 characters long.</span> : <span style={{ color: 'green' }}>Password must be at least 8 characters long.</span>,
            password.length > 20 ? <span style={{ color: 'red' }}>Password must be shorter than 20 characters.</span> : <span style={{ color: 'green' }}>Password must be shorter than 20 characters.</span>,
            !/\d|\W/.test(password) ? <span style={{ color: 'red' }}>Password must contain at least one number or special character.</span> : <span style={{ color: 'green' }}>Password must contain at least one number or special character.</span>
        ];
    
        setPasswordStrength(requirements.map((req, index) => <p key={index}>{req}</p>));
    };

    const handlePasswordFocus = () => {
        setIsPasswordFocused(true);
    };

    const handlePasswordBlur = () => {
        setIsPasswordFocused(false);
        setPasswordStrength("");
    };

    const handleHomeButtonClick = () => {
        navigate("/")
    }

    const handleLoginButtonClick = () => {
        navigate("/login")
    }

    const handleRegister = async () => {
        try {

            if (!userEmail) {
                setRegisterError("Email is required.");
                return;
            }

            if (!account) {
                setRegisterError("Username is required.");
                return;
            }

            if (userPassword.length < 8 || userPassword.length > 20 || !/\d|\W/.test(userPassword)) {
                setRegisterError("Password must be between 8 and 20 characters and contain at least one number or special character.");
                return;
            }

            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ account, userPassword, userEmail })
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
            <H1>Sign Up Page</H1>
            <InputDiv>
                <label>Account Name:</label>
                <Input placeholder="Create Account Name" type="text" value={account} onChange={(event) => setAccount(event.target.value)} />
                <label>Password:</label>
                <div>
                    <Input placeholder="Create Password" type={showPassword ? "text" : "password"} value={userPassword} onChange={handlePasswordChange} onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} />
                    {isPasswordFocused && <p>{passwordStrength}</p>}
                </div>
                <Showpassword onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Hide Password" : "Show Password"}
                </Showpassword>
                {registerError && <ErrorText>{registerError}</ErrorText>}
                <label>Email:</label>
                <Input placeholder="Enter Password" type="text" value={userEmail} onChange={(event) => setUserEmail(event.target.value)} />
            </InputDiv>
            <RegisterButton onClick={handleRegister}>Register</RegisterButton>
            <p>Already have an account?</p><LoginButton onClick={handleLoginButtonClick}>Login</LoginButton>
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

const ErrorText = styled.p`

`

const LoginButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 5px 20px;
margin: 15px;
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

const RegisterButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 10px 20px;
margin: 15px;
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

&.show {
    display: block;
}
`

export default Register