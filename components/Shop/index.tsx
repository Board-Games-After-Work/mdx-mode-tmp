import { Card, CardContent, Typography } from "@mui/material";
import * as React from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import EnhancedTable, { Data, createData } from "./EnhancedTable";
import ItemSpan from "@comps/Item";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useAtom } from "jotai";
import { nowAdventureA } from "@/store";

export interface Props {
    label: string;
    title?: string;
}

export default (props: Props) => {
    const theme = useTheme();
    const [steps, setSteps] = React.useState([] as Item[]);
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

    const [nowAdventure, setNowAdventure] = useAtom(nowAdventureA);
    const [rows, setRows] = React.useState([] as Data[]);
    React.useMemo(() => {
        const thisShop = nowAdventure?.shops[props.label] ?? [];
        setRows(
            thisShop?.map(
                (v) =>
                    createData(
                        v.item.name,
                        v.price + (v?.per ?? ""),
                        v?.inventory ?? 0,
                        v.item.tags
                    ) ?? []
            )
        );
    }, [nowAdventure?.shops, props.label]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Card sx={{ minWidth: 275, margin: 1 }}>
            <CardContent>
                <Typography
                    sx={{
                        fontSize: 15,
                        display: "flex",
                        alignItems: "center",
                    }}
                    color="text.secondary"
                    gutterBottom
                >
                    <StorefrontIcon
                        fontSize="small"
                        sx={{ marginRight: 0.2, marginTop: -0.1 }}
                    />{" "}
                    商店
                </Typography>

                {props.title ? (
                    <Typography variant="h5" component="div">
                        {props.title}
                    </Typography>
                ) : (
                    <></>
                )}

                {nowAdventure?.shops[props.label] ? (
                    <>
                        <EnhancedTable
                            {...props}
                            rows={rows}
                            onSelectChange={(vs) =>
                                setSteps(
                                    (nowAdventure?.shops[props.label] ?? [])
                                        .filter(
                                            (v) =>
                                                !!vs.find(
                                                    (vName) =>
                                                        vName === v.item.name
                                                )
                                        )
                                        .map((v) => v.item)
                                )
                            }
                        />

                        <Card
                            square
                            elevation={0}
                            sx={{
                                marginY: 2,
                                borderRadius: 1,
                            }}
                        >
                            <CardContent>
                                <ItemSpan val={steps[activeStep]} />
                            </CardContent>
                        </Card>

                        <MobileStepper
                            sx={{
                                borderRadius: 1,
                                marginBottom: 2,
                            }}
                            variant="text"
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                                <Button
                                    size="small"
                                    onClick={handleNext}
                                    disabled={activeStep === maxSteps - 1}
                                >
                                    Next
                                    {theme.direction === "rtl" ? (
                                        <KeyboardArrowLeft />
                                    ) : (
                                        <KeyboardArrowRight />
                                    )}
                                </Button>
                            }
                            backButton={
                                <Button
                                    size="small"
                                    onClick={handleBack}
                                    disabled={activeStep === 0}
                                >
                                    {theme.direction === "rtl" ? (
                                        <KeyboardArrowRight />
                                    ) : (
                                        <KeyboardArrowLeft />
                                    )}
                                    Back
                                </Button>
                            }
                        />
                    </>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};
