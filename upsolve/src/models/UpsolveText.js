import React, { useRef, } from 'react';
import {useFrame,useLoader} from 'react-three-fiber';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";



function UpsolveText(){
    const mesh = useRef();  
    useFrame(()=>{ mesh.current.rotation.x=-300})
    const gltf = useLoader(GLTFLoader, "UpsolveText.glb");
    return <mesh onPointerOver={() => document.body.style.cursor = "pointer"} onPointerOut={() => document.body.style.cursor = "default"} onClick={() => {window.location="/"}} onPointerDown={() => {window.location="/"}}><primitive ref={mesh} object={gltf.scene} scale={[3,3,3]} position={[0,10,0]} /></mesh>
}

export default UpsolveText;