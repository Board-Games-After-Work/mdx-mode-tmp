import Adventure from "@comps/Adventure";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateAdventure from "@comps/CreateAdventure";
import { useState } from "react";
import { adventuresA, nowAdventureA } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { pageRoutes } from "@comps/Page";

export default () => {
    const [isCreating, setIsCreating] = useState(false);

    const [nowAdventure, setNowAdventure] = useAtom(nowAdventureA);
    const [adventures, setAdventures] = useAtom(adventuresA);

    const router = useRouter();

    return (
        <>
            <Typography variant="h3" margin={2} component="div">
                继续
            </Typography>
            <Stack direction="row" spacing={2}>
                <Adventure
                    val={nowAdventure}
                    href={
                        nowAdventure?.history.page &&
                        nowAdventure?.history.header
                            ? nowAdventure.history.page +
                              "/#" +
                              nowAdventure.history.header
                            : "/"
                    }
                />

                <Stack direction="column">
                    <Typography variant="h5" margin={2} component="div">
                        上次进度:
                    </Typography>
                    <Typography variant="h2" margin={2} component="div" my={-2}>
                        {nowAdventure?.history?.page !== "/"
                            ? pageRoutes.find(
                                  (val) =>
                                      val.href === nowAdventure?.history?.page
                              )?.name
                            : "新冒险"}
                    </Typography>
                    <Typography variant="h3" margin={2} component="div">
                        {nowAdventure?.history?.header ?? ""}
                    </Typography>
                </Stack>
            </Stack>

            <Typography variant="h3" margin={2} component="div">
                冒险
            </Typography>

            <Box
                maxWidth="100%"
                height={300}
                display="flex"
                flexDirection="row"
                sx={{ overflowX: "auto", overflowY: "hidden" }}
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

                {adventures.map((a, i) => (
                    <Adventure
                        selectable
                        val={a}
                        key={i}
                        onClick={(val) => setNowAdventure(val ?? undefined)}
                    />
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

            <Typography variant="h3" margin={2} component="div">
                设定
            </Typography>
        </>
    );
};
