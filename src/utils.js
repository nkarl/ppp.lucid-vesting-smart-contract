
export function removeChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
}

export function addCell(tr, content, copyEnabled = false) {
    const td = document.createElement('td');
    tr.appendChild(td);

    if (copyEnabled) {
        const node = document.createElement("p");
        td.appendChild(node);
        const uid = "uid_" + String(Math.random()).slice(2);
        node.setAttribute("id", uid);

        node.appendChild(document.createTextNode(content));
        node.addEventListener(
            "click",
            () => navigator.clipboard.writeText(document.getElementById(uid).firstChild.textContent)
        );
    } else {
        td.appendChild(document.createTextNode(content));
    }
}

