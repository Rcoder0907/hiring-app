import {SubTitle, Summary, Title} from "../card/common";
import Card from "../../elements/card";
import React from "react";
import {styled} from "@mui/material/styles";
import {CalendarMonth, Work} from "@mui/icons-material";

const Timeline = styled("div")`
    position: relative;
     :before {
        content: "";
        position: absolute;
        width: 6px;
        background-color: #283556;
        top: 0;
        bottom: 0;
        left: 0;
     }
`

const Container = styled("div")`
    padding: 10px 40px;
    position: relative;
    background-color: inherit;
    
    :before {
        content: " ";
        height: 0;
        position: absolute;
        top: 22px;
        width: 0;
        z-index: 1;
        left: 30px;
        border: medium solid black;
        border-width: 10px 10px 10px 0;
        border-color: transparent white transparent transparent;
    }
`

const TimelineIcon = styled("div")`
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: #283556;
        top: 20px;
        border-radius: 50%;
        z-index: 1;
        left: -12px;
        display: flex;
        align-items: center;
        justify-content: center;
        display: flex;
        justify-content: center;
        align-items: center;
`

function CandidateWorkExperience({candidate: {workExperience = []} = {}}) {
    return (
        <React.Fragment>
            <div>
                <Title>
                    Work Experience
                </Title>
                <Timeline className="timeline" style={{marginTop: 15}}>
                    {workExperience.map(({
                                             companyName,
                                             fromYear,
                                             toYear,
                                             responsibility,
                                             summary,
                                             title,
                                             location: {city, state, country}
                                         }) => {
                        return <Container>
                            <TimelineIcon>
                                <Work style={{color: "white", width: 16, height: 16}}/>
                            </TimelineIcon>
                            <Card
                                mainCardStyle={{
                                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        borderBottom: "1px solid #BFC3C7"
                                    }}
                                >
                                    <h2>{title}</h2>
                                    <Summary
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 5
                                        }}
                                    >
                                        <CalendarMonth/> {fromYear} - {toYear}
                                    </Summary>
                                </div>
                                <Summary style={{margin: 0}}>
                                    {companyName}
                                </Summary>
                                {summary ?
                                    <>
                                        <SubTitle>Summary</SubTitle>
                                        <Summary>
                                            {summary}
                                        </Summary>
                                    </> : ""}

                                {responsibility ? <>
                                    <SubTitle>Responsibilities</SubTitle>
                                    <Summary>
                                        {responsibility}
                                    </Summary>
                                </> : ""}
                            </Card>
                        </Container>
                    })}

                </Timeline>
            </div>
        </React.Fragment>
    )
}

export default CandidateWorkExperience
