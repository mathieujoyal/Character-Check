import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import styled from "styled-components"
import backgroundImage from "./Backgrounds/homepagebackground.jpg"

const Calculator = () => {
const stats = [ "strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma" ]
const navigate = useNavigate()
const [ races, setRaces ] = useState([])
const [ traits, setTraits ] = useState([])
const [ subraceTraits, setSubraceTraits ] = useState([])
const [ abilityBonuses, setAbilityBonuses ] = useState([])
const [ subraceAbilityBonuses, setSubraceAbilityBonuses ] = useState([])
const [ selectedRace, setSelectedRace ] = useState("")
const [ selectedSubrace, setSelectedSubrace ] = useState("")
const [ raceInfo, setRaceInfo ] = useState(null)
const [ availablePoints, setAvailablePoints ] = useState(27)
const [ statPoints, setStatPoints ] = useState({ strength: 8, dexterity: 8, constitution: 8, intelligence: 8, wisdom: 8, charisma: 8 })
const [ calculatedStatPoints, setCalculatedStatPoints ] = useState({ strength: 8, dexterity: 8, constitution: 8, intelligence: 8, wisdom: 8, charisma: 8 })

useEffect(() => {
    fetch("/api/races")
        .then((response) => response.json())
        .then((data) => setRaces(data.results))
        .catch((error) => console.error("Error fetching races:", error))
}, [])

useEffect(() => {
    setCalculatedStatPoints({ strength: 8, dexterity: 8, constitution: 8, intelligence: 8, wisdom: 8, charisma: 8 })

    if (selectedRace) {
    fetch(`/api/races/${encodeURIComponent(selectedRace)}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(raceInfo)
        setRaceInfo(data)
            const abilityScoreMap = {
            str: 'strength',
            dex: 'dexterity',
            con: 'constitution',
            int: 'intelligence',
            wis: 'wisdom',
            cha: 'charisma'
            }

            const bonuses = data.ability_bonuses.map((bonus) => ({
                abilityScoreName: abilityScoreMap[bonus.ability_score.index],
                bonusValue: bonus.bonus,
            }))

            setAbilityBonuses(bonuses)

            if (data.ability_bonuses && Array.isArray(data.ability_bonuses)) {
            data.ability_bonuses.forEach((bonus) => {
                const attributeName = abilityScoreMap[bonus.ability_score.index]
                if (attributeName) {
                    setCalculatedStatPoints((prevPoints) => ({
                        ...prevPoints,
                        [attributeName]: prevPoints[attributeName] + bonus.bonus,
                    }))
                }
            })
        }

        if (data.traits && Array.isArray(data.traits)) {
            Promise.all(data.traits.map(trait => fetch(`/api/traits/${trait.index}`)))
                .then(responses => Promise.all(responses.map(response => response.json())))
                .then((traitsData) => setTraits(traitsData))
                .catch((traitsError) => console.error('Error fetching dragonborn traits:', traitsError))
            }

        if (selectedSubrace) {
            fetch(`/api/subraces/${encodeURIComponent(selectedSubrace)}`)
                .then((subraceResponse) => {
                    if (!subraceResponse.ok) {
                        throw new Error(`Subrace API error: ${subraceResponse.status}`)
                    }
                return subraceResponse.json();
                })
                    .then((subraceData) => {
                console.log('Subrace Info:', subraceData)

                const subraceBonuses = subraceData.ability_bonuses.map((bonus) => ({
                    abilityScoreName: abilityScoreMap[bonus.ability_score.index],
                    bonusValue: bonus.bonus,
                }));

                setSubraceAbilityBonuses(subraceBonuses)

                if (subraceData.racial_traits && Array.isArray(subraceData.racial_traits)) {
                    Promise.all(subraceData.racial_traits.map(trait => fetch(`/api/traits/${trait.index}`)))
                        .then(responses => Promise.all(responses.map(response => response.json())))
                        .then((subraceTraitsData) => setSubraceTraits(subraceTraitsData))
                        .catch((traitsError) => console.error('Error fetching subrace traits:', traitsError))
                }

                if (subraceData.ability_bonuses && Array.isArray(subraceData.ability_bonuses)) {
                    subraceData.ability_bonuses.forEach((bonus) => {
                        const attributeName = abilityScoreMap[bonus.ability_score.index]
                        if (attributeName) {
                            setCalculatedStatPoints((prevPoints) => ({
                            ...prevPoints,
                            [attributeName]: prevPoints[attributeName] + bonus.bonus,
                        }))
                    }
                    })
                }
                })
                .catch((subraceError) =>
                console.error(`Error retrieving the ${selectedSubrace}'s information:`, subraceError)
                )
            }
        })
        .catch((error) => console.error(`Error retrieving the ${selectedRace}'s information:`, error))
    }
}, [selectedRace, selectedSubrace])

