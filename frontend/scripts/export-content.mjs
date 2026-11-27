// Gera o JSON usado pelo seeder do Laravel a partir do catálogo único do frontend.
// Uso: node scripts/export-content.mjs [destino]
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { ACTIVITIES } from '../src/content/index.js'

const dest = resolve(process.argv[2] ?? '../backend/database/seeders/data/activities.json')
mkdirSync(dirname(dest), { recursive: true })
const data = ACTIVITIES.map((a, i) => ({
  slug: a.slug, title: a.title, subject: a.subject, category: a.category,
  description: a.description, adult_note: a.adultNote, bncc_codes: a.bncc, sort_order: i + 1,
  levels: a.levels,
}))
writeFileSync(dest, JSON.stringify(data, null, 2))
console.log(`OK: ${data.length} atividades → ${dest}`)
