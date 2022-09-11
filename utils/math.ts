import { Vector3 } from 'three';

function randomSpherePoint(position: Vector3, radius: number): [number, number, number] {
    var u = Math.random();
    var v = Math.random();
    var theta = 2 * Math.PI * u;
    var phi = Math.acos(2 * v - 1);
    var x = position.x + (radius * Math.sin(phi) * Math.cos(theta));
    var y = position.y + (radius * Math.sin(phi) * Math.sin(theta));
    var z = position.z + (radius * Math.cos(phi));
    return [x, y, z];
}

// code adapted from: 
// https://stackoverflow.com/questions/42812861/three-js-pivot-point/42866733#42866733
// modified to return a new, rotated vector3
function rotateAboutPoint(obj: Vector3, point: Vector3, axis: Vector3, theta: number): Vector3 {

    obj.sub(point); // remove the offset
    obj.applyAxisAngle(axis, theta); // rotate the POSITION
    obj.add(point); // re-add the offset

    return obj;
}

function toDegrees(angle: number) {
    return angle * (180 / Math.PI);
}

function toRadians(angle: number) {
    return angle * (Math.PI / 180);
}

const exports = { randomSpherePoint, rotateAboutPoint, toDegrees, toRadians };
export default exports;

