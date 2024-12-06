import * as THREE from 'three'
import { useEffect, useRef } from 'react';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import cylinder from './tokens';
import { LineAxis, Token } from '@mui/icons-material';

const Landing: React.FC = () => { const sceneRef = useRef<HTMLDivElement | null>(null);
  

  useEffect(() => { 
  const scene = new THREE.Scene(); 
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
  const renderer = new THREE.WebGLRenderer();
  camera.position.set( 0, 3, 5 );

  // Light
  {

		const skyColor = 0xB1E1FF; // light blue
		const groundColor = 0xB97A20; // brownish orange
		const intensity = 2;
		const light = new THREE.HemisphereLight( skyColor, groundColor, intensity );
		scene.add( light );

	} 
  {

		const color = 0xFFFFFF;
		const intensity = 2.5;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( 0, 10, 0 );
		light.target.position.set( - 5, 0, 0 );
		scene.add( light );
		scene.add( light.target );

	}
  
  const objLoader = new OBJLoader();
  objLoader.load('public/shellCube.obj', (root) => {
    scene.add(root);
  });
  scene.add(cylinder);
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  const animate = () => { requestAnimationFrame(animate); renderer.render(scene, camera); cylinder.rotation.x+=0.01};
  
  sceneRef.current?.appendChild(renderer.domElement);
  
  animate();
  
  return () => { sceneRef.current?.removeChild(renderer.domElement); }; }, []);
  
  return <div ref={sceneRef}></div>; 
};
  
export default Landing;