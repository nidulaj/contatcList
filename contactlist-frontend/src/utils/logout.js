import Swal from "sweetalert2";
export function handleLogout(navigate) {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("theme")
  console.log(localStorage.getItem("theme"))

  Swal.fire({
          title: "Success!",
          text: "You are logged out successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

  navigate("/");
}