import { apiSlice } from "../apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
    }),
  }),
});

export const { useGetTasksQuery } = taskApi;
