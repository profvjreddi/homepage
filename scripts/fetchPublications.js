#!/usr/bin/env node
/**
 * Fetch the full DBLP publication list at build time and write it to
 * public/content/publications.json.
 *
 * Browser clients cannot hit dblp.org directly (no CORS), so a previous
 * client-side fetch path silently fell back to three hardcoded sample
 * papers and then cached that failure. This script is the source of truth.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DBLP_PID = '88/2610';
const DBLP_URL = `https://dblp.org/pid/${DBLP_PID}.xml`;
const OUTPUT_PATH = path.join(__dirname, '../public/content/publications.json');
const MIN_EXPECTED = 50;

const PUBLICATION_TYPES = new Set([
  'article',
  'inproceedings',
  'book',
  'incollection',
  'proceedings',
  'phdthesis',
  'mastersthesis',
]);

function textOf(block, tag) {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i');
  const match = block.match(re);
  if (!match) return null;
  return match[1]
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function textsOf(block, tag) {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'gi');
  const values = [];
  let match;
  while ((match = re.exec(block)) !== null) {
    const value = match[1]
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
    if (value) values.push(value);
  }
  return values;
}

function parseDBLPXML(xmlText) {
  const publications = [];
  // Each <r>...</r> wraps one publication record.
  const records = xmlText.match(/<r>([\s\S]*?)<\/r>/g) || [];

  for (const record of records) {
    const typeMatch = record.match(
      /<(article|inproceedings|book|incollection|proceedings|phdthesis|mastersthesis)\b[^>]*>/i
    );
    if (!typeMatch) continue;

    const type = typeMatch[1].toLowerCase();
    if (!PUBLICATION_TYPES.has(type)) continue;

    const inner = record;
    const title = textOf(inner, 'title') || 'Untitled';
    const authors = textsOf(inner, 'author');
    const venue =
      textOf(inner, 'journal') || textOf(inner, 'booktitle') || 'Unknown Venue';
    const year = parseInt(textOf(inner, 'year') || `${new Date().getFullYear()}`, 10);
    const url = textOf(inner, 'url') || undefined;
    const ee = textOf(inner, 'ee') || undefined;

    publications.push({
      title,
      authors,
      venue,
      year,
      type,
      ...(url ? { url } : {}),
      ...(ee ? { ee } : {}),
    });
  }

  publications.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  return publications;
}

function existingSnapshotIsUsable() {
  if (!fs.existsSync(OUTPUT_PATH)) return false;
  try {
    const existing = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8'));
    return Array.isArray(existing.publications) && existing.publications.length >= MIN_EXPECTED;
  } catch {
    return false;
  }
}

async function main() {
  console.log(`Fetching DBLP XML from ${DBLP_URL}...`);
  try {
    const response = await fetch(DBLP_URL, {
      headers: {
        Accept: 'application/xml',
        'User-Agent': 'VijayJanapaReddiAcademicWebsite/1.0 (build-time publication sync)',
      },
    });

    if (!response.ok) {
      throw new Error(`DBLP returned ${response.status} ${response.statusText}`);
    }

    const xmlText = await response.text();
    const publications = parseDBLPXML(xmlText);

    if (publications.length < MIN_EXPECTED) {
      throw new Error(
        `Parsed only ${publications.length} publications (expected at least ${MIN_EXPECTED}). Refusing to write.`
      );
    }

    const payload = {
      source: DBLP_URL,
      pid: DBLP_PID,
      fetchedAt: new Date().toISOString(),
      totalCount: publications.length,
      publications,
    };

    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2) + '\n');
    console.log(`Wrote ${publications.length} publications to ${OUTPUT_PATH}`);
  } catch (error) {
    if (existingSnapshotIsUsable()) {
      console.warn('DBLP fetch failed; keeping existing publications.json');
      console.warn(String(error));
      return;
    }
    throw error;
  }
}

main().catch((error) => {
  console.error('Failed to fetch publications:', error);
  process.exit(1);
});
