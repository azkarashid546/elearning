import { Box, Button, Modal } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDeleteCourseMutation, useGetAllCoursesInstructorQuery, useGetAllCoursesQuery } from '../../../redux/features/courses/coursesApi';
import Loader from '../../../components/Loader/Loader';
import { format } from 'timeago.js';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AllCourses = () => {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState('');
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation();
  const { isLoading, data, refetch } = useGetAllCoursesInstructorQuery({}, { refetchOnMountOrArgChange: true });

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: 'Course Title', flex: 1 },
    { field: 'ratings', headerName: 'Ratings', flex: 0.5 },
    { field: 'purchased', headerName: 'Purchased', flex: 0.5 },
    { field: 'createdAt', headerName: 'Created At', flex: 0.5 },
    {
      field: "  ",
      headerName: 'Edit',
      flex: 0.2,
      renderCell: (params) => {
        return (
          <Link to={`/admin/edit-course/${params.row.id}`}>
            <i className="fa-solid fa-pencil text-white" size={20}></i>
          </Link>
        );
      },
    },
    {
      field: " ",
      headerName: 'Delete',
      flex: 0.2,
      renderCell: (params) => {
        return (
          <Button>
            <i
              className="fa-solid fa-trash text-white"
              size={20}
              onClick={() => {
                setOpen(true);
                setCourseId(params.row.id);
              }}
            ></i>
          </Button>
        );
      },
    },
  ];

  const rows = [];
  if (data && data.courses) {
    data.courses.forEach((item, index) => {
      rows.push({
        id: index + 1,
        name: item.name,
        ratings: item.ratings,
        purchased: item.purchased,
        createdAt: format(item.createdAt),
      });
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success('Course deleted successfully!');
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, error, refetch]);

  const handleDelete = async () => {
    const id = courseId
    await deleteCourse(id);
  };

  return (
    <>
      <div style={{ marginTop: '120px' }}>
        <Toaster />
        {isLoading ? (
          <Loader />
        ) : (
          <Box m="20px">
            <Box
              m="10px 0 0 0"
              height="88vh"
              sx={{
                '& .MuiDataGrid-root': {
                  border: 'none',
                  outline: 'none',
                },
                '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
                  color: 'white',
                },
                '& .MuiDataGrid-sortIcon': {
                  color: 'white',
                },
                '& .MuiDataGrid-row': {
                  color: 'white',
                  borderBottom: '1px solid white',
                },
                '& .MuiTablePagination-root': {
                  color: 'white',
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: 'none',
                },
                '& .name-column--cell': {
                  color: 'white',
                },
                '& .MuiDataGrid-columnHeader': {
                  backgroundColor: '#0E2238',
                  borderBottom: 'none',
                  color: 'white',
                },
                '& .MuiDataGrid-virtualScroller': {
                  backgroundColor: '#1F2A40',
                },
                '& .MuiDataGrid-footerContainer': {
                  color: 'white',
                  borderTop: 'none',
                  backgroundColor: '#0E2238',
                },
                '& .MuiCheckbox-root': {
                  color: '#b7ebde',
                },
                '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                  color: 'white',
                },
              }}
            >
              <DataGrid checkboxSelection rows={rows} columns={columns} />
            </Box>
            {open && (
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  className="position-absolute top-50 start-50 translate-middle rounded-2 shadow p-4"
                  style={{
                    width: '450px',
                    outline: 'none',
                    backgroundColor: '#7f8284',
                  }}
                >
                  <h1 className="text-white text-center" style={{ fontSize: '33px' }}>
                    Are you sure to delete this course?
                  </h1>
                  <div className="d-flex w-100 align-items-center justify-content-between gap-2 mb-6 mt-4">
                    <div
                      className="btn btn-primary"
                      style={{ borderRadius: '50px', width: '120px' }}
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </div>
                    <div
                      className="btn btn-danger"
                      style={{ borderRadius: '50px', width: '120px' }}
                      onClick={handleDelete}
                    >
                      Delete
                    </div>
                  </div>
                </Box>
              </Modal>
            )}
          </Box>
        )}
      </div>
    </>
  );
};

export default AllCourses;
