import React from "react"
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Card from "../../elements/card";

export const Title = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 600;  
`

export const Summary = styled("p")`
  font-size: 0.9rem;
  opacity: 0.8;
  font-weight:500;
  ul {
    margin: 0
  }
`

function AboutCard() {
  return (
    <Card
      submitButton={{visible: false}}
      cancelButton={{visible: false}}
      mainCardStyle={{ backgroundColor: '#e4e7f1' }}
    >
      <Title style={{textAlign: "center"}}>
        About Company
      </Title>
      <Summary
        style={{textAlign: "center"}}
        title={"Geeks Invention is providing IT services on domains like X, X, X, X and considering the requirement of yours, we have curated auspicious profile which matches with your requirement upto 90%. You don't need to look any where apart from this profile. Explore below profile and hit \"Shortlisted\" if you want to discuss about them further."}>
        Geeks Invention is providing IT services on domains like X, X, X, X and considering the requirement of
        yours, we have curated auspicious profile which matches with your requirement upto 90%. You don't need
        to look any where apart from this profile. Explore below profile and hit "Shortlisted" if you want to
        discuss about them further.
      </Summary>
    </Card>
  )
}

export default AboutCard
