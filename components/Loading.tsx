import { useEffect, useState } from "react";
import { useStopwatch } from "react-use-precision-timer";

const Loading = () => {
    const stopwatch = useStopwatch();
    const [time, setTime] = useState(0);
    useEffect(() => {
        setTime(stopwatch.getElapsedRunningTime());

    }, [stopwatch])
    return (
        <div>
            <p>
                <b>
                    Loading...
                </b>
                (100% glitchless)
                {time}
            </p>
        </div>
    );
}
export default Loading;