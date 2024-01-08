import { useNavigate } from "react-router"
import styled from "styled-components"

const Encyclopedia = () => {
    const navigate = useNavigate()

    const handleHomeButtonClick = () => {
        navigate("/")
    }

    return (
        <div>
            <h1>Encyclopedia</h1>
            <HomeButton onClick={handleHomeButtonClick} > Home </HomeButton>
        </div>
    )
}

const HomeButton = styled.button`

`

export default Encyclopedia