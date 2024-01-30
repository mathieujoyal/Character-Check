import { useNavigate } from "react-router"
import styled from "styled-components"

const Login = () => {
    const navigate = useNavigate()

    const handleHomeButtonClick = () => {
        navigate("/")
    }

    return (
        <div>
        <h1>Login Page</h1>
        <HomeButton onClick={handleHomeButtonClick} > Home </HomeButton>
    </div>
    )
}

const HomeButton = styled.button`

`

export default Login