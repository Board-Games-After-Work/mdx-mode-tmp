import { Box, Card, CardContent, Tooltip, Typography } from "@mui/material";
import HexagonIcon from "@mui/icons-material/Hexagon";
import { ReactElement } from "react";

type CheckType = "智力" | "力量" | "体质" | "敏捷" | "感知" | "魅力";

export default (props: {
    title: string;
    type: CheckType;
    to?: string;
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
                    gutterBottom
                >
                    <HexagonIcon
                        fontSize="small"
                        sx={{ marginRight: 0.2, marginTop: -0.1 }}
                    />{" "}
                    {props.type}检定
                </Typography>
                <Typography variant="h5" component="div">
                    {props.title}
                </Typography>
                <Tooltip
                    title={
                        <>
                            `{props.to ?? "所有人"}` 是这需要进行这个检定的对象,{" "}
                            `{props.type}` 是这个检定的类型
                        </>
                    }
                >
                    <Box>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {props.to ?? "所有人"}进行一个{props.type}检定
                        </Typography>
                    </Box>
                </Tooltip>
                <Typography variant="body2" whiteSpace="pre">{props.introduce}</Typography>
                {props.children}
            </CardContent>
        </Card>
    );
};
