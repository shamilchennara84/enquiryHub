export async function createUsersCollection() {
  return {
    name: "users",
    fields: [
      { name: "id", type: "string" },
      { name: "type", type: "string", facet: true },
      { name: "first_name", type: "string" },
      { name: "last_name", type: "string" },
      { name: "email", type: "string" },
      { name: "profile_id", type: "string" },
      { name: "created_date", type: "int64" },
      { name: "updated_date", type: "int64" },
    ],
    default_sorting_field: "first_name",
  };
}

export async function createProfilesCollection() {
  return {
    name: "profiles",
    fields: [
      { name: "id", type: "string" },
      { name: "user_id", type: "string", facet: true },
      { name: "profile_info", type: "string" },
      { name: "created_date", type: "int64" },
      { name: "updated_date", type: "int64" },
    ],
    default_sorting_field: "created_date",
  };
}
export async function createEnquiriesCollection() {
  return {
    name: "enquiries",
    fields: [
      { name: "id", type: "string" },
      { name: "createdBy", type: "string", facet: true },
      { name: "teams", type: "string[]" },
      { name: "createdDate", type: "int64" },
      { name: "updatedDate", type: "int64" },
    ],
    default_sorting_field: "createdBy",
  };
}
