//console.log("ciao desde script_data.js");

function caricaJSON() {

    fetch('custom/json/dati_lab.json')
        .then((res) => {
            //console.log(res);
            return res.json()
        })
        .then(data => {
            carica_titoli_a_principali(data);
            carica_titoli_home(data);
            caricare_paragrafi(data);
            carica_immagine(data);

        })
        .catch(error => console.log(error));
}

caricaJSON();


function carica_titoli_a_principali(data) {
    let html = '';
    data.home.titoli_a_principali.forEach(function (item) {

        if (item.titolo == "home") {
            html += `<li class="active"><a href="#${item.titolo}">${item.titolo}</a></li>`;
        } else {
            html += `<li><a href="#${item.titolo}">${item.titolo}</a></li>`;
        }
    });
    document.getElementById('menu').innerHTML = html;

    calculateScroll();
    $(window).scroll(function (event) {
        calculateScroll();
    });
    $('.navmenu ul li a').click(function () {
        $('html, body').animate({ scrollTop: $(this.hash).offset().top - 80 }, 800);
        return false;
    });

}

function carica_titoli_home(data) {
    //console.log(data.home.titoli_home);
    let html = '';

    data.home.titoli_home.forEach(function (item) {
        //console.log(item.titolo);

        var div = document.getElementById("camera_wrap_1")

        html += `<div data-thumb="" data-src="images/slides/blank.gif">
								<div class="img-responsive camera_caption fadeFromBottom">
									<h2>${item.titolo}</h2>
								</div>
				 </div>`;


        div.innerHTML = html;

        jQuery(function () {
            jQuery('#camera_wrap_1').camera({
                transPeriod: 500,
                time: 3000,
                height: '490px',
                thumbnails: false,
                pagination: true,
                playPause: false,
                loader: false,
                navigation: false,
                hover: false
            });
        });

    });
}

function caricare_paragrafi(data) {
    //console.log("caricare_paragrafi ----");

    let html = ''
    var div_padre = document.querySelector("#home > div:nth-child(3) > div > div");
    var ultimo_testo_home = data.home.ultimo_testo_home;

    console.log(data);

    var h3 = ultimo_testo_home.h3;
    var h4 = ultimo_testo_home.h4;
    //var imagen = ultimo_testo_home.img;

    html += `<h3>${h3}</h3>
    <h4>${h4}</h4>`
    div_padre.innerHTML = html;

}
function carica_immagine(data) {
    console.log("carica_immagine--------------");
    let html = ''
    var div_padre = document.querySelector("#home > div:nth-child(4) > div > div");
    var immagine_home = data.home.ultimo_testo_home.img;
     
    html += `<img>${immagine_home}</img> `
    div_padre.innerHTML = html

}
function calculateScroll() {
    var contentTop = [];
    var contentBottom = [];
    var winTop = $(window).scrollTop();
    var rangeTop = 200;
    var rangeBottom = 500;
    $('.navmenu').find('a').each(function () {
        contentTop.push($($(this).attr('href')).offset().top);
        contentBottom.push($($(this).attr('href')).offset().top + $($(this).attr('href')).height());
    })
    $.each(contentTop, function (i) {
        if (winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom) {
            $('.navmenu li')
                .removeClass('active')
                .eq(i).addClass('active');
        }
    })
}















