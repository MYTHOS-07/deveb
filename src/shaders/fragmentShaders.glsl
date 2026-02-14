precision mediump float;

varying vec2 vUv;
varying float vElevation;
uniform float uColor;

uniform float uTime;

void main() {
    vec4 c1 = vec4(1.0, 0.102, 0.521, 1.0);
    vec4 c2 = vec4(1.0, 0.702, 0.839, 1.0); 


   vec4 c3 = vec4(1.0, 0.9216, 0.8588, 1.0); 
   vec4 c4 = vec4(1.0, 0.9686, 0.9451, 1.0); 

    float v = smoothstep(-0.14, 0.14, vElevation);

    vec4 colorRed = mix(c1, c2, v);
    vec4 colorYellow = mix(c3, c4, v);
    
    vec4 color = mix(colorRed, colorYellow, uColor);

    gl_FragColor = color;
}
