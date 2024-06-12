import { apiSlice } from "../api/apiSlice";

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: () => ({
        url: process.env.PUBLIC_URI + "get-all-notifications",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateNotificationStatus: builder.mutation({
      query: (id) => ({
        url: `process.env.PUBLIC_URIupdate-notification/${id}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    getAllNotificationInstructor: builder.query({
      query: () => ({
        url: process.env.PUBLIC_URI + "get-all-notifications-instructor",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateNotificationStatusInstructor: builder.mutation({
      query: (id) => ({
        url: `process.env.PUBLIC_URIupdate-notification-instructor/${id}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllNotificationQuery,
  useUpdateNotificationStatusMutation,
  useGetAllNotificationInstructorQuery,
  useUpdateNotificationStatusInstructorMutation,
} = notificationsApi;
