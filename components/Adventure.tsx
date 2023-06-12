import { Card, CardActionArea, CardContent } from "@mui/material";

export default (props: {
    val: Adventure | null;
    onClick?: (val: Adventure | null) => void;
}) => {
    return (
        <Card sx={{ m: 2, width: 190, minWidth: 190, maxWidth: 190 }}>
            <CardActionArea
                onClick={() =>
                    props.onClick ? props.onClick(props.val ?? null) : {}
                }
            >
                <CardContent sx={{ height: 270 }}>
                    {props.val?.name ?? "无冒险"}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
