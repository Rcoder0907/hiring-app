import React, {useEffect, useState} from 'react'
import {Container, Tab, Tabs, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import GeekiFyMeLogo from "../../assets/Geekify_me.png";
import ProposalCard from "../../components/card/ProposalCard";
import Card from "../../elements/card";
import CandidateSummary from "../../components/CandidateProfile/CandidateSummary";
import CandidateWorkExperience from "../../components/CandidateProfile/CandidateWorkExperince";
import CandidateProjects from "../../components/CandidateProfile/CandidateProjects";
import {fetchProposal, saveProposalStatus} from "../../services/proposal.service";
import {useParams} from "react-router-dom";
import ProposalContainerLoader from "./proposal.loader";
import * as PropTypes from "prop-types";
import {CustomButton} from "../../elements/button";
import {StyledChips} from "../../components/card/common";

const ListMenuItem = styled("h3")`
    // display: flex;
    background-color: ${({isActive}) => isActive ? "#283556" : "#e4e7f1"};
    margin: 2px 0;
    align-items: center;
    text-align: center;
    font-weight: 500;
    gap: 5px;
    padding: 15px 10px; 
    color: ${({isActive}) => isActive ? "white" : "#283556"};
    cursor: pointer;
    border-radius: 5px;
    transition: color 0.3s ease-out, border-color 0.3s ease-out, background 0.3s ease-out, background-color 0.3s ease-out;
    :hover {
        color: white;
        background-color: #283556;
    }
`

// const Tab = styled("div")`
//     display: ${({activeTab, tabValue}) => activeTab === tabValue ? "block" : "none"};
// `
export const MenuItemSubtitle = styled("span")`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

export const StyledTabs = styled(Tabs)`
    .MuiTabs-flexContainer {
        padding : 2px 2px 0 2px;
    }
  
    .Mui-selected {
        color:#283556 !important;
        font-weight:600;
        background:white;
        z-index:1;
        box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
        
     } 
     
    .MuiTabs-indicator {
        display: none;
        }
`

function TabPanel(props) {
    const {children, value, index, activeTab, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== activeTab}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === activeTab && (
                <Typography>{children}</Typography>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    activeTab: PropTypes.string.isRequired
};


function ProposalContainer() {
    const [tab, setTab] = useState("summary")
    const [proposal, setProposal] = useState({})
    const [activeCandidate, setActiveCandidate] = useState()
    const [isProposalLoading, setIsProposalLoading] = useState(false);
    const [isUpdating, SetIsUpdating] = useState(false)
    const {proposalUuid} = useParams();

    useEffect(() => {
        setIsProposalLoading(true)
        fetchProposal(proposalUuid).then((response) => {
            if (response.statusCode === 200) {
                setProposal(response.data)
                setActiveCandidate(response.data.candidates[0])
            }
            setIsProposalLoading(false)

        }).catch(() => {
            setIsProposalLoading(false)
        })
    }, [])

    const submitProposal = (candidateId, status) => {
        SetIsUpdating(true)
        saveProposalStatus(proposalUuid, {candidateId, status}).then((response) => {
            if (response.statusCode === 200) {
                setProposal(response.data)
                setActiveCandidate(response.data.candidates[0])
            }
            SetIsUpdating(false)
        }).catch(() => {
            SetIsUpdating(false)
        })
    }

    const candidateName = proposal?.candidates?.map(({name, id, photo, title, totalExperience}) => ({
        id,
        name,
        photo,
        title,
        totalExperience
    })) ?? [];

    if (isProposalLoading) {
        return <ProposalContainerLoader/>
    }

    return (
        <div>
            <Container maxWidth="xl" sx={{marginTop: "15px", overflow: "auto"}}>
                <div style={{display: "grid", gridTemplateColumns: "200px auto", gridGap: "1rem", marginTop: 15}}>
                    <img style={{height: 145}} src={GeekiFyMeLogo} alt={"err"}/>
                    <ProposalCard summary={proposal?.summary ?? ""}/>
                </div>
                <h1>Candidate</h1>
                <div style={{display: "grid", gridTemplateColumns: "200px auto", gridGap: "1rem"}}>
                    <div style={{height: "100%", width: "100%"}}>
                        <div style={{display: "flex", flexDirection: "column", marginTop: "10px"}}>
                            {candidateName.map(({name, id, title, totalExperience}) => {
                                return (
                                    <ListMenuItem
                                        isActive={id === activeCandidate.id}
                                        onClick={() => {
                                            if (activeCandidate.id === id || isUpdating) return;
                                            const candidateFound = proposal?.candidates?.find(({id: candidateID}) => candidateID === id)
                                            setActiveCandidate(candidateFound);
                                            setTab("summary")
                                        }}>
                                        {name}
                                        <div style={{
                                            // color: "white",
                                            fontSize: "0.8rem",
                                            opacity: "0.8"
                                        }}><MenuItemSubtitle>{title}</MenuItemSubtitle> ({totalExperience} years)
                                        </div>
                                    </ListMenuItem>
                                )
                            })}
                        </div>
                    </div>
                    <div style={{marginBottom: 15, position: "relative"}} key={activeCandidate?.id ?? "candidateInfo"}>
                        <div style={{
                            position: "absolute", top: "-40px", display: "flex",
                            padding: "0 10px",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}>
                            {/*<CustomizedBreadcrumbs
                                labels={
                                    [
                                        {label: "Summary", value: "summary"},
                                        {label: "Work Experience", value: "work-experience"},
                                        {label: "Notable Projects", value: "projects"}
                                    ]
                                }
                                activeTab={tab}
                                onChange={(value) => setTab(value)}
                            />*/}
                            <StyledTabs value={tab} onChange={(e, newValue) => {
                                console.log({newValue})
                                setTab(newValue)

                            }} aria-label="basic tabs example">
                                <Tab label="Summary" value={"summary"}/>
                                <Tab label="Work Experience" value={"work-experience"}/>
                                <Tab label="Notable Projects" value={"projects"}/>
                            </StyledTabs>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}>
                                {!activeCandidate?.status?.trim() ?
                                    <>
                                        <CustomButton
                                            type={"primary"}
                                            disabled={isUpdating}
                                            onClick={() => submitProposal(activeCandidate.id, "interested")}
                                        >
                                            Interested
                                        </CustomButton>
                                        <CustomButton
                                            disabled={isUpdating}
                                            onClick={() => submitProposal(activeCandidate.id, "not-interested")}
                                        >
                                            Not Interested
                                        </CustomButton>
                                    </> :
                                    <StyledChips
                                        style={{cursor: "normal"}}
                                        active={{
                                            primaryBgColor: activeCandidate?.status === "interested" ? "green" : "red",
                                            primaryColor: "white",
                                        }}
                                        label={activeCandidate?.status}
                                    />
                                }
                            </div>

                        </div>
                        <div style={{marginTop: 10}}>
                            <Card
                                submitButton={{visible: false}}
                                cancelButton={{visible: false}}
                            >
                                {/*<Tab tabValue={"summary"} activeTab={tab}>*/}
                                <TabPanel value="summary" activeTab={tab}>
                                    <CandidateSummary candidate={activeCandidate}/>
                                </TabPanel>
                                {/*</Tab>*/}
                                {/*<Tab tabValue={"work-experience"} activeTab={tab}>*/}
                                <TabPanel value="work-experience" activeTab={tab}>
                                    <CandidateWorkExperience candidate={activeCandidate}/>
                                </TabPanel>
                                {/*</Tab>*/}
                                {/*<Tab tabValue={"projects"} activeTab={tab}>*/}
                                <TabPanel value="projects" activeTab={tab}>
                                    <CandidateProjects candidate={activeCandidate}/>
                                </TabPanel>
                                {/*</Tab>*/}
                            </Card>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ProposalContainer
