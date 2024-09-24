"use client"

import FloatingCan from "@/components/FloatingCan"
import { Environment, Scroll } from "@react-three/drei"
import { useRef } from "react"
import { Group } from "three"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { useMediaQuery } from "@/hooks/useMediaQuery"

gsap.registerPlugin(useGSAP, ScrollTrigger)

type Props = {}

const Scene = (props: Props) => {

    const canRef = useRef<Group>(null);
  const isDesktop = useMediaQuery("(min-width: 768px", true);
    
    const bgColors = ["#FFA6B5", "#E9CFF6", "#CBEE9A"]

    useGSAP(()=> {
        if(!canRef.current) return

        const sections = gsap.utils.toArray(".alternating-section")

        const scrollT1 = gsap.timeline({
            scrollTrigger: {
                trigger: '.alternating-text-view',
                endTrigger: ".alternating-text-container",
                pin: true,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            }
        })

        sections.forEach((_ , index)=>{
            if(!canRef.current) return;
            if(index === 0) return;

            const isOdd = index % 2 !== 0;
            const xPosition = isDesktop ? (isOdd ? "-1" : "1") : 0;
            const yRotation = isDesktop ? (isOdd ? ".4" : "-.4") : 0;

            scrollT1.to(canRef.current.position, {
                x: xPosition,
                ease: "circ.inOut",
                delay: .5
            })

            scrollT1.to(canRef.current.rotation, {
                y: yRotation,
                ease: "back.inOut",
            }, "<")

            .to(".alternating-text-container", {
                backgroundColor: gsap.utils.wrap(bgColors, index)
            })
        })
    }, {dependencies: [isDesktop]})

  return (
    <group ref={canRef} 
    position-x={isDesktop ? 1 : 0} 
    rotation-y={isDesktop ? -0.3 : 0}>
        <FloatingCan flavor="strawberryLemonade" />
        <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
    </group>
)
}

export default Scene