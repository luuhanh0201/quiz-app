import Swal from "sweetalert2";


export const alertSuccess = async (mess, timer = 2000) => {
    await Swal.fire({
        icon: "success",
        title: mess,
        timer: timer,
        showConfirmButton: false,
    });
};
export const alertPending = async (mess) => {
    await Swal.fire({
        icon: "pending",
        title: mess,
        timer: 1000,
        showConfirmButton: false,
    });
};
