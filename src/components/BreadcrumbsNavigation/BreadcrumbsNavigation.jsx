import {StyledChips} from "../card/common";
import {Breadcrumbs} from "@mui/material";


export default function CustomizedBreadcrumbs({labels, onChange, activeTab}) {
    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb" separator={""}>
                {labels.map(({label, value}, index) => {
                    return <StyledChips
                        key={value + index}
                        active={{
                            isActive: value === activeTab,
                            primaryBgColor: "white",
                            secondaryBgColor: "#283556",
                            primaryColor: "#283556",
                            secondaryColor: "white",
                        }}
                        onClick={() => onChange(value)}
                        label={label}
                    />
                })}
            </Breadcrumbs>
        </div>
    );
}
