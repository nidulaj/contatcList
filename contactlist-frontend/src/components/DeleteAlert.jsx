import Swal from "sweetalert2";

export default function DeleteAlert(props) {
  function deleteItem() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: `Your ${props.type} has been deleted.`,
          icon: "success",
        });
        props.handleDelete();
      }
    });
  }

  return (
    <button
      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition "
      onClick={deleteItem}
    >
      Delete {props.type}
    </button>
  );
}
