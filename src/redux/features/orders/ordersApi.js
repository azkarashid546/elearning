import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "https://elearningbackend-nine.vercel.app/get-orders",
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllOrdersInstructor: builder.query({
      query: () => ({
        url: "https://elearningbackend-nine.vercel.app/get-all-orders-instructor",
        method: "GET",
        credentials: "include",
      }),
    }),
    getUserOrdersForCourse: builder.query({
      query: () => ({
        url: 'process.env.PUBLIC_URIget-user-order-details',
        method: 'GET',
        credentials: 'include', // Ensure the backend supports credentials if used
      }),
    }),
    getStripePublishableKey: builder.query({
      query: () => ({
        url: "https://elearningbackend-nine.vercel.app/payment/stripepublishablekey",
        method: "GET",
        credentials: "include",
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: "https://elearningbackend-nine.vercel.app/payment",
        method: "POST",
        body: {
          amount,
        },
        credentials: "include",
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
        url: "https://elearningbackend-nine.vercel.app/create-order",
        method: "POST",
        body: {
          courseId,
          payment_info,
        },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
  useCreateOrderMutation,
  useGetUserOrdersForCourseQuery,
  useGetAllOrdersInstructorQuery,
} = ordersApi;
