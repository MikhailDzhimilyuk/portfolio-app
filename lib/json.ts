import { promises as fs } from 'fs';

export async function getData() {
  const path = process.cwd() + "/data/data.json"
  const file = await fs.readFile(path, "utf8");
  const data = JSON.parse(file);
  return data;
}