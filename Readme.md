# deveb.co - Three.js Shader

Overview
This project is a Vite-powered landing page that blends Three.js, custom GLSL shaders, and GSAP scroll animations. A shader-driven blob sits behind the hero text, morphs over time, and transitions color on scroll. A simple custom cursor follows the mouse for added polish.

![deveb.co Hero Screenshot](https://res.cloudinary.com/dcjobwnp5/image/upload/v1771085170/image_12_dm2tgy.png)

## Tech Stack

- Vite: Dev server and build tooling
- Three.js: WebGL scene, camera, renderer, geometry, and shader material
- GSAP + ScrollTrigger: Scroll-driven animation timeline
- GLSL: Custom vertex and fragment shaders
- Tailwind (CDN): Rapid layout and typography in index.html

## Project Structure

- index.html: DOM layout, hero text, canvas, and cursor element
- src/main.js: Three.js setup, GSAP timeline, cursor animation, render loop
- src/style.css: Global layout and canvas sizing
- src/shaders/vertexShaders.glsl: Vertex displacement via 3D noise
- src/shaders/fragmentShaders.glsl: Color blending based on elevation
- package.json: Scripts and dependencies

## How It Works

- DOM and cursor
  - The custom cursor is the #cursor div in index.html.
  - A mousemove listener in src/main.js animates it with GSAP for smooth trailing.

- Three.js scene
  - A WebGLRenderer draws into the #canvas element.
  - A PerspectiveCamera and Scene are created in src/main.js.
  - The mesh is an IcosahedronGeometry to approximate a sphere with controllable detail.

- Shaders
  - vertexShaders.glsl displaces vertices along their normals using classic Perlin noise.
  - The noise is animated with the uTime uniform from the render loop.
  - fragmentShaders.glsl mixes two color ramps based on the displacement value.
  - uColor drives a scroll-based color transition between the ramps.

- Scroll animation
  - GSAP ScrollTrigger pins the hero section and scrubs a timeline.
  - The blob moves forward and up while the hero text fades out.
  - The paragraph fades in and uColor transitions for the shader.

## Setup

1. Install dependencies
   - npm install
2. Run the dev server
   - npm run dev

## What I Learn

- Three.js into a modern Vite workflow
- Write and import GLSL shaders using vite-plugin-glsl
- Animate shader uniforms over time and via scroll
- Use GSAP ScrollTrigger for scroll-based storytelling
- Sync DOM UI with WebGL scenes on the same page

## Notes

- Very high geometry detail can cause WebGL context loss on some GPUs. If that happens, reduce the IcosahedronGeometry detail value in src/main.js.

![deveb.co Shader Detail](https://res.cloudinary.com/dcjobwnp5/image/upload/v1771085170/image_13_wdgvrn.png)
