import { CollectionBeforeChangeHook } from "payload/types";

export const populatePublishedAt: CollectionBeforeChangeHook = ({
  data,
  req,
  operation,
}) => {
  if (operation === "create" || operation === "update") {
    // @ts-ignore
    if (req.body && !req.body.publishedAt) {
      const now = new Date();
      return {
        ...data,
        publishedAt: now,
      };
    }
  }

  return data;
};
