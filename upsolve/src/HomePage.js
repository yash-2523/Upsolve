import React, { useRef, Suspense } from 'react';
import {Canvas,useFrame,useLoader} from 'react-three-fiber';
import {OrbitControls,Stars} from '@react-three/drei';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


let radius = 500;
const Leaderboard = ({position}) => {
    const mesh = useRef();
    let i = {
        current: 1200
    }
    useFrame(() => {
        mesh.current.rotation.y -= 0.01;
        mesh.current.position.x = (radius * Math.cos(2 * Math.PI * (i.current) / 1200)) ;
        mesh.current.position.z = (radius * Math.sin(2 * Math.PI * (i.current) / 1200)) - 100 ;
        i.current--;
        if(i.current<1){
            i.current=1200
        }
    })
    // useFrame(() => {mesh.current})
    const gltf = useLoader(GLTFLoader, "Leaderboard.glb");
    return <mesh onPointerOver={() => document.body.style.cursor = "pointer"} onPointerOut={() => document.body.style.cursor = "default"} onClick={() => {window.location="/leaderboard"}} onPointerDown={() => {window.location="/leaderboard"}}><primitive ref={mesh} object={gltf.scene} scale={[2,2,2]} position={position} /></mesh>
  };
const Challenge = ({position}) => {
    const mesh = useRef();
    let i = {
        current: 600
    }
    useFrame(() => {
        mesh.current.rotation.y -= 0.01;
        mesh.current.position.x = (radius * Math.cos(2 * Math.PI * (i.current) / 1200)) ;
        mesh.current.position.z = (radius * Math.sin(2 * Math.PI * (i.current) / 1200)) - 100 ;
        i.current--;
        if(i.current<1){
            i.current=1200
        }
    })
    // useFrame(() => {mesh.current})
    const gltf = useLoader(GLTFLoader, "challenge.glb");
    return <mesh onPointerOver={() => document.body.style.cursor = "pointer"} onPointerOut={() => document.body.style.cursor = "default"} onClick={() => {window.location="/challenge"}} onPointerDown={() => {window.location="/challenge"}}><primitive ref={mesh} object={gltf.scene} scale={[2,2,2]} position={position} /></mesh>
  };
const About = ({position}) => {
    const mesh = useRef();
    let i = {
        current: 300
    }
    useFrame(() => {
        mesh.current.rotation.y -= 0.01;
        mesh.current.position.x = (radius * Math.cos(2 * Math.PI * (i.current) / 1200)) ;
        mesh.current.position.z = (radius * Math.sin(2 * Math.PI * (i.current) / 1200)) - 100 ;
        i.current--;
        if(i.current<1){
            i.current=1200
        }
    })
    // useFrame(() => {mesh.current})
    const gltf = useLoader(GLTFLoader, "about.glb");
    return <mesh onPointerOver={() => document.body.style.cursor = "pointer"} onPointerOut={() => document.body.style.cursor = "default"} onClick={() => {window.location="/about"}} onPointerDown={() => {window.location="/about"}}><primitive ref={mesh} object={gltf.scene} scale={[2,2,2]} position={position} /></mesh>
  };
//   const Profile = ({position}) => {
//     const mesh = useRef();
//     let i = {
//         current: 900
//     }
//     useFrame(() => {
//         mesh.current.rotation.y -= 0.01;
//         mesh.current.position.x = (radius * Math.cos(2 * Math.PI * (i.current) / 1200)) ;
//         mesh.current.position.z = (radius * Math.sin(2 * Math.PI * (i.current) / 1200)) - 100 ;
//         i.current--;
//         if(i.current<1){
//             i.current=1200
//         }
//     })
//     // useFrame(() => {mesh.current})
//     const gltf = useLoader(GLTFLoader, "Profile.glb");
//     return <mesh onPointerOver={() => document.body.style.cursor = "pointer"} onPointerOut={() => document.body.style.cursor = "default"} onClick={() => {window.location="/login"}} onPointerDown={() => {window.location="/login"}}><primitive ref={mesh} object={gltf.scene} scale={[2,2,2]} position={position} /></mesh>
//   };

function UpsolveText(){
    const mesh = useRef();  
    // useFrame(()=>{ mesh.current.rotation.x=-300})
    const gltf = useLoader(GLTFLoader, "UpsolveText.glb");
    return <mesh onPointerOver={() => document.body.style.cursor = "pointer"} onPointerOut={() => document.body.style.cursor = "default"} onClick={() => {window.location="/"}} onPointerDown={() => {window.location="/"}}><primitive ref={mesh} object={gltf.scene} scale={[3,3,3]} position={[0,10,0]} /></mesh>
}
  



function HomePage() {

    


    return(
        <>
        <Canvas 
            className="canvas"
            style={{width: window.innerWidth,height: window.innerHeight,minWidth: "100vw",minHeight: "100vh"}}
            colorManagement
            shadowMap
            camera = {{position: [10,300,800], fov: 100,far:5000}}
            pixelRatio={Math.min(2,  1)}

        >
            <ambientLight intensity={0.3}></ambientLight>
            <directionalLight
                position={[0,-10,10]}
                intensity={1.5}
            ></directionalLight>
            <pointLight position={[-10,0,-20]} intensity={0.5}></pointLight>
            <pointLight position={[0,-10,0]} intensity={1.5}></pointLight>
            <group>
                <Suspense fallback={null}>
                    <UpsolveText></UpsolveText>
                    <Leaderboard position={[radius * Math.cos(2 * Math.PI * (1200) / 1200),-20,radius * Math.sin(2 * Math.PI * (1200) / 1200) - 100]} />
                    
                    {/* <Profile position={[radius * Math.cos(2 * Math.PI * (900) / 1200),0,radius * Math.sin(2 * Math.PI * (900) / 1200) - 100]} /> */}
                    <Challenge position={[radius * Math.cos(2 * Math.PI * (600) / 1200),-20,radius * Math.sin(2 * Math.PI * (600) / 1200) - 100]} />
                    <About position={[radius * Math.cos(2 * Math.PI * (300) / 1200),-20,radius * Math.sin(2 * Math.PI * (300) / 1200) - 100]} />

                </Suspense>
                
                <Stars radius={1000} count={5000} depth={100}></Stars>
                <OrbitControls minPolarAngle={Math.PI / 3}></OrbitControls>
            </group>
        </Canvas>
        
        </>
    )

}

export default HomePage;