import { Box, Card, CardContent, Tooltip, Typography } from "@mui/material";
import BalanceIcon from "@mui/icons-material/Balance";
import { ReactElement } from "react";

export default (props: {
    title: string;
    introduce?: string;
    children: ReactElement;
}) => {
    return (
        <Card sx={{ minWidth: 275, margin: 1 }}>
            <CardContent>
                <Typography
                    sx={{
                        fontSize: 15,
                        display: "flex",
                        alignItems: "center",
                    }}
                    color="text.secondary"
                    component="div"
                    gutterBottom
                >
                    <BalanceIcon
                        fontSize="small"
                        sx={{ marginRight: 0.2, marginTop: -0.1 }}
                    />{" "}
                    抉择
                </Typography>
                <Typography variant="h5" component="div">
                    {props.title}
                </Typography>

                <Typography
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                    whiteSpace="pre"
                    component="div"
                >
                    {props.introduce}
                </Typography>

                {props.children}
            </CardContent>
        </Card>
    );
};
