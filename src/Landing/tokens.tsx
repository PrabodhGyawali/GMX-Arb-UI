import * as THREE from 'three';

const geometry = new THREE.CylinderGeometry( 0.5, 0.5, 0.1, 32 ); 
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} ); 
const cylinder = new THREE.Mesh( geometry, material );

// Starting position
cylinder.position.x = -3;
cylinder.position.y = 5;
cylinder.position.z = 1;

// cylinder.rotation.x += 10;
// cylinder.rotation.z += 30;

function animate(token: THREE.CylinderGeometry) {
    // token drops to cube
    
}

export default cylinder
