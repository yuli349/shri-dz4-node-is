import { useState, useEffect } from "react";

export default function useWindowResolution() {
    const [windowResolution, setWindowResolution] = useState('');
    useEffect(() => {
        function handleResize() {
            window.innerWidth < 768 ? setWindowResolution('mobile') : setWindowResolution('desktop');
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowResolution;
}
