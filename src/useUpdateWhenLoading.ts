import { useEffect, useState } from "react";

export default (loadingValue: undefined | null | any) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (
            (loadingValue === undefined || loadingValue === null) &&
            count <= 200
        ) {
            setTimeout(() => {
                setCount(count + 1);
            }, 100);
        }
    }, [count, loadingValue]);
};
