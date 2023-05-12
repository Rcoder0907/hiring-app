import React from "react";
import {Avatar} from "@mui/material";
import {Summary, Title} from "../card/common";
import CandidateSkillChart from "../chart/CandidateSkillChart";
import {styled} from "@mui/material/styles";

const ProfileAbout = styled("div")`
    display: grid;
    grid-template-columns: 200px auto;
    gap: 10px;
`

const ProfileSummary = styled("div")`
    display: grid;
    grid-template-columns: auto 300px;
    gap: 20px;
`

const LocationWrapper = styled("div")`
    display: grid; 
    grid-template-columns: repeat(2,1fr);
    gap: 5px;
    position: relative;
    ::after {
        content: " ";
        display: block;
        position: absolute;
        width: 2px;
        left: -10px;
        /* top: 5px; */
        height: 100%;
        opacity: 0.8;
        margin: auto;
        border-left: 2px dashed rgb(0 0 0 / 80%);
    }
`

const ProfileSkill = styled("div")`
    display: grid; 
    grid-template-columns: repeat(2,1fr);
    margin-top: 25px;
    gap: 15px;
`


function CandidateSummary({
                              candidate: {
                                  name = "",
                                  photo = "",
                                  title = "",
                                  summary = "",
                                  address: {city = "", country = ""} = {},
                                  timezone = "",
                                  availability = "",
                                  compensation: {monthlyRate = ""} = "",
                                  primarySkills = [],
                                  secondarySkills = []
                              } = {},
                              candidate
                          }) {
    return (

        <React.Fragment>
            <ProfileAbout>
                <Avatar src={photo} variant="rounded" style={{width: "100%", height: "100%"}}>
                    {name[0]}
                </Avatar>
                <div>
                    <Title>
                        {`${name} - ${title}`}
                    </Title>
                    <ProfileSummary>
                        <Summary
                            title={summary}>
                            {summary}
                        </Summary>
                        <LocationWrapper>
                            <div>
                                <Summary>Location</Summary>
                                <Summary>Timezone</Summary>
                                <Summary>Availability</Summary>
                                <Summary>compensation</Summary>
                            </div>
                            <div>
                                <Summary>{city}, {country}</Summary>
                                <Summary>{timezone}</Summary>
                                <Summary>{availability}</Summary>
                                <Summary>USD {monthlyRate}/monthly</Summary>
                            </div>
                        </LocationWrapper>
                    </ProfileSummary>
                </div>
            </ProfileAbout>
            <ProfileSkill>
                <div>
                    <Title>
                        Primary skills
                    </Title>
                    <CandidateSkillChart data={primarySkills} title={"Primary skills"}/>
                </div>
                <div>
                    <Title>
                        Secondary skills
                    </Title>
                    <CandidateSkillChart data={secondarySkills} title={"Secondary skills"}/>
                </div>
            </ProfileSkill>
        </React.Fragment>
    )
}

export default CandidateSummary;
