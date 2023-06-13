import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Stack,
} from "@mui/material";
import { useAtom } from "jotai";
import { adventuresA, nowAdventureA } from "@/store";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

export default (props: {
    val: Adventure | null;
    onClick?: (val: Adventure | null) => void;
    href?: string;
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

    const image = nowAdventure?.history.image ?? "None";
    const labelName =
        props.val?.name + (props.val?.history.page ?? "") ?? "无冒险";

    return (
        <Card
            sx={{
                m: 2,
                width: 190,
                minWidth: 190,
                maxWidth: 190,
                height: 270,
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
                    <CardContent>
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            height={30}
                        >
                            <Chip
                                label={labelName}
                                size="medium"
                                variant="outlined"
                                sx={{ width: "100%" }}
                                deleteIcon={<DeleteIcon />}
                                onDelete={onDel}
                            />
                        </Stack>
                    </CardContent>

                    <CardMedia
                        sx={{ height: "100%" }}
                        image={image}
                        title="green iguana"
                    />
                </>
            ) : (
                <Link href={props.href ?? ""} prefetch>
                    <CardActionArea
                        onClick={() =>
                            props.onClick
                                ? props.onClick(props.val ?? null)
                                : {}
                        }
                        sx={{ height: 270 }}
                    >
                        <CardContent>
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                height={30}
                            >
                                <Chip
                                    label={labelName}
                                    variant="outlined"
                                    sx={{ width: "100%" }}
                                    size="medium"
                                />
                            </Stack>
                        </CardContent>

                        <CardMedia
                            sx={{ height: "100%" }}
                            image={image}
                            title="冒险"
                        />
                    </CardActionArea>
                </Link>
            )}
        </Card>
    );
};
