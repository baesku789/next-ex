import { Color, DirectionalLight, PerspectiveCamera, Scene, sRGBEncoding, WebGLRenderer } from 'three';
import { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Threejs() {
    const ref = useRef<HTMLCanvasElement>(null);

    const loadGLTF = (url: string, scene: Scene) => {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();

            loader.load(url, (gltf) => {
                scene.add(gltf.scene);
                resolve(gltf.scene);
            }, undefined, (error) => {
                reject(error);
            });
        });
    };

    useEffect(() => {
        let renderer;

        if (ref.current) {
            const scene = new Scene();

            renderer = new WebGLRenderer({
                canvas: ref.current,
                antialias: true,
                alpha: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight / 2);
            renderer.outputEncoding = sRGBEncoding;

            scene.background = new Color('white');

            // fov 작을 수록 가까워짐
            const camera = new PerspectiveCamera(35, 0.9);

            const controls = new OrbitControls(camera, renderer.domElement);

            camera.position.set(0, 0, 5);
            controls.update();

            // White directional light at half intensity shining from the top.
            const directionalLight = new DirectionalLight(0xffffff, 0.5);
            scene.add(directionalLight);

            const loader = new GLTFLoader();
            loader.load('/3D/shiba/scene.gltf', (gltf) => {
                scene.add(gltf.scene);

                function animate() {
                    requestAnimationFrame(animate);
                    controls.update();
                    renderer.render(scene, camera);
                }

                animate();
            });
        }

        return () => {
            if (renderer) {
                renderer.dispose();
            }
        };
    }, [ref]);

    return (
        <div className={'flex justify-center w-screen'}>
            <canvas id={'Threejs'} ref={ref}></canvas>
        </div>
    );
}
