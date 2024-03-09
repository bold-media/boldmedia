import nestedDocs from "@payloadcms/plugin-nested-docs";

export const PayloadPluginNestedDocs = () =>
  nestedDocs({
    parentFieldSlug: "parent",
    collections: ["pages"],
    generateLabel: (_, doc) => doc?.title as string,
    generateURL: (docs) =>
      docs.reduce((url, doc) => `${url}/${doc.slug}`.replace(/^\/+/, "/"), ""),
  });
