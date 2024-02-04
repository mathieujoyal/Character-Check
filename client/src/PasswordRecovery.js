import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const PasswordRecovery = () => {
    const [userEmail, setUserEmail] = useState('')
    const navigate = useNavigate()

    const handleHomeButtonClick = () => {
        navigate('/')
    }

    const handleRecoverPassword = async () => {
        try {
            const response = await fetch('/api/password-recovery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userEmail })
            })

            if (response.ok) {
                console.log('Recovery email sent successfully')
            } else {
                console.error('Failed to send recovery email')
            }
        } catch (error) {
            console.error('Error during password recovery:', error)
        }
    }

    return (
        <Wrapper>
            <h1>Password Recovery</h1>
            <label>Email: <input type="text" value={userEmail} onChange={(event) => setUserEmail(event.target.value)} /></label>
            <button onClick={handleRecoverPassword}>Recover Password</button>
            <HomeButton onClick={handleHomeButtonClick}>Home</HomeButton>
        </Wrapper>
    )
}

const Wrapper = styled.div`

`

const HomeButton = styled.button`

`

export default PasswordRecovery;