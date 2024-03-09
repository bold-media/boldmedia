import { admins } from "@/payload/access/admins";
import { adminsOrPublished } from "@/payload/access/adminsOrPublished";
import { fullTitle } from "@/payload/fields/fullTitle";
import { slug } from "@/payload/fields/slug";
import { populatePublishedAt } from "@/payload/hooks/populatePublishedAt";
import type { CollectionConfig } from "payload/types";
import createParentField from "@payloadcms/plugin-nested-docs/dist/fields/parent";

export const Pages: CollectionConfig = {
  slug: "pages",
  // admin: {
  //   useAsTitle: "fullTitle",
  //   defaultColumns: ["title", "fullTitle", "pathname", "updatedAt", "status"],
  // },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  access: {
    read: adminsOrPublished,
    update: admins,
    create: admins,
    delete: admins,
  },
  // hooks: {
  //   beforeChange: [populatePublishedAt],
  // },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      label: {
        en: "Title",
        ru: "Заголовок",
      },
    },
    {
      name: "test",
      type: "text",
    },
    fullTitle,
    {
      name: "publishedDate",
      type: "date",
      label: {
        en: "Published Date",
        ru: "Дата публикации",
      },
      admin: {
        position: "sidebar",
      },
    },
    slug(),
    {
      name: "defaultPathname",
      type: "text",
      unique: true,
      index: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "pathname",
      type: "text",
      localized: true,
      unique: true,
      index: true,
      label: {
        en: "Pathname",
        ru: "Pathname",
      },
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    /**
     * Cannot be used yet;
     * waiting for nested docs v3 support
     */
    // createParentField("pages", {
    //   name: "parent",
    // }),
  ],
};
