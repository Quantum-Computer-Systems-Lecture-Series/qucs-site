// Single source of truth for lecture categories
export const lectureCategories = [
  { label: 'General', value: 'general' },
  { label: 'Algorithms & Theory', value: 'algorithms-and-theory' },
  { label: 'Systems & Architecture', value: 'systems-and-architecture' },
  { label: 'Error Correction & Mitigation', value: 'error-correction-and-mitigation' },
  { label: 'Compilation & Optimization', value: 'compilation-and-optimization' },
  { label: 'Machine Learning & AI', value: 'machine-learning-and-ai' },
  { label: 'Networking & Communication', value: 'networking-and-communication' },
  { label: 'Hardware & Control', value: 'hardware-and-control' },
  { label: 'Physics & Simulation', value: 'physics-and-simulation' },
  { label: 'Software Tools & Verification', value: 'software-tools-and-verification' },
  { label: 'Applications', value: 'applications' },
] as const

// Create a map for quick lookup
const categoryMap = new Map<string, string>(lectureCategories.map(cat => [cat.value, cat.label]))

export function getCategoryLabel(slug: string): string {
  return categoryMap.get(slug) || slug
}
