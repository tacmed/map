window._selected_hash = "";
window._selected_id = "";
window._status_module = {};

window.openHelp = function (hash, id) {

    window._selected_hash = hash;
    window._selected_id = id;

    if (window._status_module[hash] === undefined) {
        window._status_module[hash] = {
            id: id,
            complete: false 
        };    
    }

    const element_repeat = document.querySelector("#modal-window_repeat-button");
    const element_complete = document.querySelector("#modal-window_complete-button");
    const module_status = window._status_module[hash];
    
    window._status_module[hash].id = id;

    if (module_status.complete === true) {
        element_repeat.style["display"] = "";
        element_complete.style["display"] = "none";
    } else {
        element_complete.style["display"] = "";
        element_repeat.style["display"] = "none";
    }      

    fetch(`modals/${hash}.html`).then((response) => {

        response.text().then( (data) => {
            (document.querySelector("#modal-window_modal-body")).innerHTML = data;
            const modal = new bootstrap.Modal(document.getElementById("modal-window"));
            modal.show();
        }).catch((error) => {
            console.error(error);
        });

    }).catch((error) => {
        console.error(error);
    });

};

window.completeModule = function () {

    window._status_module[window._selected_hash].complete = true;

    const element_repeat = document.querySelector("#modal-window_repeat-button");
    const element_complete = document.querySelector("#modal-window_complete-button");
    const element_kube = document.querySelector(`#${window._selected_id}-kube`);
    const element_text = document.querySelector(`#${window._selected_id}-text`);

    element_repeat.style["display"] = "";
    element_complete.style["display"] = "none";
    element_text.style["textDecoration"] = "line-through";
    element_kube.setAttribute("stroke", "#36393d");
    element_kube.setAttribute("fill", "#b3b3b3");

};

window.repeatModule = function () {

    window._status_module[window._selected_hash].complete = false;

    const element_repeat = document.querySelector("#modal-window_repeat-button");
    const element_complete = document.querySelector("#modal-window_complete-button");
    const element_kube = document.querySelector(`#${window._selected_id}-kube`);
    const element_text = document.querySelector(`#${window._selected_id}-text`);

    element_complete.style["display"] = "";
    element_repeat.style["display"] = "none";
    element_text.style["textDecoration"] = "none";
    element_kube.setAttribute("stroke", element_kube.getAttribute("_stroke"));
    element_kube.setAttribute("fill", element_kube.getAttribute("_fill"));

};