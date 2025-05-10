import nextEnv from '@next/env';
import fs from 'fs';
import { Redis } from 'ioredis';
import path from 'path';
import { fileURLToPath } from 'url';

const projectDir = process.cwd();
nextEnv.loadEnvConfig(projectDir);

const redis = new Redis(process.env.REDIS_URL);

/**
 * 初始化数据库
 * @param {'movies' | 'ratings' | 'users'} name 数据库名称
 */
async function init(name) {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const data = fs.readFileSync(path.join(__dirname, `${name}.json`), 'utf-8');
  const jsonData = JSON.parse(data);
  await redis.mset(
    ...Object.entries(jsonData).map(([key, value]) => [
      `${name}:${key}`,
      JSON.stringify(value),
    ]),
  );
}

async function main() {
  await init('movies');
  await init('ratings');
  await init('users');

  console.log('✅ 初始化完成');
  process.exit(0);
}

main();
