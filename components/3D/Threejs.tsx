import { Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Threejs() {
    const ref = useRef<HTMLCanvasElement>(null);

    const loadGLTF = (url: string, scene: Scene) => {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();

            loader.load(url, (gltf) => {
                const obj = gltf.scene;
                obj.position.x = 0;
                obj.position.y = 0;
                console.log(`scene ${JSON.stringify(scene)}`);
                scene.add(obj);
                resolve(obj);
            }, undefined, (error) => {
                reject(error);
            });
        });
    };

    useEffect(() => {
        if (ref.current) {
            const scene = new Scene();

            const renderer = new WebGLRenderer({
                canvas: ref.current,
                antialias: true,
                alpha: true
            });
            renderer.setSize(window.innerWidth * 0.8, window.innerHeight / 2);

            scene.background = new Color('white');

            const camera = new PerspectiveCamera(30, 1.2);
            camera.position.set(0, 0, 5);

            const loader = new GLTFLoader();
            loader.load('/3D/shiba/scene.gltf', (gltf) => {
                scene.add(gltf.scene);

                function animate() {
                    requestAnimationFrame(animate);
                    gltf.scene.rotation.y += 0.01;
                    renderer.render(scene, camera);
                }

                animate();
            });
        }
    }, [ref]);

    return (
        <div className={'flex justify-center w-screen'}>
            <canvas id={'Threejs'} ref={ref}></canvas>
        </div>
    );
}
