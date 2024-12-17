// 获取环境变量
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const env = process.env.NODE_ENV;
export const getYamlConfig = (key?: string) => {
  const ymlInfo = yaml.load(
    readFileSync(join(process.cwd(), `config/${env}.yaml`), 'utf-8'),
  ) as Record<string, any>;
  if (key) {
    return ymlInfo[key];
  }
  return ymlInfo;
};
