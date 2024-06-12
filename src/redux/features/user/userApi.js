import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "https://elearningbackend-nine.vercel.app/updateprofilepicture",
        method: "PUT",
        body: { avatar },
        credentials: "include",
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name }) => ({
        url: "https://elearningbackend-nine.vercel.app/updateuser",
        method: "PUT",
        body: { name },
        credentials: "include",
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "https://elearningbackend-nine.vercel.app/updatepassword",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include",
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "https://elearningbackend-nine.vercel.app/get-users",
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllUsersInstructor: builder.query({
      query: () => ({
        url: "https://elearningbackend-nine.vercel.app/get-users-instructor",
        method: "GET",
        credentials: "include",
      }),
    }),
    // getAllUsersInstructor: builder.query({
    //   query: () => ({
    //     url: process.env.PUBLIC_URI+"/get-users-instructor",
    //     method: "GET",
    //     credentials: "include",
    //   }),
    // }),

    updateUserRole: builder.mutation({
      query: ({ email, role }) => ({
        url: "https://elearningbackend-nine.vercel.app/update-user-role",
        method: "PUT",
        body: { email, role },
        credentials: "include",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `process.env.PUBLIC_URIdelete-user/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getUserCourseDataCompletionProgress: builder.query({
      query: ({ userId, courseId }) => ({
        url: `process.env.PUBLIC_URIget-user-complete-course?userId=${userId}&courseId=${courseId}`, // Pass userId and courseId as query parameters
        method: "GET",
        credentials: "include",
      }),
    }),
    updateCourseProgress: builder.mutation({
      query: ({ courseId, videoId, progress }) => ({
        url: 'update-course-progress',
        method: 'POST',
        body: { courseId, videoId, progress }, // Pass courseId, videoId, and progress in the request body
        credentials: 'include',
      }),
    }),


  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useGetUserCourseDataCompletionProgressQuery,
  useGetAllUsersInstructorQuery,
  useUpdateCourseProgressMutation,
} = userApi;
