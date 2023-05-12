import {styled} from "@mui/material/styles";
import {Button} from "@mui/material";

export const CustomButton = styled(Button)`
    background-color: ${({type}) => type === "primary" ? "#ff5f01" : "white"};
    color: ${({type}) => type === "primary" ? "white" : "black"};
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    :hover {
        background-color: ${({type}) => type === "primary" ? "#ff5f01" : "white"};
        color: ${({type}) => type === "primary" ? "white" : "black"};
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    }
`
