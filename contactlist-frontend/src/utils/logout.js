import Swal from "sweetalert2";
import { authFetch } from "./authFetch";
import { API_URL } from "../utils/api";

export async function handleLogout(navigate) {

  
  try{
    await authFetch({
        method: "post",
        url: `${API_URL}/auth/logout`,
      });

      navigate("/");

      Swal.fire({
          title: "Success!",
          text: "You are logged out successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
  } catch(err){
    console.error("Logout failed:", err);
    Swal.fire({
          title: "Error!",
          text: "Oops! Something went wrong.",
          icon: "error",
          confirmButtonText: "OK",
  })
  }

}