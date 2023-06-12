import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardActionArea,
    CardContent,
    FormControlLabel,
    MobileStepper,
    Typography,
    useTheme,
    Box,
    Chip,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import _ from "lodash";
import { nowAdventureA } from "@/store";
import { useAtom } from "jotai";
import ItemSpan from "./Item";
import useUpdateWhenLoading from "@/useUpdateWhenLoading";

export default (props: {
    label: string;
    from?: string;
    suggestion: number;
}) => {
    const [nowAdventure, setNowAdventure] = useAtom(nowAdventureA);
    const thisItemsQueue = nowAdventure?.itemsQueuesVec[props.label] ?? null;
    useUpdateWhenLoading(thisItemsQueue);

    const [steps, setSteps] = [
        thisItemsQueue?.items ?? [],
        (val: Item[]) => {
            let tmp = _.cloneDeep(nowAdventure);
            if (tmp !== null) {
                tmp.itemsQueuesVec[props.label].items = val;
            }

            setNowAdventure(tmp ?? undefined);
        },
    ];

    const theme = useTheme();
    const [activeStep, setActiveStep] = [
        nowAdventure?.itemsQueuesVec?.activeStep ?? 0,
        (val: number | ((val: number) => number)) => {
            let tmp = _.cloneDeep(nowAdventure);
            if (tmp !== null) {
                tmp.itemsQueuesVec["activeStep"] =
                    typeof val === "number"
                        ? val
                        : val(nowAdventure?.itemsQueuesVec?.activeStep ?? 0);
            }

            setNowAdventure(tmp ?? undefined);
        },
    ];

    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleCheck = () => {
        let steps_c = _.cloneDeep(steps);

        steps_c[activeStep].check = !steps[activeStep].check;

        setSteps(steps_c);
    };

    return (
        <Card sx={{ minWidth: 275, margin: 1 }}>
            <CardContent>
                <Typography
                    component="div"
                    sx={{
                        fontSize: 15,
                        display: "flex",
                        alignItems: "center",
                    }}
                    color="text.secondary"
                    gutterBottom
                >
                    <DynamicFormIcon
                        fontSize="small"
                        sx={{ marginRight: 0.2, marginTop: -0.1 }}
                    />{" "}
                    队列
                </Typography>

                <Typography variant="h5" component="div">
                    {props.label}
                </Typography>

                {thisItemsQueue ? (
                    <>
                        {props.from ? (
                            <Typography
                                sx={{ mb: 1.5 }}
                                color="text.secondary"
                                component="div"
                            >
                                位于 {props.from}, 建议进度为
                                <Chip
                                    component="span"
                                    label={`${props.suggestion} / ${maxSteps}`}
                                    size="small"
                                />
                            </Typography>
                        ) : (
                            <></>
                        )}

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
                                    <ItemSpan val={steps[activeStep]} />
                                </CardContent>
                                <CardContent
                                    sx={{ height: 60, display: "flex" }}
                                >
                                    <Typography
                                        component="div"
                                        color={
                                            steps[activeStep]?.check
                                                ? theme.palette.success.main
                                                : theme.palette.warning.main
                                        }
                                        marginLeft={1}
                                    >
                                        {steps[activeStep]?.check ? (
                                            <FormControlLabel
                                                sx={{ width: 100 }}
                                                control={<CheckBoxIcon />}
                                                label="已获取"
                                            />
                                        ) : (
                                            <FormControlLabel
                                                sx={{ width: 100 }}
                                                control={<AddBoxIcon />}
                                                label="未获取"
                                            />
                                        )}
                                    </Typography>

                                    <Box width="100%" />

                                    <Typography
                                        color={
                                            props.suggestion - 1 === activeStep
                                                ? theme.palette.primary.main
                                                : theme.palette.warning.main
                                        }
                                        component="span"
                                    >
                                        <FormControlLabel
                                            sx={{
                                                width: 100,
                                                marginRight: 1,
                                            }}
                                            control={<AddLocationIcon />}
                                            label={
                                                props.suggestion - 1 >
                                                activeStep
                                                    ? "落后"
                                                    : props.suggestion - 1 <
                                                      activeStep
                                                    ? "超前"
                                                    : "建议"
                                            }
                                            labelPlacement="start"
                                        />
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
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

                        <Accordion sx={{ boxShadow: "none" }}>
                            <AccordionSummary
                                expandIcon={
                                    <ExpandMoreIcon
                                        fontSize="small"
                                        sx={{ marginTop: -0.1 }}
                                    />
                                }
                            >
                                <FormControlLabel
                                    value="end"
                                    control={<WorkspacesIcon />}
                                    label="甜点列表"
                                    labelPlacement="end"
                                />
                            </AccordionSummary>
                            <AccordionDetails>
                                {(thisItemsQueue?.desserts ?? []).map((d) => (
                                    <Card
                                        square
                                        elevation={0}
                                        sx={{
                                            marginY: 2,
                                            borderRadius: 1,
                                        }}
                                        key={d.name}
                                    >
                                        <CardContent>
                                            <ItemSpan val={d} />
                                        </CardContent>
                                    </Card>
                                ))}
                            </AccordionDetails>
                        </Accordion>
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
