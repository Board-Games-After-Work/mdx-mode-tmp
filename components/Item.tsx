import { Chip, Stack, Typography } from "@mui/material";

export default (props: { val: Item | null | undefined }) => {
    return (
        <>
            <Typography variant="h6" component="div">
                {props.val?.name ?? "未选择物品"}
            </Typography>

            {props.val !== null ? (
                <Stack direction="row" spacing={1} marginTop={1}>
                    {props.val?.tags.map((tag) => {
                        switch (typeof tag[1]) {
                            case "undefined":
                                return <Chip label={tag[0]} />;
                            case "string":
                                return (
                                    <Chip
                                        label={
                                            <>
                                                <Chip
                                                    size="small"
                                                    color="info"
                                                    label={<>{tag[0]}</>}
                                                    sx={{ marginLeft: -1 }}
                                                />
                                                <Chip
                                                    size="small"
                                                    label={<>{tag[1]}</>}
                                                    sx={{ background: "none" }}
                                                />
                                            </>
                                        }
                                    />
                                );
                            case "number":
                                return (
                                    <Chip
                                        label={
                                            <>
                                                <Chip
                                                    size="small"
                                                    color="info"
                                                    label={<>{tag[0]}</>}
                                                    sx={{ marginLeft: -1 }}
                                                />
                                                <Chip
                                                    size="small"
                                                    label={<>{tag[1]}</>}
                                                    sx={{ background: "none" }}
                                                />
                                            </>
                                        }
                                    />
                                );

                            default:
                                return <></>;
                        }
                    })}
                </Stack>
            ) : (
                <></>
            )}

            <Typography
                marginTop={2}
                whiteSpace="pre"
                component="div"
                overflow="auto"
            >
                <code>{props.val?.introduce ?? ""}</code>
            </Typography>
        </>
    );
};
