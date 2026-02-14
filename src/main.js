import * as THREE from "three";
import vertexShader from "./shaders/vertexShaders.glsl";
import fragmentShader from "./shaders/fragmentShaders.glsl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const cursor = document.querySelector("#cursor");

window.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.6,
    ease: "back.out",
  });
});

const canvas = document.getElementById("canvas");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Icosahedron geometry (sphere-like, 1 subdivision for smoother look)
const geometry = new THREE.IcosahedronGeometry(2, 51, 51);

const uniforms = {
  uTime: {
    value: 0,
  },
  uColor: {
    value: 0,
  },
};

const material = new THREE.ShaderMaterial({
  // wireframe: true,
  vertexShader,
  fragmentShader,
  uniforms: uniforms,
  side: THREE.DoubleSide,
});

const sphere = new THREE.Mesh(geometry, material);
sphere.position.y = -2.5;
scene.add(sphere);

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", resize);

// Gsap
gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".landing",
    start: "top top",
    end: "bottom center",
    scrub: 2,
  },
});

tl.to(
  sphere.position,
  {
    y: 0,
    z: -5,
    ease: "power1.inOut",
  },
  "transition",
)
  .to(
    material.uniforms.uColor,
    {
      value: 1,
      ease: "linear",
    },
    "transition",
  )
  .to(
    ".landing h1",
    {
      opacity: 0,
    },
    "transition",
  )
  .to(".landing p", {
    opacity: 1,
  });

const clock = new THREE.Clock();

function animate() {
  material.uniforms.uTime.value = clock.getElapsedTime();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
