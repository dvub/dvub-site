import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { PointsMaterial } from "three";
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
    let lerpFactor = 0;
  
    let lerpVal = 0.75;
    // animation loop
    useFrame((state, delta) => {
      
      ref.current.needsUpdate = true;
      
      if (lerpFactor <= 1) {
        
        lerpFactor += (lerpVal * delta);
        
      }
      // animation happens in this loop here
      for (let i = 0; i < ref.current.count; i++) {
        spherePoints[i] = mathUtils.rotateAboutPoint(spherePoints[i], position, rotationAxis, radRotation);
        randomPoints[i] = mathUtils.rotateAboutPoint(randomPoints[i], position, rotationAxis, radRotation);
        const randomPosition = randomPoints[i].clone(); // vector3s need to be cloned, otherwise they will mutate the arrays
        const spherePosition = spherePoints[i].clone();
        
        const curr = randomPosition.lerp(spherePosition, lerpFactor);
        ref.current.setXYZ(i, curr.x, curr.y, curr.z);
      }
  
    });
  
    // return our buffergeometry using the attribute
    return (

        <points >
          <bufferGeometry>
            <bufferAttribute attach={"attributes-position"} ref={ref} {...attribute}/>
          </bufferGeometry>
          <pointsMaterial size={0.1} color={0x000000} sizeAttenuation={true}/>
        </points>
    );
}




export default Sphere;  