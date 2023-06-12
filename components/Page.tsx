import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
    Box,
    Button,
    Card,
    GlobalStyles,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { nowAdventureA } from "@/store";
import { useRouter } from "next/router";

export const colorModeA = atomWithStorage(
    "darkMode",
    "dark" as "dark" | "light"
);

export const pageRoutes = [
    { name: "主页", href: "/" },
    { name: "Vol.0", href: "/" },
    { name: "Vol.1: 艾尔萨托的陨落", href: "/Vol1" },
    { name: "Vol.2: 伊托利亚的远航", href: "/" },
    { name: "Vol.2.22: 与暴风雪同行", href: "/" },
    { name: "Vol.3: 默索里哀的崛起", href: "/" },
];

export const headersListA = atom([] as (() => string | null)[]);

export default (props: { children: ReactElement; title?: string }) => {
    const [isFirstRender, setIsFirstRender] = useState(true);

    const [history, setHistory] = useState(undefined as string | undefined);

    const [nowAdventure, setNowAdventure] = useAtom(nowAdventureA);

    const headersList = useAtomValue(headersListA);

    const router = useRouter();

    useEffect(() => {
        if (isFirstRender) {
            setInterval(() => {
                for (const f of headersList) {
                    const header = f();

                    if (header) {
                        setHistory(header);
                        break;
                    }
                }
            }, 500);
        }
    }, [
        headersList,
        isFirstRender,
        nowAdventure,
        router.pathname,
        setNowAdventure,
    ]);

    useEffect(() => {
        let tmp = nowAdventure;

        if (tmp?.history && router.pathname !== "/") {
            tmp.history.header = history;
            tmp.history.page = router.pathname;

            setNowAdventure(tmp);
        }
    }, [history, nowAdventure, router.pathname, setNowAdventure]);

    useEffect(() => {
        if (isFirstRender) {
            setNowAdventure();
        }
    }, [isFirstRender, setNowAdventure]);

    const [colorMode, setColorMode] = useAtom(colorModeA);

    const theme = createTheme({
        palette: {
            mode: colorMode,
        },
    });

    const selection = {
        backgroundColor:
            colorMode === "light"
                ? theme.palette.secondary.dark
                : theme.palette.info.light,
        color:
            colorMode === "light"
                ? theme.palette.common.white
                : theme.palette.common.black,
        borderRadius: 5,
    };

    useEffect(() => setIsFirstRender(false), []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    "*::selection": selection,
                    "*::-moz-selection": selection,
                }}
            />

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="100%"
                maxHeight="100vh"
            >
                <Box width="100%">
                    <Card>
                        <Toolbar>
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
                                正在进行:{" "}
                                <strong>{nowAdventure?.name ?? ""}</strong>
                            </Typography>

                            {pageRoutes.map((i, index) => (
                                <Link href={i.href} key={index}>
                                    <Button sx={{ marginX: 1 }}>
                                        {i.name}
                                    </Button>
                                </Link>
                            ))}
                        </Toolbar>
                    </Card>
                </Box>
                <Box
                    width="100%"
                    height="100%"
                    overflow="auto"
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                >
                    <Box width="1000px" margin="1">
                        {props.children}
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};
