import type { WasteType, SeverityLevel } from './constants';
import { WASTE_TYPES, DEPARTMENTS } from './constants';

export interface AIAnalysisResult {
  wasteType: WasteType;
  wasteTypeLabel: string;
  confidence: number;
  severity: SeverityLevel;
  department: string;
  estimatedCleanupTime: string;
  environmentalImpact: string;
  recommendations: string[];
}

const wasteTypeKeys: WasteType[] = ['organic', 'plastic', 'ewaste', 'construction', 'mixed', 'hazardous', 'medical'];

const severityLevels: SeverityLevel[] = ['low', 'medium', 'high', 'critical'];

const cleanupTimes: Record<SeverityLevel, string[]> = {
  low: ['1-2 hours', '2-3 hours'],
  medium: ['3-5 hours', '4-6 hours'],
  high: ['6-8 hours', '8-12 hours'],
  critical: ['12-24 hours', '24-48 hours'],
};

const impacts: Record<WasteType, string> = {
  organic: 'Attracts pests, produces methane gas, contaminates soil. Composting can convert to useful fertilizer.',
  plastic: 'Non-biodegradable, takes 400+ years to decompose. Pollutes waterways and harms marine life.',
  ewaste: 'Contains toxic metals (lead, mercury). Improper disposal contaminates groundwater.',
  construction: 'Releases dust particles, blocks drainage systems. Can be recycled into building materials.',
  mixed: 'Difficult to process, increases landfill burden. Segregation needed for proper recycling.',
  hazardous: 'High risk of chemical contamination. Requires specialized hazardous waste handling.',
  medical: 'Biohazard risk, potential disease transmission. Requires incineration per regulations.',
};

const recommendations: Record<WasteType, string[]> = {
  organic: ['Set up composting unit nearby', 'Install bio-waste bins', 'Schedule regular organic waste collection'],
  plastic: ['Install plastic recycling bins', 'Organize plastic collection drive', 'Partner with recycling centers'],
  ewaste: ['Set up e-waste collection point', 'Partner with certified e-waste recyclers', 'Conduct awareness drives'],
  construction: ['Deploy debris clearing trucks', 'Fine the construction site', 'Install debris containment barriers'],
  mixed: ['Deploy waste segregation team', 'Install color-coded bins', 'Conduct door-to-door awareness'],
  hazardous: ['Cordone off the area immediately', 'Deploy hazmat team', 'Test soil and water samples'],
  medical: ['Deploy biohazard response team', 'Sanitize the area', 'Trace source of medical waste'],
};

function weightedRandom(): WasteType {
  const weights = [15, 35, 7, 10, 18, 3, 2]; // matches distribution
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) return wasteTypeKeys[i];
  }
  return 'mixed';
}

function randomSeverity(): SeverityLevel {
  const weights = [25, 40, 25, 10];
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) return severityLevels[i];
  }
  return 'medium';
}

export function analyzeWasteImage(_file: File): Promise<AIAnalysisResult> {
  return new Promise((resolve) => {
    // Simulate AI processing time (2-3 seconds)
    const delay = 2000 + Math.random() * 1000;

    setTimeout(() => {
      const wasteType = weightedRandom();
      const severity = randomSeverity();
      const confidence = 75 + Math.floor(Math.random() * 23); // 75-97

      const deptIndex = Math.floor(Math.random() * DEPARTMENTS.length);
      const cleanupOptions = cleanupTimes[severity];
      const cleanupTime = cleanupOptions[Math.floor(Math.random() * cleanupOptions.length)];

      resolve({
        wasteType,
        wasteTypeLabel: WASTE_TYPES[wasteType].label,
        confidence,
        severity,
        department: DEPARTMENTS[deptIndex],
        estimatedCleanupTime: cleanupTime,
        environmentalImpact: impacts[wasteType],
        recommendations: recommendations[wasteType],
      });
    }, delay);
  });
}
