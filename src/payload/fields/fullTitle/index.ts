import type { Field } from "payload/types";

import populateFullTitle from "./populateFullTitle";

export const fullTitle: Field = {
  name: "fullTitle",
  type: "text",
  localized: true,
  hooks: {
    beforeChange: [populateFullTitle],
  },
  admin: {
    components: {
      Field: () => null,
    },
  },
};
