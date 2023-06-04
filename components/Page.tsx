import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
    Box,
    Button,
    Card,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ReactElement } from "react";
import Link from "next/link";
import { useAtom } from "jotai";

import { colorModeA } from "@/store";

export default (props: { children: ReactElement; title?: string }) => {
    const [colorMode, setColorMode] = useAtom(colorModeA) as [
        "dark" | "light",
        (v: "dark" | "light") => void
    ];

    const Theme = createTheme({
        palette: {
            mode: colorMode,
        },
    });

    const pageRoutes = [
        { name: "前言", href: "/" },
        { name: "Vol.0", href: "/" },
        { name: "Vol.1: 艾尔萨托的陨落", href: "/" },
        { name: "Vol.2: 伊托利亚的远航", href: "/" },
        { name: "Vol.2.22: 与暴风雪同行", href: "/" },
        { name: "Vol.3: 默索里哀的崛起", href: "/" },
    ];

    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />
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
                                {props.title ?? ""}
                            </Typography>
                            {pageRoutes.map((i) => (
                                <Link href={i.href}>
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
