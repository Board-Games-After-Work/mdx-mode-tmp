import { atom, useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { nowAdventureA } from "./store";
import { useRouter } from "next/router";
import { pageRoutes } from "@comps/Page";
import useUpdateWhenLoading from "./useUpdateWhenLoading";

/**
 * return null as not visible
 */
export const headersListA = atom([] as (() => string | null)[]);

export default () => {
    const [isFirstRender, setIsFirstRender] = useState(true);

    const headersList = useAtomValue(headersListA);

    const [nowAdventure, setNowAdventure] = useAtom(nowAdventureA);

    const router = useRouter();

    useUpdateWhenLoading(nowAdventure?.history.header);
    useUpdateWhenLoading(nowAdventure?.history.page);

    useEffect(() => {
        if (isFirstRender) {
            setInterval(() => {
                for (const f of headersList) {
                    const header = f();
                    const tmp = nowAdventure;

                    if (header && tmp?.history) {
                        tmp.history.header = header;
                        tmp.history.page = router.pathname;

                        setNowAdventure(tmp);
                        break;
                    }
                }
            }, 500);
        }
    });

    useEffect(() => setIsFirstRender(false), []);
};
