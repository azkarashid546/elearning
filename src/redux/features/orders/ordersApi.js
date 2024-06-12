import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "process.env.PUBLIC_URIget-orders",
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllOrdersInstructor: builder.query({
      query: () => ({
        url: "process.env.PUBLIC_URIget-all-orders-instructor",
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
        url: "process.env.PUBLIC_URIpayment/stripepublishablekey",
        method: "GET",
        credentials: "include",
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: "process.env.PUBLIC_URIpayment",
        method: "POST",
        body: {
          amount,
        },
        credentials: "include",
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
        url: "process.env.PUBLIC_URIcreate-order",
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
