import flatley from 'flatley';
const { unflatten: flatleyUnflatten } = flatley;
import { Data, Fields } from './types.js';

const reduceFieldsToValues = (fields: Fields, unflatten?: boolean): Data => {
  const data = {};

  Object.keys(fields).forEach((key) => {
    if (!fields[key].disableFormData) {
      data[key] = fields[key].value;
    }
  });

  if (unflatten) {
    return flatleyUnflatten(data, { safe: true });
  }

  return data;
};

export default reduceFieldsToValues;
