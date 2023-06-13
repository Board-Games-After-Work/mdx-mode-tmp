import {
    Box,
    Button,
    Card,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { colorModeA } from "./Page";
import Link from "next/link";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import HomeIcon from "@mui/icons-material/Home";
import { useAtom, useAtomValue } from "jotai";
import { nowAdventureA } from "@/store";

export default (props: { pageRoutes: { name: string; href: string }[] }) => {
    const [colorMode, setColorMode] = useAtom(colorModeA);
    const nowAdventure = useAtomValue(nowAdventureA);

    return (
        <Box width="100%">
            <Card>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        href="/"
                    >
                        <HomeIcon />
                    </IconButton>

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() =>
                            setColorMode(
                                colorMode === "dark" ? "light" : "dark"
                            )
                        }
                    >
                        {colorMode === "dark" ? (
                            <DarkModeIcon />
                        ) : (
                            <LightModeIcon />
                        )}
                    </IconButton>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        正在进行: <strong>{nowAdventure?.name ?? ""}</strong>
                    </Typography>

                    {props.pageRoutes.map((i, index) => (
                        <Link href={i.href} key={index}>
                            <Button sx={{ marginX: 1 }}>{i.name}</Button>
                        </Link>
                    ))}
                </Toolbar>
            </Card>
        </Box>
    );
};
