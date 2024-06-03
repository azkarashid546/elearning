import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetAllCoursesByUserQuery } from "../../redux/features/courses/coursesApi";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useGetAllOrdersQuery, useGetUserOrdersForCourseQuery } from "../../redux/features/orders/ordersApi";


const EnrollUserCourses = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);
  const { data, isLoading, isSuccess, error } = useGetAllCoursesByUserQuery();
  console.log("data", data);
  const courses = data?.courses || [];
  console.log("courses", courses)

  const columns = [
      { field: "id", headerName: "ID", flex: 0.5 },
      { field: "name", headerName: "Course Title", flex: 1 },
      { field: "categories", headerName: "Course Category", flex: 1 },
      { field: "price", headerName: "Price", flex: 1 },
  ];

  const rows = [];
  // Check if courses is an array of arrays
  if (Array.isArray(courses)) {
      courses.forEach((courseGroup, index) => {
          // Check if courseGroup is an array
          if (Array.isArray(courseGroup)) {
              courseGroup.forEach((course, innerIndex) => {
                  rows.push({
                      id: index * courses.length + innerIndex + 1, // Generate unique ID using index, starting from 1
                      name: course.name,
                      categories : course.categories,
                      price : `${course.price}$`,
                  });
              });
          } else {
              // If courseGroup is not an array, push it directly
              rows.push({
                  id: index + 1, // Starting from 1
                  name: courseGroup.name,
                  categories : courseGroup.categories,
                  price : `${courseGroup.price}$`,
              });
          }
      });
  } else {
      // If courses is not an array, push it directly
      rows.push({
          id: 1, // Starting from 1
          name: courses.name,
          categories : courses.categories,
          price : `${courses.price}$`,
      });
  }

  console.log("rows", rows);

  return (
      <>
          <div style={{ marginTop: "0px" }}>
              <Toaster />
              {isLoading ? (
                  <Loader />
              ) : (
                  <Box m="20px">
                  <Box
                    m="10px 0 0 0"
                    height="88vh"
                    sx={{
                      "& .MuiDataGrid-root": {
                        border: "none",
                        outline: "none",
                      },
                      "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                        color: "white",
                      },
                      "& .MuiDataGrid-sortIcon": {
                        color: "white",
                      },
                      "& .MuiDataGrid-row": {
                        color: "white",
                        borderBottom: "1px solid white",
                      },
                      "& .MuiTablePagination-root": {
                        color: "white",
                      },
                      "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                      },
                      "& .name-column--cell": {
                        color: "white",
                      },
                      "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "#0E2238",
                        borderBottom: "none",
                        color: "white",
                      },
                      "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "#1F2A40",
                      },
                      "& .MuiDataGrid-footerContainer": {
                        color: "white",
                        borderTop: "none",
                        backgroundColor: "#0E2238",
                      },
                      "& .MuiCheckbox-root": {
                        color: "#b7ebde",
                      },
                      "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: "white",
                      },
                    }}
                  >
                    <DataGrid
                      checkboxSelection
                      rows={rows}
                      columns={columns}
                    />
                  </Box>
                </Box>
              )}
          </div>
      </>
  );
};

export default EnrollUserCourses;



