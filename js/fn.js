window.openHelp = function (id) {
    const modal = new bootstrap.Modal(document.getElementById(`${id}modal`));
    modal.show();
};

window.completeModule = function (id) {

    const element_repeat = document.querySelector(`#${id}modal-repeat`);
    const element_complete = document.querySelector(`#${id}modal-complete`);
    const element_kube = document.querySelector(`#${id}-kube`);
    const element_text = document.querySelector(`#${id}-text`);

    element_repeat.style["display"] = "";
    element_complete.style["display"] = "none";
    element_text.style["textDecoration"] = "line-through";
    element_kube.setAttribute("stroke", "#36393d");
    element_kube.setAttribute("fill", "#b3b3b3");

};

window.repeatModule = function (id) {

    const element_repeat = document.querySelector(`#${id}modal-repeat`);
    const element_complete = document.querySelector(`#${id}modal-complete`);
    const element_kube = document.querySelector(`#${id}-kube`);
    const element_text = document.querySelector(`#${id}-text`);

    element_complete.style["display"] = "";
    element_repeat.style["display"] = "none";
    element_text.style["textDecoration"] = "none";
    element_kube.setAttribute("stroke", element_kube.getAttribute("_stroke"));
    element_kube.setAttribute("fill", element_kube.getAttribute("_fill"));

};