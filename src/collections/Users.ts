import type { CollectionConfig } from "payload";

/** Admin users for the Payload dashboard. */
export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    // Email and password are added by the auth config above.
  ],
};
