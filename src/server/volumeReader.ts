import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

interface CsvRow {
  [key: string]: string;
}

interface SearchResult {
  title: string;
  content: string;
  page: number;
  volume: number;
}

export async function readVolume(volumePath: string): Promise<CsvRow[]> {
  const results: CsvRow[] = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(volumePath))
      .pipe(csv())
      .on('data', (data: CsvRow) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

export async function searchInVolume(
  volumePath: string,
  searchTerm: string
): Promise<SearchResult[]> {
  try {
    const data = await readVolume(volumePath);
    return data
      .filter((row) => 
        Object.values(row).some((value) => 
          value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .map((row) => ({
        title: row.title || '',
        content: row.content || '',
        page: parseInt(row.page || '0', 10),
        volume: parseInt(row.volume || '1', 10)
      }));
  } catch (error) {
    console.error('Error searching volume:', error);
    return [];
  }
}

export async function searchAllVolumes(
  searchTerm: string,
  volumePaths: string[]
): Promise<SearchResult[]> {
  try {
    const results = await Promise.all(
      volumePaths.map((path) => searchInVolume(path, searchTerm))
    );
    return results.flat();
  } catch (error) {
    console.error('Error searching all volumes:', error);
    return [];
  }
}