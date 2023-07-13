import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { nowAdventureA } from "@/store";
import { atom, useAtom, useAtomValue } from "jotai";
import {
    Autocomplete,
    Button,
    IconButton,
    ListItem,
    TextField,
    Typography,
} from "@mui/material";
import { Tree } from "@/utils";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export const titlesListA = atom([] as [string, number, number][]);
export const historyTitleA = atom(undefined as string | undefined);

export default () => {
    const [nowAdventure, setNowAdventure] = useAtom(nowAdventureA);
    const historyTitle = useAtomValue(historyTitleA);

    const [count, setCount] = React.useState(0);

    const [openMap, setOpenMap] = React.useState(
        {} as { [key: string]: boolean }
    );

    const [flitter, setFlitter] = React.useState<string | null>(null);

    const titles = useAtomValue(titlesListA);

    const onJump = React.useCallback(
        (id: string) => {
            let tmp = nowAdventure;

            if (tmp?.history) {
                tmp.history.header = id;

                setNowAdventure(tmp);
            }
        },
        [nowAdventure, setNowAdventure]
    );

    const mapTreeToElement = React.useCallback(
        (node: Tree.TreeNode<string> | undefined): React.JSX.Element => {
            if (node?.children?.length === 0 || !node)
                return !flitter || node?.value?.indexOf(flitter) !== -1 ? (
                    <ListItemButton
                        href={"#" + node?.value}
                        onClick={() => onJump(node?.value ?? "")}
                        disabled={node?.value === historyTitle}
                    >
                        <ListItemText
                            primary={node?.value}
                            sx={{ ml: (node?.lv ?? 0) * 2 }}
                        />
                    </ListItemButton>
                ) : (
                    <></>
                );

            const children = node.children.map(mapTreeToElement);
            const value = node.value ?? "";

            return (
                <>
                    <ListItem sx={{ ml: node.lv * 1, mr: 2 }}>
                        <IconButton
                            onClick={() => {
                                console.log(openMap);
                                setOpenMap((openMap) => {
                                    openMap[value] = !openMap[value];
                                    return openMap;
                                });
                                setCount(count + 1);
                            }}
                            aria-label="expend"
                            size="small"
                        >
                            {openMap[value] ? <ExpandMore /> : <ExpandLess />}
                        </IconButton>

                        <Button
                            href={"#" + value}
                            color="inherit"
                            onClick={() => onJump(value ?? "")}
                            disabled={value === historyTitle}
                        >
                            <Typography>{value}</Typography>
                        </Button>
                    </ListItem>

                    <Collapse in={openMap[value]} timeout="auto" unmountOnExit>
                        {children}
                    </Collapse>
                </>
            );
        },
        [count, flitter, historyTitle, onJump, openMap]
    );

    return (
        <List
            sx={{ width: "100%", height: "100%", bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    目录
                </ListSubheader>
            }
        >
            <ListItem>
                <Autocomplete
                    disablePortal
                    options={titles.map(([id, _height, level]) => id)}
                    sx={{ width: 300 }}
                    onChange={(_, v) => {
                        setOpenMap(
                            Object.fromEntries(titles.map(([v]) => [v, true]))
                        );
                        setFlitter(v);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="查找" size="small" />
                    )}
                />
            </ListItem>

            {mapTreeToElement(Tree.fold(titles.map(([v, _, l]) => [v, l])))}
        </List>
    );
};
