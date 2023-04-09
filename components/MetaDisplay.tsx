import { CSSProperties } from "react";
import { Metadata } from "../types/metadata";

const MetaDisplay = (props: {
    meta: Metadata | null,
    mouse: {
        x: number | null,
        y: number | null
    }
}) => {
    const style: CSSProperties = {
        position: 'absolute',
        left: props.mouse.x + 'px',
        top: props.mouse.y + 'px',
        display: (props.meta ? 'block' : 'none')
    };

    return (
        <div className='border' style={style}>
            {props.meta &&
                <p>
                    {props.meta.title}
                </p>
            }
        </div>
    );
}
export default MetaDisplay;