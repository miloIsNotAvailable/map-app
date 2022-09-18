import { lazy, MutableRefObject, useEffect, useState } from "react"

export const useOnScreen = <T extends HTMLDivElement | null>(ref: MutableRefObject<T>, path?: string ) => {

    const [isIntersecting, setIntersecting] = useState(false)
  
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
    )
  
    useEffect(() => {
        if( !ref.current ) return
        observer.observe(ref.current)
        // Remove the observer as soon as the component is unmounted
        return () => { observer.disconnect() }
    }, [])

    return isIntersecting
  }
  