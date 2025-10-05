'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { 
  Accessibility as AccessibilityIcon, 
  X, 
  Type, 
  Eye, 
  Focus, 
  Contrast,
  Volume2,
  MousePointer,
  RotateCcw,
  BookOpen,
  Link,
  Palette,
  Minus,
  Plus
} from 'lucide-react'

interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'extra-large'
  contrast: 'normal' | 'high' | 'inverted'
  focusIndicator: boolean
  reduceMotion: boolean
  screenReader: boolean
  highContrast: boolean
  largeCursor: boolean
  keyboardNavigation: boolean
  dyslexiaFont: boolean
  readingGuide: boolean
  linkHighlight: boolean
  contentScaling: number
  lineHeight: number
  letterSpacing: number
}

const Accessibility = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Default settings with all new properties
  const defaultSettings: AccessibilitySettings = useMemo(() => ({
    fontSize: 'normal',
    contrast: 'normal',
    focusIndicator: false,
    reduceMotion: false,
    screenReader: false,
    highContrast: false,
    largeCursor: false,
    keyboardNavigation: false,
    dyslexiaFont: false,
    readingGuide: false,
    linkHighlight: false,
    contentScaling: 100,
    lineHeight: 1.5,
    letterSpacing: 0
  }), [])

  // Initialize with default settings to avoid SSR hydration mismatch
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const [isInitialized, setIsInitialized] = useState(false)

  // Utility function for debouncing
  const createDebounce = useCallback(<T extends (...args: any[]) => any>(func: T, wait: number): T => {
    let timeout: NodeJS.Timeout
    return ((...args: any[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }) as T
  }, [])

  // Save settings to localStorage (only after initialization)
  const saveToStorage = useCallback((newSettings: AccessibilitySettings) => {
    if (typeof window !== 'undefined' && isInitialized) {
      try {
        localStorage.setItem('accessibility-settings', JSON.stringify(newSettings))
      } catch (e) {
        console.warn('Failed to save accessibility settings to localStorage')
      }
    }
  }, [isInitialized])

  // Debounced save function
  const debouncedSave = useMemo(
    () => createDebounce((newSettings: AccessibilitySettings) => {
      saveToStorage(newSettings)
    }, 300),
    [createDebounce, saveToStorage]
  )

  // Load settings from localStorage after component mounts (client-side only)
  useEffect(() => {
    const loadSavedSettings = () => {
      try {
        const saved = localStorage.getItem('accessibility-settings')
        if (saved) {
          const parsed = JSON.parse(saved)
          setSettings({ ...defaultSettings, ...parsed })
        }
      } catch (e) {
        console.warn('Failed to parse saved accessibility settings')
      } finally {
        setIsInitialized(true)
      }
    }

    loadSavedSettings()
  }, [defaultSettings])

  // Smooth panel animations
  const openPanel = useCallback(() => {
    setIsAnimating(true)
    setIsOpen(true)
    setTimeout(() => setIsAnimating(false), 300)
  }, [])

  const closePanel = useCallback(() => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsAnimating(false)
    }, 200)
  }, [])

  // Apply accessibility settings to document with smooth transitions
  useEffect(() => {
    // Only apply settings after component is initialized (client-side)
    if (!isInitialized || typeof window === 'undefined') return

    const root = document.documentElement
    
    // Save settings with debounce
    debouncedSave(settings)

    // Font size settings with smooth scaling
    const fontScale = settings.fontSize === 'large' ? '1.2' : 
                     settings.fontSize === 'extra-large' ? '1.5' : '1'
    root.style.setProperty('--accessibility-font-scale', fontScale)
    
    // Content scaling - use zoom instead of transform for browser-like zoom effect
    root.style.setProperty('--accessibility-content-scale', `${settings.contentScaling / 100}`)
    root.style.setProperty('--accessibility-zoom', `${settings.contentScaling}%`)
    
    // Line height and letter spacing
    root.style.setProperty('--accessibility-line-height', settings.lineHeight.toString())
    root.style.setProperty('--accessibility-letter-spacing', `${settings.letterSpacing}px`)

    // Contrast settings with smooth transitions
    root.classList.toggle('high-contrast', settings.contrast === 'high')
    root.classList.toggle('inverted-contrast', settings.contrast === 'inverted')

    // Reduce motion
    if (settings.reduceMotion) {
      root.classList.add('reduce-motion')
      root.style.setProperty('--animation-duration', '0.01s')
      root.style.setProperty('--transition-duration', '0.01s')
    } else {
      root.classList.remove('reduce-motion')
      root.style.removeProperty('--animation-duration')
      root.style.removeProperty('--transition-duration')
    }

    // Enhanced features
    root.classList.toggle('enhanced-focus', settings.focusIndicator)
    root.classList.toggle('large-cursor', settings.largeCursor)
    root.classList.toggle('force-high-contrast', settings.highContrast)
    root.classList.toggle('dyslexia-font', settings.dyslexiaFont)
    root.classList.toggle('reading-guide', settings.readingGuide)
    root.classList.toggle('link-highlight', settings.linkHighlight)

    // Screen reader announcements
    if (settings.screenReader) {
      root.setAttribute('aria-live', 'polite')
    } else {
      root.removeAttribute('aria-live')
    }

  }, [settings, debouncedSave, isInitialized])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closePanel()
      }
      if (e.ctrlKey && e.altKey && e.key === 'a') {
        e.preventDefault()
        if (isOpen) {
          closePanel()
        } else {
          openPanel()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, openPanel, closePanel])

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings)
    saveToStorage(defaultSettings)
  }, [defaultSettings, saveToStorage])

  const updateSetting = useCallback(<K extends keyof AccessibilitySettings>(
    key: K, 
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }, [])

  const adjustContentScaling = useCallback((delta: number) => {
    setSettings(prev => ({
      ...prev,
      contentScaling: Math.max(50, Math.min(200, prev.contentScaling + delta))
    }))
  }, [])

  const adjustLineHeight = useCallback((delta: number) => {
    setSettings(prev => ({
      ...prev,
      lineHeight: Math.max(1.0, Math.min(3.0, prev.lineHeight + delta))
    }))
  }, [])

  const adjustLetterSpacing = useCallback((delta: number) => {
    setSettings(prev => ({
      ...prev,
      letterSpacing: Math.max(-2, Math.min(10, prev.letterSpacing + delta))
    }))
  }, [])

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={isOpen ? closePanel : openPanel}
          size="icon"
          className={`h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 ${
            isOpen ? 'scale-110 shadow-2xl' : ''
          }`}
          aria-label="เปิด/ปิดแผงการเข้าถึง"
          title="เปิด/ปิดแผงการเข้าถึง (Ctrl+Alt+A)"
        >
          <AccessibilityIcon className={`h-6 w-6 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`} />
        </Button>
      </div>

      {/* Floating Accessibility Panel */}
      {isOpen && (
        <div 
          className={`fixed inset-0 z-40 transition-all duration-300 ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closePanel()
          }}
        >
          <Card 
            className={`shadow-2xl border-2 fixed right-8 top-18 bg-white max-w-[25vw] min-w-[25vw]`}
          >
            <div className=" w-full max-h-[72vh] overflow-auto accessibility-panel">
              <CardHeader className="pb-4 accessibility-content">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <AccessibilityIcon className="h-5 w-5" />
                    เครื่องมือการเข้าถึง
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closePanel}
                    aria-label="ปิดแผง"
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6 accessibility-content">
                {/* Font Size */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    ขนาดตัวอักษร
                  </Label>
                  <RadioGroup
                    value={settings.fontSize}
                    onValueChange={(value) => updateSetting('fontSize', value as AccessibilitySettings['fontSize'])}
                    className="grid grid-cols-1 gap-2"
                  >
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors">
                      <RadioGroupItem value="normal" id="font-normal" />
                      <Label htmlFor="font-normal" className="cursor-pointer flex-1">ปกติ</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors">
                      <RadioGroupItem value="large" id="font-large" />
                      <Label htmlFor="font-large" className="cursor-pointer flex-1">ใหญ่ (+20%)</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors">
                      <RadioGroupItem value="extra-large" id="font-xl" />
                      <Label htmlFor="font-xl" className="cursor-pointer flex-1">ใหญ่มาก (+50%)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Content Scaling */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    ขยายเนื้อหา: {settings.contentScaling}%
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => adjustContentScaling(-10)}
                      disabled={settings.contentScaling <= 50}
                      className="h-8 w-8"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <div className="flex-1 bg-secondary rounded-full h-2 relative">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((settings.contentScaling - 50) / 150) * 100}%` }}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => adjustContentScaling(10)}
                      disabled={settings.contentScaling >= 200}
                      className="h-8 w-8"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Line Height */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    ความสูงบรรทัด: {settings.lineHeight.toFixed(1)}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => adjustLineHeight(-0.1)}
                      disabled={settings.lineHeight <= 1.0}
                      className="h-8 w-8"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <div className="flex-1 bg-secondary rounded-full h-2 relative">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((settings.lineHeight - 1.0) / 2.0) * 100}%` }}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => adjustLineHeight(0.1)}
                      disabled={settings.lineHeight >= 3.0}
                      className="h-8 w-8"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Letter Spacing */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    ระยะห่างตัวอักษร: {settings.letterSpacing}px
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => adjustLetterSpacing(-1)}
                      disabled={settings.letterSpacing <= -2}
                      className="h-8 w-8"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <div className="flex-1 bg-secondary rounded-full h-2 relative">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((settings.letterSpacing + 2) / 12) * 100}%` }}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => adjustLetterSpacing(1)}
                      disabled={settings.letterSpacing >= 10}
                      className="h-8 w-8"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <Separator />

                {/* Contrast */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Contrast className="h-4 w-4" />
                    ความคมชัด
                  </Label>
                  <RadioGroup
                    value={settings.contrast}
                    onValueChange={(value) => updateSetting('contrast', value as AccessibilitySettings['contrast'])}
                    className="grid grid-cols-1 gap-2"
                  >
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors">
                      <RadioGroupItem value="normal" id="contrast-normal" />
                      <Label htmlFor="contrast-normal" className="cursor-pointer flex-1">ปกติ</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors">
                      <RadioGroupItem value="high" id="contrast-high" />
                      <Label htmlFor="contrast-high" className="cursor-pointer flex-1">สูง</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors">
                      <RadioGroupItem value="inverted" id="contrast-inverted" />
                      <Label htmlFor="contrast-inverted" className="cursor-pointer flex-1">กลับสี</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Toggle Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
                    <Label htmlFor="focus-indicator" className="flex items-center gap-2 text-sm cursor-pointer">
                      <Focus className="h-4 w-4" />
                      เพิ่มเส้นขอบ Focus
                    </Label>
                    <Switch
                      id="focus-indicator"
                      checked={settings.focusIndicator}
                      onCheckedChange={(checked) => updateSetting('focusIndicator', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
                    <Label htmlFor="dyslexia-font" className="flex items-center gap-2 text-sm cursor-pointer">
                      <BookOpen className="h-4 w-4" />
                      ฟอนต์สำหรับผู้ป่วยดิสเล็กเซีย
                    </Label>
                    <Switch
                      id="dyslexia-font"
                      checked={settings.dyslexiaFont}
                      onCheckedChange={(checked) => updateSetting('dyslexiaFont', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
                    <Label htmlFor="reading-guide" className="flex items-center gap-2 text-sm cursor-pointer">
                      <BookOpen className="h-4 w-4" />
                      แนวทางการอ่าน
                    </Label>
                    <Switch
                      id="reading-guide"
                      checked={settings.readingGuide}
                      onCheckedChange={(checked) => updateSetting('readingGuide', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
                    <Label htmlFor="link-highlight" className="flex items-center gap-2 text-sm cursor-pointer">
                      <Link className="h-4 w-4" />
                      เน้นลิงก์
                    </Label>
                    <Switch
                      id="link-highlight"
                      checked={settings.linkHighlight}
                      onCheckedChange={(checked) => updateSetting('linkHighlight', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
                    <Label htmlFor="reduce-motion" className="flex items-center gap-2 text-sm cursor-pointer">
                      <Eye className="h-4 w-4" />
                      ลดการเคลื่อนไหว
                    </Label>
                    <Switch
                      id="reduce-motion"
                      checked={settings.reduceMotion}
                      onCheckedChange={(checked) => updateSetting('reduceMotion', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
                    <Label htmlFor="large-cursor" className="flex items-center gap-2 text-sm cursor-pointer">
                      <MousePointer className="h-4 w-4" />
                      เคอร์เซอร์ขนาดใหญ่
                    </Label>
                    <Switch
                      id="large-cursor"
                      checked={settings.largeCursor}
                      onCheckedChange={(checked) => updateSetting('largeCursor', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
                    <Label htmlFor="high-contrast" className="flex items-center gap-2 text-sm cursor-pointer">
                      <Contrast className="h-4 w-4" />
                      บังคับความคมชัดสูง
                    </Label>
                    <Switch
                      id="high-contrast"
                      checked={settings.highContrast}
                      onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
                    <Label htmlFor="screen-reader" className="flex items-center gap-2 text-sm cursor-pointer">
                      <Volume2 className="h-4 w-4" />
                      โหมดผู้อ่านหน้าจอ
                    </Label>
                    <Switch
                      id="screen-reader"
                      checked={settings.screenReader}
                      onCheckedChange={(checked) => updateSetting('screenReader', checked)}
                    />
                  </div>
                </div>

                <Separator />

                {/* Reset Button */}
                <Button
                  variant="outline"
                  onClick={resetSettings}
                  className="w-full hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  รีเซ็ตการตั้งค่า
                </Button>

                {/* Info */}
                <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md border">
                  <p className="font-medium mb-2">คีย์ลัด:</p>
                  <div className="space-y-1">
                    <p>• <kbd className="px-1.5 py-0.5 text-xs bg-background rounded border">Ctrl + Alt + A</kbd>: เปิด/ปิดแผง</p>
                    <p>• <kbd className="px-1.5 py-0.5 text-xs bg-background rounded border">Esc</kbd>: ปิดแผง</p>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      )}

      {/* Enhanced Global Accessibility Styles */}
      <style jsx global>{`        
        /* Reduce motion when enabled */
        .reduce-motion * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
        
        /* High contrast modes */
        .high-contrast {
          filter: contrast(150%) brightness(110%);
        }
        
        .inverted-contrast {
          filter: invert(1) hue-rotate(180deg) contrast(120%);
        }
        
        .force-high-contrast {
          filter: contrast(200%) brightness(120%) saturate(150%);
        }
        
        /* Enhanced focus indicators */
        .enhanced-focus *:focus,
        .enhanced-focus *:focus-visible {
          outline: 3px solid #0066cc !important;
          outline-offset: 2px !important;
          border-radius: 4px !important;
          box-shadow: 0 0 0 1px rgba(0, 102, 204, 0.3) !important;
        }
        
        /* Large cursor */
        .large-cursor,
        .large-cursor * {
          cursor: url('data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M2 2l8 20 4-8 8-4z" fill="black"/><path d="M3 3l6 16 3-6 6-3z" fill="white"/></svg>') 2 2, auto !important;
        }
        
        /* Dyslexia-friendly font */
        .dyslexia-font * {
          font-family: 'OpenDyslexic', 'Comic Sans MS', cursive !important;
        }
        
        /* Reading guide */
        .reading-guide {
          position: relative;
        }
        
        .reading-guide::before {
          content: '';
          position: fixed;
          top: calc(50% - 2px);
          left: 0;
          right: 0;
          height: 4px;
          background: rgba(0, 102, 204, 0.3);
          z-index: 30;
          pointer-events: none;
          backdrop-filter: blur(1px);
        }
        
        /* Link highlighting */
        .link-highlight a,
        .link-highlight [role="link"] {
          background-color: rgba(255, 255, 0, 0.3) !important;
          border: 2px solid #ff6600 !important;
          border-radius: 3px !important;
          padding: 2px 4px !important;
          margin: 1px !important;
          font-weight: bold !important;
        }
        
        /* Apply accessibility scaling */
        body {
          font-size: calc(1rem * var(--accessibility-font-scale, 1)) !important;
          line-height: var(--accessibility-line-height, 1.5) !important;
          letter-spacing: var(--accessibility-letter-spacing, 0) !important;
        }
        
        /* Apply content scaling to only the content wrapper, not the main container or background */
        .accessibility-content {
          zoom: var(--accessibility-zoom, 100%);
          -ms-zoom: var(--accessibility-zoom, 100%);
          -webkit-zoom: var(--accessibility-zoom, 100%);
          transition: all 0.3s ease;
          height: 100%;
          width: 100%;
        }
          
        
        /* Firefox support with transform instead of zoom */
        @supports (-moz-appearance: none) {
          .accessibility-content {
            transform: scale(var(--accessibility-content-scale, 1));
            transform-origin: top left;
            transition: transform 0.3s ease;
          }
        }
        
        /* Smooth panel animations */
        @keyframes slideInFromRight {
          from {
            transform: translate(calc(-50% + 20px), -50%) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes slideOutToRight {
          from {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          to {
            transform: translate(calc(-50% + 20px), -50%) scale(0.95);
            opacity: 0;
          }
        }
        
        /* Accessibility announcements */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        
        /* Keyboard navigation enhancements */
        .keyboard-navigation *:focus {
          outline: 2px solid #0066cc;
          outline-offset: 2px;
        }
        
        /* High contrast button states */
        .high-contrast button:hover,
        .force-high-contrast button:hover {
          background-color: #000 !important;
          color: #fff !important;
          border: 2px solid #fff !important;
        }
        
        /* Smooth scroll behavior (when motion not reduced) */
        html:not(.reduce-motion) {
          scroll-behavior: smooth;
        }
        
        /* Loading states */
        .accessibility-loading {
          opacity: 0.7;
          pointer-events: none;
        }
      `}</style>
    </>
  )
}

export default Accessibility