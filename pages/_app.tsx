import { MDXProvider } from "@mdx-js/react";
import { NextComponentType } from "next";
import Alert from "@mui/material/Alert";
import dynamic from "next/dynamic";
import CustomerDOMElement from "@comps/CustomerDOMElement";
import { Typography } from "@mui/material";
import Head from "next/head";

const Page = dynamic(() => import("@comps/Page"), { ssr: false });
const DayCheckPoint = dynamic(() => import("@comps/DayCheckPoint"), {
    ssr: false,
});
const CPass = dynamic(() => import("@comps/CPass"), { ssr: false });
const Check = dynamic(() => import("@comps/Check"), { ssr: false });
const DPass = dynamic(() => import("@comps/DPass"), { ssr: false });
const Decision = dynamic(() => import("@comps/Decision"), { ssr: false });
const ChestQueue = dynamic(() => import("@comps/ChestQueue"), { ssr: false });
const Shop = dynamic(() => import("@comps/Shop"), { ssr: false });
const Fork = dynamic(() => import("@comps/Fork"), { ssr: false });
const ForkBack = dynamic(() => import("@comps/ForkBack"), { ssr: false });
const TaskCheckPoint = dynamic(() => import("@comps/TaskCheckPoint"), {
    ssr: false,
});
const TaskSettlement = dynamic(() => import("@comps/TaskSettlement"), {
    ssr: false,
});

const components = {
    A: Alert,
    DCP: DayCheckPoint,
    CP: CPass,
    C: Check,
    DP: DPass,
    D: Decision,
    CQ: ChestQueue,
    S: Shop,
    F: Fork,
    FB: ForkBack,
    TCP: TaskCheckPoint,
    TS: TaskSettlement,
    ...CustomerDOMElement,
} as any;

export default function Post({
    Component,
    pageProps,
}: {
    Component: NextComponentType;
    pageProps: any;
}) {
    return (
        <>
            <Head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/icon.svg"
                ></link>
                <title>A Song of the Northern Expedition</title>
            </Head>

            <Page>
                <MDXProvider components={components}>
                    <Typography component="span">
                        <Component {...pageProps} />
                    </Typography>
                </MDXProvider>
            </Page>
        </>
    );
}
