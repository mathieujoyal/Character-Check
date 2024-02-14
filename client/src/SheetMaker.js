import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router"
import styled from 'styled-components'
import backgroundImage from "./Backgrounds/homepagebackground.jpg"
import divbackgroundImage from "./Backgrounds/divbackground.png"

const SheetMaker = () => {
    const navigate = useNavigate()

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [characterData, setCharacterData] = useState({
        characterName: "",
        characterClass: "",
        subclass: "",
        race: "",
        subrace: "",
        background: "",
        alignment: "",
        level: "",
        exp: "",
        STR: "",
        DEX: "",
        CON: "",
        INT: "",
        WIS: "",
        CHA: "",
        STRmod: "",
        DEXmod: "",
        CONmod: "",
        INTmod: "",
        WISmod: "",
        CHAmod: "",
        inspiration: "",
        proficiency: "",
        STRSAVE: "",
        DEXSAVE: "",
        CONSAVE: "",
        INTSAVE: "",
        WISSAVE: "",
        CHASAVE: "",
        acrobatics: "",
        animalHandling: "",
        arcana: "",
        athletics: "",
        deception: "",
        history: "",
        insight: "",
        intimidation: "",
        investigation: "",
        medicine: "",
        nature: "",
        perception: "",
        performance: "",
        persuasion: "",
        religion: "",
        sleightOfHand: "",
        stealth: "",
        survival: "",
        passivePerception: "",
        otherProficienciesLanguages: "",
        AC: "",
        initiative: "",
        speed: "",
        hitPoints: "",
        temporaryHitPoints: "",
        deathSaves: "",
        weaponsSpellAbilities: "",
        inventory: "",
        longRestAbilities: "",
        shortRestAbilities: "",
        passiveAbilities: "",
    })

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        if (!userId) {
            navigate('/login')
        }
        }, [navigate])

    const handleInputChange = (field, value) => {
    setCharacterData((prevData) => ({ ...prevData, [field]: value }));
}

