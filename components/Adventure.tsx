import {
    Card,
    CardActionArea,
    CardContent,
    Chip,
    IconButton,
    Stack,
    useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAtom } from "jotai";
import { adventuresA, nowAdventureA } from "@/store";

export default (props: {
    val: Adventure | null;
    onClick?: (val: Adventure | null) => void;
    selectable?: boolean;
}) => {
    const [nowAdventure, setNowAdventure] = useAtom(nowAdventureA);
    const [adventures, setAdventures] = useAtom(adventuresA);

    const onDel = () => {
        let tmp = adventures;

        const index = adventures.findIndex(
            (v) => v?.name && v?.name === props.val?.name
        );
        delete tmp[index];

        setAdventures(tmp.filter((v) => v));
        setNowAdventure(undefined);
    };

    return (
        <Card
            sx={{
                m: 2,
                width: 190,
                minWidth: 190,
                maxWidth: 190,
            }}
            elevation={
                props.selectable &&
                nowAdventure?.name &&
                nowAdventure?.name === props.val?.name
                    ? 1
                    : 2
            }
        >
            {props.selectable &&
            nowAdventure?.name &&
            nowAdventure?.name === props.val?.name ? (
                <>
                    <CardContent sx={{ height: 272 }}>
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            height={30}
                        >
                            <Chip
                                label={props.val?.name ?? "无冒险"}
                                size="small"
                                sx={{ mr: -1 }}
                            />

                            <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={onDel}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                    </CardContent>
                </>
            ) : (
                <CardActionArea
                    onClick={() =>
                        props.onClick ? props.onClick(props.val ?? null) : {}
                    }
                >
                    <CardContent sx={{ height: 270 }}>
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            height={30}
                        >
                            <Chip
                                label={props.val?.name ?? "无冒险"}
                                size="small"
                                sx={{ mr: -1 }}
                            />
                        </Stack>
                    </CardContent>
                </CardActionArea>
            )}
        </Card>
    );
};
