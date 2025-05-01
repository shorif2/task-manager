import { apiSlice } from "../apiSlice";
import { setProjects } from "../filters/filterSlice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProject: builder.query({
      query: () => "/projects",
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const projects = result.data.map((project) => project.projectName);
          dispatch(setProjects(projects));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
export const { useGetProjectQuery } = projectApi;
