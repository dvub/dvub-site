import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { PointsMaterial } from "three";
import mathUtils from '../utils/math'
const Sphere = () => {
    // declare variables


    
    const rotationAxis = new THREE.Vector3(1, 1, 0);
  
    const radRotation = mathUtils.toRadians(0.05);
  
  
    const position = new THREE.Vector3(0,0,0);
    const pointCount = 250;
    const radius = 20;
  
    const spherePoints = Array<THREE.Vector3>(pointCount);
    for (let i = 0; i < spherePoints.length; i++) {
      spherePoints[i] = mathUtils.randomSpherePoint(position, radius);
    }

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
        
        spherePoints[i] = mathUtils.rotateAboutPoint(spherePoints[i], position, rotationAxis, radRotation);

        const s = spherePoints[i];
        ref.current.setXYZ(i, s.x, s.y, s.z);
      }
  
    });
  
    // return our buffergeometry using the attribute
    return (

        <points >
          <bufferGeometry>
            <bufferAttribute attach={"attributes-position"} ref={ref} {...attribute}/>
          </bufferGeometry>
          <pointsMaterial size={0.15} color={0x000000} sizeAttenuation={true}/>
        </points>
    );
}




export default Sphere;  