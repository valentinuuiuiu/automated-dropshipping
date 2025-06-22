

import { Suspense } from 'react'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import LoadingSpinner from './LoadingSpinner'

interface ModelLoaderProps {
  modelUrl: string
  scale?: number
  color?: string
}

const Model = ({ url, scale = 1, color = '#3a86ff' }: { 
  url: string
  scale?: number
  color?: string
}) => {
  const { scene } = useGLTF(url)
  return (
    <mesh>
      <primitive 
        object={scene} 
        scale={scale}
      />
      <meshStandardMaterial 
        color={color}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  )
}

export default function ModelLoader({ 
  modelUrl, 
  scale = 0.5,
  color = '#3a86ff'
}: ModelLoaderProps) {
  return (
    <div className="model-loader">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ambientLight intensity={0.5} />
          <Environment preset="city" />
          <Model url={modelUrl} scale={scale} color={color} />
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={1.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 6}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

