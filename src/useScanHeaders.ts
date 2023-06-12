import { atom, useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { nowAdventureA } from "./store";
import { useRouter } from "next/router";
import { pageRoutes } from "@comps/Page";

/**
 * return null as not visible
 */
export const headersListA = atom([] as (() => string | null)[]);

export default () => {
    const [isFirstRender, setIsFirstRender] = useState(true);

    const headersList = useAtomValue(headersListA);

    const [nowAdventure, setNowAdventure] = useAtom(nowAdventureA);

    const router = useRouter();

    useEffect(() => {
        if (nowAdventure?.history) {
            const url =
                pageRoutes.find((v) => v.name === nowAdventure.history.mod) +
                "/" +
                nowAdventure.history.header;

            router.push(url);
        }

        if (isFirstRender) {
            setInterval(() => {
                for (const f of headersList) {
                    const header = f();
                    const tmp = nowAdventure;

                    if (header && tmp?.history) {
                        tmp.history.header = header;
                        setNowAdventure(tmp);
                    }
                }
            }, 200);
        }
    });

    useEffect(() => setIsFirstRender(false), []);
};
