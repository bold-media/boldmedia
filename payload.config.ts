import path from "path";

import { lexicalEditor } from "@payloadcms/richtext-lexical";

import { postgresAdapter } from "@payloadcms/db-postgres";

import { buildConfig } from "payload/config";
import sharp from "sharp";
import { fileURLToPath } from "url";

import Users from "@/payload/collections/Users";
import { Pages } from "@/payload/collections/Pages";

import { PayloadPluginNestedDocs } from "@/payload/plugins/PayloadPluginNestedDocs";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  localization: {
    locales: [
      {
        label: {
          en: "Russian",
          ru: "Русский",
        },
        code: "ru",
      },
      {
        label: {
          en: "English",
          ru: "Английский",
        },
        code: "en",
      },
    ],
    defaultLocale: "ru",
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "super-secret-characters",
  collections: [Pages, Users],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI || "",
    },
  }),
  sharp,
  plugins: [PayloadPluginNestedDocs()],
});
