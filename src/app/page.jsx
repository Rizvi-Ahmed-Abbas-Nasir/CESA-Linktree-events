"use client";

import React, { useEffect, useRef } from "react";
import {
  FaFlag,
  FaChessKnight,
  FaBook,
  FaBrain,
  FaRing,
  FaGamepad,
  FaCamera,
  FaEllipsisV,
  FaHeart, 
  FaInstagram, 
} from "react-icons/fa";

import gsap from "gsap";
import SplitType from "split-type";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {  AnimationMixer, Clock, MeshStandardMaterial } from "three";
import Link from "next/link";
import Image from "next/image";

const eventData = [
  {
    name: "Flag QUEST",
    icon: <FaFlag className="text-yellow-500 text-xl" />,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSdIaVWU-qaq2pTvMe9Ft1B9Jlg3vDFCTl3OxEdNYNJ1kE4pAg/viewform?usp=header",
  },
  {
    name: "WAR FAIR",
    icon: <FaChessKnight className="text-red-500 text-xl" />,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSfLB4t2lhPfM4X3osxxbBLyCVzTt0AXhyb8rZ-taIqkU6mUmw/viewform?usp=header",
  },
  {
    name: "WORDSCAPE",
    icon: <FaBook className="text-blue-400 text-xl" />,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSebsG4KJvqHqHnerzcBTRmrVCopt8AzVpd3CuGOXGIUBsMlAA/viewform?usp=header",
  },
  {
    name: "ClASH OF MINDS",
    icon: <FaBrain className="text-green-400 text-xl" />,
    link: "https://forms.gle/xNCyYincMfAEn4Su7",
  },
  {
    name: "RING OF WIN",
    icon: <FaRing className="text-pink-500 text-xl" />,
    link: "https://forms.gle/zMC5rxFoH8AWCDvd9",
  },
  {
    name: "BGMI",
    icon: <FaGamepad className="text-orange-500 text-xl" />,
    link: "https://forms.gle/gddeBFeV5EayrNMN9",
  },
  {
    name: "PIXEL PERFECT",
    icon: <FaCamera className="text-black-500 text-xl" />,
    link: "https://forms.gle/8gHjaaFJtsC2x5cT7",
  },
  {
    name: "INTAGRAM",
    icon: <FaInstagram className="text-purple-500 text-xl" />,
    link: "https://www.instagram.com/cesa.vppcoe/",
  },
];

const Fusion2K25 = () => {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRefs = useRef([]);
  const linkRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const splitTitle = new SplitType(titleRef.current, { type: "chars" });
      gsap.from(splitTitle.chars, {
        duration: 1.5,
        opacity: 0,
        y: 50,
        stagger: 0.05,
        ease: "power3.out",
      });

      gsap.to(descRef.current, {
        duration: 1.2,
        opacity: 1,
        y: 0,
        ease: "power3.out",
        delay: 0.5,
      });

      gsap.set(buttonRefs.current, { opacity: 0, y: 50 });
      buttonRefs.current.forEach((btn, index) => {
        if (btn) {
          gsap.to(btn, {
            duration: 0.8,
            opacity: 1,
            y: 0,
            scale: 1,
            delay: 0.3 + index * 0.2,
            ease: "power3.out",
          });
        }
      });

      gsap.to(linkRef.current, {
        duration: 1.2,
        opacity: 1,
        scale: 1,
        ease: "back.out(1.7)",
        delay: 0.8,
      });
    });

    return () => ctx.revert(); 
  }, []);

  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
    alert("🔗 Link copied to clipboard!");
  };

  return (
    <div className="relative flex justify-center items-center w-full h-screen overflow-y-auto ">
      <Canvas
  className="absolute w-full h-full opacity-50 blur-sm"
  camera={{ position: [5, 5, 8], fov: 50 }}
>
  <ambientLight intensity={0.6} />
  <directionalLight position={[5, 5, 5]} intensity={1.5} />
  <OrbitControls enableZoom={false} rotateSpeed={0.3} />
  <Environment preset="city" />
  <TractorModel />
</Canvas>

      <div className="absolute z-10 w-full max-w-2xl mx-auto px-4 h-[100%]">
        <div className="flex flex-col items-center mb-8">
    <Image
      src="/cesapng.png"
      className="w-[20%] h-[20%]"
      width={100}
      height={100}
      alt="cesa"
    />
    <h1
      ref={titleRef}
      className="text-4xl sm:text-6xl font-bold text-white relative z-30"
    >
      TECHNETICS
    </h1>
    <p
      ref={descRef}
      className="text-gray-300 text-sm max-w-md opacity-0 translate-y-4 relative z-30"
    >
      Tecnetics is a technical event by VPPCOE University, featuring a variety
      of engaging competitions, workshops, and technical events.
    </p>
  </div>
        <div className="space-y-4 w-full flex flex-col gap-1  relative z-30">
  {eventData.map((event, index) => (
    <Link
      href={event.link}
      key={index}
      target="_blank"
      rel="noopener noreferrer"
    >
      <button
        ref={(el) => {
          if (el) {
            buttonRefs.current[index] = el;
          }
        }}
        className="flex items-center justify-between w-full bg-black/70 hover:bg-black/80 text-white text-lg font-semibold py-5 px-6 rounded-xl transition duration-300 transform hover:scale-105 backdrop-blur-md"
      >
        <div className="flex items-center space-x-4">
          {event.icon}
          <span>{event.name}</span>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            copyToClipboard(event.link);
          }}
          className="cursor-pointer"
        >
          <FaEllipsisV className="text-gray-400 hover:text-white" />
        </div>
      </button>
    </Link>
  ))}
</div>


<div className="mt-6 relative z-30" ref={linkRef}>
  <a
    href="https://linktr.ee/yourlink"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center space-x-2 bg-white text-black font-medium px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300 transform hover:scale-105"
  >
    🌟 linktr.ee/you
  </a>
  <div className="w-[100%] flex justify-center items-center">
  <div> <p className="text-gray-500 text-center text-sm mt-2 flex">
    Made With <FaHeart className="text-red-500  text-2xl p-1" /> By CESA TEAM
  </p></div>
  </div>
 
</div>


       
      </div>
    </div>
  );
};

const TractorModel = () => {
  const myModel = useLoader(GLTFLoader, "https://res.cloudinary.com/dtnotszn5/image/upload/v1742724024/Cloudinary%203D/models/earth_1_dppjn6.glb");
  const modelRef = useRef(null);
  const mixerRef = useRef(null);
  const clock = new Clock();

  useEffect(() => {
    if (myModel.animations.length > 0) {
      mixerRef.current = new AnimationMixer(myModel.scene);
      myModel.animations.forEach((clip) => {
        const action = mixerRef.current.clipAction(clip);
        action.play();
      });
    }

    myModel.scene.traverse((child) => {
      if (child.isMesh) {
        const mesh = child;
        if (!mesh.material) {
          mesh.material = new MeshStandardMaterial({ color: "white" });
        }
      }
    });
  }, [myModel]);

 

  useFrame((_state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group
      ref={modelRef}
      scale={4}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    >
      <primitive object={myModel.scene} />
    </group>
  );
};

export default Fusion2K25;
