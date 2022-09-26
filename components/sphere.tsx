import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { DepthPackingStrategies } from "three";
import mathUtils from '../utils/math'
const Sphere = () => {
    // declare variables

    const position = new THREE.Vector3(0,0,0);
    const pointCount = 250;
    const radius = 20;
  
    const spherePoints = Array<THREE.Vector3>(pointCount).fill(null!).map(x => {
      return mathUtils.randomSpherePoint(position, radius);
    });

    // create a float32array for our ref
    const currentPoints = new Float32Array(pointCount * 3);
    // get our buffer attribute setup
    const attribute = new THREE.BufferAttribute(currentPoints, 3);
    // set up our ref
    const ref = useRef<THREE.BufferAttribute>(attribute);


    // animation loop
    useFrame((state, delta) => {
      
      ref.current.needsUpdate = true;

      // animation happens in this loop here
      for (let i = 0; i < ref.current.count; i++) {   

        let s = spherePoints[i];
        const axis: THREE.Vector3 = new THREE.Vector3(0, state.mouse.x, -state.mouse.y);
        const speed = mathUtils.toRadians(state.mouse.length());

        
        s = mathUtils.rotateAboutPoint(s, position, axis, speed);
        
        ref.current.setXYZ(i, s.x, s.y, s.z);
      }
  
    });
    const color = new THREE.Color(0x000000);
    // return our buffergeometry using the attribute
    return (

        <points >
          <bufferGeometry>
            <bufferAttribute attach={"attributes-position"} ref={ref} {...attribute}/>
          </bufferGeometry>
          <pointsMaterial size={0.2} color={color} sizeAttenuation={true} transparent={true}/>
        </points>
    );
}
export default Sphere;  