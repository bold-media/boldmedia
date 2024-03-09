import { checkRole } from "../collections/Users/checkRole";
// import type { User } from "../../../payload-types";
import { AccessArgs } from "payload/types";

// type isAdmin = (args: AccessArgs<unknown, User>) => boolean;
type isAdmin = (args: AccessArgs<unknown, any>) => boolean;

export const admins: isAdmin = ({ req: { user } }) => {
  return checkRole(["admin"], user);
};
