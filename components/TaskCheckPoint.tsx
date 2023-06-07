import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CircularProgress,
    FormControlLabel,
    Typography,
    useTheme,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import { atom, useAtom } from "jotai";
import { nowAdventureA } from "@/store";
import useUpdateWhenLoading from "@/useUpdateWhenLoading";
import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

const updateTriggerA = atom(false);
const linkMapA = atom({} as { [key: string]: string });

export default (props: {
    task: string;
    label: string;
    __in_TaskSettlement__?: boolean;
}) => {
    const [nowAdventure, setNowAdventure] = useAtom(nowAdventureA);

    const thisCheckPoint = useMemo(
        () =>
            nowAdventure?.tasks[props.task].checkPoints.find(
                (c) => c.name === props.label
            ) ?? null,
        [nowAdventure?.tasks, props.label, props.task]
    );

    useUpdateWhenLoading(thisCheckPoint);

    const [updateTrigger, setUpdateTrigger] = useAtom(updateTriggerA);

    const handleCheck = useCallback(() => {
        let tmp = nowAdventure;

        if (!tmp?.tasks[props.task].checkPoints) return;

        const cPI = tmp.tasks[props.task].checkPoints.findIndex(
            (c) => c.name === props.label
        );

        tmp.tasks[props.task].checkPoints[cPI].check = !thisCheckPoint?.check;

        setNowAdventure(tmp);

        setUpdateTrigger(!updateTrigger);
    }, [
        nowAdventure,
        props.label,
        props.task,
        setNowAdventure,
        setUpdateTrigger,
        thisCheckPoint?.check,
        updateTrigger,
    ]);

    const [isFirstRender, setIsFirstRender] = useState(true);
    const [linkMap, setLinkMap] = useAtom(linkMapA);
    const [id, setId] = useState("");

    useEffect(() => {
        if (isFirstRender) {
            const index = props.label + "@" + props.task;

            if (linkMap[index]) {
                setId(linkMap[index]);
            } else {
                let tmp = linkMap;

                const id = uuid();

                setId(id);

                tmp[index] = id;

                setLinkMap(tmp);
            }
        }
    }, [isFirstRender, linkMap, props.label, props.task, setLinkMap]);

    const theme = useTheme();

    useEffect(() => setIsFirstRender(false), []);

    return (
        <Card
            sx={{
                minWidth: 275,
                margin: 1,
                flexDirection: "row",
                display: "flex",
            }}
            elevation={props.__in_TaskSettlement__ ? 0 : 1}
            id={props.__in_TaskSettlement__ ? undefined : id}
        >
            <CardActionArea onClick={handleCheck}>
                <CardContent>
                    <Typography
                        sx={{
                            fontSize: 15,
                            display: "flex",
                            alignItems: "center",
                        }}
                        color="text.secondary"
                        component="span"
                        gutterBottom
                    >
                        <VerifiedIcon
                            fontSize="small"
                            sx={{ marginRight: 0.2, marginTop: -0.1 }}
                        />{" "}
                        检查点
                    </Typography>

                    <Typography variant="h5" component="div">
                        {props.task}: {props.label}
                    </Typography>

                    {thisCheckPoint ? (
                        <>
                            {thisCheckPoint.introduce ? (
                                <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                >
                                    {thisCheckPoint.introduce}
                                </Typography>
                            ) : (
                                <></>
                            )}

                            <CardContent sx={{ height: 60, display: "flex" }}>
                                <Typography
                                    color={
                                        thisCheckPoint?.check
                                            ? theme.palette.primary.main
                                            : theme.palette.text.primary
                                    }
                                    marginLeft={1}
                                    component="span"
                                >
                                    {thisCheckPoint?.check ? (
                                        <FormControlLabel
                                            sx={{ width: 100 }}
                                            control={<CheckBoxIcon />}
                                            label="已确认"
                                        />
                                    ) : (
                                        <FormControlLabel
                                            sx={{ width: 100 }}
                                            control={
                                                <CheckBoxOutlineBlankIcon />
                                            }
                                            label="未确认"
                                        />
                                    )}
                                </Typography>
                            </CardContent>
                        </>
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}
                </CardContent>
            </CardActionArea>

            {!props.__in_TaskSettlement__ ? (
                <Card
                    sx={{
                        margin: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                    elevation={0}
                >
                    <CardActionArea
                        sx={{
                            height: "100%",
                            width: 50,
                        }}
                        href={"#" + props.task + "TaskTo"}
                    >
                        <CardContent
                            sx={{
                                height: "100%",
                            }}
                        >
                            <Typography
                                height="100%"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                            >
                                <VerticalAlignBottomIcon
                                    fontSize="large"
                                    sx={{ ml: -0.1, height: "100%" }}
                                />
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ) : (
                <Card
                    sx={{
                        margin: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                    elevation={2}
                >
                    <CardActionArea
                        sx={{
                            height: "100%",
                            width: 50,
                        }}
                        href={"#" + id}
                    >
                        <CardContent
                            sx={{
                                height: "100%",
                            }}
                        >
                            <Typography
                                height="100%"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                            >
                                <VerticalAlignTopIcon
                                    fontSize="large"
                                    sx={{ ml: -0.1, height: "100%" }}
                                />
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )}
        </Card>
    );
};
