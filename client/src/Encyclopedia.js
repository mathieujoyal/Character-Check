import { useNavigate } from "react-router"
import styled from "styled-components"
import backgroundImage from "./Backgrounds/homepagebackground.jpg"
import divbackgroundImage from "./Backgrounds/divbackground.png"

const Encyclopedia = () => {
    const navigate = useNavigate()

    const handleHomeButtonClick = () => {
        navigate("/")
    }

    return (
        <Wrapper>
            <H1>Encyclopedia</H1>
            <HomeButton onClick={handleHomeButtonClick} > Home </HomeButton>
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
margin: 10px;
`

const HomeButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 10px 20px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
transition: 0.12s;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0);
}
`

export default Encyclopedia