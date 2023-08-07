import fs from 'fs';
import zlib from 'zlib';
import { Base64String } from '@/serialization';
import DesignData from './DesignData';

export async function encode(saveData: Buffer|DesignData): Promise<Base64String> {
  const buf = saveData instanceof DesignData ? saveData.toBuffer() : saveData;
  const deflated = await new Promise<Buffer>((resove, reject) => {
    zlib.deflate(buf, (err, res) => (err ? reject(err) : resove(res)));
  });
  return deflated.toString('base64');
}

export async function encodeFromFile(filePath: string): Promise<Base64String> {
  const saveData = await new Promise<Buffer>((resolve, reject) => {
    fs.readFile(filePath, (err, res) => (err ? reject(err) : resolve(res)));
  });
  return encode(saveData);
}
