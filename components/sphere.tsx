import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import mathUtils from '../utils/math'
const Sphere = () => {
    // declare variables
    const rotationAxis = new THREE.Vector3(1, 1, 0);
  
    const radRotation = mathUtils.toRadians(0.1);
  
  
    const position = new THREE.Vector3(0,0,0);
    const pointCount = 250;
    const radius = 20;
    const min = -1 * radius;
    const max = radius;
  
    // set up vector3[]s 
    const randomPoints = Array<THREE.Vector3>(pointCount);
    for (let i = 0; i < randomPoints.length; i++) {
      const x = mathUtils.randomRange(min, max);
      const y = mathUtils.randomRange(min, max);
      const z = mathUtils.randomRange(min, max);
      randomPoints[i] = new THREE.Vector3(x, y, z);
    }
  
    const spherePoints = Array<THREE.Vector3>(pointCount);
    for (let i = 0; i < spherePoints.length; i++) {
      spherePoints[i] = mathUtils.randomSpherePoint(position, radius);
    }
  
    // create a float32array for our ref
    const currentPoints = new Float32Array(pointCount * 3);
    for (let i = 0; i < currentPoints.length; i+=3) {
      const p = randomPoints[i / 3];
      currentPoints[i] = p.x;
      currentPoints[i + 1] = p.y;
      currentPoints[i + 2] = p.z;
    }
  
  
    // get our buffer attribute setup
    const attribute = new THREE.BufferAttribute(currentPoints, 3);
  
    // set up our refs
    const ref = useRef<THREE.BufferAttribute>(attribute);
    const lerpFactor = useRef<number>(0.0);
    const isSphere = useRef<boolean>(false);
  
    const lerpVal = 0.25;
    // animation loop
    useFrame((state, delta) => {
  
      ref.current.needsUpdate = true;
      
      if (lerpFactor.current <= 0) 
        isSphere.current = false;
  
      if (lerpFactor.current >= 1) 
        isSphere.current = true;
  
  
      if (isSphere.current === false) 
        lerpFactor.current += (lerpVal * delta);
  
      if (isSphere.current === true) 
        lerpFactor.current -= (lerpVal * delta);
  
  
      // animation happens in this loop here
      for (let i = 0; i < ref.current.count; i++) {
        spherePoints[i] = mathUtils.rotateAboutPoint(spherePoints[i], position, rotationAxis, radRotation);
        randomPoints[i] = mathUtils.rotateAboutPoint(randomPoints[i], position, rotationAxis, radRotation);
        const randomPosition = randomPoints[i].clone(); // vector3s need to be cloned, otherwise they will mutate the arrays
        const spherePosition = spherePoints[i].clone();
        
        const curr = randomPosition.lerp(spherePosition, lerpFactor.current);
        ref.current.setXYZ(i, curr.x, curr.y, curr.z);
      }
  
    });
  
    // return our buffergeometry using the attribute
    return (
      <points >
        <bufferGeometry>
          <bufferAttribute attach={"attributes-position"} ref={ref} {...attribute}/>
          <pointsMaterial size={0.005}></pointsMaterial>
        </bufferGeometry>
      </points>
    );
}




export default Sphere;  