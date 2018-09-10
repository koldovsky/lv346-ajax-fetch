document.querySelector('.time-loaded').innerText 
 = (new Date()).toLocaleTimeString(); 


document.querySelector('.html .get').addEventListener('click', getHtmlData);
function getHtmlData() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector('.html .container').innerHTML 
                = xhr.responseText;
        }
    }
    xhr.open('GET', 'data.html?r='+Math.random(), true);
    xhr.send();
}

document.querySelector('.html .fetch').addEventListener('click', fetchHtmlData);
function fetchHtmlData() {
    fetch('data.html')
        .then( data => data.text() )
        .then( html => document.querySelector('.html .container').innerHTML = html )
}

document.querySelector('.json .get').addEventListener('click', getJsonData);
function getJsonData() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const clientData = JSON.parse(xhr.responseText);
            document.querySelector('.json .container .name')
                .innerText = clientData.name;
            document.querySelector('.json .container .balance')
                .innerText = clientData.balance;
        }
        if (xhr.readyState === 4 && xhr.status !== 200 ) {
            console.error('Error occured: ' + xhr.status);
        }
    }
    xhr.open('GET', 'no-data.json?r='+Math.random(), true);
    xhr.send();
}

document.querySelector('.json .fetch').addEventListener('click', fetchJsonData);
function fetchJsonData() {
    fetch('no-data.json')
        .then( data => data.json() )
        .then( clientData => {
            document.querySelector('.json .container .name')
                .innerText = clientData.name;
            document.querySelector('.json .container .balance')
                .innerText = clientData.balance;
        })
        .catch( error => console.error('Error'))
}

document.querySelector('.form input[type="submit"]').addEventListener('click', sendFormAjax);
function sendFormAjax(ev) {
    if (document.querySelector('.form form').checkValidity()) {
        ev.preventDefault();
        $.ajax({
            url: "https://formspree.io/FORM_ID", 
            method: "POST",
            // data: {
            //     name: $('.form input[name="name"]').val,
            //     email: $('.form input[email="email"').val
            // },
            data: $('.form form').serializeArray(),
            dataType: "json"
        });   
    }
}
