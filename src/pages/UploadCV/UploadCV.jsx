import React, { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  UploadCloud,
  FileText,
  X,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Shield,
  Sparkles,
  Loader2,
} from 'lucide-react'
import { Button, Card, useToast } from '../../components/ui'
import { analyzeCV, hasBackend } from '../../services/ai'

const ACCEPTED_TYPES = {
  'application/pdf': '.pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
}
const ACCEPTED_EXTENSIONS = ['.pdf', '.docx']
const MAX_SIZE_MB = 10
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

/**
 * CV Upload page — drag-and-drop or click-to-browse file upload
 * with animated states: idle → selected → analyzing → complete.
 */
export default function UploadCV() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const toast = useToast()

  // UI state machine: 'idle' | 'selected' | 'analyzing' | 'complete' | 'error'
  const [state, setState] = useState('idle')
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  /* ── Validation ── */
  const validateFile = useCallback((f) => {
    if (!f) return 'No file selected.'

    const ext = '.' + f.name.split('.').pop().toLowerCase()
    if (!ACCEPTED_EXTENSIONS.includes(ext)) {
      return 'Only PDF and DOCX files are supported.'
    }
    if (f.size > MAX_SIZE_BYTES) {
      return `File is too large. Maximum size is ${MAX_SIZE_MB} MB.`
    }
    return null
  }, [])

  /* ── File selection ── */
  const handleFile = useCallback((f) => {
    setError('')
    const validationError = validateFile(f)
    if (validationError) {
      setError(validationError)
      setState('error')
      setFile(null)
      return
    }
    setFile(f)
    setState('selected')
  }, [validateFile])

  const onInputChange = (e) => {
    const f = e.target.files?.[0]
    if (f) handleFile(f)
    // Reset so re-selecting the same file triggers change
    e.target.value = ''
  }

  const removeFile = () => {
    setFile(null)
    setState('idle')
    setError('')
    setProgress(0)
  }

  /* ── Drag & Drop ── */
  const onDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true) }
  const onDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false) }
  const onDragOver  = (e) => { e.preventDefault(); e.stopPropagation() }
  const onDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const f = e.dataTransfer.files?.[0]
    if (f) handleFile(f)
  }

  /* ── Simulated analysis ── */
  const startAnalysis = () => {
    if (!file) {
      setError('Please choose a CV before analyzing.')
      setState('error')
      return
    }
    setState('analyzing')
    setProgress(4)

    // start visual progress simulation
    let current = 4
    const interval = setInterval(() => {
      current += Math.random() * 10 + 2
      setProgress(Math.min(Math.round(current), 98))
    }, 300)

    // run analyzer in background
    analyzeCV(file).then((res) => {
      try {
        localStorage.setItem('cp_cv_analysis_result', JSON.stringify(res))
        localStorage.setItem('cp_cv_analysis_status', res.source === 'ai' ? 'AI backend' : 'Local fallback')
      } catch (e) {}
      clearInterval(interval)
      setProgress(100)
      setTimeout(() => {
        setState('complete')
        toast.success('CV analysis complete!')
      }, 350)
    }).catch((err) => {
      clearInterval(interval)
      setProgress(0)
      setState('error')
      setError(err?.message || 'Analysis failed. Please try again.')
      toast.error(err?.message || 'Analysis failed. Please try again.')
      try { localStorage.setItem('cp_cv_analysis_status', 'Failed') } catch (e) {}
    })
  }

  /* ── Helpers ── */
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const getFileExtension = (name) => name.split('.').pop().toUpperCase()

  return (
    <div className="relative min-h-[calc(100vh-6rem)]">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-violet-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-[350px] h-[350px] bg-lavender-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        {/* Back navigation */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors duration-200 mb-8 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-lavender-500 shadow-soft mb-5">
            <UploadCloud className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-slate-900 mb-3">
            Upload Your CV
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto leading-relaxed">
            Drop your resume below and let our AI analyze it to find the best
            career opportunities for you.
          </p>
        </div>

        {/* Upload Card */}
        <Card
          variant="default"
          padding="none"
          className="overflow-hidden animate-fade-in-up"
          style={{ animationDelay: '0.15s' }}
        >
          {/* ── STATE: Idle / Error ── */}
          {(state === 'idle' || state === 'error') && (
            <div
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative cursor-pointer
                m-4 sm:m-6
                rounded-2xl
                border-2 border-dashed
                transition-all duration-300 ease-out
                p-8 sm:p-12
                text-center
                group
                ${dragActive
                  ? 'border-violet-400 bg-violet-50/60 scale-[1.01]'
                  : state === 'error'
                    ? 'border-red-200 bg-red-50/30 hover:border-red-300'
                    : 'border-lavender-200 bg-lavender-50/30 hover:border-violet-300 hover:bg-violet-50/40'
                }
              `}
            >
              {/* Icon */}
              <div className={`
                w-16 h-16 rounded-2xl mx-auto mb-5
                flex items-center justify-center
                transition-all duration-300
                ${dragActive
                  ? 'bg-violet-100 scale-110'
                  : state === 'error'
                    ? 'bg-red-100'
                    : 'bg-lavender-100 group-hover:bg-violet-100 group-hover:scale-105'
                }
              `}>
                {state === 'error' ? (
                  <AlertCircle className="w-8 h-8 text-red-500" />
                ) : (
                  <UploadCloud className={`w-8 h-8 transition-colors duration-300 ${dragActive ? 'text-violet-600' : 'text-violet-500'}`} />
                )}
              </div>

              {/* Text */}
              {dragActive ? (
                <p className="text-base font-semibold text-violet-700">Drop your file here</p>
              ) : (
                <>
                  <p className="text-base font-semibold text-slate-700 mb-1">
                    Drag & drop your CV here
                  </p>
                  <p className="text-sm text-slate-400 mb-4">
                    or <span className="text-violet-600 font-medium underline underline-offset-2">browse files</span>
                  </p>
                  <div className="flex items-center justify-center gap-3 text-xs text-slate-400">
                    <span className="px-2.5 py-1 bg-white rounded-lg border border-lavender-100 font-medium">PDF</span>
                    <span className="px-2.5 py-1 bg-white rounded-lg border border-lavender-100 font-medium">DOCX</span>
                    <span className="text-slate-300">•</span>
                    <span>Max {MAX_SIZE_MB} MB</span>
                  </div>
                </>
              )}

              {/* Error message */}
              {state === 'error' && error && (
                <p className="mt-4 text-sm font-medium text-red-500 flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </p>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                className="hidden"
                onChange={onInputChange}
                id="cv-file-input"
              />
            </div>
          )}

          {/* ── STATE: File Selected ── */}
          {state === 'selected' && file && (
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-4 p-4 bg-lavender-50/60 rounded-2xl border border-lavender-100">
                {/* File icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-lavender-500 flex items-center justify-center shadow-soft shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {file.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-400">{formatFileSize(file.size)}</span>
                    <span className="text-slate-300">•</span>
                    <span className="px-1.5 py-0.5 bg-violet-100 rounded text-[10px] font-bold text-violet-600">
                      {getFileExtension(file.name)}
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={removeFile}
                  className="w-8 h-8 rounded-lg bg-white border border-lavender-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 transition-all duration-200 shrink-0 cursor-pointer"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Analyze button */}
              <div className="mt-6 flex flex-col items-center gap-4">
                <Button
                  size="lg"
                  icon={Sparkles}
                  loading={state === 'analyzing'}
                  disabled={state === 'analyzing'}
                  onClick={startAnalysis}
                  className="w-full sm:w-auto sm:min-w-[220px]"
                >
                  Analyze My CV
                </Button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-slate-400 hover:text-violet-600 transition-colors cursor-pointer"
                >
                  Choose a different file
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={onInputChange}
                  id="cv-file-input-change"
                />
              </div>
            </div>
          )}

          {/* ── STATE: Analyzing ── */}
          {state === 'analyzing' && (
            <div className="p-6 sm:p-10 text-center">
              {/* Animated loader */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-lavender-100" />
                <div
                  className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 animate-spin"
                  style={{ animationDuration: '1s' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-violet-600">{progress}%</span>
                </div>
              </div>

              <h3 className="text-lg font-heading font-bold text-slate-800 mb-2">
                Analyzing Your CV
              </h3>
              <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto">
                Our AI is parsing your resume and identifying career matches…
              </p>

              {/* Progress bar */}
              <div className="max-w-sm mx-auto">
                <div className="h-2.5 bg-lavender-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-lavender-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-slate-400">Processing…</span>
                  <span className="text-xs font-medium text-violet-600">{progress}%</span>
                </div>
              </div>

              {/* Animated steps */}
              <div className="mt-8 flex flex-col items-start max-w-xs mx-auto gap-2.5">
                <AnalysisStep label="Extracting text" done={progress > 25} active={progress <= 25} />
                <AnalysisStep label="Identifying skills" done={progress > 50} active={progress > 25 && progress <= 50} />
                <AnalysisStep label="Matching opportunities" done={progress > 75} active={progress > 50 && progress <= 75} />
                <AnalysisStep label="Generating report" done={progress >= 100} active={progress > 75 && progress < 100} />
              </div>
            </div>
          )}

          {/* ── STATE: Complete ── */}
          {state === 'complete' && (
            <div className="p-6 sm:p-10 text-center animate-fade-in-up">
              {/* Success icon */}
              <div className="w-20 h-20 rounded-full bg-emerald-50 mx-auto mb-6 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-soft">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-heading font-bold text-slate-800 mb-2">
                Analysis Complete!
              </h3>
              <p className="text-sm text-slate-500 mb-8 max-w-xs mx-auto">
                We've finished analyzing <span className="font-medium text-slate-700">{file?.name}</span>. Your personalized career report is ready.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" className="w-full sm:w-auto sm:min-w-[200px]" onClick={() => navigate('/analysis-results')}>
                  View My Report
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={removeFile}
                  className="w-full sm:w-auto"
                >
                  Upload Another CV
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Privacy note */}
        <div
          className="mt-6 flex items-start gap-2.5 justify-center animate-fade-in-up"
          style={{ animationDelay: '0.25s' }}
        >
          <Shield className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your CV is used only to personalize your career recommendations.
              We never share your data with third parties.
            </p>
            <p className="mt-2 text-xs text-slate-400">
              {hasBackend ? 'Using secure backend AI analysis.' : 'No backend AI endpoint configured; using local fallback analysis.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Sub-component: Analysis step indicator ── */
function AnalysisStep({ label, done, active }) {
  return (
    <div className={`flex items-center gap-2.5 transition-all duration-300 ${done ? 'opacity-100' : active ? 'opacity-100' : 'opacity-40'}`}>
      {done ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
      ) : active ? (
        <Loader2 className="w-4 h-4 text-violet-500 shrink-0 animate-spin" />
      ) : (
        <div className="w-4 h-4 rounded-full border-2 border-slate-200 shrink-0" />
      )}
      <span className={`text-sm ${done ? 'text-emerald-600 font-medium' : active ? 'text-violet-700 font-medium' : 'text-slate-400'}`}>
        {label}
      </span>
    </div>
  )
}