const saveCharacterSheet = async () => {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
            return;
        }

        if (!characterData.characterName.trim()) {
            setErrorMessage('Character Name is required');
        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
    }
        const response = await fetch('/api/sheets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userId
            },
            body: JSON.stringify({
                userId,
                ...characterData
            })
        });

        if (response.ok) {
            const sheetData = await response.json();
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
            console.log('Character sheet saved successfully');
            console.log('SheetId:', sheetData.sheetId);
        } else {
            console.error('Failed to save character sheet');
        }
    } catch (error) {
        console.error('Error during sheet save:', error);
    }
};

    const handleHomeButtonClick = () => {
        navigate('/')
    }

    return (
        <Wrapper>
            <h1>Create Your Character</h1>
            {showSuccessMessage && <SuccessMessage>Character sheet saved successfully!</SuccessMessage>}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <SheetDiv>
            <CharInfo>
                <LabelCharInfo>Character Name: <InputCharInfo type="text" onChange={(event) => handleInputChange('characterName', event.target.value)} /></LabelCharInfo>
                <LabelCharInfo>Class: <InputCharInfo type="text" onChange={(event) => handleInputChange('characterClass', event.target.value)} /></LabelCharInfo>
                <LabelCharInfo>Subclass: <InputCharInfo type="text" onChange={(event) => handleInputChange('subclass', event.target.value)} /></LabelCharInfo>
                <LabelCharInfo>Race: <InputCharInfo type="text" onChange={(event) => handleInputChange('race', event.target.value)} /></LabelCharInfo>
                <LabelCharInfo>Subrace: <InputCharInfo type="text" onChange={(event) => handleInputChange('subrace', event.target.value)} /></LabelCharInfo>
                <LabelCharInfo>Background: <InputCharInfo type="text" onChange={(event) => handleInputChange('background', event.target.value)} /></LabelCharInfo>
                <LabelCharInfo>Alignment: <InputCharInfo type="text" onChange={(event) => handleInputChange('alignment', event.target.value)} /></LabelCharInfo>
                <LabelCharInfo>Level: <InputCharInfo type="text" onChange={(event) => handleInputChange('level', event.target.value)} /></LabelCharInfo>
                <LabelCharInfo>Exp: <InputCharInfo type="text" onChange={(event) => handleInputChange('exp', event.target.value)} /></LabelCharInfo>
            </CharInfo>

            <MiddleDiv>
                <Sidediv>
                    <StatsandSkillsDiv>

                        <CharStats>
                            <LabelSmall>Strength<LargeInputStats type="text" onChange={(event) => handleInputChange('STR', event.target.value)} /></LabelSmall>
                            <InputSmallmodif type="text" onChange={(event) => handleInputChange('STRmod', event.target.value)} />
                            <LabelSmall>Dexterity<LargeInputStats type="text" onChange={(event) => handleInputChange('DEX', event.target.value)} /></LabelSmall>
                            <InputSmallmodif type="text" onChange={(event) => handleInputChange('DEXmod', event.target.value)} />
                            <LabelSmall>Constitution<LargeInputStats type="text" onChange={(event) => handleInputChange('CON', event.target.value)} /></LabelSmall>
                            <InputSmallmodif type="text" onChange={(event) => handleInputChange('CONmod', event.target.value)} />
                            <LabelSmall>Intelligence<LargeInputStats type="text" onChange={(event) => handleInputChange('INT', event.target.value)} /></LabelSmall>
                            <InputSmallmodif type="text" onChange={(event) => handleInputChange('INTmod', event.target.value)} />
                            <LabelSmall>Wisdom<LargeInputStats type="text" onChange={(event) => handleInputChange('WIS', event.target.value)} /></LabelSmall>
                            <InputSmallmodif type="text" onChange={(event) => handleInputChange('WISmod', event.target.value)} />
                            <LabelSmall>Charisma<LargeInputStats type="text" onChange={(event) => handleInputChange('CHA', event.target.value)} /></LabelSmall>
                            <InputSmallmodif type="text" onChange={(event) => handleInputChange('CHAmod', event.target.value)} />
                        </CharStats>

                        <SkillSaveDiv>
                            <TopSkillDiv>
                                <LabelSmall>Inspiration points: <InputSmall type="text" onChange={(event) => handleInputChange('inspiration', event.target.value)} /></LabelSmall>
                                <LabelSmall>Proficiency Bonus: <InputSmall type="text" onChange={(event) => handleInputChange('proficiency', event.target.value)} /></LabelSmall>
                            </TopSkillDiv>

                            <SaveDiv>
                                <p>Saving Throw Bonuses</p>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('STRSAVE', event.target.value)} />Strenght</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('DEXSAVE', event.target.value)} />Dexterity</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('CONSAVE', event.target.value)} />Constitution</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('INTSAVE', event.target.value)} />Intelligence</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('WISSAVE', event.target.value)} />Wisdom</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('CHASAVE', event.target.value)} />Charisma</LabelSmall>
                            </SaveDiv>

                            <SkillDiv>
                                <p>Skill Bonuses</p>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('acrobatics', event.target.value)} />Acrobatics</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('animalHandling', event.target.value)} />Animal Handling</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('arcana', event.target.value)} />Arcana</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('athletics', event.target.value)} />Athletics</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('deception', event.target.value)} />Deception</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('history', event.target.value)} />History</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('insight', event.target.value)} />Insight</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('intimidation', event.target.value)} />Intimidation</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('investigation', event.target.value)} />Investigation</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('medicine', event.target.value)} />Medicine</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('nature', event.target.value)} />Nature</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('perception', event.target.value)} />Perception</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('performance', event.target.value)} />Performance</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('persuasion', event.target.value)} />Persuasion</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('religion', event.target.value)} />Religion</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('sleightOfHand', event.target.value)} />Sleight of Hand</LabelSmall>
                                <LabelSmall><InputSmall type="text" onChange={(event) => handleInputChange('stealth', event.target.value)} />Stealth</LabelSmall>
                                <LabelSmall><InputSmallLast type="text" onChange={(event) => handleInputChange('survival', event.target.value)} />Survival</LabelSmall>
                            </SkillDiv>

                        </SkillSaveDiv>

                    </StatsandSkillsDiv>

                <BottomLeftDiv>
                    <LabelSmall><InputPassivePerception type="text" onChange={(event) => handleInputChange('passivePerception', event.target.value)} />Passive Perception</LabelSmall>
                    <LabelSmall>Other Proficiencies & Languages<InputBottomLeft type="text" onChange={(event) => handleInputChange('otherProficienciesLanguages', event.target.value)} /></LabelSmall>
                </BottomLeftDiv>

            </Sidediv>
            
            <PhysicalDiv>
                <TopDiv>
                    <LabelSmall>Armor Class</LabelSmall>
                    <LabelSmall>Initiative</LabelSmall>
                    <LabelSmall>Speed</LabelSmall>
                    <LargeInput type="text" onChange={(event) => handleInputChange('AC', event.target.value)} />
                    <LargeInput type="text" onChange={(event) => handleInputChange('initiative', event.target.value)} />
                    <LargeInput type="text" onChange={(event) => handleInputChange('speed', event.target.value)} />
                </TopDiv>

                <HealthDiv>
                    <LabelHP>Hit Points</LabelHP>
                    <LabelHP>Temporary Hit Points</LabelHP>
                    <InputHP type="text" onChange={(event) => handleInputChange('hitPoints', event.target.value)} />
                    <InputHP type="text" onChange={(event) => handleInputChange('temporaryHitPoints', event.target.value)} />
                </HealthDiv>

                <ActionDiv>
                    <LabelSmall>Death Saves</LabelSmall>
                    <DeathSaveInput type="text" onChange={(event) => handleInputChange('deathSaves', event.target.value)} />
                    <LabelSmall>Weapons & Spell abilities</LabelSmall>
                    <InputBig type="text" onChange={(event) => handleInputChange('weaponsSpellAbilities', event.target.value)} />
                    <LabelSmall>Inventory</LabelSmall>
                    <InputBig type="text" onChange={(event) => handleInputChange('inventory', event.target.value)} />
                </ActionDiv>

                <SpellButton>SpellList and slots? INACTIVE</SpellButton>
            </PhysicalDiv>

            <MentalDiv>
                <LabelSmall>Long Rest Abilities</LabelSmall>
                <InputBIGGER type="text" onChange={(event) => handleInputChange('longRestAbilities', event.target.value)} />
                <LabelSmall>Short Rest Abilities</LabelSmall>
                <InputBIGGER type="text" onChange={(event) => handleInputChange('shortRestAbilities', event.target.value)} />
                <LabelSmall>Passive Abilities</LabelSmall>
                <InputBIGGER type="text" onChange={(event) => handleInputChange('passiveAbilities', event.target.value)} />
            </MentalDiv>

            </MiddleDiv>
            </SheetDiv>
            <SaveButton onClick={saveCharacterSheet}>Save Character Sheet</SaveButton>
            <HomeButton onClick={handleHomeButtonClick}> Home </HomeButton>
        </Wrapper>
    )
}

