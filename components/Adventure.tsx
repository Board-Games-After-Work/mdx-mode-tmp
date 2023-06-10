import { Card, CardActionArea, CardContent } from "@mui/material";

export default (props: { val: Adventure | null; onClick?: () => void }) => {
    return (
        <Card sx={{ m: 2, width: 190, minWidth: 190, maxWidth: 190 }}>
            <CardActionArea onClick={props.onClick}>
                <CardContent sx={{ height: 270 }}></CardContent>
            </CardActionArea>
        </Card>
    );
};
