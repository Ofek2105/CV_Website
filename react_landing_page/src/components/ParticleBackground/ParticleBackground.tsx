import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'

export default function ParticlesBackground() {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine)
    }, [])

    return (
        <Particles 
            id="tsparticles"
            init={particlesInit}
            options={{
                fullScreen: { enable: false }, // we are styling it ourselves
                background: { color: { value: '#00000000' } }, // transparent
                particles: {
                    number: { value: 100, density: { enable: false } },
                    color: { value: '#ffffff' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5 },
                    size: { value: { min: 1, max: 3 } },
                    links: {
                        enable: true,
                        distance: 150,
                        color: '#ffffff',
                        opacity: 0.4,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: 'none',
                        outModes: { default: 'bounce' },
                    },
                },
                detectRetina: true,
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                }}
        />
    )
}
