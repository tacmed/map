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

    fetch(`modals/${hash}.html`).then((response) => {

        if (response.status >= 400) {
            return;
        }

        if (module_status.complete === true) {
            element_repeat.style["display"] = "";
            element_complete.style["display"] = "none";
        } else {
            element_complete.style["display"] = "";
            element_repeat.style["display"] = "none";
        } 

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

window.completeModule = function (id, hash) {

    if (id === undefined && hash === undefined) {
        hash = window._selected_hash;
        id = window._selected_id;
    }

    window._status_module[hash].complete = true;

    const element_repeat = document.querySelector("#modal-window_repeat-button");
    const element_complete = document.querySelector("#modal-window_complete-button");
    const element_kube = document.querySelector(`#${id}-kube`);
    const element_text = document.querySelector(`#${id}-text`);

    element_repeat.style["display"] = "";
    element_complete.style["display"] = "none";
    element_text.style["textDecoration"] = "line-through";
    element_kube.setAttribute("stroke", "#36393d");
    element_kube.setAttribute("fill", "#b3b3b3");

    if (localStorage !== undefined) {
        localStorage[hash] = JSON.stringify(window._status_module[hash]);
    }

};

window.repeatModule = function (id, hash) {

    if (id === undefined && hash === undefined) {
        hash = window._selected_hash;
        id = window._selected_id;
    }

    window._status_module[hash].complete = false;

    const element_repeat = document.querySelector("#modal-window_repeat-button");
    const element_complete = document.querySelector("#modal-window_complete-button");
    const element_kube = document.querySelector(`#${id}-kube`);
    const element_text = document.querySelector(`#${id}-text`);

    element_complete.style["display"] = "";
    element_repeat.style["display"] = "none";
    element_text.style["textDecoration"] = "none";
    element_kube.setAttribute("stroke", element_kube.getAttribute("_stroke"));
    element_kube.setAttribute("fill", element_kube.getAttribute("_fill"));

    if (localStorage !== undefined) {
        localStorage[hash] = JSON.stringify(window._status_module[hash]);
    }

};

document.addEventListener("DOMContentLoaded", () => {

    if (localStorage !== undefined) {
        const keys = Object.keys(localStorage);
        for (const key of keys) {
            window._status_module[key] = JSON.parse(localStorage.getItem(key));
        }
    }

    const svg_element = document.querySelector("#svg-schema");
    const container_element = document.querySelector("#container");
    const client_width = container_element.clientWidth;
    const svg_width = parseInt(svg_element.getAttribute("width").replace("px",""));
    const svg_height = parseInt(svg_element.getAttribute("height").replace("px",""));

    if (svg_width > client_width) {

        const new_svg_width = parseInt(client_width*0.90);
        const multiplier = new_svg_width/svg_width;
        const new_svg_height = parseInt(svg_height*multiplier);
        const margin_left_svg = parseInt((client_width-new_svg_width)/2);

        svg_element.setAttribute("height", `${new_svg_height}px`);
        svg_element.setAttribute("width", `${new_svg_width}px`);
        svg_element.style["margin-left"] = `${margin_left_svg}px`;

    }

    if (svg_width < client_width) {
        const margin_left_svg = parseInt((client_width-svg_width)/2);
        svg_element.style["margin-left"] = `${margin_left_svg}px`;
    }

    for (const hash in window._status_module) {
        const item = window._status_module[hash];
        if (item.complete === true) {
            completeModule(item.id, hash);
        } else {
            repeatModule(item.id, hash);
        }
    }

    svg_element.style["display"] = "block";
    
});