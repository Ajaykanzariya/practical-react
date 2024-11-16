import Swal from "sweetalert2";

// Function to display error alerts
export const sweetAlertError = (message: string) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
};
