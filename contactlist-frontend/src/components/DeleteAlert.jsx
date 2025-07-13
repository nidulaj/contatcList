// src/components/DeleteButton.jsx
import React from 'react';
import Swal from 'sweetalert2';

export default function DeleteAlert(props) {
  const handleDeleteFunction = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: 'Deleted!',
          text: 'Your contact has been deleted.',
          icon: 'success'
        });
        props.handleDelete()
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: 'Cancelled',
          text: 'Your imaginary contact is safe :)',
          icon: 'error'
        });
      }
    });
  };

  return (
    <button className="btn btn-warning" onClick={handleDeleteFunction}>
      Delete Contact
    </button>
  );
}


