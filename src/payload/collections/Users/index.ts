import type { CollectionConfig } from "payload/types";
import { checkRole } from "./checkRole";
import adminsAndUser from "./access/adminsAndUser";
import { admins } from "@/payload/access/admins";
import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";

const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email"],
  },
  access: {
    read: adminsAndUser,
    create: admins,
    update: adminsAndUser,
    delete: admins,
    admin: ({ user }) => checkRole(["admin"], user),
  },
  hooks: {},
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      defaultValue: ["user"],
      options: [
        {
          label: "admin",
          value: "admin",
        },
        {
          label: "user",
          value: "user",
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
  ],
  timestamps: true,
};

export default Users;
