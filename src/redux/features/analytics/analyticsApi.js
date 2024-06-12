import { apiSlice } from "../api/apiSlice"

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCoursesAnalytics: builder.query({
            query: () => ({
                url: "https://elearningbackend-nine.vercel.app/get-courses-analytics",
                method: "GET",
                credentials: "include"
            }),

        }),
        getUsersAnalytics: builder.query({
            query: () => ({
                url: "https://elearningbackend-nine.vercel.app/get-users-analytics",
                method: "GET",
                credentials: "include"
            }),

        }),
        getOrdersAnalytics: builder.query({
            query: () => ({
                url: "https://elearningbackend-nine.vercel.app/get-order-analytics",
                method: "GET",
                credentials: "include"
            }),

        })
    })
})

export const { useGetCoursesAnalyticsQuery, useGetUsersAnalyticsQuery, useGetOrdersAnalyticsQuery } = analyticsApi