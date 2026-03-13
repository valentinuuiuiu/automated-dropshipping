import './ModelLoader.css'

interface ModelLoaderProps {
  modelUrl?: string
  scale?: number
}

export default function ModelLoader({ modelUrl, scale = 1 }: ModelLoaderProps) {
  return (
    <div className="model-loader" style={{ transform: `scale(${scale})` }}>
      <div className="model-placeholder">
        <span className="model-icon">🎨</span>
        <p className="model-text">3D Model Viewer</p>
        {modelUrl && <p className="model-url">{modelUrl}</p>}
      </div>
    </div>
  )
}
