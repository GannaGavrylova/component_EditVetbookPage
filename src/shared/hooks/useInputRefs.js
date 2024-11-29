import { createRef, useRef } from 'react'

export const useInputRefs = (count) => {
    const refs = useRef(Array.from({ length: count }, () => createRef()))
    return refs
}


