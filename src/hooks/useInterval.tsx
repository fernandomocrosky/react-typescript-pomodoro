import React from "react";


export function useInterval<C extends CallableFunction>(
    callback: C, delay: number | null
): void {
    const saveCallback = React.useRef<C>();

    React.useEffect(() => {
        saveCallback.current = callback;
    }, [callback]);


    React.useEffect(() => {
        function tick() {
            if (saveCallback.current) saveCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}