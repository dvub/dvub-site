import { useThree, useFrame } from "@react-three/fiber";
import { useLayoutEffect, useEffect } from "react";


//
const FrameLimiter = (props: { fps: number }) => {
    const set = useThree((state) => state.set);
    const get = useThree((state) => state.get);
    const advance = useThree((state: any) => state.advance);
    const frameloop = useThree((state) => state.frameloop);

    useLayoutEffect(() => {
        const initFrameloop = get().frameloop;

        return () => {
            set({ frameloop: initFrameloop });
        };
    }, [get, set]);

    useFrame((state: any) => {
        if (state.get().blocked) return;
        state.set({ blocked: true });

        setTimeout(() => {
            state.set({ blocked: false });

            state.advance();
        }, Math.max(0, 1000 / props.fps - state.clock.getDelta()));
    });

    useEffect(() => {
        if (frameloop !== 'never') {
            set({ frameloop: 'never' });
            advance();
        }
    }, [frameloop, set, advance]);

    return null;
}

export default FrameLimiter;