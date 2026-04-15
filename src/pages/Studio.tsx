import { useState } from 'react'
import { templates } from '../data/templates'
import { generateImage } from '../lib/openrouter'
import { Download, Send } from 'lucide-react'

export default function Studio() {
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!selectedTemplate) {
      setError('Select a template first')
      return
    }

    const template = templates.find(t => t.id === selectedTemplate)
    if (!template) return

    setLoading(true)
    setError('')

    try {
      const fullPrompt = prompt 
        ? `${template.prompt}\n\nUser request: ${prompt}`
        : template.prompt
      
      const imageUrl = await generateImage(fullPrompt)
      setImage(imageUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!image) return
    const a = document.createElement('a')
    a.href = image
    a.download = `team-sa-${selectedTemplate}.png`
    a.click()
  }

  return (
    <div className="h-screen flex flex-col bg-sa-cream">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 border-b border-sa-green/20">
        <h1 className="text-2xl font-bold text-sa-gold tracking-wider">TEAM SA STUDIO</h1>
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="px-4 py-2 border border-sa-green/30 rounded bg-white text-sm"
        >
          <option value="">Select template...</option>
          {templates.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </header>

      {/* Main */}
      <div className="flex flex-1 min-h-0">
        {/* Canvas */}
        <div className="flex-[2] flex items-center justify-center p-8 border-r border-sa-green/20">
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt="Generated"
                className="max-w-full max-h-full rounded-lg shadow-2xl"
              />
              <button
                onClick={handleDownload}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-sa-gold text-white rounded hover:bg-sa-gold/90"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          ) : (
            <div className="text-center text-sa-green/40">
              <p className="text-xl font-bold mb-2">NO IMAGE</p>
              <p className="text-sm">Select a template and generate</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex-1 flex flex-col p-6">
          <h2 className="text-lg font-bold text-sa-green mb-4">Generate</h2>
          
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Optional: Describe specific changes..."
            className="flex-1 p-4 border border-sa-green/30 rounded resize-none mb-4"
          />

          {error && (
            <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !selectedTemplate}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-sa-green text-white rounded font-medium hover:bg-sa-green/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Send size={16} />
                Generate Image
              </>
            )}
          </button>

          {selectedTemplate && (
            <div className="mt-6 p-4 bg-white rounded border border-sa-green/20">
              <h3 className="text-sm font-bold text-sa-green mb-2">Template Info</h3>
              <p className="text-xs text-gray-600">
                {templates.find(t => t.id === selectedTemplate)?.category}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
