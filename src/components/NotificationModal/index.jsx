import Swal from "sweetalert2";


export const alertSuccess = async (mess, callback) => {
    await Swal.fire({
        icon: "success",
        title: mess,
        timer: 2000,
        showConfirmButton: false,
        callback: callback,
    });

    if (typeof callback === "function") callback();
};
