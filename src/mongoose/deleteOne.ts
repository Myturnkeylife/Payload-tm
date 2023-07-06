import type { MongooseAdapter } from '.';
import type { DeleteOne } from '../database/types';
import type { Document } from '../types';
import sanitizeInternalFields from '../utilities/sanitizeInternalFields';

export const deleteOne: DeleteOne = async function deleteOne(this: MongooseAdapter,
  { collection, where }) {
  const Model = this.collections[collection];

  const query = await Model.buildQuery({
    payload: this.payload,
    where,
  });

  let doc;
  if (this.session) {
    doc = await Model.findOneAndDelete(query).session(this.session).lean();
  } else {
    doc = await Model.findOneAndDelete(query).lean();
  }

  let result: Document = JSON.parse(JSON.stringify(doc));

  // custom id type reset
  result.id = result._id;
  result = sanitizeInternalFields(result);


  return result;
};
