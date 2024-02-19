// import React from 'react'
// import ReactGlider from 'react-glider'
// import styled from 'styled-components'

// import useInterval from '../hooks/useInterval'
// import Button from './Button'

// type GliderMethods = {
//   destroy(): void
//   updateControls(): void
//   refresh(rebuildPaging?: boolean): void
//   setOption(options: any, global?: boolean): void
//   scrollTo(pixelOffset: number): void
//   scrollItem(slideIndex: string | number, isActuallyDotIndex?: boolean): void
// }

// const GliderButton = styled(Button)`
//   // opacity: 0;
//   position: absolute;
//   z-index: 1;
//   top: 50%;
//   transform: translate(0, -50%);
//   transition: opacity 100ms;
//   height: 100%;

//   // @media (max-width: 1300px) {
//   //   display: none;
//   // }

//   .button-icon {
//     height: 30px;
//     width: 30px;
//   }
// `

// const GliderPrevButton = styled(GliderButton)`
//   left: -40px;
// `

// const GliderNextButton = styled(GliderButton)`
//   right: -40px;
// `

// const GliderContainer = styled.div`
//   position: relative;

//   /* Hide scrollbar for Chrome, Safari and Opera */
//   .glider-track::-webkit-scrollbar {
//     display: none;
//   }

//   /* Hide scrollbar for IE, Edge and Firefox */
//   .glider-track {
//     -ms-overflow-style: none; /* IE and Edge */
//     scrollbar-width: none; /* Firefox */
//   }

//   .glider-track {
//     display: flex;
//     flex-direction: row;
//   }

//   &.glider-dot.active {
//     background-color: var(--black);
//   }

//   &.glider-dot {
//     background-color: var(--gray-light);
//   }

//   // &:hover {
//   //   ${GliderPrevButton}, ${GliderNextButton} {
//   //     opacity: 1;
//   //   }
//   // }
// `

// // function getTouches(e: TouchEvent) {
// //   return e.touches
// // }

// export type GliderProps = React.ComponentPropsWithoutRef<typeof ReactGlider> & {
//   style?: React.CSSProperties
//   autoplay?: boolean
// }

// const Glider = (props: GliderProps) => {
//   const gliderContainerRef = React.useRef<HTMLDivElement>(null)
//   const leftButtonRef = React.useRef<HTMLButtonElement>(null)
//   const rightButtonRef = React.useRef<HTMLButtonElement>(null)
//   const gliderRef = React.useRef<GliderMethods | null>(null)
//   const [skipAutoplay, setSkipAutoplay] = React.useState(false)
//   const autoplayDelay = 5000

//   const mouseOverFn = () => setSkipAutoplay(true)
//   const mouseOutFn = () => setSkipAutoplay(false)
//   const touchStartFn = () => {
//     setSkipAutoplay(true)
//   }
//   const touchEndFn = () => {
//     setSkipAutoplay(false)
//   }

//   useInterval(
//     () => {
//       if (skipAutoplay) return

//       //@ts-ignore
//       const totalSlides = gliderRef?.current?.slides.length

//       //@ts-ignore
//       const isLastSlide = gliderRef?.current?.slide >= totalSlides - 1

//       //@ts-ignore
//       const newSlide = isLastSlide ? 0 : gliderRef?.current?.slide + 1

//       gliderRef?.current?.scrollItem(newSlide)
//     },
//     autoplayDelay,
//     !props.autoplay || skipAutoplay
//   )

//   if (props.autoplay) {
//     gliderContainerRef?.current?.addEventListener('mouseover', mouseOverFn)
//     gliderContainerRef?.current?.addEventListener('mouseout', mouseOutFn)
//     gliderContainerRef?.current?.addEventListener('touchstart', touchStartFn, {
//       passive: true,
//     })
//     gliderContainerRef?.current?.addEventListener('touchend', touchEndFn, {
//       passive: true,
//     })
//   }

//   React.useEffect(() => {
//     return () => {
//       if (props.autoplay) {
//         gliderContainerRef?.current?.removeEventListener(
//           'mouseover',
//           mouseOverFn
//         )
//         gliderContainerRef?.current?.removeEventListener('mouseout', mouseOutFn)
//         gliderContainerRef?.current?.removeEventListener(
//           'touchstart',
//           touchStartFn
//         )
//         gliderContainerRef?.current?.removeEventListener('touchend', touchEndFn)
//       }
//     }
//   }, [])

//   return (
//     <GliderContainer style={props.style} ref={gliderContainerRef}>
//       {props.hasArrows && (
//         <>
//           <GliderPrevButton
//             ref={leftButtonRef}
//             icon="CHEVRON_LEFT"
//             size="medium"
//             round
//             variant="link"
//             onClick={() => setSkipAutoplay(true)}
//           />
//           <GliderNextButton
//             ref={rightButtonRef}
//             icon="CHEVRON_RIGHT"
//             size="medium"
//             round
//             variant="link"
//             onClick={() => setSkipAutoplay(true)}
//           />
//         </>
//       )}
//       <ReactGlider
//         ref={gliderRef}
//         {...props}
//         hasArrows={props.hasArrows}
//         arrows={
//           props.hasArrows
//             ? {
//                 prev: leftButtonRef.current,
//                 next: rightButtonRef.current,
//               }
//             : undefined
//         }
//       />
//     </GliderContainer>
//   )
// }

// export default Glider
