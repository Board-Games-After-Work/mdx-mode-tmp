import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { nowAdventureA } from "@/store";
import { useAtom, useAtomValue } from "jotai";

export default (props: { titles: [string, number, number][] }) => {
    const [nowAdventure, setNowAdventure] = useAtom(nowAdventureA);

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
            {props.titles.map(([id, _height, level], index) => (
                <ListItemButton
                    key={index}
                    href={"#" + id}
                    onClick={() => onJump(id)}
                    disabled={id === nowAdventure?.history.header}
                >
                    <ListItemText primary={id} sx={{ ml: level * 2 }} />
                </ListItemButton>
            ))}
        </List>
    );
};
