import {SubTitle, Summary, Title} from "../card/common";
import Card from "../../elements/card";
import React from "react";

function CandidateProjects({candidate: {pastProjects = []} = {}}) {
    return (
        <React.Fragment>
            <div>
                <Title>
                    Projects
                </Title>
                <div style={{display: "flex", flexDirection: "column", gap: 15, marginTop: 15}}>
                    {pastProjects?.map(({name, summary, responsibility}) => {
                        return (
                            <Card
                                mainCardStyle={{
                                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                                }}
                            >
                                <SubTitle>{name}</SubTitle>
                                {summary ?
                                    <Summary>
                                        {summary}
                                    </Summary> : null
                                }
                                {responsibility ? <>
                                    <SubTitle>Responsibility</SubTitle>
                                    <Summary>
                                        {responsibility}
                                    </Summary>
                                </> : null}
                            </Card>
                        )
                    })}
                </div>
            </div>
        </React.Fragment>
    )
}

export default CandidateProjects
