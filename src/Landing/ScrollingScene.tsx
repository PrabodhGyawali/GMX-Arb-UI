import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Section {
  title: string;
  description: string;
}

const sections: Section[] = [
  {
    title: "Welcome to Funding Rate Arbitrage",
    description: "An advanced trading strategy leveraging price differences across exchanges."
  },
  {
    title: "Market Balance",
    description: "Markets can become imbalanced when there's more liquidity on one side. This creates opportunities."
  },
  {
    title: "Funding Rates",
    description: "When markets are skewed, traders on the overweight side pay a fee (funding rate) to the underweight side."
  },
  {
    title: "Delta Neutrality",
    description: "We maintain zero price exposure by opening equal but opposite positions across exchanges."
  },
  {
    title: "Arbitrage Opportunity",
    description: "Profit is made from the difference in funding rates between exchanges while maintaining delta neutrality."
  }
];

const ScrollingScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create visual elements for each section
    const createMarketVisualization = () => {
      const group = new THREE.Group();

      // Long side rectangle
      const longGeometry = new THREE.BoxGeometry(1, 2, 0.2);
      const longMaterial = new THREE.MeshPhongMaterial({ color: 0x4CAF50 });
      const longMesh = new THREE.Mesh(longGeometry, longMaterial);
      longMesh.position.x = -1.5;
      group.add(longMesh);

      // Short side rectangle
      const shortGeometry = new THREE.BoxGeometry(1, 1.5, 0.2);
      const shortMaterial = new THREE.MeshPhongMaterial({ color: 0xF44336 });
      const shortMesh = new THREE.Mesh(shortGeometry, shortMaterial);
      shortMesh.position.x = 1.5;
      group.add(shortMesh);

      // Price line
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-2, 0, 0),
        new THREE.Vector3(2, 0, 0)
      ]);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      group.add(line);

      return group;
    };

    // Create market states for different sections
    const marketStates = sections.map((_, index) => {
      const group = createMarketVisualization();
      group.position.z = -index * 10;
      scene.add(group);
      return group;
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Scroll handling
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const targetZ = -scrollPercent * (sections.length - 1) * 10;
      
      gsap.to(camera.position, {
        z: 5 + targetZ,
        duration: 0.5,
        ease: 'power2.out'
      });

      const currentIndex = Math.min(
        Math.floor(scrollPercent * sections.length),
        sections.length - 1
      );
      setCurrentSection(currentIndex);
    };

    window.addEventListener('scroll', handleScroll);

    // Create scroll sections
    sections.forEach((_, index) => {
      const element = document.createElement('div');
      element.style.height = '100vh';
      element.style.position = 'relative';
      containerRef.current?.appendChild(element);
    });

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          (object.material as THREE.Material).dispose();
        }
      });
    };
  }, []);

  return (
    <div>
      <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }} />
      <div style={{ height: `${sections.length * 100}vh` }}>
        {sections.map((section, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: `${index * 100}vh`,
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              color: 'white',
              opacity: currentSection === index ? 1 : 0,
              transition: 'opacity 0.5s',
              padding: '2rem',
              maxWidth: '800px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '8px',
            }}
          >
            <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
            <p className="text-lg">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingScene;