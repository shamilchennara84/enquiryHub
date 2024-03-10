import initializeTypesenseClient from "./typesenseClient";

const sortingOptions = {
  created_date_asc: "created_date:asc",
  created_date_desc: "created_date:desc",
  first_name_asc: "first_name:asc",
  first_name_desc: "first_name:desc",
};

export async function getUserProfileAndEnquiries(
  userId: string,
  sortOptionKey: keyof typeof sortingOptions,
  searchQuery: string,
) {
  const sortOption = sortingOptions[sortOptionKey];
  const client = await initializeTypesenseClient();
  const userProfile = await client
    .collections("profiles")
    .documents()
    .search({
      q: `user_id:${userId} AND ${searchQuery}`,
      query_by: "user_id",
      sort_by: sortOption,
    });

  // const userEnquiries = await client
  //   .collections("enquiries")
  //   .documents()
  //   .search({
  //     q: `createdBy:${userId} AND ${searchQuery}`,
  //     query_by: "createdBy",
  //     sort_by: sortOption,
  //   });

  return {
    profile: userProfile,
    // enquiries: userEnquiries,
  };
}
