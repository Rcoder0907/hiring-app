import React from "react"
import {styled} from "@mui/material/styles";
import {Card, CardActions, CardContent, CardHeader} from "@mui/material";
import {CustomButton} from "./button";


const MainCard = styled(Card)`
    display: flex;
    flex-direction: column;
    max-height: 800px;
    min-width: 500px;
    // max-width: 700px;
    height:100%;
    border-radius: 14px;
    box-shadow: ${({mainCardStyle = {}}) => mainCardStyle.boxShadow ? mainCardStyle.boxShadow : "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"};
    color: ${({mainCardStyle = {}}) => mainCardStyle.color ? mainCardStyle.color : "black"};
    position: ${({mainCardStyle = {}}) => mainCardStyle.position ? mainCardStyle.position : "relative"};
    border: 0;
    background-color: ${({mainCardStyle = {}}) => mainCardStyle.backgroundColor ? mainCardStyle.backgroundColor : "white"}   
    ${({hoverEffect}) => hoverEffect ? `&:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    }` : ""}
`

const MainCardHeader = styled(CardHeader)`
    padding: 1rem;
    .MuiCardHeader-title {
      font-size: 1.2rem;
      font-weight: 600;
    }
    .MuiCardHeader-subheader {
        font-size: 0.8rem;
    }
`

const MainCardContent = styled(CardContent)`
    overflow: auto;
    padding: 1rem;
`

const MainCardActions = styled(CardActions)`
    margin-top: auto;
    padding: 1rem;   
`

function CardElement({
                         header,
                         submitButton: {
                             visible: submitButtonVisible,
                             disabled: submitButtonDisabled,
                             text: submitButtonText,
                             action: submitButtonAction = () => {
                             }
                         } = {},
                         cancelButton: {
                             visible: cancelButtonVisible,
                             disabled: cancelButtonDisabled,
                             text: cancelButtonText,
                             action: cancelButtonAction = () => {
                             }
                         } = {},
                         hoverEffect = false,
                         mainCardStyle = {},
                         ...props
                     }) {
    return (
        <MainCard variant="outlined" hoverEffect={hoverEffect} mainCardStyle={mainCardStyle}>
            {header ? <MainCardHeader
                {...header}
            /> : null}
            <MainCardContent>
                {props.children}
            </MainCardContent>
            {submitButtonVisible || cancelButtonVisible ?
                <MainCardActions>
                    {submitButtonVisible ?
                        <CustomButton
                            type={"primary"}
                            disabled={submitButtonDisabled}
                            onClick={submitButtonAction}
                        >
                            {submitButtonText || "Interested"}
                        </CustomButton> : null}
                    {cancelButtonVisible ?
                        <CustomButton
                            disabled={cancelButtonDisabled}
                            onClick={cancelButtonAction}
                        >
                            {cancelButtonText || "Not Interested"}
                        </CustomButton> : null}
                </MainCardActions> : null}
        </MainCard>
    )
}

export default CardElement
