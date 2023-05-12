import React from "react"
import {Avatar} from "@mui/material";
import Card from "../../elements/card";
import {LocationOn as LocationOnIcon} from '@mui/icons-material';
import TestAvatar from "../../assets/TestAvatar.jpg"
import {randomColor, StyledChips, Summary, Title, SubTitle} from "./common";


function CandidateCard({
                           name,
                           location: {city, state, country} = {},
                           role,
                           summary,
                           keyPoints,
                           matchingPrimarySkills = [],
                           matchingSecondarySkills = []
                       }) {
    return (
        <Card
            header={{
                avatar: (
                    <Avatar sx={{bgcolor: "#e5b4e2"}} aria-label="recipe" src={TestAvatar}>
                        Y
                    </Avatar>),
                title: name,
                subheader: (
                    <div className={"location-subheader"} style={{display: "flex", alignItems: "flex-end"}}>
                        <LocationOnIcon/> {`${city ? city + ", " : ""}${state ? state + ", " : ""}${country ? country : ""}`}
                    </div>
                )
            }}
            submitButton={{visible: true, text: "Interested"}}
            cancelButton={{visible: true, text: "Not Interested"}}
        >
            <Title>
                {role}
            </Title>
            <Summary
                title={summary}>
                {summary}
            </Summary>
            <SubTitle>Key Points</SubTitle>
            <Summary dangerouslySetInnerHTML={{__html: keyPoints}}/>

            <SubTitle>Primary skills</SubTitle>
            {matchingPrimarySkills.map((label, index) => {
                const selectedColor = randomColor()
                return <StyledChips key={"primary" + index} label={label} sx={{
                    bgcolor: selectedColor.light, '& .MuiChip-label': {
                        color: selectedColor.dark,
                    }
                }}/>
            })}
            <SubTitle>Secondary skills</SubTitle>
            {matchingSecondarySkills.map((label, index) => {
                const selectedColor = randomColor()
                return <StyledChips key={"secondary" + index} label={label} sx={{
                    bgcolor: selectedColor.light, '& .MuiChip-label': {
                        color: selectedColor.dark,
                    }
                }}/>
            })}
        </Card>
    )
}

export default CandidateCard