const handleSpendPoints = (stat, attributeChange) => {
// This statement handles any change that are made to stats that are between 8 and 13
    if ((attributeChange === "add" && statPoints[stat] < 13) || (attributeChange === "subtract" && statPoints[stat] > 8)) {
            const updatedPoints = attributeChange === "add" ? statPoints[stat] + 1 : statPoints[stat] - 1;
        setStatPoints((prevPoints) => ({
            ...prevPoints, [stat]: updatedPoints,
        }))
        setAvailablePoints(
            (prevAvailablePoints) => attributeChange === "add" ? prevAvailablePoints - 1 : prevAvailablePoints + 1
        )
    }

// This statement handles any change that are made to stats that are at 13, 14 or 15.
    if ((attributeChange === "add" && statPoints[stat] >= 13) ||
        (attributeChange === "subtract" && statPoints[stat] <= 15 && statPoints[stat] >= 14 )) {
        const updatedPoints = attributeChange === "add" ? statPoints[stat] + 1 : statPoints[stat] - 1;
    setStatPoints((prevPoints) => ({
        ...prevPoints, [stat]: updatedPoints,
    }))
    setAvailablePoints(
        (prevAvailablePoints) => attributeChange === "add" ? prevAvailablePoints - 2 : prevAvailablePoints + 1
    )
}
}

// This function sets up the ability modifer that show up on screen.
const calculateAbilityMod = (stat) => {
    const totalStatPoints = calculatedStatPoints[stat] + (statPoints[stat] - 8)
    if (totalStatPoints === 8 || totalStatPoints === 9) {
        return "-1"
    } else if (totalStatPoints === 10 || totalStatPoints === 11) {
        return "0"
    } else if (totalStatPoints === 12 || totalStatPoints === 13) {
        return "+1"
    } else if (totalStatPoints === 14 || totalStatPoints === 15) {
        return "+2"
    } else if (totalStatPoints === 16 || totalStatPoints === 17) {
        return "+3"
    }
}

