import type { MongooseAdapter } from '.';
import type { FindVersions } from '../database/types';
import sanitizeInternalFields from '../utilities/sanitizeInternalFields';
import flattenWhereToOperators from '../database/flattenWhereToOperators';

export const findVersions: FindVersions = async function findVersions(this: MongooseAdapter,
  { collection, where, page, limit, sort, locale, pagination, skip }) {
  const Model = this.versions[collection];

  let useEstimatedCount = false;

  if (where) {
    const constraints = flattenWhereToOperators(where);
    useEstimatedCount = constraints.some((prop) => Object.keys(prop).some((key) => key === 'near'));
  }

  const query = await Model.buildQuery({
    payload: this.payload,
    locale,
    where,
  });

  const paginationOptions = {
    page,
    sort: sort ? sort.reduce((acc, cur) => {
      acc[cur.property] = cur.direction;
      return acc;
    }, {}) : undefined,
    limit,
    lean: true,
    leanWithId: true,
    pagination,
    offset: skip,
    useEstimatedCount,
    options: {
      // limit must also be set here, it's ignored when pagination is false
      limit,
      skip,
    },
  };

  const result = await Model.paginate(query, paginationOptions);

  return {
    ...result,
    docs: result.docs.map((doc) => {
      const sanitizedDoc = JSON.parse(JSON.stringify(doc));
      sanitizedDoc.id = sanitizedDoc._id;
      return sanitizeInternalFields(sanitizedDoc);
    }),
  };
};
