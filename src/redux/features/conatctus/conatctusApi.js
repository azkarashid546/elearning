import { apiSlice } from "../api/apiSlice";

export const contactusApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContactUs: builder.mutation({
      query: ({ firstName, lastName, email, phone, country, message }) => ({
        url: "https://elearningbackend-nine.vercel.app/contact-us",
        method: "POST",
        body: { firstName, lastName, email, phone, country, message },
        credentials: "include",
      }),
    }),
    getAllContactUs: builder.query({
      query: () => ({
        url: "https://elearningbackend-nine.vercel.app/get-all-contacts",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreateContactUsMutation, useGetAllContactUsQuery } = contactusApi;
