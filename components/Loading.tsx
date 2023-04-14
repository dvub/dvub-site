import { memo, useEffect, useState } from "react";
import { useStopwatch } from "react-use-precision-timer";

const Loading = () => {
    const stopwatch = useStopwatch();
    useEffect(() => {
        stopwatch.start()
    }, [stopwatch])
    return (
        <div>
            <p>
                <b>
                    Loading...
                </b>
                (100% glitchless)<br/>
                {stopwatch.getElapsedRunningTime()}
            </p>
        </div>
    );
}
export default Loading;