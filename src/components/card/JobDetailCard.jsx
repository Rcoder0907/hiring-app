import React from "react"
import {LocationOn as LocationOnIcon} from "@mui/icons-material";
import {randomColor, StyledChips, SkillTitle, Summary, Title} from "./common";
import Card from "../../elements/card";

function JobDetailCard({
                           title,
                           location: {city, state, country} = {},
                           summary,
                           primarySkills = [],
                           secondarySkills = []
                       }) {
    return (
        <Card
            header={{
                title: title,
                subheader: (
                    <div className={"location-subheader"} style={{display: "flex", alignItems: "flex-end"}}>
                        <LocationOnIcon/> {`${city ? city + ", " : ""}${state ? state + ", " : ""}${country ? country : ""}`}
                    </div>
                )
            }}
            submitButton={{visible: false}}
            cancelButton={{visible: false}}
        >
            <Title>
                Description
            </Title>
            <Summary
                title={summary}>
                {summary}
            </Summary>
            {/*<SkillTitle>Key Points</SkillTitle>*/}
            {/*<Summary dangerouslySetInnerHTML={{__html: keyPoints}}/>*/}

            <SkillTitle>Primary skills</SkillTitle>
            {primarySkills.map((label, index) => {
                const selectedColor = randomColor()
                return <StyledChips key={"primary-job" + index} label={label} sx={{
                    bgcolor: selectedColor.light, '& .MuiChip-label': {
                        color: selectedColor.dark,
                    }
                }}/>
            })}
            <SkillTitle>Secondary skills</SkillTitle>
            {secondarySkills.map((label, index) => {
                const selectedColor = randomColor()
                return <StyledChips key={"secondary-job" + index} label={label} sx={{
                    bgcolor: selectedColor.light, '& .MuiChip-label': {
                        color: selectedColor.dark,
                    }
                }}/>
            })}
        </Card>
    )
}

export default JobDetailCard
