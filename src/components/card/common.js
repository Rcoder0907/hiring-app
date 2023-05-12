import {styled} from "@mui/material/styles";
import {Chip, Typography} from "@mui/material";
import * as muiColors from "@mui/material/colors";

export const Title = styled(Typography)`
    font-size: 1.5rem;
    font-weight: 600;  
`

export const Summary = styled("p")`
    // display: -webkit-box;
    // -webkit-line-clamp: 5;
    // -webkit-box-orient: vertical;  
    // overflow: hidden;
    font-size: 0.9rem;
    opacity: 0.8;
    font-weight:500;
    ul {
     margin: 0
    }
`

export const StyledChips = styled(Chip)`
    border-radius: 5px;
    margin-right: 5px;
    background-color: ${({active}) => active?.isActive ? active.secondaryBgColor : active?.primaryBgColor ? active?.primaryBgColor : "white"};
    color: ${({active}) => active?.isActive ? active.secondaryColor : active?.primaryColor ? active?.primaryColor : "black"};
    .MuiChip-label {
        padding: 0 10px; 
        font-weight: 600;  
    }
    ${({active}) => active ?
    `:hover {
        cursor: pointer;
        background-color: ${active.secondaryBgColor};
        color: ${active.secondaryColor};
    }` : ""}
`

export const SubTitle = styled("p")`
    font-size: 1rem;
    font-weight: 600;
`
const LightColorPalette = Object.keys(muiColors).map((value) => {
    if (muiColors[value][50]) {
        return {light: muiColors[value][50], dark: muiColors[value][500]}
    }
    return null
}).filter((value) => !!value);

export function randomColor() {
    return LightColorPalette[Math.floor(Math.random() * 19)]
}
