import { apiSlice } from "../api/apiSlice"


export const layoutApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHeroData: builder.query({
            query: (type) => ({
                url: `process.env.PUBLIC_URIget-layout/${type}`,
                method: "GET",
                credentials: "include"
            })
        }),
        editLayout: builder.mutation({
            query: ({ type, image, title, subTitle, faq, categories }) => ({
                url: `process.env.PUBLIC_URIedit-layout`,
                body: {
                    type,
                    image,
                    title,
                    subTitle,
                    faq,
                    categories
                },
                method: "PUT",
                credentials: "include"
            })
        }),
    })
});

export const { useGetHeroDataQuery, useEditLayoutMutation } = layoutApi;