import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { styled } from "@mui/material/styles";
import {
  Container, Alert, Box, Divider, Grid, Button, InputLabel,
  FormControl, Select, MenuItem, Slider, FormHelperText
} from "@mui/material";
import { withSwal } from 'react-sweetalert2';

import AboutCard from './about';
import Input from '../../elements/input'

import { fetchCandidateScreeningProfile, saveCandidateScreeningProfile } from '../../services/screening.service';

import GeekesInventionLogo from "../../assets/geeks-gray.png"



const MainAlert = styled(Alert)`
  margin-left: 6rem;
  border-radius: 1.5rem;
  background-color: #283665;
  font-size: 16px;
  margin-bottom: 1.5rem;
`
const DetailsDiv = styled('div')`
  margin-top: 3.5rem;
`
const LabelDiv = styled('div')`
  margin-bottom: 1.5rem;
  font-size: 16px;
  font-weight: 600;
`

const MainDivider = styled('div')`
  display: grid; 
  grid-template-columns: repeat(2,1fr);
  position: relative;
  ::after {
    content: " ";
    display: block;
    position: absolute;
    width: 2px;
    height: 100%;
    opacity: 0.8;
    margin: auto;
    border-left: 2px dashed rgb(0 0 0 / 80%);
  }
`

const HorizontalDivider = styled(Divider)`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`

const ButtonDiv = styled('div')`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`

const DivControl = styled('div')`
  display: flex;
  flexDirection: row;
  alignItems: center;
`

const InnerDivControl = styled('div')`
  display: flex;
  flexDirection: row;
  alignItems: center;
  margin: 1rem;
  text-transform: capitalize;
`

const LabelControl = styled(InputLabel)`
  display: flex;
  margin-top: 1.5rem;
  white-space: normal;
`

const MainFormControl = styled(FormControl)`
  margin: 1rem;
`

const SkillMainFormControl = styled(FormControl)`
  margin: 1rem;
  width: 100%
`

