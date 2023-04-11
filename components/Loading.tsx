import { useEffect, useState } from "react";
import { useStopwatch } from "react-use-precision-timer";

const Loading = () => {
    const stopwatch = useStopwatch();
    if (!stopwatch.isRunning()) stopwatch.start();


  
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