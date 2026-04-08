import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface CharacterProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const ThreeCharacter = ({ containerRef }: CharacterProps) => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const characterRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    const lights = new THREE.Group();
    scene.add(lights);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    lights.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x3b82f6, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    lights.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff6b6b, 0.5);
    pointLight.position.set(-5, 3, 5);
    lights.add(pointLight);

    const character = new THREE.Group();
    characterRef.current = character;
    scene.add(character);

    const geometry = new THREE.IcosahedronGeometry(0.8, 4);
    const material = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.4,
      roughness: 0.7,
      emissive: 0x2563eb,
      emissiveIntensity: 0.2,
    });

    const head = new THREE.Mesh(geometry, material);
    head.scale.set(1, 1, 1);
    head.position.y = 0.3;
    head.castShadow = true;
    character.add(head);

    const bodyGeometry = new THREE.BoxGeometry(0.6, 1, 0.5);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.3,
      roughness: 0.8,
      emissive: 0x1e40af,
      emissiveIntensity: 0.15,
    });

    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -0.4;
    body.castShadow = true;
    character.add(body);

    const armGeometry = new THREE.CapsuleGeometry(0.15, 0.8, 4, 8);
    const armMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.35,
      roughness: 0.75,
    });

    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.5, -0.1, 0);
    leftArm.rotation.z = Math.PI / 4;
    leftArm.castShadow = true;
    character.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.5, -0.1, 0);
    rightArm.rotation.z = -Math.PI / 4;
    rightArm.castShadow = true;
    character.add(rightArm);

    gsap.to(character.rotation, {
      y: Math.PI * 2,
      duration: 8,
      repeat: -1,
      ease: 'none',
    });

    gsap.to(character.position, {
      y: 0.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to(leftArm.rotation, {
      z: Math.PI / 3,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to(rightArm.rotation, {
      z: -Math.PI / 3,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || width;
      const newHeight = containerRef.current?.clientHeight || height;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [containerRef]);

  return null;
};
