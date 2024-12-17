import { ValueTransformer } from 'typeorm';
import * as dayjs from 'dayjs';

export const dateTransformer: ValueTransformer = {
  to(value) {
    return value;
  },
  from(value) {
    return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
  },
};
