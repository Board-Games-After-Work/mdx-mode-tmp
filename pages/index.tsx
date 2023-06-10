import Adventure from "@comps/Adventure";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateAdventure from "@comps/CreateAdventure";
import { useState } from "react";
import { adventuresA, nowAdventureA } from "@/store";
import { useAtom } from "jotai";

export default () => {
    const [isCreating, setIsCreating] = useState(false);

    const [nowAdventure, setNowAdventure] = useAtom(nowAdventureA);
    const [adventures, setAdventures] = useAtom(adventuresA);

    return (
        <>
            <Typography variant="h3" margin={2}>
                继续
            </Typography>

            <Adventure val={nowAdventure} />

            <Typography variant="h3" margin={2}>
                冒险
            </Typography>

            <Box
                maxWidth="100%"
                height={300}
                display="flex"
                flexDirection="row"
                sx={{ overflowX: "auto" }}
            >
                <Card sx={{ m: 2, width: 190, minWidth: 190, maxWidth: 190 }}>
                    <CardActionArea onClick={() => setIsCreating(true)}>
                        <CardContent
                            sx={{
                                height: 270,
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <AddCircleIcon sx={{ fontSize: 80 }} />
                        </CardContent>
                    </CardActionArea>
                </Card>

                {adventures.map((a) => (
                    <Adventure val={a} key={a.name} />
                ))}
            </Box>

            <CreateAdventure
                open={isCreating}
                onClose={(val) => {
                    setIsCreating(false);
                    if (val) {
                        let tmp = adventures;
                        tmp.push(val);
                        setAdventures(tmp);
                    }
                }}
            />

            <Typography variant="h3" margin={2}>
                设定
            </Typography>
        </>
    );
};
