import { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Plane, Program, Mesh, Vec2, Color } from 'ogl';

/*
  Iridescence WebGL Component
  - Uses OGL for lightweight shader rendering
  - Fragment shader creates a liquid/iridescent effect
  - Reacts to mouse/touch via uniforms
  - Props controlled: color, speed, amplitude
*/

const vertexShader = `
  attribute vec3 position;
  attribute vec2 uv;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uAmplitude;
  uniform float uSpeed;
  uniform vec3 uColor;
  
  varying vec2 vUv;

  // Simplex noise function (simplified)
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float time = uTime * uSpeed * 0.2;
    
    // Mouse Interaction
    float dist = distance(uv, uMouse);
    float mouseEffect = smoothstep(0.5, 0.0, dist) * 0.1;
    
    // Noise layers for fluidity
    float noise1 = snoise(uv * 3.0 + time + mouseEffect);
    float noise2 = snoise(uv * 6.0 - time * 0.5);
    
    // Combine noise
    float finalNoise = mix(noise1, noise2, 0.5);
    
    // Iridescence Color Mix
    // Base is white/pale, mix with uColor based on noise
    vec3 color = mix(vec3(1.0, 0.95, 0.98), uColor, finalNoise * uAmplitude + 0.3);
    
    // Subtle shifting gradients
    color += vec3(0.05 * sin(time), 0.05 * cos(time), 0.1 * sin(time * 0.5));

    gl_FragColor = vec4(color, 1.0);
  }
`;

const Iridescence = ({
    color = [0.6, 0.8, 0.9],
    amplitude = 0.1,
    speed = 1.0,
    mouseReact = true,
    dpr = 1
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // OGL Setup
        const renderer = new Renderer({ alpha: true, dpr: dpr });
        const gl = renderer.gl;
        containerRef.current.appendChild(gl.canvas);

        const resize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', resize);
        resize();

        const camera = new Camera(gl);
        camera.position.z = 1;

        const mouse = new Vec2(0.5, 0.5);
        if (mouseReact) {
            window.addEventListener('mousemove', (e) => {
                mouse.set(e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight);
            });
            window.addEventListener('touchmove', (e) => {
                if (e.touches[0]) {
                    mouse.set(e.touches[0].clientX / window.innerWidth, 1.0 - e.touches[0].clientY / window.innerHeight);
                }
            });
        }

        const scene = new Transform();
        const geometry = new Plane(gl, { width: 2, height: 2 });

        const program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new Vec2(window.innerWidth, window.innerHeight) },
                uMouse: { value: mouse },
                uColor: { value: new Color(color[0], color[1], color[2]) },
                uAmplitude: { value: amplitude },
                uSpeed: { value: speed }
            }
        });

        const mesh = new Mesh(gl, { geometry, program });
        mesh.setParent(scene);

        let animationId;
        const update = (t) => {
            animationId = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001;
            program.uniforms.uMouse.value = mouse; // Update mouse
            renderer.render({ scene, camera });
        };
        animationId = requestAnimationFrame(update);

        // Styling for fixed background
        gl.canvas.style.position = 'fixed';
        gl.canvas.style.top = '0';
        gl.canvas.style.left = '0';
        gl.canvas.style.width = '100vw';
        gl.canvas.style.height = '100dvh';
        gl.canvas.style.zIndex = '-1';
        gl.canvas.style.pointerEvents = 'none'; // Passthrough touches

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            if (containerRef.current && containerRef.current.contains(gl.canvas)) {
                containerRef.current.removeChild(gl.canvas);
            }
        };
    }, [color, amplitude, speed, mouseReact, dpr]);

    return <div ref={containerRef} />;
};

export default Iridescence;
