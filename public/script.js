window.addEventListener('message', receiveMessage);

function receiveMessage(event) {
    var data = JSON.parse(event.data);

    switch (data.type) {
        case 'heightChange':
            document.getElementById('connectionId').style.height = data.payload.height + 'px';
            break;
        case 'connectionStatusChange':
            document.getElementById('statusId').innerText = data.payload.connected ? 'Active' : 'Inactive';
            document.getElementById('statusId').classList.toggle('status_active', data.payload.connected);
            break;
        case 'error':
            console.log(data.payload.message);
    }
}