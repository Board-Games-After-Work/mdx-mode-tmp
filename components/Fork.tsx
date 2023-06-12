import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import MapIcon from "@mui/icons-material/Map";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { atom, useAtom, useAtomValue } from "jotai";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";

export interface ForkLinksMap {
    [key: string]: { id: string; title: string; introduce?: string };
}

export const forkLinksMapA = atom({} as ForkLinksMap);
export const forkUpdateTriggerA = atom(false);

export default (props: {
    title: string;
    labels: (string | { name: string; introduce: string })[];
}) => {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const forkLinksMap = useAtomValue(forkLinksMapA);
    const [updateTrigger, setUpdateTrigger] = useAtom(forkUpdateTriggerA);
    const [id, setId] = useState("");

    useEffect(() => {
        if (isFirstRender) {
            const id = uuid();
            setId(id);

            let tmp = forkLinksMap;

            props.labels.forEach((l) =>
                typeof l === "string"
                    ? (tmp[l] = { id, title: props.title })
                    : (tmp[l.name] = {
                          id,
                          title: props.title,
                          introduce: l.introduce,
                      })
            );

            setUpdateTrigger(!updateTrigger);
        }
    }, [
        forkLinksMap,
        isFirstRender,
        props.labels,
        props.title,
        setUpdateTrigger,
        updateTrigger,
    ]);

    useEffect(() => setIsFirstRender(false), []);
    return (
        <Card sx={{ minWidth: 275, margin: 1 }} id={id}>
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
                    <AltRouteIcon
                        fontSize="small"
                        sx={{ marginRight: 0.2, marginTop: -0.1 }}
                    />
                    分支
                </Typography>
                <Typography variant="h5" component="div">
                    {props.title}
                </Typography>

                {props.labels.map((v) =>
                    typeof v === "string" ? (
                        <Card
                            square
                            elevation={0}
                            sx={{
                                marginY: 2,
                                borderRadius: 1,
                            }}
                            key={v}
                        >
                            <CardActionArea href={"#" + v + id}>
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
                                        <MapIcon
                                            fontSize="small"
                                            sx={{
                                                marginRight: 0.2,
                                                marginTop: -0.1,
                                            }}
                                        />
                                        点击前往
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        {props.title}
                                        <KeyboardArrowRightIcon
                                            sx={{ marginBottom: -0.7 }}
                                        />
                                        {v}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ) : (
                        <Card
                            square
                            elevation={0}
                            sx={{
                                marginY: 2,
                                borderRadius: 1,
                            }}
                            key={v.name}
                        >
                            <CardActionArea href={"#" + v.name + id}>
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
                                        <MapIcon
                                            fontSize="small"
                                            sx={{
                                                marginRight: 0.2,
                                                marginTop: -0.1,
                                            }}
                                        />
                                        点击前往
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        {props.title}
                                        <KeyboardArrowRightIcon
                                            sx={{ marginBottom: -0.7 }}
                                        />
                                        {v.name}
                                    </Typography>
                                    <Typography
                                        marginTop={2}
                                        whiteSpace="pre"
                                        component="div"
                                    >
                                        {v.introduce}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )
                )}
            </CardContent>
        </Card>
    );
};
