import React, { useEffect,useState, useRef, Suspense, useMemo } from 'react';
import {Canvas,useFrame,useLoader,useUpdate} from 'react-three-fiber';
import {softShadows,MeshWobbleMaterial,OrbitControls,Stars, Circle,Sphere,Text} from '@react-three/drei';
import {useSpring,a} from 'react-spring/three'
import ReactGlobe from 'react-globe';
import { BoxBufferGeometry } from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import UpsolveText from './models/UpsolveText';


let radius = 300;
const MarsPlanet = ({position}) => {
    const mesh = useRef();
    let i = {
        current: 1000
    }
    // useFrame(() => {
    //     mesh.current.rotation.x = mesh.current.rotation.y += 0.001;
    //     mesh.current.position.x = (radius * Math.cos(2 * Math.PI * (i.current) / 1000)) ;
    //     mesh.current.position.z = (radius * Math.sin(2 * Math.PI * (i.current) / 1000)) - 100 ;
    //     i.current--;
    //     if(i.current<1){
    //         i.current=1000
    //     }
    // })
    // useFrame(() => {mesh.current})
    const gltf = useLoader(GLTFLoader, "Mars_1_6792.glb");
    return <mesh onClick={() => {window.location="/leaderboard"}}><primitive ref={mesh} object={gltf.scene} scale={[0.1,0.1,0.1]} position={position} /></mesh>
  };
  const Planet = ({position}) => {
    const mesh = useRef();
    let i = {
        current: 700
    }
    // useFrame(() => {
    //     mesh.current.rotation.x = mesh.current.rotation.y += 0.001;
    //     mesh.current.position.x = (radius * Math.cos(2 * Math.PI * (i.current) / 1000)) ;
    //     mesh.current.position.z = (radius * Math.sin(2 * Math.PI * (i.current) / 1000)) - 100 ;
    //     i.current--;
    //     if(i.current<1){
    //         i.current=1000
    //     }
    // })
    // useFrame(() => {mesh.current})
    const gltf = useLoader(GLTFLoader, "Jupiter_1_142984.glb");
    return <primitive ref={mesh} object={gltf.scene} scale={[0.1,0.1,0.1]} position={position} />
  };
  



function HomePage() {
    
    return(
        <Canvas 
            style={{width: window.innerWidth,height: window.innerHeight,minWidth: "100vw",minHeight: "100vh"}}
            colorManagement
            shadowMap
            camera = {{position: [0,20,300], fov: 100,far:5000}}
            pixelRatio={Math.min(2,  1)}

        >
            <ambientLight intensity={0.3}></ambientLight>
            <directionalLight
                position={[0,0,10]}
                intensity={1.5}
            ></directionalLight>
            <pointLight position={[-10,0,-20]} intensity={0.5}></pointLight>
            <pointLight position={[0,-10,0]} intensity={1.5}></pointLight>
            <group>
                <Suspense fallback={null}>
                    <UpsolveText></UpsolveText>
                    <MarsPlanet position={[radius * Math.cos(2 * Math.PI * (1000) / 1000),0,radius * Math.sin(2 * Math.PI * (1000) / 1000) - 100]} />
                    
                    <Planet position={[radius * Math.cos(2 * Math.PI * (700) / 1000),0,radius * Math.sin(2 * Math.PI * (700) / 1000) - 100]} />
                    
                </Suspense>
                
                <Stars radius={1000} count={5000} depth={100}></Stars>
                <OrbitControls minPolarAngle={Math.PI / 3} autoRotate></OrbitControls>
            </group>
        </Canvas>
    )

}

export default HomePage;