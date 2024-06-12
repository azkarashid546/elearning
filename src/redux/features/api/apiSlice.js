import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { userLoggedIn } from "../auth/authSlice";


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.PUBLIC_URI

    }),
    endpoints: (builder) => ({
        refreshToken: builder.query({
            query: (data) => ({
                url: "process.env.PUBLIC_URIrefreshtoken",
                method: "GET",
                credentials: "include"
            })
        }),
        loadUser: builder.query({
            query: (data) => ({
                url: "process.env.PUBLIC_URIme",
                method: "GET",
                credentials: "include"
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    )
                    console.log(result.data.user)
                } catch (error) {
                    console.error(error)
                }
            }
        })

    })

})


export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice
