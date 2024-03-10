export const usersCollectionSchema = {
  name: "users",
  fields: [
    { name: "_id", type: "string" as const },
    { name: "type", type: "string" as const, facet: true },
    { name: "first_name", type: "string" as const },
    { name: "last_name", type: "string" as const },
    { name: "email", type: "string" as const },
    { name: "profile_id", type: "string" as const,"optional": true },
    { name: "createdAt", type: "int64" as const },
    { name: "updatedAt", type: "int64" as const },
  ],
  default_sorting_field: "createdAt",
};

export const profilesCollectionSchema = {
  name: "profiles",
  fields: [
    { name: "_id", type: "string" as const },
    { name: "user_Id", type: "string" as const, facet: true },
    { name: "profile_info", type: "string" as const },
    { name: "createdAt", type: "int64" as const },
    { name: "updatedAt", type: "int64" as const },
  ],
  default_sorting_field: "createdAt",
};

export const enquiriesCollectionSchema = {
  name: "enquiries",
  fields: [
    { name: "_id", type: "string" as const },
    { name: "createdBy", type: "string" as const, facet: true },
    { name: "teams", type: "string[]" as const },
    { name: "createdAt", type: "int64" as const },
    { name: "updatedAt", type: "int64" as const },
  ],
  default_sorting_field: "createdAt",
};
