import { createRef, useRef } from 'react'

function useInputRefs(count) {
    const refs = useRef(Array.from({ length: count }, () => createRef()))
    return refs
}

export default useInputRefs
