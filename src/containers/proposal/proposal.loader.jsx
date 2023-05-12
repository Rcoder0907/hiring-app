import React from 'react'
import {Container} from "@mui/material";
import Skeleton from '@mui/material/Skeleton';

function ProposalContainerLoader() {
    return (
        <div>
            <Container maxWidth="xl" sx={{marginTop: "15px", overflow: "auto"}}>
                <div style={{display: "grid", gridTemplateColumns: "200px auto", gridGap: "1rem", marginTop: 15}}>
                    <Skeleton height={145}/>
                    <Skeleton/>
                </div>
                <h1>Candidate</h1>
                <div style={{display: "grid", gridTemplateColumns: "200px auto", gridGap: "1rem"}}>
                    <div style={{height: "100%", width: "100%"}}>
                        <div style={{display: "flex", flexDirection: "column", marginTop: "10px"}}>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                        </div>
                    </div>
                    <div style={{marginBottom: 15, position: "relative"}}>
                        <div style={{
                            position: "absolute", top: "-35px", display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}>
                            <Skeleton width={"100%"}/>

                        </div>
                        <div style={{marginTop: 10}}>
                            <Skeleton variant="rectangular" height={500}/>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ProposalContainerLoader
