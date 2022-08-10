function createToastify(msg, type=null) {
    let className = null;
    if(type === "error") {
        className = "toast-danger";
    } if (type === "succes") {
        className = "toast-succes";
    }

    Toastify({
        text: msg, 
        duration: 3000,
        className: className,
        offset: {
            y:100
        }
    }).showToast();
}