import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router"
import styled from 'styled-components'
import backgroundImage from "./Backgrounds/homepagebackground.jpg"
import divbackgroundImage from "./Backgrounds/divbackground.png"

const SheetUsing = () => {
  const { sheetId } = useParams()
  const [ sheet, setSheet ] = useState(null)
  const [ editedSheet, setEditedSheet ] = useState(null)
  const [ showSuccessMessage, setShowSuccessMessage ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
        navigate('/login')
    }
    }, [navigate])

  useEffect(() => {
    fetch(`/api/sheets/details/${sheetId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setSheet(data)
        setEditedSheet(data)
      })
      .catch(error => console.error('Error fetching sheet details:', error))
  }, [sheetId])

  const handleHomeButtonClick = () => {
    navigate('/')
  }

  const handleInputChange = (field, value) => {
    setEditedSheet(prevData => ({ ...prevData, [field]: value }))
  }

  const handleSaveButtonClick = async () => {
    try {
      const userId = localStorage.getItem('userId')
      if (!userId) {
          navigate('/login')
          return
      }
      const response = await fetch(`/api/sheets/${sheetId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedSheet)
      });
      if (response.ok) {
        setShowSuccessMessage(true)
        setTimeout(() => {
            setShowSuccessMessage(false)
        }, 3000)
    } else {
        console.error('Failed to save character sheet')
    }
    } catch (error) {
      console.error('Error updating sheet:', error)
    }
  }

  if (!sheet) {
    return <Wrapper>Loading Character Sheet...</Wrapper>
  }

  return (
    <Wrapper>
        <h1>{sheet.charaterName}</h1>
        {showSuccessMessage && <SuccessMessage>Character sheet saved !</SuccessMessage>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <SheetDiv>
        <CharInfo>
            <LabelCharInfo>Character Name: <InputCharInfo type="text" value={editedSheet.characterName} onChange={(event) => handleInputChange('characterName', event.target.value)} /></LabelCharInfo>
            <LabelCharInfo>Class: <InputCharInfo type="text" value={editedSheet.characterClass} onChange={(event) => handleInputChange('characterClass', event.target.value)} /></LabelCharInfo>
            <LabelCharInfo>Subclass: <InputCharInfo type="text" value={editedSheet.subclass} onChange={(event) => handleInputChange('subclass', event.target.value)} /></LabelCharInfo>
            <LabelCharInfo>Race: <InputCharInfo type="text" value={editedSheet.race} onChange={(event) => handleInputChange('race', event.target.value)} /></LabelCharInfo>
            <LabelCharInfo>Subrace: <InputCharInfo type="text" value={editedSheet.subrace} onChange={(event) => handleInputChange('subrace', event.target.value)} /></LabelCharInfo>
            <LabelCharInfo>Background: <InputCharInfo type="text" value={editedSheet.background} onChange={(event) => handleInputChange('background', event.target.value)} /></LabelCharInfo>
            <LabelCharInfo>Alignment: <InputCharInfo type="text" value={editedSheet.alignment} onChange={(event) => handleInputChange('alignment', event.target.value)} /></LabelCharInfo>
            <LabelCharInfo>Level: <InputCharInfo type="text" value={editedSheet.level} onChange={(event) => handleInputChange('level', event.target.value)} /></LabelCharInfo>
            <LabelCharInfo>Exp: <InputCharInfo type="text" value={editedSheet.exp} onChange={(event) => handleInputChange('exp', event.target.value)} /></LabelCharInfo>
        </CharInfo>

        <MiddleDiv>
            <Sidediv>
                <StatsandSkillsDiv>

                    <CharStats>
                        <LabelSmall>Strength<LargeInputStats type="text" value={editedSheet.STR} onChange={(event) => handleInputChange('STR', event.target.value)} /></LabelSmall>
                        <InputSmallmodif type="text" value={editedSheet.STRmod} onChange={(event) => handleInputChange('STRmod', event.target.value)} />
                        <LabelSmall>Dexterity<LargeInputStats type="text" value={editedSheet.DEX} onChange={(event) => handleInputChange('DEX', event.target.value)} /></LabelSmall>
                        <InputSmallmodif type="text" value={editedSheet.DEXmod} onChange={(event) => handleInputChange('DEXmod', event.target.value)} />
                        <LabelSmall>Constitution<LargeInputStats type="text" value={editedSheet.CON} onChange={(event) => handleInputChange('CON', event.target.value)} /></LabelSmall>
                        <InputSmallmodif type="text" value={editedSheet.CONmod} onChange={(event) => handleInputChange('CONmod', event.target.value)} />
                        <LabelSmall>Intelligence<LargeInputStats type="text" value={editedSheet.INT} onChange={(event) => handleInputChange('INT', event.target.value)} /></LabelSmall>
                        <InputSmallmodif type="text" value={editedSheet.INTmod} onChange={(event) => handleInputChange('INTmod', event.target.value)} />
                        <LabelSmall>Wisdom<LargeInputStats type="text" value={editedSheet.WIS} onChange={(event) => handleInputChange('WIS', event.target.value)} /></LabelSmall>
                        <InputSmallmodif type="text" value={editedSheet.WISmod} onChange={(event) => handleInputChange('WISmod', event.target.value)} />
                        <LabelSmall>Charisma<LargeInputStats type="text" value={editedSheet.CHA} onChange={(event) => handleInputChange('CHA', event.target.value)} /></LabelSmall>
                        <InputSmallmodif type="text" value={editedSheet.CHAmod} onChange={(event) => handleInputChange('CHAmod', event.target.value)} />
                    </CharStats>

                    <SkillSaveDiv>
                        <TopSkillDiv>
                            <LabelSmall>Inspiration points: <InputSmall type="text" value={editedSheet.inspiration} onChange={(event) => handleInputChange('inspiration', event.target.value)} /></LabelSmall>
                            <LabelSmall>Proficiency Bonus: <InputSmall type="text" value={editedSheet.proficiency} onChange={(event) => handleInputChange('proficiency', event.target.value)} /></LabelSmall>
                        </TopSkillDiv>

                        <SaveDiv>
                            <p>Saving Throw Bonuses</p>
                            <LabelSmall><InputSmall type="text" value={editedSheet.STRSAVE} onChange={(event) => handleInputChange('STRSAVE', event.target.value)} />Strenght</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.DEXSAVE} onChange={(event) => handleInputChange('DEXSAVE', event.target.value)} />Dexterity</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.CONSAVE} onChange={(event) => handleInputChange('CONSAVE', event.target.value)} />Constitution</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.INTSAVE} onChange={(event) => handleInputChange('INTSAVE', event.target.value)} />Intelligence</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.WISSAVE} onChange={(event) => handleInputChange('WISSAVE', event.target.value)} />Wisdom</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.CHASAVE} onChange={(event) => handleInputChange('CHASAVE', event.target.value)} />Charisma</LabelSmall>
                        </SaveDiv>

                        <SkillDiv>
                            <p>Skill Bonuses</p>
                            <LabelSmall><InputSmall type="text" value={editedSheet.acrobatics} onChange={(event) => handleInputChange('acrobatics', event.target.value)} />Acrobatics</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.animalHandling} onChange={(event) => handleInputChange('animalHandling', event.target.value)} />Animal Handling</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.arcana} onChange={(event) => handleInputChange('arcana', event.target.value)} />Arcana</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.athletics} onChange={(event) => handleInputChange('athletics', event.target.value)} />Athletics</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.deception} onChange={(event) => handleInputChange('deception', event.target.value)} />Deception</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.history} onChange={(event) => handleInputChange('history', event.target.value)} />History</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.insight} onChange={(event) => handleInputChange('insight', event.target.value)} />Insight</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.intimidation} onChange={(event) => handleInputChange('intimidation', event.target.value)} />Intimidation</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.investigation} onChange={(event) => handleInputChange('investigation', event.target.value)} />Investigation</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.medicine} onChange={(event) => handleInputChange('medicine', event.target.value)} />Medicine</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.nature} onChange={(event) => handleInputChange('nature', event.target.value)} />Nature</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.perception} onChange={(event) => handleInputChange('perception', event.target.value)} />Perception</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.performance} onChange={(event) => handleInputChange('performance', event.target.value)} />Performance</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.persuasion} onChange={(event) => handleInputChange('persuasion', event.target.value)} />Persuasion</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.religion} onChange={(event) => handleInputChange('religion', event.target.value)} />Religion</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.sleightOfHand} onChange={(event) => handleInputChange('sleightOfHand', event.target.value)} />Sleight of Hand</LabelSmall>
                            <LabelSmall><InputSmall type="text" value={editedSheet.stealth} onChange={(event) => handleInputChange('stealth', event.target.value)} />Stealth</LabelSmall>
                            <LabelSmall><InputSmallLast type="text" value={editedSheet.survival} onChange={(event) => handleInputChange('survival', event.target.value)} />Survival</LabelSmall>
                        </SkillDiv>

                    </SkillSaveDiv>

                </StatsandSkillsDiv>

            <BottomLeftDiv>
                <LabelSmall><InputPassivePerception type="text" value={editedSheet.passivePerception} onChange={(event) => handleInputChange('passivePerception', event.target.value)} />Passive Perception</LabelSmall>
                <LabelSmall>Other Proficiencies & Languages<InputBottomLeft value={editedSheet.otherProficienciesLanguages} type="text" onChange={(event) => handleInputChange('otherProficienciesLanguages', event.target.value)} /></LabelSmall>
            </BottomLeftDiv>

        </Sidediv>
        
        <PhysicalDiv>
            <TopDiv>
                <LabelSmall>Armor Class</LabelSmall>
                <LabelSmall>Initiative</LabelSmall>
                <LabelSmall>Speed</LabelSmall>
                <LargeInput type="text" value={editedSheet.AC} onChange={(event) => handleInputChange('AC', event.target.value)} />
                <LargeInput type="text" value={editedSheet.initiative} onChange={(event) => handleInputChange('initiative', event.target.value)} />
                <LargeInput type="text" value={editedSheet.speed} onChange={(event) => handleInputChange('speed', event.target.value)} />
            </TopDiv>

            <HealthDiv>
                <LabelHP>Hit Points</LabelHP>
                <LabelHP>Temporary Hit Points</LabelHP>
                <InputHP type="text" value={editedSheet.hitPoints} onChange={(event) => handleInputChange('hitPoints', event.target.value)} />
                <InputHP type="text" value={editedSheet.temporaryHitPoints} onChange={(event) => handleInputChange('temporaryHitPoints', event.target.value)} />
            </HealthDiv>

            <ActionDiv>
                <LabelSmall>Death Saves</LabelSmall>
                <DeathSaveInput type="text" value={editedSheet.deathSaves} onChange={(event) => handleInputChange('deathSaves', event.target.value)} />
                <LabelSmall>Weapons & Spell abilities</LabelSmall>
                <InputBig type="text" value={editedSheet.weaponsSpellAbilities} onChange={(event) => handleInputChange('weaponsSpellAbilities', event.target.value)} />
                <LabelSmall>Inventory</LabelSmall>
                <InputBig type="text" value={editedSheet.inventory} onChange={(event) => handleInputChange('inventory', event.target.value)} />
            </ActionDiv>

            <SpellButton>INACTIVE || SpellList and slots || INACTIVE</SpellButton>
        </PhysicalDiv>

        <MentalDiv>
            <LabelSmall>Long Rest Abilities</LabelSmall>
            <InputBIGGER type="text" value={editedSheet.longRestAbilities} onChange={(event) => handleInputChange('longRestAbilities', event.target.value)} />
            <LabelSmall>Short Rest Abilities</LabelSmall>
            <InputBIGGER type="text" value={editedSheet.shortRestAbilities} onChange={(event) => handleInputChange('shortRestAbilities', event.target.value)} />
            <LabelSmall>Passive Abilities</LabelSmall>
            <InputBIGGER type="text" value={editedSheet.passiveAbilities} onChange={(event) => handleInputChange('passiveAbilities', event.target.value)} />
        </MentalDiv>

        </MiddleDiv>
        </SheetDiv>
        <SaveButton onClick={handleSaveButtonClick}>Save Character Sheet</SaveButton>
        <HomeButton onClick={handleHomeButtonClick}>Home</HomeButton>
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

export default SheetUsing