/** Délais PROCOPE classiques pour grilles (stagger-delays). */
export const STAGGER = {
  section: 0.1,
  col: [0.3, 0.6, 0.9] as const,
  feature: [0.1, 0.2, 0.3, 0.4, 0.6, 0.8, 0.9] as const,
  text: [0.1, 0.4, 0.8] as const,
  form: [0.3, 0.6] as const,
} as const;
