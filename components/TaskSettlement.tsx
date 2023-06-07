import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Typography,
} from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { nowAdventureA } from "@/store";
import TaskCheckPoint from "./TaskCheckPoint";

export default (props: { task: string }) => {
    const nowAdventure = useAtomValue(nowAdventureA);

    const thisTask = useMemo(
        () => nowAdventure?.tasks[props.task] ?? null,
        [nowAdventure?.tasks, props.task]
    );

    return (
        <Card sx={{ minWidth: 275, margin: 1 }} id={props.task + "TaskTo"}>
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
                    <AssignmentTurnedInIcon
                        fontSize="small"
                        sx={{ marginRight: 0.2, marginTop: -0.1 }}
                    />{" "}
                    任务结算
                </Typography>

                <Typography variant="h5" component="div">
                    {props.task}
                </Typography>

                {thisTask.introduce ? (
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {thisTask.introduce}
                    </Typography>
                ) : (
                    <></>
                )}

                {thisTask ? (
                    <>
                        {thisTask.checkPoints.map((c) => (
                            <Box key={props.task + c.name}>
                                <TaskCheckPoint
                                    task={props.task}
                                    label={c.name}
                                    __in_TaskSettlement__
                                />
                            </Box>
                        ))}
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
        </Card>
    );
};
