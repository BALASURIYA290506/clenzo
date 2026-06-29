import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI client with the VITE_GEMINI_API_KEY environment variable
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface GeminiAnalysisResult {
  wasteType: string;
  confidence: number;
  severity: string;
  estimatedCleanupTime: string;
  suggestedDepartment: string;
  environmentalImpact: string;
  estimatedWeightKg: number;
  riskLevel: string;
  recommendation: string;
}

/**
 * Converts a File object to the generative part format required by the Google Gen AI SDK
 */
async function fileToGenerativePart(file: File): Promise<{ inlineData: { data: string; mimeType: string } }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string)
        .replace(/^data:image\/[a-z]+;base64,/, '');
      console.log('Image converted to Base64');
      resolve({
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Analyzes an uploaded waste image using Gemini 2.5 Flash
 */
export async function analyzeWasteWithGemini(file: File): Promise<GeminiAnalysisResult> {
  if (!ai) {
    const errMsg = 'VITE_GEMINI_API_KEY is not defined.';
    console.warn(errMsg);
    throw new Error(errMsg);
  }

  try {
    const imagePart = await fileToGenerativePart(file);
    
    const prompt = `You are an expert municipal waste analysis AI.
Analyze this image and identify the type of waste, severity, suggested cleanup department, estimated weight in kg, risk level, environmental impact, and your recommendations.

Provide your response ONLY as a single valid JSON object. Do not include any markdown, code blocks (such as \`\`\`json), or explanations.

The output must exactly follow this JSON schema:
{
  "wasteType": "organic | plastic | ewaste | construction | mixed | hazardous | medical",
  "confidence": number (between 0 and 100),
  "severity": "low | medium | high | critical",
  "estimatedCleanupTime": "string (e.g. 2-3 hours)",
  "suggestedDepartment": "string",
  "environmentalImpact": "string",
  "estimatedWeightKg": number,
  "riskLevel": "low | moderate | high | severe",
  "recommendation": "string"
}`;

    console.log('Gemini request started');
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [prompt, imagePart],
    });

    const responseText = response.text || '';
    console.log('Gemini response received:', responseText);
    
    // Safely extract and parse the JSON response
    const cleanJsonText = responseText
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    try {
      const parsed = JSON.parse(cleanJsonText);
      console.log('Parsed JSON:', parsed);
      
      return {
        wasteType: parsed.wasteType || 'mixed',
        confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 85,
        severity: parsed.severity || 'medium',
        estimatedCleanupTime: parsed.estimatedCleanupTime || '4-6 hours',
        suggestedDepartment: parsed.suggestedDepartment || 'Solid Waste Management',
        environmentalImpact: parsed.environmentalImpact || 'N/A',
        estimatedWeightKg: typeof parsed.estimatedWeightKg === 'number' ? parsed.estimatedWeightKg : 10,
        riskLevel: parsed.riskLevel || 'moderate',
        recommendation: parsed.recommendation || 'N/A',
      };
    } catch (parseErr) {
      console.error('Failed to parse Gemini response as JSON. Cleaned response:', cleanJsonText, parseErr);
      throw new Error('Gemini returned invalid JSON format');
    }
  } catch (err) {
    console.error('Error during Gemini API analysis:', err);
    throw err;
  }
}
