// myCompanion™ and Elizabeth™ is a trademark of Lilly Pad LLC. All rights reserved. Unauthorized use is prohibited under U.S. and international law.
// Copyright (c) 2025 Lilly Pad LLC.  All Rights Reserved.

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';

// Scene setup optimized for face/neck portrait view while preserving environment
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000011); // Deep tech blue - preserved from Elizabeth.PNG

// Camera positioned for face focus but showing environment context
const camera = new THREE.PerspectiveCamera(65, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 2.5); // Balanced for face focus with environment visibility

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
document.body.appendChild(renderer.domElement);

// Hide loading text once renderer is ready
const loadingElement = document.getElementById('loading');
if (loadingElement) {
    loadingElement.style.display = 'none';
}

// Enhanced lighting setup matching Elizabeth.PNG environment
const ambientLight = new THREE.AmbientLight(0x3366ff, 0.5);
scene.add(ambientLight);

// Key light for face (matching the tech environment)
const keyLight = new THREE.DirectionalLight(0x00ffff, 0.9);
keyLight.position.set(0.8, 2.5, 1.5);
keyLight.castShadow = true;
keyLight.shadow.mapSize.width = 2048;
keyLight.shadow.mapSize.height = 2048;
scene.add(keyLight);

// Fill light for neck area
const fillLight = new THREE.DirectionalLight(0x4477ff, 0.4);
fillLight.position.set(-0.8, 1.8, 0.8);
scene.add(fillLight);

// Rim light for definition (tech environment style)
const rimLight = new THREE.DirectionalLight(0x66aaff, 0.3);
rimLight.position.set(0, 2.0, -1.5);
scene.add(rimLight);

// Environment accent lights (matching Elizabeth.PNG background)
const accentLight1 = new THREE.PointLight(0x00ffff, 0.6, 5);
accentLight1.position.set(2, 2, -2);
scene.add(accentLight1);

const accentLight2 = new THREE.PointLight(0x3366ff, 0.4, 4);
accentLight2.position.set(-2.5, 1.5, -1);
scene.add(accentLight2);

// Controls optimized for face viewing while allowing environment exploration
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0, 1.6, 0); // Focus on face level
controls.minDistance = 1.5;
controls.maxDistance = 6.0;
controls.minPolarAngle = Math.PI / 6;
controls.maxPolarAngle = (5 * Math.PI) / 6;

// Global variables
let elizabeth;
let elizabethHead;
let elizabethNeck;
let isLoaded = false;
let facialAnimations = {};

// Elizabeth model loader
const loader = new GLTFLoader();

// Create face and neck focused placeholder with environment context
function createFaceNeckPlaceholderWithEnvironment() {
    const group = new THREE.Group();
    
    // Neck (cylinder positioned below head)
    const neckGeometry = new THREE.CylinderGeometry(0.15, 0.18, 0.4, 16);
    const neckMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x4477ff,
        emissive: 0x001122,
        shininess: 100
    });
    const neck = new THREE.Mesh(neckGeometry, neckMaterial);
    neck.position.set(0, 1.3, 0);
    neck.castShadow = true;
    neck.receiveShadow = true;
    group.add(neck);
    elizabethNeck = neck;
    
    // Shoulders (subtle indication, matching Elizabeth.PNG crop)
    const shoulderGeometry = new THREE.CylinderGeometry(0.25, 0.28, 0.2, 16);
    const shoulderMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x3366ee,
        emissive: 0x000811,
        transparent: true,
        opacity: 0.8
    });
    const shoulders = new THREE.Mesh(shoulderGeometry, shoulderMaterial);
    shoulders.position.set(0, 1.0, 0);
    shoulders.castShadow = true;
    group.add(shoulders);
    
    // Head (sphere positioned above neck)
    const headGeometry = new THREE.SphereGeometry(0.35, 20, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x4477ff,
        emissive: 0x002244,
        shininess: 80
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 1.75, 0);
    head.castShadow = true;
    head.receiveShadow = true;
    group.add(head);
    elizabethHead = head;
    
    // Enhanced facial features
    // Eyes with glow effect
    const eyeGeometry = new THREE.SphereGeometry(0.04, 12, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00ffff,
        emissive: 0x00cccc,
        shininess: 200
    });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.12, 0.08, 0.25);
    head.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.12, 0.08, 0.25);
    head.add(rightEye);
    
    // Eye glow effects
    const eyeGlow1 = new THREE.PointLight(0x00ffff, 0.3, 0.5);
    eyeGlow1.position.copy(leftEye.position);
    head.add(eyeGlow1);
    
    const eyeGlow2 = new THREE.PointLight(0x00ffff, 0.3, 0.5);
    eyeGlow2.position.copy(rightEye.position);
    head.add(eyeGlow2);
    
    // Mouth area with tech styling
    const mouthGeometry = new THREE.SphereGeometry(0.02, 8, 6);
    const mouthMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x0088ff,
        emissive: 0x004488,
        shininess: 150
    });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, -0.05, 0.28);
    head.add(mouth);
    
    // Store references for animations
    facialAnimations.leftEye = leftEye;
    facialAnimations.rightEye = rightEye;
    facialAnimations.mouth = mouth;
    facialAnimations.eyeGlow1 = eyeGlow1;
    facialAnimations.eyeGlow2 = eyeGlow2;
    
    scene.add(group);
    elizabeth = group;
    isLoaded = true;
    setupFaceNeckAnimations();
}