const Screening = (props) => {

  const [ candidateScreening, setCandidateScreening ] = useState({});
  const [formError, setFormError] = useState({ questions: [] });

  const { screeningUuid } = useParams();

  const fetchCandidateProfile = async () => {
    const response = await fetchCandidateScreeningProfile(screeningUuid);
    if (response?.statusCode === 200) {
      setCandidateScreening(response?.data || {});
    } else {
      props.swal.fire({
        title: 'Error',
        text: `Error while fetching Candidate screening, Please try again later`,
        icon: 'error',
      });
    }
  }

  useEffect(() => {
    fetchCandidateProfile();
  }, []);

  const handleInputChange = (event) => {
    formError[event?.target?.name] = "";
    setFormError(formError);
    const changedCandidateScreening = { ...candidateScreening };
    changedCandidateScreening[event?.target?.name] = event?.target?.value;
    setCandidateScreening(changedCandidateScreening);
  }

  const handleQuestionsChange = (event, index) => {
    if (formError?.questions?.[index]) {
      formError.questions[index] = "";
      setFormError(formError);
    }
    const changedCandidateScreening = { ...candidateScreening };
    changedCandidateScreening.questions[index].answer = event?.target?.value;
    setCandidateScreening(changedCandidateScreening);
  }

  const handleSkillSliderChange = (event, newValue, index) => {
    const changedCandidateScreening = { ...candidateScreening };
    changedCandidateScreening.skills[index].rating = newValue;
    setCandidateScreening(changedCandidateScreening);
  }

  const handleSubmit = async () => {
    setFormError({});
    const newFormError = { questions: [] };
    let isError = false;

    if (!candidateScreening?.candidateFirstName) {
      newFormError.candidateFirstName = "Required"
      isError = true;
    }

    if (!candidateScreening?.candidateLastName) {
      newFormError.candidateLastName = "Required"
      isError = true;
    }

    if (!candidateScreening?.location) {
      newFormError.location = "Required"
      isError = true;
    }

    if (!candidateScreening?.totalExperiance) {
      newFormError.totalExperiance = "Required"
      isError = true;
    }

    if (!candidateScreening?.primarySkill) {
      newFormError.primarySkill = "Required"
      isError = true;
    }

    if (!candidateScreening?.expInThisProfile) {
      newFormError.expInThisProfile = "Required"
      isError = true;
    }

    if (!candidateScreening?.communication) {
      newFormError.communication = "Required"
      isError = true;
    }

    if (!candidateScreening?.overlappingHours) {
      newFormError.overlappingHours = "Required"
      isError = true;
    }

    if (!candidateScreening?.currentLPA) {
      newFormError.currentLPA = "Required"
      isError = true;
    }

    if (!candidateScreening?.expectedLPA) {
      newFormError.expectedLPA = "Required"
      isError = true;
    }

    if (!candidateScreening?.noticePeriod) {
      newFormError.noticePeriod = "Required"
      isError = true;
    }

    candidateScreening?.questions?.forEach((question, index) => {
      if (!question?.answer) {
        newFormError.questions[index] = "Required"
        isError = true;
      }
    })

    if (isError) {
      setFormError(newFormError);
      return;
    }

    const requestBody = {
      candidateFirstName: candidateScreening?.candidateFirstName,
      candidateLastName: candidateScreening?.candidateLastName,
      location: candidateScreening?.location,
      totalExperiance: Number.parseInt(candidateScreening?.totalExperiance),
      primarySkill: candidateScreening?.primarySkill,
      expInThisProfile: Number.parseInt(candidateScreening?.expInThisProfile),
      communication: candidateScreening?.communication,
      overlappingHours: candidateScreening?.overlappingHours,
      currentLPA: Number.parseFloat(candidateScreening?.currentLPA),
      expectedLPA: Number.parseFloat(candidateScreening?.expectedLPA),
      noticePeriod: Number.parseInt(candidateScreening?.noticePeriod),
      questions: candidateScreening?.questions,
      skills: candidateScreening?.skills,
      status: 'submitted'
    }

    await saveCandidateScreeningProfile(candidateScreening?.uuid, requestBody)
      .then(response => {
        if (response?.statusCode === 200) {
          props.swal.fire({
            title: 'Success',
            text: `Your response recorded successfully, HR will contact you soon.`,
            icon: 'success',
          });
          setCandidateScreening({});
          fetchCandidateProfile();
        } else {
          props.swal.fire({
            title: 'Oops',
            text: `Error while adding screening, please try again`,
            icon: 'error',
          });
        }
      }).catch(error => {
        props.swal.fire({
          title: 'Oops',
          text: `Error while adding screening, please try again`,
          icon: 'error',
        });
      });
  }

  const valuetext = (value) => {
    return value;
  }



  return (
    <div>
      <Container maxWidth="xl" sx={{marginTop: "15px", overflow: "auto"}}>
        <div style={{display: "grid", gridTemplateColumns: "200px auto", gridGap: "1rem", marginTop: 15}}>
          <img style={{height: 50}} src={GeekesInventionLogo} alt={"error"}/>
          <MainAlert icon={false} variant="filled" severity="error">
            Screening request for <b>{candidateScreening?.candidateEmail}</b> from <b>Geeks Invention Pvt Ltd</b>
          </MainAlert>
        </div>
        <AboutCard/>
        {
          candidateScreening?.status === 'sent' ?
            <DetailsDiv>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={4}>
                    <LabelDiv>
                      Basic Details
                    </LabelDiv>
                    <Grid item xs={6} md={12}>
                      <DivControl>
                        <Grid item xs={6} md={4}>
                          <LabelControl>First name</LabelControl>
                        </Grid>
                        <Grid item xs={6} md={8}>
                          <MainFormControl>
                            <Input
                              name="candidateFirstName"
                              type="text"
                              variant="outlined"
                              placeholder="Enter first name"
                              InputLabelProps={{
                                shrink: false,
                              }}
                              size="small"
                              value={candidateScreening?.candidateFirstName || ""}
                              onChange={handleInputChange}
                              error={formError?.candidateFirstName}
                            />
                          </MainFormControl>
                        </Grid>
                      </DivControl>
                    </Grid>
                    <Grid item xs={6} md={12}>
                      <DivControl>
                        <Grid item xs={6} md={4}>
                          <LabelControl>Last name</LabelControl>
                        </Grid>
                        <Grid item xs={6} md={8}>
                          <MainFormControl>
                            <Input
                              name="candidateLastName"
                              type="text"
                              variant="outlined"
                              placeholder="Enter last name"
                              InputLabelProps={{
                                shrink: false,
                              }}
                              size="small"
                              value={candidateScreening?.candidateLastName || ""}
                              onChange={handleInputChange}
                              error={formError?.candidateLastName}
                            />
                          </MainFormControl>
                        </Grid>
                      </DivControl>
                    </Grid>
                    <Grid item xs={6} md={12}>
                      <DivControl>
                        <Grid item xs={6} md={4}>
                          <LabelControl>Location</LabelControl>
                        </Grid>
                        <Grid item xs={6} md={8}>
                          <MainFormControl>
                            <Input
                              name="location"
                              type="text"
                              variant="outlined"
                              placeholder="Enter location"
                              InputLabelProps={{
                                shrink: false,
                              }}
                              size="small"
                              value={candidateScreening?.location || ""}
                              onChange={handleInputChange}
                              error={formError?.location}
                            />
                          </MainFormControl>
                        </Grid>
                      </DivControl>
                    </Grid>
                    <Grid item xs={6} md={12}>
                      <DivControl>
                        <Grid item xs={6} md={4}>
                          <LabelControl>Total Exp in IT industry</LabelControl>
                        </Grid>
                        <Grid item xs={6} md={8}>
                          <MainFormControl>
                            <Input
                              name="totalExperiance"
                              type="number"
                              variant="outlined"
                              placeholder="Enter total exp in IT industry"
                              InputLabelProps={{
                                shrink: false,
                              }}
                              size="small"
                              value={candidateScreening?.totalExperiance || ""}
                              onChange={handleInputChange}
                              error={formError?.totalExperiance}
                            />
                          </MainFormControl>
                        </Grid>
                      </DivControl>
                    </Grid>
                    <Grid item xs={6} md={12}>
                      <DivControl>
                        <Grid item xs={6} md={4}>
                          <LabelControl>Primary Skills</LabelControl>
                        </Grid>
                        <Grid item xs={6} md={8}>
                          <MainFormControl>
                            <Input
                              name="primarySkill"
                              type="text"
                              variant="outlined"
                              placeholder="Enter primary skills"
                              InputLabelProps={{
                                shrink: false,
                              }}
                              size="small"
                              value={candidateScreening?.primarySkill || ""}
                              onChange={handleInputChange}
                              error={formError?.primarySkill}
                            />
                          </MainFormControl>
                        </Grid>
                      </DivControl>
                    </Grid>
                    <Grid item xs={6} md={12}>
                      <DivControl>
                        <Grid item xs={6} md={4}>
                          <LabelControl>Exp in Primary Skills</LabelControl>
                        </Grid>
                        <Grid item xs={6} md={8}>
                          <MainFormControl>
                            <Input
                              name="expInThisProfile"
                              type="number"
                              variant="outlined"
                              placeholder="Enter exp in primary skills"
                              InputLabelProps={{
                                shrink: false,
                              }}
                              size="small"
                              value={candidateScreening?.expInThisProfile || ""}
                              onChange={handleInputChange}
                              error={formError?.expInThisProfile}
                            />
                          </MainFormControl>
                        </Grid>
                      </DivControl>
                    </Grid>
                  </Grid>
                  <MainDivider />
                  <Grid item xs={6} md={8}>
                    <LabelDiv>
                      Questionnaire
                    </LabelDiv>
                    <Grid item xs={6} md={12}>
                      <DivControl>
                        <Grid item xs={6} md={8}>
                          <LabelControl>
                            Can you speak fluent English & can talk/understand to US developers (We will put you on the right project accordingly)?
                          </LabelControl>
                        </Grid>
                        <Grid item xs={6} md={4}>
                          <MainFormControl sx={{ m: 1, minWidth: 200, ml: 2 }} size="small">
                            <Select
                              name="communication"
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                              onChange={handleInputChange}
                              value={candidateScreening?.communication || ""}
                            >
                              <MenuItem value={'basic'}>Basic</MenuItem>
                              <MenuItem value={'native'}>Native</MenuItem>
                              <MenuItem value={'fluent'}>Fluent</MenuItem>
                              <MenuItem value={'professional'}>Professional</MenuItem>
                            </Select>
                            {
                              formError?.communication ?
                                <FormHelperText className="error">
                                  {formError?.communication}
                                </FormHelperText>
                              : null
                            }
                          </MainFormControl>
                        </Grid>
                      </DivControl>
                    </Grid>
                    <Grid item xs={6} md={12}>
                      <DivControl>
                        <Grid item xs={6} md={8}>
                          <LabelControl>How many overlapping hours you can give for EST & PST?</LabelControl>
                        </Grid>
                        <Grid item xs={6} md={4}>
                          <MainFormControl>
                            <Input
                              name="overlappingHours"
                              type="text"
                              variant="outlined"
                              placeholder="Enter overlapping hours"
                              InputLabelProps={{
                                shrink: false,
                              }}
                              size="small"
                              value={candidateScreening?.overlappingHours || ""}
                              onChange={handleInputChange}
                              error={formError?.overlappingHours}
                            />
                          </MainFormControl>
                        </Grid>
                      </DivControl>
                    </Grid>
                    <Grid item xs={6} md={12}>
                      <DivControl>
                        <Grid item xs={6} md={8}>
                          <LabelControl>Your current pay (LPA) ?</LabelControl>
                        </Grid>
                        <Grid item xs={6} md={4}>
                          <MainFormControl>
                            <Input
                              name="currentLPA"
                              type="number"
                              variant="outlined"
                              placeholder="Enter current pay"
                              InputLabelProps={{
                                shrink: false,
                              }}
                              size="small"
                              value={candidateScreening?.currentLPA || ""}
                              onChange={handleInputChange}
                              error={formError?.currentLPA}
                            />
                          </MainFormControl>
                        </Grid>
                      </DivControl>
                    </Grid>
                    <Grid item xs={6} md={12}>
                      <DivControl>
                        <Grid item xs={6} md={8}>
                          <LabelControl>Your expected pay (LPA)?</LabelControl>
                        </Grid>
                        <Grid item xs={6} md={4}>
                          <MainFormControl>
                            <Input
                              name="expectedLPA"
                              type="number"
                              variant="outlined"
                              placeholder="Enter expected pay"
                              InputLabelProps={{
                                shrink: false,
                              }}
                              size="small"
                              value={candidateScreening?.expectedLPA || ""}
                              onChange={handleInputChange}
                              error={formError?.expectedLPA}
                            />
                          </MainFormControl>
                        </Grid>
                      </DivControl>
                    </Grid>
                    <Grid item xs={6} md={12}>
                      <DivControl>
                        <Grid item xs={6} md={8}>
                          <LabelControl>Your Notice period (in days)?</LabelControl>
                        </Grid>
                        <Grid item xs={6} md={4}>
                          <MainFormControl>
                            <Input
                              name="noticePeriod"
                              type="number"
                              variant="outlined"
                              placeholder="Enter notice period in days"
                              InputLabelProps={{
                                shrink: false,
                              }}
                              size="small"
                              value={candidateScreening?.noticePeriod || ""}
                              onChange={handleInputChange}
                              error={formError?.noticePeriod}
                            />
                          </MainFormControl>
                        </Grid>
                      </DivControl>
                    </Grid>
                    {
                      candidateScreening?.questions?.map((question, index) => {
                        return (
                          <Grid item xs={6} md={12}>
                            <DivControl>
                              <Grid item xs={6} md={8}>
                                <LabelControl>{question?.question}</LabelControl>
                              </Grid>
                              <Grid item xs={6} md={4}>
                                <MainFormControl>
                                  <Input
                                    type="text"
                                    variant="outlined"
                                    placeholder="Enter answer"
                                    InputLabelProps={{
                                      shrink: false,
                                    }}
                                    size="small"
                                    value={question?.answer || ""}
                                    onChange={(event) => handleQuestionsChange(event, index)}
                                    error={formError?.questions?.[index]}
                                  />
                                </MainFormControl>
                              </Grid>
                            </DivControl>
                          </Grid>
                        )
                      })
                    }
                    <Grid item xs={6} md={12}>
                      <DivControl>
                        <Grid item xs={6} md={12}>
                          <LabelControl>Please rate yourself on a scale of 0 to 10 where 10 experts and 0 means no knowledge.</LabelControl>
                        </Grid>
                      </DivControl>
                      {
                        candidateScreening?.skills?.map((skill, index) => {
                          const skillName =  skill?.name?.replace('-', ' ');
                          return (
                            <InnerDivControl>
                              <Grid item xs={6} md={2}>
                                <LabelControl>{skillName}</LabelControl>
                              </Grid>
                              <Grid item xs={6} md={4}>
                                <SkillMainFormControl>
                                  <Slider
                                    aria-label="Always visible"
                                    value={skill?.rating || 0}
                                    getAriaValueText={valuetext}
                                    step={1}
                                    valueLabelDisplay="on"
                                    min={0}
                                    max={10}
                                    onChange={(event, newValue) => handleSkillSliderChange(event, newValue, index)}
                                  />
                                </SkillMainFormControl>
                              </Grid>
                            </InnerDivControl>
                          )
                        })
                      }
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <HorizontalDivider />
              <ButtonDiv>
                <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
              </ButtonDiv>
            </DetailsDiv>
          : candidateScreening?.status === 'submitted' ?
            <Alert severity="warning" variant="filled">Your details already submitted</Alert>
          : <Alert severity="error" variant="filled">Link is Expired </Alert>
        }
      </Container>
    </div>
  )
}

export default withSwal(Screening)
