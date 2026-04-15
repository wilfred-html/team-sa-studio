import { useState } from 'react'
import { templateCategories, templates } from '../data/templates'
import { athletes } from '../data/athletes'
import { generateImage } from '../lib/openrouter'
import { Download, Send, User } from 'lucide-react'

export default function Studio() {
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [selectedAthlete, setSelectedAthlete] = useState('')
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const template = templates.find(t => t.id === selectedTemplate)
  const athlete = athletes.find(a => a.name === selectedAthlete)

  const handleGenerate = async () => {
    if (!template) {
      setError('Select a template first')
      return
    }

    setLoading(true)
    setError('')

    try {
      let fullPrompt = template.prompt

      // Auto-fill athlete data if selected
      if (athlete && template.athleteFields) {
        const athleteContext = template.athleteFields
          .map(field => {
            const value = athlete[field as keyof typeof athlete]
            return value ? `${field}: ${value}` : ''
          })
          .filter(Boolean)
          .join(', ')
        
        fullPrompt = `${template.prompt}\n\nAthlete data: ${athleteContext}`
      }

      // Add user prompt
      if (prompt) {
        fullPrompt = `${fullPrompt}\n\nUser request: ${prompt}`
      }
      
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
      <header className="flex items-center gap-4 px-6 h-16 border-b border-sa-green/20 bg-white/50 backdrop-blur">
        <h1 className="text-2xl font-bold text-sa-gold tracking-wider">TEAM SA STUDIO</h1>
        <div className="flex gap-2 ml-4">
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="px-4 py-2 border border-sa-green/30 rounded bg-white text-sm min-w-[250px]"
          >
            <option value="">Select template...</option>
            {templateCategories.map(cat => (
              <optgroup key={cat.category} label={cat.category}>
                {cat.items.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
          
          {template?.athleteFields && (
            <select
              value={selectedAthlete}
              onChange={(e) => setSelectedAthlete(e.target.value)}
              className="px-4 py-2 border border-sa-green/30 rounded bg-white text-sm min-w-[200px]"
            >
              <option value="">Select athlete...</option>
              {athletes.map(a => (
                <option key={a.name} value={a.name}>
                  {a.name} ({a.sport})
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="ml-auto text-sm text-sa-green/60">
          {templates.length} templates • {athletes.length} athletes
        </div>
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
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-sa-gold text-white rounded-lg hover:bg-sa-gold/90 shadow-lg"
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
        <div className="flex-1 flex flex-col p-6 bg-white/30">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-bold text-sa-green">Generate</h2>
            {athlete && (
              <div className="flex items-center gap-1 px-2 py-1 bg-sa-teal/20 rounded text-xs text-sa-green">
                <User size={12} />
                {athlete.name}
              </div>
            )}
          </div>

          {template && (
            <div className="mb-4 p-3 bg-white rounded border border-sa-green/20">
              <div className="text-xs font-bold text-sa-green mb-1">{template.category}</div>
              <div className="text-xs text-gray-600">{template.description}</div>
              {template.athleteFields && (
                <div className="mt-2 text-xs text-sa-green/60">
                  Auto-fills: {template.athleteFields.join(', ')}
                </div>
              )}
            </div>
          )}
          
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Optional: Add specific changes or details..."
            className="flex-1 p-4 border border-sa-green/30 rounded resize-none mb-4 bg-white"
          />

          {error && (
            <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !selectedTemplate}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-sa-green text-white rounded-lg font-medium hover:bg-sa-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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

          <div className="mt-6 p-4 bg-sa-teal/10 rounded text-xs text-sa-green/80">
            <div className="font-bold mb-2">💡 Tips:</div>
            <ul className="space-y-1 list-disc list-inside">
              <li>Select athlete for auto-filled data</li>
              <li>Leave prompt empty to use template default</li>
              <li>Add custom text for variations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
