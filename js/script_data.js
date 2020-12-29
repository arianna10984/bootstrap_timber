//console.log("ciao desde script_data.js");

function caricaJSON() {

    fetch('js/dati_lab.json')
        .then((res) => {
            //console.log(res);
            return res.json()
        })
        .then(data => {
            console.log(data.titoli_a_principali);

            let html = '';
            data.titoli_a_principali.forEach(function (titolo) {
                html += `
            <li><a href="#${titolo.titolo}">${titolo.titolo}</a></li>
            `;
            })
            document.getElementById('menu').innerHTML = html;
        })
        .catch(error => console.log(error));
}

caricaJSON();