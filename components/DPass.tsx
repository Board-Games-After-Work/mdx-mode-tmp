import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PassEnd from "./PassEnd";
import { ReactElement } from "react";

export default (props: {
    title: string;
    cause?: ReactElement;
    children?: ReactElement;
}) => {
    return (
        <Accordion sx={{ boxShadow: "none" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component="div">{props.title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ borderLeft: "solid 2px" }}>
                <Typography whiteSpace="pre" component="div">
                    {props.cause}
                </Typography>
                {props.children ?? <PassEnd />}
            </AccordionDetails>
        </Accordion>
    );
};
