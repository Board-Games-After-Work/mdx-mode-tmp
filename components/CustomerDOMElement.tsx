import {
    Box,
    Divider,
    IconButton,
    Link,
    CardActionArea,
    Chip,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
    MutableRefObject,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia, { CardMediaProps } from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { headersListA } from "@comps/Page";

const getId = (children: string | string[] | any) => {
    switch (typeof children) {
        case "string":
            return children;
        case "object":
            return children[0].toString();
        default:
            return children.toString();
    }
};

const Warper = (props: { children: ReactElement; subId: string }) => {
    const [headersList, setHeadersList] = useAtom(headersListA);

    const el = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        let tmp = headersList;

        tmp.push(() => {
            if (!el?.current?.getBoundingClientRect) return null;

            const offset = el.current.getBoundingClientRect();

            if (offset.top <= innerHeight && offset.bottom >= 0)
                return props.subId;
            else return null;
        });

        setHeadersList(tmp);
    });

    return (
        <Box display="flex" alignItems="center" ref={el}>
            <IconButton size="small" href={"#" + props.subId}>
                <AttachFileIcon fontSize="inherit" />
            </IconButton>
            {props.children}
        </Box>
    );
};

const H1 = (props: { children: ReactElement }) => {
    const id = getId(props.children);
    return (
        <Warper subId={id}>
            <h1 id={id}> {props.children} </h1>
        </Warper>
    );
};

const H2 = (props: { children: ReactElement }) => {
    const id = getId(props.children);
    return (
        <Warper subId={id}>
            <h2 id={id}> {props.children} </h2>
        </Warper>
    );
};

const H3 = (props: { children: ReactElement }) => {
    const id = getId(props.children);
    return (
        <Warper subId={id}>
            <h3 id={id}> {props.children} </h3>
        </Warper>
    );
};

const H4 = (props: { children: ReactElement }) => {
    const id = getId(props.children);
    return (
        <Warper subId={id}>
            <h4 id={id}> {props.children} </h4>
        </Warper>
    );
};

const H5 = (props: { children: ReactElement }) => {
    const id = getId(props.children);
    return (
        <Warper subId={id}>
            <h5 id={id}> {props.children} </h5>
        </Warper>
    );
};

const H6 = (props: { children: ReactElement }) => {
    const id = getId(props.children);
    return (
        <Warper subId={id}>
            <h6 id={id}> {props.children} </h6>
        </Warper>
    );
};

const A = (props: any) => (
    <Link {...props} underline="hover">
        <AttachFileIcon fontSize="inherit" />
        {props.children}
    </Link>
);

const HR = (props: any) => <Divider {...props} />;

const IMG = (
    props: {
        alt?: string;
        width: number | string;
    } & CardMediaProps
) => {
    const { alt, src, width: width } = props;

    return (
        <Box
            width="100%"
            display="flex"
            alignItems="center"
            flexDirection="column"
        >
            <Card sx={{ maxWidth: width ?? 400 }}>
                <CardActionArea href={src ?? ""} target="_blank">
                    <CardMedia component="img" image={src} alt={alt} />
                    <CardContent>
                        {alt ? (
                            <Typography
                                component="div"
                                variant="body2"
                                color="text.secondary"
                                width="100%"
                                textAlign="center"
                            >
                                {alt}
                            </Typography>
                        ) : (
                            <></>
                        )}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
};

const CODE = (props: { children: ReactElement }) => (
    <Chip
        label={
            <Typography whiteSpace="pre" component="div">
                {props.children}
            </Typography>
        }
        size="small"
        variant="outlined"
        color="secondary"
        sx={{
            mx: 0.4,
            height: "auto",
            "& .MuiChip-label": {
                display: "block",
                whiteSpace: "normal",
            },
        }}
        component="span"
    />
);

export default {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    hr: HR,
    a: A,
    img: IMG,
    code: CODE,
    p: (props: any) => <div {...props}></div>,
};
