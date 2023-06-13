import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Card, GlobalStyles, Paper, Stack } from "@mui/material";
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

export const pageRoutes = [
    { name: "Vol.0", href: "/" },
    { name: "Vol.1: 艾尔萨托的陨落", href: "/Vol1" },
    { name: "Vol.2: 伊托利亚的远航", href: "/" },
    { name: "Vol.2.22: 与暴风雪同行", href: "/" },
    { name: "Vol.3: 默索里哀的崛起", href: "/" },
];

export const headersListA = atom([] as (() => string | null)[]);

let scanCount = 0;
let directoryCount = 0;
export default (props: { children: ReactElement; title?: string }) => {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [isBeforeScroll, setIsBeforeScroll] = useState(true);

    const [history, setHistory] = useState(undefined as string | undefined);

    const [nowAdventure, setNowAdventure] = useAtom(nowAdventureA);

    const [titlesList, setTitlesList] = useState(
        [] as [string, number, number][]
    );

    const headersList = useAtomValue(headersListA);

    const router = useRouter();

    useEffect(() => {
        directoryCount++;
        const nowCount = directoryCount;

        useEffect(() => {
            if (isBeforeScroll) {
                router.push(
                    nowAdventure?.history.page && nowAdventure?.history.header
                        ? nowAdventure.history.page +
                              "/#" +
                              nowAdventure.history.header
                        : "/"
                );
            }
        });

        requestIdleCallback(() => {
            if (directoryCount !== nowCount) return;

            const titles = Array.from(
                document.querySelectorAll(".MDX_Title")
            ).map((v) => {
                const el = v.lastChild as HTMLHeadElement | null;

                return [
                    el?.id,
                    el?.offsetTop,
                    parseInt(el?.localName.replace("h", "") ?? "0"),
                ] as [string, number, number];
            });

            titles.sort((a, b) => a[1] - b[1]);

            setTitlesList(titles);
            directoryCount = 0;
        });
    }, [setTitlesList, history]);

    const onScanTitle = useCallback(() => {
        scanCount++;
        const nowCount = scanCount;
        requestIdleCallback(() => {
            if (nowCount !== scanCount) return;

            for (const f of headersList) {
                const header = f();

                if (header) {
                    setHistory(header);
                    break;
                }
            }

            scanCount = 0;
        });

        setIsBeforeScroll(false);
    }, [headersList]);

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
                        maxHeight={innerHeight - 64}
                        alignItems="center"
                        justifyContent="center"
                        overflow="hidden"
                    >
                        <Card
                            sx={{
                                mx: 2,
                                overflowY: "auto",
                                overflowX: "hidden",
                                width: "100%",
                                height: innerHeight - 100 + "px",
                                maxHeight: innerHeight - 100 + "px",
                            }}
                        >
                            <Directory titles={titlesList} />
                        </Card>

                        <div
                            style={{
                                margin: "0 2",
                                overflowY: "auto",
                                overflowX: "hidden",
                                width: 900,
                                minWidth: 900,
                                height: innerHeight - 100 + "px",
                                maxHeight: innerHeight - 100 + "px",
                            }}
                            onScroll={onScanTitle}
                        >
                            {props.children}
                        </div>

                        <Box width="100%" />
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
                        <Box width="1000px" margin="1">
                            {props.children}
                        </Box>
                    </Box>
                )}
            </Box>
        </ThemeProvider>
    );
};
