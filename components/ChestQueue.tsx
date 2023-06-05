import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    FormControlLabel,
    MobileStepper,
    Typography,
    useTheme,
} from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useState } from "react";
import _ from "lodash";

const ssteps = [
    {
        label: "Select campaign settings",
        check: false,
        description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: "Create an ad group",
        check: false,
        description:
            "An ad group contains one or more ads which target a shared set of keywords.",
    },
    {
        label: "Create an ad",
        check: false,
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];

export default (props: { queueLabel: string; activeStep?: number }) => {
    const [steps, setSteps] = useState(ssteps);
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(props.activeStep ?? 0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleCheck = () => {
        console.log("a");

        let steps_c = _.cloneDeep(steps);

        steps_c[activeStep].check = !steps[activeStep].check;

        setSteps(steps_c);
    };

    console.log(steps[activeStep].check);

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
                    <DiamondIcon
                        fontSize="small"
                        sx={{ marginRight: 0.2, marginTop: -0.1 }}
                    />{" "}
                    奖励队列
                </Typography>
                <Typography variant="h5" component="div">
                    {props.queueLabel}
                </Typography>

                <Card
                    square
                    elevation={0}
                    sx={{
                        marginY: 2,
                        borderRadius: 1,
                    }}
                >
                    <CardActionArea onClick={handleCheck}>
                        <CardContent>
                            <Typography variant="h6">
                                {steps[activeStep].label}
                            </Typography>

                            <Typography marginTop={2}>
                                {steps[activeStep].description}
                            </Typography>
                        </CardContent>
                        <CardContent sx={{ height: 60 }}>
                            <Typography
                                color={
                                    steps[activeStep].check
                                        ? theme.palette.success.main
                                        : theme.palette.warning.main
                                }
                                marginLeft={1}
                            >
                                {steps[activeStep].check ? (
                                    <FormControlLabel
                                        value="end"
                                        control={<CheckBoxIcon />}
                                        label="已获取"
                                        labelPlacement="end"
                                    />
                                ) : (
                                    <FormControlLabel
                                        value="end"
                                        control={<AddBoxIcon />}
                                        label="未获取"
                                        labelPlacement="end"
                                    />
                                )}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <MobileStepper
                    sx={{
                        borderRadius: 1,
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
            </CardContent>
        </Card>
    );
};
