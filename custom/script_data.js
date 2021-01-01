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
        $('html, body').animate({scrollTop: $(this.hash).offset().top - 80}, 800);
        return false;
    });

}

function carica_titoli_home(data) {
    console.log(data.home.titoli_home);
    let html = '';

    data.home.titoli_home.forEach(function (item) {
        console.log(item.titolo);

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
    let html = '';
    var conteniore_paragrafo = document.getElementById("paragrafo");
    console.log(data);

    data.home.quantita_X.forEach(function (item, index) {

        html += `<div class="col-md-4 project">
                    <h3 id="counter${index}">${item.numero}</h3>
                    <h4>${item.titolo}</h4>
                    <p>${item.testo}</p>
                </div>`;

        conteniore_paragrafo.innerHTML = html;

    })

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















