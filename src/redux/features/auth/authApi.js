import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegisteration } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "https://elearningbackend-nine.vercel.app/registeration",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegisteration({
                            token: result.data.activationToken
                        })
                    )
                } catch (error) {
                    console.error(error)
                }
            }
        }),
        activation: builder.mutation({
            query: ({ activationCode, token }) => ({
                url: "https://elearningbackend-nine.vercel.app/activate-user",
                method: "POST",
                body: {
                    activationCode,
                    token
                }
            })
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "https://elearningbackend-nine.vercel.app/login-user",
                method: "POST",
                body: {
                    email,
                    password
                },
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
                } catch (error) {
                    console.error(error)
                }
            }
        }),
        socialAuth: builder.mutation({
            query: ({ email, name, avatar }) => ({
                url: "https://elearningbackend-nine.vercel.app/social-auth",
                method: "POST",
                body: {
                    email,
                    name,
                    avatar
                },
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
                } catch (error) {
                    console.error(error)
                }
            }
        }),
        logOut: builder.query({
            query: () => ({
                url: "https://elearningbackend-nine.vercel.app/logout-user",
                method: "GET",

                credentials: "include"
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {

                    dispatch(
                        userLoggedOut()
                    )
                } catch (error) {
                    console.error(error)
                }
            }
        })
    })
})


export const { useRegisterMutation, useActivationMutation, useLoginMutation, useLogOutQuery } = authApi