import fs from 'fs';
import { Redis } from 'ioredis';
import path from 'path';
import { fileURLToPath } from 'url';

const redis = new Redis(process.env.REDIS_URL);

// 没有提供的情况下默认了连接本地6379端口

/**
 * 初始化数据库
 * @param {'movies' | 'ratings' | 'users'} name 数据库名称
 */
async function init(name) {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const data = fs.readFileSync(path.join(__dirname, `${name}.json`), 'utf-8');
  const jsonData = JSON.parse(data);
  for (const [key, value] of Object.entries(jsonData)) {
    await redis.set(`${name}:${key}`, JSON.stringify(value));
  }
}

async function main() {
  await init('movies');
  await init('ratings');
  await init('users');

  console.log('✅ 初始化完成');
  process.exit(0);
}

main();
