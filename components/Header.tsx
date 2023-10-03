import {
    Box,
    Button,
    Card,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import { colorModeA, isTightDrawerOpenA, isTightModeA } from "./Page";
import Link from "next/link";
import { useRouter } from "next/router";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAtom, useAtomValue } from "jotai";
import { nowAdventureA } from "@/store";
import { useState } from "react";

export default (props: { pageRoutes: { name: string; href: string }[] }) => {
    const [colorMode, setColorMode] = useAtom(colorModeA);
    const [isTightDrawerOpen, setIsTightDrawerOpen] =
        useAtom(isTightDrawerOpenA);

    const nowAdventure = useAtomValue(nowAdventureA);
    const isTightMode = useAtomValue(isTightModeA);

    const router = useRouter();

    const [isTitlesDrawerOpen, setIsTitlesDrawerOpen] = useState(false);

    return (
        <Box width="100%" zIndex={1201}>
            <Card>
                <Toolbar>
                    {isTightMode && router.pathname !== "/" ? (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() =>
                                setIsTightDrawerOpen(!isTightDrawerOpen)
                            }
                        >
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <></>
                    )}

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="home"
                        sx={{ mr: 2 }}
                        href="/"
                    >
                        <HomeIcon />
                    </IconButton>

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label={
                            colorMode === "dark" ? "light mode" : "dark mode"
                        }
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
                        overflow="hidden"
                        textOverflow="ellipsis"
                        sx={{
                            flexGrow: 1,
                            width: isTightMode ? "160px" : void 0,
                            display: "block",
                        }}
                    >
                        {isTightMode ? "" : "正在进行:"}
                        <strong>{nowAdventure?.name ?? ""}</strong>
                    </Typography>

                    {isTightMode ? (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() =>
                                setIsTitlesDrawerOpen(!isTitlesDrawerOpen)
                            }
                        >
                            <MoreVertIcon />
                            <Drawer
                                anchor="right"
                                open={isTitlesDrawerOpen}
                                onClose={() => setIsTitlesDrawerOpen(false)}
                            >
                                <Card
                                    sx={{
                                        width: "100%",
                                        height: "100vh",
                                        overflowY: "auto",
                                        paddingTop: "64px",
                                    }}
                                >
                                    <List>
                                        {props.pageRoutes.map((i, index) => (
                                            <ListItem
                                                key={index}
                                                disablePadding
                                            >
                                                <ListItemButton
                                                    href={i.href}
                                                    selected={
                                                        i.href ===
                                                        router.pathname
                                                    }
                                                >
                                                    <ListItemText
                                                        primary={i.name}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Card>
                            </Drawer>
                        </IconButton>
                    ) : (
                        props.pageRoutes.map((i, index) => (
                            <Link href={i.href} key={index}>
                                <Button sx={{ marginX: 1 }}>{i.name}</Button>
                            </Link>
                        ))
                    )}
                </Toolbar>
            </Card>
        </Box>
    );
};
