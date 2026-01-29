#!/usr/bin/env node
/**
 * Script to fetch Google Scholar stats and update the fallback values
 * in googleScholar.ts. Used by GitHub Actions for periodic updates.
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCHOLAR_URL = 'https://scholar.google.com/citations?hl=en&user=gy4UVGcAAAAJ';
const GOOGLE_SCHOLAR_TS_PATH = path.join(__dirname, '../src/utils/googleScholar.ts');

async function fetchScholarStats() {
  console.log('Launching browser...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu'
    ]
  });

  try {
    const page = await browser.newPage();
    
    // Set a realistic user agent
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    console.log(`Navigating to ${SCHOLAR_URL}...`);
    await page.goto(SCHOLAR_URL, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });

    // Wait for the stats table to load
    await page.waitForSelector('#gsc_rsb_st', { timeout: 10000 });

    // Extract stats from the page
    const stats = await page.evaluate(() => {
      const table = document.querySelector('#gsc_rsb_st');
      if (!table) return null;

      const rows = table.querySelectorAll('tbody tr');
      const result = {};

      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 2) {
          const label = cells[0].textContent.trim().toLowerCase();
          const value = parseInt(cells[1].textContent.trim().replace(/,/g, ''), 10);
          
          if (label.includes('citations')) {
            result.totalCitations = value;
          } else if (label.includes('h-index')) {
            result.hIndex = value;
          } else if (label.includes('i10-index')) {
            result.i10Index = value;
          }
        }
      });

      return result;
    });

    if (!stats || !stats.totalCitations || !stats.hIndex) {
      throw new Error('Failed to extract stats from page');
    }

    console.log('Extracted stats:', stats);
    return stats;

  } finally {
    await browser.close();
  }
}

function updateGoogleScholarTs(stats) {
  console.log(`Updating ${GOOGLE_SCHOLAR_TS_PATH}...`);
  
  let content = fs.readFileSync(GOOGLE_SCHOLAR_TS_PATH, 'utf8');
  
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const monthYear = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  // Update totalCitations
  content = content.replace(
    /totalCitations:\s*\d+,\s*\/\/.*$/m,
    `totalCitations: ${stats.totalCitations}, // From your actual Google Scholar profile (updated ${monthYear})`
  );

  // Update hIndex
  content = content.replace(
    /hIndex:\s*\d+,\s*\/\/.*$/m,
    `hIndex: ${stats.hIndex},            // From your actual Google Scholar profile (updated ${monthYear})`
  );

  // Update i10Index
  content = content.replace(
    /i10Index:\s*\d+,\s*\/\/.*$/m,
    `i10Index: ${stats.i10Index},         // From your actual Google Scholar profile (updated ${monthYear})`
  );

  // Update lastUpdated date
  content = content.replace(
    /lastUpdated:\s*new Date\(['"].*['"]\)/m,
    `lastUpdated: new Date('${today}')`
  );

  fs.writeFileSync(GOOGLE_SCHOLAR_TS_PATH, content, 'utf8');
  console.log('Successfully updated googleScholar.ts');
}

async function main() {
  try {
    console.log('=== Google Scholar Stats Updater ===\n');
    
    const stats = await fetchScholarStats();
    
    if (stats) {
      updateGoogleScholarTs(stats);
      
      // Output for GitHub Actions
      console.log('\n=== Summary ===');
      console.log(`Citations: ${stats.totalCitations}`);
      console.log(`h-index: ${stats.hIndex}`);
      console.log(`i10-index: ${stats.i10Index}`);
      
      // Set outputs for GitHub Actions
      if (process.env.GITHUB_OUTPUT) {
        fs.appendFileSync(process.env.GITHUB_OUTPUT, `citations=${stats.totalCitations}\n`);
        fs.appendFileSync(process.env.GITHUB_OUTPUT, `h_index=${stats.hIndex}\n`);
        fs.appendFileSync(process.env.GITHUB_OUTPUT, `i10_index=${stats.i10Index}\n`);
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