// Simple useNavigate back to the homepage
    const handleHomeButtonClick = () => {
        navigate("/")
    }

    return (
        <Wrapper>
            <Title>D&D 5e Point Buy Calculator</Title>

            <DropdownContainer>
                <Label htmlFor="raceDropdown">Select Race:</Label>
                    <RaceDropdown id="raceDropdown" value={selectedRace} onChange={(event) => { setSelectedSubrace(""); setSubraceTraits([]); setSelectedRace(encodeURIComponent(event.target.value))}}>
                    <option value="" disabled> Select a race </option>
                        {races.map((race) => (
                            <option key={race.index} value={race.name}> {race.name} </option>
                        )
                    )}
                </RaceDropdown>
            </DropdownContainer>

            {raceInfo && raceInfo.subraces && raceInfo.subraces.length > 0 && (
                <DropdownContainer>
                <label htmlFor="subraceDropdown">Select Subrace:</label>
                    <select id="subraceDropdown" value={selectedSubrace} onChange={(event) => setSelectedSubrace(event.target.value)}>
                    <option value="" disabled> Pick a subrace </option>
                    {raceInfo.subraces.map(subrace => (
                    <option key={subrace.index} value={subrace.index}> {subrace.name} </option>
                    ))}
                </select>
                </DropdownContainer>
                    )}

            <StatContainer>
                <Points>Remaining Points: {availablePoints}</Points>
                {stats.map((stat) => (
                    <AttributeDiv key={stat}>
                        <Attribute>{`${stat.charAt(0).toUpperCase()}${stat.slice(1)}:`}</Attribute>

                        <StatButtons>
                            <MinusButton onClick={() => handleSpendPoints(stat, "subtract")}
                            disabled={availablePoints >= 27 ||
                            statPoints[stat] === 8 }> - </MinusButton>
                            <StatValue> {statPoints[stat]}</StatValue>
                            <PlusButton onClick={() => handleSpendPoints(stat, "add")}
                            disabled={availablePoints <= 0 ||
                            statPoints[stat] === 15 ||
                            (availablePoints === 1 && statPoints[stat] === 14) ||
                            (availablePoints === 1 && statPoints[stat] === 13)  
                            } > + </PlusButton>
                        </StatButtons>

                        <StatCalculation>
                            Total Calculation: {statPoints[stat]} + {calculatedStatPoints[stat] - 8} = {calculatedStatPoints[stat] + (statPoints[stat] - 8) } →
                        </StatCalculation>
                        <StatModifier> {calculateAbilityMod(stat)} </StatModifier>
                    </AttributeDiv>
                ))}
            </StatContainer>

            <RaceDiv>
                {raceInfo && (
                    <RaceInfoContainer>
                    <H2>{raceInfo.name}'s Information</H2>
                    <Para><BoldSpan>Lifespan:</BoldSpan> {raceInfo.age}</Para>
                    <Para><BoldSpan>Alignment:</BoldSpan> {raceInfo.alignment}</Para>
                    <Para><BoldSpan>Language:</BoldSpan> {raceInfo.language_desc}</Para>
                    <Para><BoldSpan>Size:</BoldSpan> {raceInfo.size_description}</Para>
                    <Para><BoldSpan>Speed:</BoldSpan> {raceInfo.speed}</Para>
                    <div><BoldSpan>Attribute bonuses:</BoldSpan>
                        {abilityBonuses.map((bonus, index) => ( <div key={index}> {bonus.abilityScoreName}: {bonus.bonusValue} </div> ))}
                    </div>
                    {traits.length > 0 && (
                    <div>
                        <H2>{raceInfo.name}'s Trait</H2>
                            {traits.map((trait, index) => (
                                <div key={index}>
                                    <Para><BoldSpan>{trait.name}</BoldSpan>   {trait.desc}</Para>
                                </div>
                            ))
                        }
                    </div>
                )}
                    </RaceInfoContainer>
                )}

                {raceInfo && selectedSubrace && (
                    <SubRaceInfoContainer>
                    <H2>{selectedSubrace}'s Particularities</H2>
                    <Para><BoldSpan>Speed:</BoldSpan> {raceInfo.speed}</Para>
                        <BoldSpan>Attribute bonuses:</BoldSpan>
                        {subraceAbilityBonuses.map((bonus, index) => (<div key={index}>{bonus.abilityScoreName}: {bonus.bonusValue}</div>))}
                        {subraceTraits.length > 0 && (
                        <div>
                            <H2>{selectedSubrace}'s Traits</H2>
                                {subraceTraits.map((subraceTrait, index) => (
                                    <div key={index}>
                                        <Para><BoldSpan>{subraceTrait.name}</BoldSpan> {subraceTrait.desc}</Para>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                    </SubRaceInfoContainer>
                    )}
                </RaceDiv>
            <HomeButton onClick={handleHomeButtonClick} > Home </HomeButton>
        </Wrapper>
    )
}

const Wrapper = styled.div`
background-image: url(${backgroundImage});
min-height: calc(100vh - 70px);
background-size: cover;
background-position: center;
box-shadow: inset 0px 20px 12px 2px black;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const Title = styled.h1`
font-size: 60px;
margin-top: 50px;
`

const Points = styled.p`
text-align: center;
padding-bottom: 15px;
`

const Label = styled.label`
font-size: 40px;
`

const StatContainer = styled.div`
background-color: black;
border: 2px solid rgb(120,0,0);
box-shadow: 0px 5px 12px 5px black;
color: white;
min-height: 300px;
padding: 20px;
display: flex;
flex-direction: column;
justify-content: center ;
margin-top: 20px;
text-align: center;
`

const StatCalculation = styled.p`
margin-right : 20px;
margin-left: 100px;
`

const AttributeDiv = styled.div`
display: grid;
grid-template-columns: 150px 20px 400px 50px;
text-align: center;
margin-bottom: 10px;
`

const Attribute = styled.div`
margin: auto;
`

const StatValue = styled.div`
font-weight: bold;
margin-right: 10px;
margin-left: 10px;
`

const StatModifier = styled.span`
font-size: 35px;
font-weight: bold;
margin-right: 20px;
`

const MinusButton = styled.button`
background: var(--color-silver);
cursor: pointer;
transition: 0.2s;
&:hover{
    opacity: 70%;
}
`

const PlusButton = styled.button`
background: var(--color-silver);
cursor: pointer;
transition: 0.2s;
&:hover{
    opacity: 70%;
}
`

const StatButtons = styled.div`
display: flex;
flex-direction: row;
align-items: center;  
margin-left: 10px;
margin-right: 10px;
`

const RaceDiv = styled.div`
margin-top: 20px;
`

const DropdownContainer = styled.div`
margin-top: 20px;
`

const RaceDropdown = styled.select`
margin-left: 10px;
`

const RaceInfoContainer = styled.div`
background-color: black;
border: 2px solid rgb(120,0,0);
height: fit-content;
box-shadow: 0px 5px 12px 5px black;
color: white;
margin: 30px;
padding: 15px;
`

const SubRaceInfoContainer = styled.div`
background-color: black;
border: 2px solid rgb(120,0,0);
box-shadow: 0px 5px 12px 5px black;
height: fit-content;
color: white;
padding: 15px;
margin: 30px;
`

const H2 = styled.h2`
margin-top: 15px;
`

const Para = styled.p`
margin: 10px 0px;
`

const BoldSpan = styled.span`
font-weight: bold;
text-decoration: underline;
`

const HomeButton = styled.button`
border: 3px solid rgb(25,25,25);
background-color: rgb(200,0,0);
padding: 5px 20px;
margin-bottom: 10px;
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

export default Calculator