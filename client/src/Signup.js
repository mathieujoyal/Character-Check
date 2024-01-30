import { useNavigate } from "react-router"
import styled from "styled-components"

const Signup = () => {
    const navigate = useNavigate()

    const handleHomeButtonClick = () => {
        navigate("/")
    }

    const handleLoginButtonClick = () => {
        navigate("/login");
    };

    return (
        <div>
            <h1>Sign Up Page</h1>
            <p>Already have an account?</p>
            <Login onClick={handleLoginButtonClick}>Login</Login>
            <HomeButton onClick={handleHomeButtonClick} > Home </HomeButton>
        </div>
    )
}

const HomeButton = styled.button`

`

const Login = styled.button`

`

export default Signup