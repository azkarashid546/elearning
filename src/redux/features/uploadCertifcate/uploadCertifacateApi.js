import { apiSlice } from "../api/apiSlice";

export const uploadCertifcateApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadCertificate: builder.mutation({
            query: (formData) => ({
                // const formData = new FormData();
                // formData.append('userId', userId);
                // formData.append('courseId', courseId);
                // formData.append('certificate', certificate);
                url: 'process.env.PUBLIC_URIupload-certificate',
                method: 'POST',
                body: formData,
                credentials: "include"

            }),
        }),
    }),
});

export const {
    useUploadCertificateMutation
} = uploadCertifcateApi;


