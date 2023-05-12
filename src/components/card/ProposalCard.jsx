import React from "react"
import {Summary, Title} from "./common";
import Card from "../../elements/card";

function ProposalCard({summary}) {
    return (
        <Card
            submitButton={{visible: false}}
            cancelButton={{visible: false}}
        >
            <Title style={{textAlign: "center"}}>
                About Proposal
            </Title>
            <Summary
                style={{textAlign: "center"}}
                title={summary}>
                {summary}
            </Summary>

        </Card>
    )
}

export default ProposalCard
