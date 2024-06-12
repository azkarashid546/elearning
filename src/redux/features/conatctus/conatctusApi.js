import { apiSlice } from "../api/apiSlice";

export const contactusApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContactUs: builder.mutation({
      query: ({ firstName, lastName, email, phone, country, message }) => ({
        url: "process.env.PUBLIC_URIcontact-us",
        method: "POST",
        body: { firstName, lastName, email, phone, country, message },
        credentials: "include",
      }),
    }),
    getAllContactUs: builder.query({
      query: () => ({
        url: "process.env.PUBLIC_URIget-all-contacts",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreateContactUsMutation, useGetAllContactUsQuery } = contactusApi;