// Try to load the GLTF model with face/neck focus while preserving full context
loader.load(
    'models/elizabeth.glb',
    (gltf) => {
        elizabeth = gltf.scene;
        
        // Find and isolate head and neck components while maintaining context
        elizabeth.traverse((child) => {
            if (child.isMesh) {
                const name = child.name.toLowerCase();
                if (name.includes('head') || name.includes('face')) {
                    elizabethHead = child;
                    child.castShadow = true;
                    child.receiveShadow = true;
                } else if (name.includes('neck')) {
                    elizabethNeck = child;
                    child.castShadow = true;
                    child.receiveShadow = true;
                } else if (name.includes('body') || name.includes('torso')) {
                    // Make body less prominent but don't hide completely
                    if (child.material) {
                        child.material.transparent = true;
                        child.material.opacity = 0.3;
                    }
                } else if (name.includes('leg') || name.includes('foot') || name.includes('arm')) {
                    // Hide extremities to focus on face/neck/shoulders area
                    child.visible = false;
                }
            }
        });
        
        // Position model for optimal face/neck view
        elizabeth.position.set(0, -0.5, 0);
        elizabeth.scale.set(1.2, 1.2, 1.2);
        
        scene.add(elizabeth);
        isLoaded = true;
        setupFaceNeckAnimations();
        setupAdvancedFacialAnimations();
        console.log('Elizabeth face/neck model loaded successfully');
    },
    (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
    },
    (error) => {
        console.warn('Could not load Elizabeth model, using enhanced placeholder:', error);
        createFaceNeckPlaceholderWithEnvironment();
    }
);

