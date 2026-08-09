import * as backendProvider from './backendProvider'
import * as mockProvider from './mockProvider'

const endpoint = import.meta.env.VITE_AI_ANALYSIS_ENDPOINT || ''
export const hasBackend = Boolean(endpoint)

export async function analyzeCV(file) {
  if (!file) {
    throw new Error('No CV file provided for analysis.')
  }

  if (endpoint) {
    try {
      const result = await backendProvider.analyzeCV(file)
      return result
    } catch (error) {
      console.warn('AI backend analysis failed, falling back to mock analysis.', error)
    }
  }

  return mockProvider.analyzeCV(file)
}

export default { analyzeCV }
