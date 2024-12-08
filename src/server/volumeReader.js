import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const SERVER_DIR = path.resolve(__dirname, './src/server');

/**
 * Reads all CSV files within a specific volume folder.
 *
 * @param volume - The name of the volume folder (e.g., "nelson-volume 1").
 * @returns A promise that resolves to an array of objects representing the CSV rows from all files.
 * @throws Error if the folder does not exist.
 */
export const readVolume = (volume: string): Promise<any[]> => {
  const volumeDir = path.join(SERVER_DIR, volume);
  if (!fs.existsSync(volumeDir)) {
    throw new Error(`Volume "${volume}" not found.`);
  }

  const csvFiles = fs.readdirSync(volumeDir).filter(file => file.endsWith('.csv'));
  const promises = csvFiles.map(file => {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      fs.createReadStream(path.join(volumeDir, file))
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  });

  return Promise.all(promises).then(results => results.flat());
};

/**
 * Searches all volumes or a specific volume for a keyword.
 *
 * @param query - The search term or keyword.
 * @param volume - (Optional) The specific volume folder to search in.
 * @returns A promise that resolves to a list of matching rows with context.
 */
export const searchBooks = async (query: string, volume?: string): Promise<{ volume: string; row: any }[]> => {
  const results: { volume: string; row: any }[] = [];
  const volumes = volume ? [volume] : fs.readdirSync(SERVER_DIR).filter(file => fs.statSync(path.join(SERVER_DIR, file)).isDirectory());

  for (const vol of volumes) {
    const rows = await readVolume(vol);
    rows.forEach((row) => {
      const rowString = JSON.stringify(row).toLowerCase();
      if (rowString.includes(query.toLowerCase())) {
        results.push({ volume: vol, row });
      }
    });
  }

  return results;
};