const Wrapper = styled.div`
background-image: url(${backgroundImage});
background-size: cover;
background-position: center;
height: calc(170vh - 70px);
display: flex;
flex-direction: column;
align-items: center;
padding-top: 30px;
box-shadow: inset 0px 20px 12px 2px black;
`

const SheetDiv = styled.div`
background-image: url(${divbackgroundImage});
background-position: center;
display: flex;
flex-direction: column;
padding: 10px;
align-items: center;
padding-top: 30px;
border: 2px solid #ccaa00;
`

const ErrorMessage = styled.p`
position: fixed;
left: 40%;
bottom: 40%;
background-color: red;
color: white;
padding: 15px 25px;
border-radius: 5px;
`

const SuccessMessage = styled.p`
position: fixed;
left: 40%;
bottom: 40%;
background-color: #4CAF50;
color: white;
padding: 15px 25px;
border-radius: 5px;
`

const InputSmall = styled.input`
width: 17px;
height: 14px;
font-size: 10px;
margin-left: 15px;
`

const InputSmallLast = styled.input`
margin-bottom: 10px;
width: 17px;
height: 14px;
font-size: 10px;
margin-left: 15px;
`

const InputPassivePerception = styled.input`
width: 17px;
height: 14px;
font-size: 10px;
margin:10px;
`

