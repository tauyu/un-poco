import { lookupWord } from './src/services/dictionary/lookupService.ts';

const testWords = [
  'madrid', 'costumbre', 'favorita', 'bar', 'esquina', 'olor', 'café', 
  'camarero', 'saluda', 'sonrisa', 'barra', 'taza', 'caliente', 'acompañada', 
  'tostada', 'tomate', 'aceite', 'oliva', 'ambiente', 'animado', 'periódicos', 
  'calle', 'familia', 'nueva', 'casa', 'habitaciones', 'salón', 'luminoso', 
  'ventanas', 'parque', 'cocina', 'moderna', 'mesa', 'madera', 'padres', 
  'hermano', 'menor', 'gato', 'blanco', 'duerme', 'sofá', 'feliz', 'comenzar'
];

for (const w of testWords) {
  const r = lookupWord(w);
  console.log(`${w.padEnd(14)} => ${r.matchedWord.padEnd(14)} | isConj: ${String(r.isConjugatedForm).padEnd(5)} | meaning: ${r.entry?.meaningZh}`);
}