// Recreate Elizabeth's tech environment from Elizabeth.PNG
function createElizabethTechEnvironment() {
    // Tech background panels (matching Elizabeth.PNG environment)
    const panelGeometry = new THREE.PlaneGeometry(2.5, 1.8);
    const panelMaterial1 = new THREE.MeshBasicMaterial({ 
        color: 0x002244,
        transparent: true,
        opacity: 0.6
    });
    
    const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial1);
    leftPanel.position.set(-2.5, 1.8, -3);
    leftPanel.rotation.y = 0.3;
    scene.add(leftPanel);
    
    const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial1.clone());
    rightPanel.position.set(2.5, 1.8, -3);
    rightPanel.rotation.y = -0.3;
    scene.add(rightPanel);
    
    // Animated tech screens
    const screenGeometry = new THREE.PlaneGeometry(1.2, 0.8);
    const screenMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x0066ff,
        transparent: true,
        opacity: 0.7
    });
    
    const screen1 = new THREE.Mesh(screenGeometry, screenMaterial);
    screen1.position.set(1.8, 2.2, -2.5);
    scene.add(screen1);
    
    const screen2 = new THREE.Mesh(screenGeometry, screenMaterial.clone());
    screen2.position.set(-1.8, 1.4, -2.8);
    scene.add(screen2);
    
    // Screen flicker animations (tech environment)
    gsap.to([screenMaterial, screen2.material], {
        opacity: 0.3,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.4
    });
    
    gsap.to([screenMaterial.color, screen2.material.color], {
        r: 0.2, g: 0.4, b: 1,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2
    });
    
    // Tech environment floor with grid pattern
    const floorGeometry = new THREE.PlaneGeometry(12, 12, 20, 20);
    const floorMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x112244,
        transparent: true,
        opacity: 0.4,
        wireframe: true
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);
    
    // Environmental particle system (tech atmosphere)
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 8;     // x
        positions[i + 1] = Math.random() * 4 + 0.5;   // y 
        positions[i + 2] = -4 + Math.random() * 2;    // z
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x00aaff,
        size: 0.03,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // Animate environmental elements
    gsap.to(particles.rotation, {
        y: Math.PI * 2,
        duration: 30,
        repeat: -1,
        ease: 'none'
    });
    
    // Holographic interface elements (matching Elizabeth's tech theme)
    const holoGeometry = new THREE.RingGeometry(0.5, 0.8, 16);
    const holoMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });
    
    const holo1 = new THREE.Mesh(holoGeometry, holoMaterial);
    holo1.position.set(2, 1, -1.5);
    holo1.rotation.x = Math.PI / 4;
    scene.add(holo1);
    
    const holo2 = new THREE.Mesh(holoGeometry, holoMaterial.clone());
    holo2.position.set(-2.2, 2.5, -2);
    holo2.rotation.z = Math.PI / 6;
    scene.add(holo2);
    
    // Hologram rotation animations
    gsap.to([holo1.rotation, holo2.rotation], {
        z: "+=6.28",
        duration: 15,
        repeat: -1,
        ease: 'none',
        stagger: 5
    });
    
    // Atmospheric lighting effects
    gsap.to(accentLight1, {
        intensity: 1.2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    gsap.to(accentLight2.position, {
        y: "+=0.5",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

// Setup face and neck specific animations
function setupFaceNeckAnimations() {
    if (!elizabeth) return;
    
    // Gentle head breathing animation
    if (elizabethHead) {
        gsap.to(elizabethHead.position, {
            y: "+=0.03",
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        // Subtle head micro-movements for liveliness
        gsap.to(elizabethHead.rotation, {
            x: "+=0.02",
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
    
    // Subtle neck movement coordinated with breathing
    if (elizabethNeck) {
        gsap.to(elizabethNeck.rotation, {
            x: "+=0.03",
            duration: 4.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        gsap.to(elizabethNeck.position, {
            y: "+=0.01",
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
    
    // Enhanced facial feature animations for placeholder
    if (facialAnimations.leftEye && facialAnimations.rightEye) {
        // Natural blinking with slight asymmetry
        const blinkAnimation = () => {
            const leftDelay = Math.random() * 0.05;
            const rightDelay = Math.random() * 0.05;
            
            gsap.to(facialAnimations.leftEye.scale, {
                y: 0.1,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut',
                delay: leftDelay
            });
            
            gsap.to(facialAnimations.rightEye.scale, {
                y: 0.1,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut',
                delay: rightDelay,
                onComplete: () => {
                    setTimeout(blinkAnimation, 2000 + Math.random() * 4000);
                }
            });
            
            // Eye glow during blink
            if (facialAnimations.eyeGlow1 && facialAnimations.eyeGlow2) {
                gsap.to([facialAnimations.eyeGlow1, facialAnimations.eyeGlow2], {
                    intensity: 0.1,
                    duration: 0.15,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                });
            }
        };
        setTimeout(blinkAnimation, 3000);
        
        // Subtle eye movements (looking around naturally)
        const eyeMovement = () => {
            const moveX = (Math.random() - 0.5) * 0.02;
            const moveY = (Math.random() - 0.5) * 0.01;
            
            gsap.to([facialAnimations.leftEye.position, facialAnimations.rightEye.position], {
                x: "+=moveX",
                y: "+=moveY", 
                duration: 2,
                ease: 'power2.out',
                onComplete: () => {
                    setTimeout(() => {
                        gsap.to([facialAnimations.leftEye.position, facialAnimations.rightEye.position], {
                            x: "-=moveX",
                            y: "-=moveY",
                            duration: 2,
                            ease: 'power2.out'
                        });
                    }, 1000);
                    setTimeout(eyeMovement, 8000 + Math.random() * 5000);
                }
            });
        };
        setTimeout(eyeMovement, 5000);
    }
    
    // Mouth idle animation with tech glow
    if (facialAnimations.mouth) {
        gsap.to(facialAnimations.mouth.material.emissive, {
            r: 0.2, g: 0.4, b: 0.9,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

// Setup advanced facial animations for GLTF models
function setupAdvancedFacialAnimations() {
    if (!elizabeth) return;
    
    elizabeth.traverse((child) => {
        if (child.isMesh && child.morphTargetDictionary) {
            const morphTargets = child.morphTargetDictionary;
            
            // Enhanced natural blinking
            if (morphTargets['Blink'] !== undefined || morphTargets['EyesClosed'] !== undefined) {
                const blinkIndex = morphTargets['Blink'] || morphTargets['EyesClosed'];
                
                const naturalBlink = () => {
                    gsap.to(child.morphTargetInfluences, {
                        [blinkIndex]: 1,
                        duration: 0.12,
                        ease: 'power2.inOut',
                        yoyo: true,
                        repeat: 1,
                        onComplete: () => {
                            const nextBlink = 1800 + Math.random() * 3500;
                            setTimeout(naturalBlink, nextBlink);
                        }
                    });
                };
                setTimeout(naturalBlink, 2500);
            }
            
            // Subtle smile with emotional variation
            if (morphTargets['Smile'] !== undefined) {
                const smileIndex = morphTargets['Smile'];
                gsap.to(child.morphTargetInfluences, {
                    [smileIndex]: 0.15,
                    duration: 4.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
            
            // Eyebrow micro-expressions
            if (morphTargets['BrowUp'] !== undefined) {
                const browIndex = morphTargets['BrowUp'];
                gsap.to(child.morphTargetInfluences, {
                    [browIndex]: 0.08,
                    duration: 7,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
            
            // Nostril breathing animation
            if (morphTargets['NostrilFlare'] !== undefined) {
                const nostrilIndex = morphTargets['NostrilFlare'];
                gsap.to(child.morphTargetInfluences, {
                    [nostrilIndex]: 0.05,
                    duration: 3.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
        }
    });
}

// Enhanced speech animation with full emotional range
function animateFacialExpression(speaking, emotion = 'neutral') {
    if (!elizabeth) return;
    
    // Coordinated head and neck movement during speech
    if (elizabethHead && elizabethNeck) {
        if (speaking) {
            gsap.to(elizabethHead.rotation, {
                x: "+=0.06",
                y: "+=0.04",
                duration: 0.4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
            
            gsap.to(elizabethNeck.rotation, {
                x: "+=0.03",
                duration: 0.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        } else {
            gsap.killTweensOf([elizabethHead.rotation, elizabethNeck.rotation]);
            gsap.to([elizabethHead.rotation, elizabethNeck.rotation], {
                x: 0, y: 0, z: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        }
    }
    
    // Advanced morph target animations with emotional context
    elizabeth.traverse((child) => {
        if (child.isMesh && child.morphTargetDictionary) {
            const morphTargets = child.morphTargetDictionary;
            
            if (speaking) {
                // Dynamic mouth movement
                if (morphTargets['MouthOpen'] !== undefined) {
                    const mouthIndex = morphTargets['MouthOpen'];
                    gsap.to(child.morphTargetInfluences, {
                        [mouthIndex]: 0.3 + Math.random() * 0.4,
                        duration: 0.18,
                        repeat: -1,
                        yoyo: true,
                        ease: 'power1.inOut'
                    });
                }
                
                // Emotional expression modulation
                if (emotion === 'guardian' && morphTargets['Serious'] !== undefined) {
                    const seriousIndex = morphTargets['Serious'];
                    gsap.to(child.morphTargetInfluences, {
                        [seriousIndex]: 0.7,
                        duration: 0.6,
                        ease: 'power2.out'
                    });
                } else if (emotion === 'friendly' && morphTargets['Smile'] !== undefined) {
                    const smileIndex = morphTargets['Smile'];
                    gsap.to(child.morphTargetInfluences, {
                        [smileIndex]: 0.4,
                        duration: 0.6,
                        ease: 'power2.out'
                    });
                } else if (emotion === 'concerned' && morphTargets['BrowDown'] !== undefined) {
                    const browIndex = morphTargets['BrowDown'];
                    gsap.to(child.morphTargetInfluences, {
                        [browIndex]: 0.3,
                        duration: 0.6,
                        ease: 'power2.out'
                    });
                }
                
            } else {
                // Gradual return to neutral expression
                gsap.killTweensOf(child.morphTargetInfluences);
                Object.keys(morphTargets).forEach(key => {
                    if (!['Blink', 'EyesClosed'].includes(key)) {
                        const index = morphTargets[key];
                        const targetValue = key === 'Smile' ? 0.15 : 0; // Maintain subtle smile
                        gsap.to(child.morphTargetInfluences, {
                            [index]: targetValue,
                            duration: 0.8,
                            ease: 'power2.out'
                        });
                    }
                });
            }
        }
    });
    
    // Enhanced placeholder facial animation with emotion
    if (facialAnimations.mouth) {
        if (speaking) {
            gsap.to(facialAnimations.mouth.scale, {
                x: 1.3 + Math.random() * 0.4, 
                z: 1.2 + Math.random() * 0.3,
                duration: 0.25,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
            
            // Emotional glow modulation
            const glowColor = emotion === 'guardian' ? 
                { r: 0.8, g: 0.3, b: 0.1 } : 
                { r: 0.2, g: 0.4, b: 0.9 };
                
            gsap.to(facialAnimations.mouth.material.emissive, {
                ...glowColor,
                duration: 0.3,
                ease: 'power2.out'
            });
        } else {
            gsap.killTweensOf(facialAnimations.mouth.scale);
            gsap.to(facialAnimations.mouth.scale, {
                x: 1, y: 1, z: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            // Return to neutral glow
            gsap.to(facialAnimations.mouth.material.emissive, {
                r: 0.1, g: 0.3, b: 0.7,
                duration: 0.6,
                ease: 'power2.out'
            });
        }
    }
}

// Enhanced head movement with natural neck coordination
function animateHeadLook(direction) {
    if (!elizabeth) return;
    
    let headTargetY = 0, headTargetX = 0;
    let neckTargetX = 0, neckTargetY = 0;
    
    switch (direction) {
        case 'left':
            headTargetY = 0.4;
            neckTargetY = 0.2;
            neckTargetX = 0.1;
            break;
        case 'right':
            headTargetY = -0.4;
            neckTargetY = -0.2;
            neckTargetX = 0.1;
            break;
        case 'up':
            headTargetX = -0.3;
            neckTargetX = -0.15;
            break;
        case 'down':
            headTargetX = 0.25;
            neckTargetX = 0.2;
            break;
        case 'center':
        default:
            headTargetY = 0;
            headTargetX = 0;
            neckTargetX = 0;
            neckTargetY = 0;
            break;
    }
    
    // Animate head with natural movement
    if (elizabethHead) {
        gsap.to(elizabethHead.rotation, {
            y: headTargetY,
            x: headTargetX,
            duration: 1.4,
            ease: 'power2.out'
        });
    } else {
        const headBone = elizabeth.getObjectByName('Head') || elizabeth;
        gsap.to(headBone.rotation, {
            y: headTargetY,
            x: headTargetX,
            duration: 1.4,
            ease: 'power2.out'
        });
    }
    
    // Coordinate neck movement naturally
    if (elizabethNeck) {
        gsap.to(elizabethNeck.rotation, {
            x: neckTargetX,
            y: neckTargetY,
            duration: 1.6,
            ease: 'power2.out'
        });
    }
}

// Voice initialization and selection system
let elizabethVoice = null;
let voicesLoaded = false;

// Initialize voice system
function initializeVoiceSystem() {
    return new Promise((resolve) => {
        const loadVoices = () => {
            const voices = speechSynthesis.getVoices();
            if (voices.length > 0) {
                selectBestFemaleVoice(voices);
                voicesLoaded = true;
                console.log('?? Voice system initialized');
                resolve();
            }
        };
        
        // Load voices immediately if available
        loadVoices();
        
        // Also listen for voices changed event
        speechSynthesis.onvoiceschanged = loadVoices;
        
        // Fallback timeout
        setTimeout(() => {
            if (!voicesLoaded) {
                console.log('?? Voice loading timeout - using default voice');
                voicesLoaded = true;
                resolve();
            }
        }, 2000);
    });
}

// Select the best available female voice for Elizabeth
function selectBestFemaleVoice(voices) {
    // Priority list of preferred female voices
    const preferredVoices = [
        'Samantha',           // macOS - natural, pleasant
        'Karen',              // macOS - clear female voice  
        'Susan',              // macOS - professional female
        'Victoria',           // macOS - friendly female
        'Allison',            // macOS - warm female
        'Alex',               // macOS - can be feminine with pitch
        'Microsoft Zira',     // Windows - clear female
        'Microsoft Hazel',    // Windows - British female
        'Google UK English Female', // Chrome - natural
        'en-US-AriaNeural',   // Edge - modern neural voice
        'en-US-JennyNeural',  // Edge - conversational
        'en-GB-SoniaNeural'   // Edge - British female
    ];
    
    // First try exact name matches
    for (const preferred of preferredVoices) {
        const voice = voices.find(v => v.name === preferred);
        if (voice) {
            elizabethVoice = voice;
            console.log(`?? Selected premium voice: ${voice.name} (${voice.lang})`);
            return;
        }
    }
    
    // Then try partial name matches
    for (const preferred of preferredVoices) {
        const voice = voices.find(v => 
            v.name.toLowerCase().includes(preferred.toLowerCase())
        );
        if (voice) {
            elizabethVoice = voice;
            console.log(`?? Selected good voice: ${voice.name} (${voice.lang})`);
            return;
        }
    }
    
    // Fallback: find any female voice
    const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('woman') ||
        (voice.gender && voice.gender.toLowerCase() === 'female') ||
        voice.name.toLowerCase().includes('she') ||
        voice.name.toLowerCase().includes('girl')
    );
    
    if (femaleVoice) {
        elizabethVoice = femaleVoice;
        console.log(`?? Selected fallback female voice: ${femaleVoice.name}`);
        return;
    }
    
    // Final fallback: use default but with higher pitch
    console.log('?? No female voice found - using default with high pitch');
    elizabethVoice = null;
}

// Enhanced speech function with natural female voice coordination
function speak(text, onStart = null, onEnd = null, emotion = 'neutral') {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Natural female voice modulation based on emotion
    switch(emotion) {
        case 'guardian':
            utterance.rate = 0.85;      // Authoritative but clear
            utterance.pitch = elizabethVoice ? 1.05 : 1.1;  // Adjust based on voice availability
            break;
        case 'friendly':
            utterance.rate = 0.92;      // Warm and approachable
            utterance.pitch = elizabethVoice ? 1.15 : 1.25; // Higher, cheerful feminine pitch
            break;
        case 'concerned':
            utterance.rate = 0.8;       // Slower, more careful
            utterance.pitch = elizabethVoice ? 1.0 : 1.15;  // Slightly lower, empathetic tone
            break;
        default:
            utterance.rate = 0.9;       // Natural conversational pace
            utterance.pitch = elizabethVoice ? 1.1 : 1.2;   // Pleasant feminine pitch
    }
    utterance.volume = 0.85; // Slightly louder for clarity
    
    // Use selected female voice if available
    if (elizabethVoice) {
        utterance.voice = elizabethVoice;
    }
    
    utterance.onstart = () => {
        if (onStart) onStart();
        animateFacialExpression(true, emotion);
    };
    
    utterance.onend = () => {
        if (onEnd) onEnd();
        animateFacialExpression(false, emotion);
    };
    
    // Handle speech errors gracefully
    utterance.onerror = (event) => {
        console.warn('?? Speech synthesis error:', event.error);
        animateFacialExpression(false, emotion);
        if (onEnd) onEnd();
    };
    
    speechSynthesis.speak(utterance);
}

// Initialize Elizabeth's complete tech environment
createElizabethTechEnvironment();

// Initialize voice system first, then start Elizabeth
initializeVoiceSystem().then(() => {
    // Initial greeting with context and proper voice
    setTimeout(() => {
        if (isLoaded) {
            speak("Hello Nicholas. I am Elizabeth, and I am ready to assist you.", null, null, 'friendly');
        }
    }, 3000);
});

// Periodic natural behaviors maintaining environment immersion
setInterval(() => {
    if (isLoaded && Math.random() > 0.85) {
        const directions = ['left', 'right', 'center', 'up', 'down'];
        animateHeadLook(directions[Math.floor(Math.random() * directions.length)]);
        
        const phrases = [
            "Systems operational and ready.",
            "Environment monitoring active.", 
            "How may I assist you today?",
            "All protocols functioning normally."
        ];
        
        if (Math.random() > 0.92) {
            speak(phrases[Math.floor(Math.random() * phrases.length)], null, null, 'friendly');
        }
    }
}, 12000);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    if (controls) {
        controls.update();
    }
    
    renderer.render(scene, camera);
}

// Start the animation loop
animate();

// Export enhanced API for face/neck animations with natural voice
window.ElizabethAPI = {
    speak: speak,
    lookAt: animateHeadLook,
    setExpression: animateFacialExpression,
    isLoaded: () => isLoaded,
    getVoiceStatus: () => ({ 
        voicesLoaded: voicesLoaded,
        selectedVoice: elizabethVoice ? elizabethVoice.name : 'default',
        voiceGender: elizabethVoice ? (elizabethVoice.gender || 'female') : 'default'
    }),
    getEnvironmentStatus: () => ({ 
        techEnvironment: true, 
        faceFocused: true, 
        contextPreserved: true 
    })
};