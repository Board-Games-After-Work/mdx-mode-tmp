import { MDXProvider } from "@mdx-js/react";
import Page from "@comps/Page";
import { NextComponentType } from "next";
import { ReactElement } from "react";

import Alert from "@mui/material/Alert";
import DayCheckPoint from "@comps/DayCheckPoint";
import CPass from "@comps/CPass";
import Check from "@comps/Check";
import DPass from "@comps/DPass";
import Decision from "@comps/Decision";
import ChestQueue from "@comps/ChestQueue";
import Shop from "@comps/Shop";
import CustomerDOMElement from "@comps/CustomerDOMElement";
import Fork from "@comps/Fork";
import ForkBack from "@comps/ForkBack";

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
        <Page>
            <MDXProvider components={components}>
                <Component {...pageProps} />
            </MDXProvider>
        </Page>
    );
}
