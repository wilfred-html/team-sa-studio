import { useState, useRef, useEffect } from 'react'
import { templateCategories, templates } from '../data/templates'
import { athletes } from '../data/athletes'
import { generateImage } from '../lib/openrouter'
import { Download, Send, User, Image as ImageIcon, Smartphone, Video, Undo, Redo } from 'lucide-react'

type Format = 'feed' | 'story' | 'reel';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  image?: string;
}

export default function Studio() {
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [selectedAthlete, setSelectedAthlete] = useState('')
  const [selectedFormat, setSelectedFormat] = useState<Format>('feed')
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const [imageHistory, setImageHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const template = templates.find(t => t.id === selectedTemplate)
  const athlete = athletes.find(a => a.name === selectedAthlete)

  const formatConfig = {
    feed: { width: 1080, height: 1350, label: 'Feed', icon: ImageIcon, ratio: '4:5' },
    story: { width: 1080, height: 1920, label: 'Story', icon: Smartphone, ratio: '9:16' },
    reel: { width: 1080, height: 1920, label: 'Reel', icon: Video, ratio: '9:16' }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const pushImage = (img: string) => {
    setImageHistory(prev => [...prev.slice(0, historyIndex + 1), img])
    setHistoryIndex(prev => prev + 1)
    setCurrentImage(img)
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1)
      setCurrentImage(imageHistory[historyIndex - 1])
    }
  }

  const handleRedo = () => {
    if (historyIndex < imageHistory.length - 1) {
      setHistoryIndex(prev => prev + 1)
      setCurrentImage(imageHistory[historyIndex + 1])
    }
  }

  const handleGenerate = async () => {
    if (!template) {
      setError('Select a template first')
      return
    }

    const userText = prompt.trim() || 'Generate with default settings'
    setMessages(prev => [...prev, { role: 'user', text: userText }])
    setPrompt('')
    setLoading(true)
    setError('')

    try {
      const format = formatConfig[selectedFormat]
      let fullPrompt = `${template.prompt}\n\nFormat: ${format.width}x${format.height} (${format.ratio})`

      if (athlete && template.athleteFields) {
        const athleteContext = template.athleteFields
          .map(field => {
            const value = athlete[field as keyof typeof athlete]
            return value ? `${field}: ${value}` : ''
          })
          .filter(Boolean)
          .join(', ')
        
        fullPrompt = `${fullPrompt}\n\nAthlete: ${athleteContext}`
      }

      if (prompt) {
        fullPrompt = `${fullPrompt}\n\nUser: ${prompt}`
      }
      
      const referenceImage = template.referenceImage;
      const imageUrl = await generateImage(fullPrompt, referenceImage)
      pushImage(imageUrl)
      setMessages(prev => [...prev, { role: 'assistant', text: 'Generated!', image: imageUrl }])
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Generation failed'
      setError(errMsg)
      setMessages(prev => [...prev, { role: 'assistant', text: `Error: ${errMsg}` }])
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!currentImage) return
    const a = document.createElement('a')
    a.href = currentImage
    a.download = `team-sa-${selectedTemplate}-${selectedFormat}.png`
    a.click()
  }

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < imageHistory.length - 1

  return (
    <div className="h-screen flex flex-col bg-sa-cream">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 border-b border-sa-green/20 bg-white/50 backdrop-blur">
        <h1 className="text-2xl font-bold text-sa-gold tracking-wider">TEAM SA STUDIO</h1>
        
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
            <option value="">Select athlete (optional)...</option>
            {athletes.map(a => (
              <option key={a.name} value={a.name}>
                {a.name} ({a.sport})
              </option>
            ))}
          </select>
        )}

        <div className="flex gap-1 ml-4 border border-sa-green/30 rounded overflow-hidden">
          {Object.entries(formatConfig).map(([key, config]) => {
            const Icon = config.icon
            const isSelected = selectedFormat === key
            return (
              <button
                key={key}
                onClick={() => setSelectedFormat(key as Format)}
                className={`px-3 py-2 flex items-center gap-1.5 text-xs transition-colors ${
                  isSelected 
                    ? 'bg-sa-green text-white' 
                    : 'bg-white text-sa-green hover:bg-sa-green/10'
                }`}
                title={`${config.label} (${config.ratio})`}
              >
                <Icon size={14} />
                {config.label}
              </button>
            )
          })}
        </div>

        {imageHistory.length > 0 && (
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={handleUndo}
              disabled={!canUndo}
              className="p-2 text-sa-green hover:bg-sa-green/10 rounded disabled:opacity-30 disabled:cursor-not-allowed"
              title="Undo"
            >
              <Undo size={16} />
            </button>
            <button
              onClick={handleRedo}
              disabled={!canRedo}
              className="p-2 text-sa-green hover:bg-sa-green/10 rounded disabled:opacity-30 disabled:cursor-not-allowed"
              title="Redo"
            >
              <Redo size={16} />
            </button>
            <span className="text-xs text-sa-green/60 ml-2">
              {historyIndex + 1} / {imageHistory.length}
            </span>
          </div>
        )}

        <div className="text-sm text-sa-green/60">
          {templates.length} templates • {athletes.length} athletes
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1 min-h-0">
        {/* Canvas */}
        <div className="flex-[2] flex items-center justify-center p-8 border-r border-sa-green/20">
          {currentImage ? (
            <div className="relative">
              <img
                src={currentImage}
                alt="Generated"
                className="max-w-full max-h-full rounded-lg shadow-2xl"
                style={{
                  aspectRatio: selectedFormat === 'feed' ? '4/5' : '9/16'
                }}
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
              <p className="text-sm">Select template + format, then generate</p>
            </div>
          )}
        </div>

        {/* Chat + Controls */}
        <div className="flex-1 flex flex-col bg-white/30">
          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-sa-green/40 pt-12">
                <p className="text-sm">Start a conversation to generate images</p>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-sa-green text-white'
                      : 'bg-white border border-sa-green/20 text-gray-700'
                  }`}
                >
                  {msg.text}
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Generated"
                      className="mt-2 rounded cursor-pointer hover:opacity-90"
                      onClick={() => {
                        const idx = imageHistory.indexOf(msg.image!)
                        if (idx >= 0) {
                          setHistoryIndex(idx)
                          setCurrentImage(msg.image!)
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Template Info */}
          <div className="p-4 border-t border-sa-green/20">
            {template && (
              <div className="mb-3 p-3 bg-white rounded border border-sa-green/20">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-xs font-bold text-sa-green">{template.category}</div>
                  {athlete && (
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-sa-teal/20 rounded text-xs text-sa-green">
                      <User size={10} />
                      {athlete.name}
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-600">{template.description}</div>
              </div>
            )}

            {error && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleGenerate()}
                placeholder={template ? "Optional: Add specific details..." : "Select a template first..."}
                className="flex-1 px-4 py-2 border border-sa-green/30 rounded bg-white text-sm"
                disabled={loading || !template}
              />
              <button
                onClick={handleGenerate}
                disabled={loading || !selectedTemplate}
                className="px-6 py-2 bg-sa-green text-white rounded font-medium hover:bg-sa-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
