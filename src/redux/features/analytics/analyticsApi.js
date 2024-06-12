import { apiSlice } from "../api/apiSlice"

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCoursesAnalytics: builder.query({
            query: () => ({
                url: "process.env.PUBLIC_URIget-courses-analytics",
                method: "GET",
                credentials: "include"
            }),

        }),
        getUsersAnalytics: builder.query({
            query: () => ({
                url: "process.env.PUBLIC_URIget-users-analytics",
                method: "GET",
                credentials: "include"
            }),

        }),
        getOrdersAnalytics: builder.query({
            query: () => ({
                url: "process.env.PUBLIC_URIget-order-analytics",
                method: "GET",
                credentials: "include"
            }),

        })
    })
})

export const { useGetCoursesAnalyticsQuery, useGetUsersAnalyticsQuery, useGetOrdersAnalyticsQuery } = analyticsApi