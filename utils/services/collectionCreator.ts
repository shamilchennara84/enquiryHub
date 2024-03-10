export const usersCollectionSchema = {
  name: "users",
  fields: [
    { name: "id", type: "string" as const },
    { name: "type", type: "string" as const, facet: true },
    { name: "first_name", type: "string" as const },
    { name: "last_name", type: "string" as const },
    { name: "email", type: "string" as const },
    { name: "profile_id", type: "string" as const },
    { name: "created_date", type: "int64" as const },
    { name: "updated_date", type: "int64" as const },
  ],
  default_sorting_field: "created_date", 
};

export const profilesCollectionSchema = {
  name: "profiles",
  fields: [
    { name: "id", type: "string" as const },
    { name: "user_id", type: "string" as const, facet: true },
    { name: "profile_info", type: "string" as const },
    { name: "created_date", type: "int64" as const },
    { name: "updated_date", type: "int64" as const },
  ],
  default_sorting_field: "created_date",
};

export const enquiriesCollectionSchema = {
  name: "enquiries",
  fields: [
    { name: "id", type: "string" as const },
    { name: "createdBy", type: "string" as const, facet: true },
    { name: "teams", type: "string[]" as const },
    { name: "created_date", type: "int64" as const },
    { name: "updated_date", type: "int64" as const },
  ],
  default_sorting_field: "created_date",
};
