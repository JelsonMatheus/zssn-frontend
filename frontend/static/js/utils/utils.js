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

function filterEmptyValue(obj) {
    return Object.entries(obj).filter(([_, v]) => v != '')
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}

function isAllEmptyItems(Items) {
    return Object.values(Items).every(x => (x === 0 || x === ''));
}
