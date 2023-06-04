import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    Tooltip,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactElement } from "react";
import PassEnd from "./PassEnd";

export default (props: {
    dc: number;
    cause?: ReactElement;
    children?: ReactElement;
}) => {
    return (
        <Accordion sx={{ boxShadow: "none" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Tooltip
                    title={
                        props.dc === 0
                            ? "这意味着 PC 的检定尝试未通过最小的检定难度(DC)"
                            : "当大于此检定难度, 玩家游戏流程进入此选项"
                    }
                >
                    <Card
                        sx={{
                            paddingX: 0.3,
                            flexShrink: 0,
                            border: "solid 0.5px",
                            boxShadow: "none"
                        }}
                    >
                        {props.dc === 0 ? "未通过" : "DC ≥ " + props.dc}
                    </Card>
                </Tooltip>
            </AccordionSummary>
            <AccordionDetails sx={{ borderLeft: "solid 2px" }}>
                <Typography>{props.cause}</Typography>
                {props.children ?? <PassEnd />}
            </AccordionDetails>
        </Accordion>
    );
};
