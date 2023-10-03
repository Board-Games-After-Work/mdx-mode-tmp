import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Card, Drawer, GlobalStyles, Stack } from "@mui/material";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { nowAdventureA } from "@/store";
import { useRouter } from "next/router";
import Header from "./Header";
import Directory from "./Directory";

export const colorModeA = atomWithStorage(
    "darkMode",
    "dark" as "dark" | "light"
);

export const isTightModeA = atom(false);

const isTightDrawerOpenStoreA = atom(false);

export const isTightDrawerOpenA = atom(
    (get): boolean => get(isTightModeA) && get(isTightDrawerOpenStoreA),
    (get, set, val: boolean) => {
        if (get(isTightModeA)) set(isTightDrawerOpenStoreA, val);
    }
);

export const pageRoutes = [
    { name: "Vol.0", href: "/" },
    { name: "Vol.1: 艾尔萨托的陨落", href: "/Vol1" },
    { name: "Vol.2: 伊托利亚的远航", href: "/" },
    { name: "Vol.2.22: 与暴风雪同行", href: "/" },
    { name: "Vol.3: 默索里哀的崛起", href: "/" },
];

export default (props: { children: ReactElement; title?: string }) => {
    const [isFirstRender, setIsFirstRender] = useState(true);

    const [nowAdventure, setNowAdventure] = useAtom(nowAdventureA);
    const [isTightMode, setIsTightMode] = useAtom(isTightModeA);
    const [isTightDrawerOpen, setIsTightDrawerOpen] =
        useAtom(isTightDrawerOpenA);

    const router = useRouter();

    useEffect(() => {
        let tmp = nowAdventure;

        if (tmp?.history && router.pathname !== "/") {
            tmp.history.page = router.pathname;
            setNowAdventure(tmp);
        }
    }, [nowAdventure, router.pathname, setNowAdventure]);

    useEffect(() => {
        if (isFirstRender) {
            setNowAdventure();

            setIsTightMode(innerWidth < 1500);
            window.onresize = () => setIsTightMode(innerWidth < 1500);
        }
    }, [isFirstRender, setIsTightMode, setNowAdventure]);

    const colorMode = useAtomValue(colorModeA);

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

                    "*::-webkit-scrollbar": {
                        width: 6,
                    },
                    "*::-webkit-scrollbar-thumb": {
                        background: theme.palette.primary.main,
                        borderRadius: 1,
                    },
                }}
            />
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="100%"
                maxHeight="100vh"
            >
                <Header pageRoutes={pageRoutes} />

                {router.pathname !== "/" ? (
                    <Stack
                        direction="row"
                        width="100%"
                        maxHeight="calc(100vh - 64)"
                        alignItems="center"
                        justifyContent="center"
                        overflow="hidden"
                    >
                        {isTightMode ? (
                            <Drawer
                                anchor="left"
                                open={isTightDrawerOpen}
                                onClose={() => setIsTightDrawerOpen(false)}
                            >
                                <Card
                                    elevation={0}
                                    sx={{
                                        width: "100%",
                                        height: "100vh",
                                        overflowY: "auto",
                                        paddingTop: "64px",
                                    }}
                                >
                                    <Directory />
                                </Card>
                            </Drawer>
                        ) : (
                            <>
                                <Box width="100%" />

                                <Card
                                    sx={{
                                        mx: 2,
                                        overflowY: "auto",
                                        overflowX: "hidden",
                                        width: "100%",
                                        height: "calc(100vh - 100px)",
                                        maxHeight: "calc(100vh - 100px)",
                                        borderRadius: 0,
                                    }}
                                >
                                    <Directory />
                                </Card>
                            </>
                        )}

                        <div
                            style={{
                                margin: "0 2",
                                overflowY: "auto",
                                overflowX: "hidden",
                                width: isTightMode ? "calc(100vw - 20px)" : 900,
                                minWidth: isTightMode ? void 0 : 900,
                                height: "calc(100vh - 100px)",
                                maxHeight: "calc(100vh - 100px)",
                            }}
                        >
                            {props.children}
                        </div>

                        {isTightMode ? <></> : <Box width="100%" />}
                    </Stack>
                ) : (
                    <Box
                        width="100%"
                        height="100%"
                        overflow="auto"
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                    >
                        <Box width={isTightMode ? "100%" : "1000px"} margin="1">
                            {props.children}
                        </Box>
                    </Box>
                )}
            </Box>
        </ThemeProvider>
    );
};