const LargeInput = styled.input`
width: 60px;
height: 60px;
font-size: 45px;
text-align: center;
margin: auto;
`

const InputBig = styled.textarea`
height: 200px;
width: 450px;
margin: 10px auto;
`

const DeathSaveInput = styled.textarea`
height: 100px;
width: 450px;
margin: 10px auto;
font-size: 35px;
text-align: center;
`

const InputBIGGER = styled.textarea`
height: 265px;
width: 450px;
margin: 10px auto;
`

const LabelSmall = styled.label`
font-size: 25px;
`

const CharInfo = styled.div`
display: grid;
grid-template-columns: auto auto auto auto auto;
`

const LabelCharInfo = styled.label`
text-align: left;
width: 200px;
text-align: center;
margin: 0 20px;
`

const InputCharInfo = styled.input`
width: 190px;
height: 20px;
margin: 5px;
text-align: center;
`

const TopSkillDiv = styled.div`
border: 2px solid #ccaa00;
padding: 5px;
display: flex;
flex-direction: column;
align-items: left;
justify-content: center;
margin-left: 20px;
width: 200px;
margin-top: 10px;
`

const Sidediv =styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const StatsandSkillsDiv = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`

const MiddleDiv = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`

const CharStats = styled.div`
border: 2px solid #ccaa00;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100px;
text-align: center;
`

const LargeInputStats = styled.input`
width: 50px;
height: 70px;
text-align: center;
font-size: 40px;
margin-bottom: 12px;
margin-left: 0px;
`

const InputSmallmodif = styled.input`
width: 18px;
height: 18px;
margin: auto;
margin-left: 37px;
margin-top: -25px;
margin-bottom: 10px;
`

const InputBottomLeft = styled.textarea`
width: 200px;
height: 100px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const SkillSaveDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const SaveDiv = styled.div`
border: 2px solid #ccaa00;
padding: 5px;
display: flex;
flex-direction: column;
align-items: left;
justify-content: center;
margin-left: 20px;
width: 200px;
margin-top: 10px;
margin-bottom: 20px;
`

const SkillDiv = styled.div`
border: 2px solid #ccaa00;
display: flex;
flex-direction: column;
align-items: left;
justify-content: center;
margin-left: 20px;
width: 200px;
`

const BottomLeftDiv = styled.div`
width: 300px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const PhysicalDiv = styled.div`
width: 510px;
`

const TopDiv = styled.div`
text-align: center;
display:grid;
grid-template-columns: auto auto auto;
width: 500px;
`

const HealthDiv = styled.div`
text-align: center;
display:grid;
grid-template-columns: auto auto;
width: 500px;
`

const InputHP = styled.input`
width: 100px;
height: 70px;
margin: 5px;
text-align: center;
margin: auto;
font-size: 25px;
`

const LabelHP = styled.label`
font-size: 40px;
`

const SpellButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 10px 0px;
width: 300px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
transition: 0.12s;
font-family: 'Tangerine', cursive;
font-size: 20px;
font-weight: bold;
margin-top: 20px;
margin-left: 20%;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0)
}
`

const MentalDiv = styled.div`
text-align: center;
display:grid;
grid-template-columns: auto;
width: 500px;
margin: auto;
`

const ActionDiv = styled.div`
text-align: center;
display:grid;
grid-template-columns: auto;
width: 500px;
margin: auto;
`

const SaveButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 10px 0px;
width: 200px;
box-shadow: inset 0px -0px 0px 5px rgb(150,0,0);
transition: 0.12s;
font-family: 'Tangerine', cursive;
font-size: 30px;
font-weight: bold;
margin-top: 20px;
&:active{
    box-shadow: inset 0px -0px 0px 5px rgb(125,0,0);
    background-color: rgb(100,0,0)
}
`

const HomeButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 10px 0px;
width: 200px;
margin-top: 10px;
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

export default SheetMaker