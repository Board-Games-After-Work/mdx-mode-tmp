import { adventuresA } from "@/store";
import { newAdventure } from "@/utils";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    Switch,
    TextField,
    Tooltip,
} from "@mui/material";
import { useAtomValue } from "jotai";
import _ from "lodash";
import { useState } from "react";

export default (props: {
    open: boolean;
    onClose: (val: Adventure | null) => void;
}) => {
    const [isUseInherit, setIsUseInherit] = useState(false);

    const adventures = useAtomValue(adventuresA);

    const [inheritAdventure, setInheritAdventure] = useState(
        null as Adventure | null
    );
    const [name, setName] = useState(null as string | null);

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    const onSubmit = async () => {
        if (name && adventures.findIndex((a) => a?.name === name) === -1) {
            let tmp = inheritAdventure
                ? inheritAdventure
                : await newAdventure();

            tmp.name = name;

            props.onClose(tmp);
        } else setIsSnackbarOpen(true);
    };

    return (
        <>
            <Dialog
                open={props.open}
                onClose={() => props.onClose(null)}
                onKeyDown={(evt) => {
                    if (evt.key === "Enter") onSubmit();
                }}
                onSubmit={onSubmit}
            >
                <DialogTitle>新建冒险</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        创建一个冒险以记录游玩进度
                    </DialogContentText>
                    <FormGroup>
                        <TextField
                            autoFocus
                            id="name"
                            label="冒险名称"
                            fullWidth
                            variant="standard"
                            onChange={(evt) => setName(evt.target.value)}
                        />

                        <Tooltip
                            title="使用已有进度的冒险作为基础创建冒险"
                            placement="top-start"
                        >
                            <FormControlLabel
                                control={<Switch defaultChecked />}
                                label="启用继承"
                                checked={isUseInherit}
                                onChange={() => setIsUseInherit(!isUseInherit)}
                            />
                        </Tooltip>

                        {isUseInherit ? (
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="inherit-an-existing-adventure-selector">
                                    要继承的冒险
                                </InputLabel>
                                <Select
                                    labelId="inherit-an-existing-adventure-selector"
                                    id="inherit-an-existing-adventure-select-standard"
                                    label="Adventure"
                                    fullWidth
                                    variant="standard"
                                    value={inheritAdventure?.name}
                                    onChange={(evt) =>
                                        setInheritAdventure(
                                            _.cloneDeep(
                                                adventures.find(
                                                    (a) =>
                                                        a.name ===
                                                        evt.target.value
                                                ) ?? null
                                            )
                                        )
                                    }
                                >
                                    {adventures.map((a) => (
                                        <MenuItem value={a.name} key={a.name}>
                                            {a.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : (
                            <></>
                        )}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.onClose(null)}>取消</Button>
                    <Button onClick={onSubmit}>完成</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={1000}
                onClose={() => setIsSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setIsSnackbarOpen(false)}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    重复或无效冒险名称
                </Alert>
            </Snackbar>
        </>
    );
};
