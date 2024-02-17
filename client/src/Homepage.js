import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react"
import dungeonback2 from "./Backgrounds/dungeonback2.png"

const Homepage = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [usernameToDelete, setUsernameToDelete] = useState('')
    const [deleteError, setDeleteError] = useState('')
    const [showDeleteButton, setShowDeleteButton] = useState(true)

    useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem("isLoggedIn")
    setIsLoggedIn(storedLoggedInStatus === "true")
}, [])

const handleDeleteAccount = async () => {
    try {
        const userId = localStorage.getItem('userId')
        const response = await fetch("/api/delete-account", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: usernameToDelete, loggedInUserId: userId })
        })

        if (response.ok) {
            localStorage.removeItem("userId")
            localStorage.removeItem("account")
            localStorage.removeItem("isLoggedIn")
            setUsernameToDelete('')
            setShowDeleteModal(false)
            setShowDeleteButton(true)
            window.location.reload()
        } else {
            setDeleteError("Missmatched User")
        }
    } catch (error) {
        console.error("Error during account deletion:", error)
        setDeleteError("Failed to delete account")
    }
}

const openDeleteModal = () => {
    setShowDeleteModal(true)
    setShowDeleteButton(false)
    setUsernameToDelete('')
    setDeleteError('')
}

const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setShowDeleteButton(true)
}


const handleCreateCharButtonClick = () => {
    if (isLoggedIn) {
        navigate("/sheetmaker")
    } else {
        navigate("/login")
    }
}

const handleLoadCharButtonClick = () => {
    if (isLoggedIn) {
        navigate("/sheetloader")
    } else {
        navigate("/login")
    }
}

    const handleCalculatorButtonClick = () => {
        navigate("/calculator")
    }

    const handleEncyclopediaButtonClick = () => {
        navigate("/encyclopedia")
    }

    return (
        <Wrapper>
            <H2>
                Welcome to Character Check! You can use the D&D 5th Edition Point buy 
                calculator without making an account. If you make an account on the website, 
                you can then use the character sheet management buttons to create a character 
                sheet and then save it and later on load that same character sheet.
            </H2>
            <SheetManagmentDiv>
                <InsideDiv>
                    <CreateCharBtn onClick={handleCreateCharButtonClick}>Create Character</CreateCharBtn>
                    <Para>{isLoggedIn ? "Create a new character sheet." : "Must be logged in!"}</Para>
                </InsideDiv>
                <InsideDiv>
                    <LoadCharBtn onClick={handleLoadCharButtonClick}>Load Character</LoadCharBtn>
                    <Para>{isLoggedIn ? "Load an existing character sheet." : "Must be logged in!"}</Para>
                </InsideDiv>
            </SheetManagmentDiv>
            <CalculatorButton onClick={handleCalculatorButtonClick}> Point-buy Calculator </CalculatorButton>
            <EncyclopediaButton onClick={handleEncyclopediaButtonClick}> Encyclopedia </EncyclopediaButton>
            <Deletediv>
            {showDeleteButton && isLoggedIn && (
                    <DeleteButton onClick={openDeleteModal}>Delete Account</DeleteButton>
                )}
                {showDeleteModal && (
                    <ConfirmationDiv>
                        <ConfirmationText>Are you sure you want to delete your account?</ConfirmationText>
                        <InputDelete type="text" placeholder="Enter your username" value={usernameToDelete} onChange={(event) => setUsernameToDelete(event.target.value)} />
                        {deleteError && <P>{deleteError}</P>}
                        <ConfirmButton onClick={handleDeleteAccount}>Delete</ConfirmButton>
                        <CancelButton onClick={closeDeleteModal}>Cancel</CancelButton>
                    </ConfirmationDiv>
                )}
            </Deletediv>
        </Wrapper>
    )
}

const Wrapper = styled.div`
background-image: url(${dungeonback2});
background-size: cover;
background-position: center;
height: calc(100vh - 70px);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
box-shadow: inset 0px 20px 12px 2px black;
`

const H2 = styled.p`
background-color:black;
border: 2px solid rgb(150,0,0);
box-shadow: 0px 5px 12px 5px black;
max-width: 500px;
color: white;
padding: 20px;
display: flex;
flex-direction: column;
justify-content: center ;
margin-top: 100px;
text-align: center;
`

const Para = styled.p`
color: white;
margin-top: 10px;
background-color: black;
padding: 5px 10px;
text-decoration: underline;
border: 2px solid rgb(150,0,0);
box-shadow: 0px 5px 12px 5px black;
`

const SheetManagmentDiv = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin-top:30px;
`

const InsideDiv = styled.div`
margin: 20px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const CreateCharBtn = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 20px 0px;
width: 300px;
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

const LoadCharBtn = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 20px 0px;
width: 300px;
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

const CalculatorButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 20px 30px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
transition: 0.12s;
margin-top: 20px;
margin-bottom: 75px;
font-family: 'Tangerine', cursive;
font-size: 30px;
font-weight: bold;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0)
}
`

const EncyclopediaButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 15px 30px;
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

const Deletediv = styled.div`
position: fixed;
bottom: 20px; 
right: 20px; 
`

const DeleteButton = styled.button`
display: ${({ showDeleteModal }) => showDeleteModal ? 'none' : 'block'};
border: 3px solid rgb(5,5,5);
background-color: rgb(200,0,0);
padding: 15px 30px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
font-family: 'Tangerine', cursive;
font-size: 30px;
font-weight: bold;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0)
}
`

const ConfirmationDiv = styled.div`
width: ${({ showDeleteModal }) => showDeleteModal ? '300px' : '320px'};
height: ${({ showDeleteModal }) => showDeleteModal ? '200px' : '150px'};
background-color: rgb(25,25,25);
border: 3px solid rgb(5,5,5);
padding: 20px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
opacity: ${({ showDeleteModal }) => showDeleteModal ? '0' : '1'};
margin-left: 20px;
`

const InputDelete = styled.input`
margin: auto;
margin-top: 5px;
text-align: center;
display: flex;
justify-content: center;
align-items: center;
`

const P = styled.p`
font-size: 20px;
color: red;
text-align: center;
margin-top: 5px;
`

const ConfirmationText = styled.p`
opacity: ${({ showDeleteModal }) => showDeleteModal ? '0' : '1'};
transition: opacity 0.5s ease;
font-size: 25px;
`

const ConfirmButton = styled.button`
opacity: ${({ showDeleteModal }) => showDeleteModal ? '0' : '1'};
transition: opacity 0.5s ease;
border: 3px solid rgb(5,5,5);
background-color: rgb(200,0,0);
padding: 5px;
margin-top: 5px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
font-family: 'Tangerine', cursive;
font-size: 25px;
font-weight: bold;
margin-left: 70px;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0)
}
`

const CancelButton = styled.button`
opacity: ${({ showDeleteModal }) => showDeleteModal ? '0' : '1'};
transition: opacity 0.5s ease;
border: 3px solid rgb(5,5,5);
background-color: rgb(200,0,0);
padding: 5px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
font-family: 'Tangerine', cursive;
font-size: 25px;
font-weight: bold;
margin-left: 30px;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0)
}
`

export default Homepage
