//console.log("ciao desde script_data.js");
caricaJSON();

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
            carica_primo_paragrafo_bs(data);
            carica_ul_opzioni(data);
            carica_portfolio_block(data);
            carica_novita(data);



        })
        .catch(error => console.log(error));
}




function carica_novita(data) {



    /*console.log("carica_novita");
    console.log("data: ", data);*/

    let html = '';
    var div_padre = document.querySelector("div#novita");
    var h3 = data.novita.introduzione.h3;
    var p = data.novita.introduzione.p;

    html += `<div id="novita">
    <div class="line4">
        <div class="container">
            <div class="row Ama">
                <div class="col-md-12">
                    <h3>${h3}</h3>
                    <p>${p}</p>
                </div>
            </div>
        </div>
    </div>`;

    data.novita.novita_consigli.forEach(function (item, index) {

        console.log("h3:", item.h3);
        console.log("index: ", index);

        if (index % 2 === 0) {
            html += `


<div class="container">
        <div class="row news">
            <div class="col-md-6  text-left">
                <img class="img-responsive picsGall" src="custom/img_novita/${item.img}"/>
                <h3><a href="#">${item.h3}</a></h3>
                <ul>
                    <li><i class="fa fa-calendar"></i>April 25, 2014</li>
                    <li><a href="#"><i class="fa fa-folder-open"></i>Staff</a></li>
                    <li><a href="#"><i class="fa fa-comments"></i>17 comments</a></li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit quisque tempus ac eget diam et laoreet
                    phasellus ut nisi id leo molestie. adipiscing vitae vel quam proin eget mauris eget. <a
                            class="readMore" href="#">Read More <i class="fa fa-angle-right"></i></a></p>
                <hr class="hrNews">
            </div>`
        } else {
            html += `
            <div class="col-md-6 text-right">
                <img class="img-responsive picsGall" src="custom/img_novita/${item.img}"/>
                <h3><a href="#">${item.h3}</a></h3>
                <ul>
                    <li><i class="fa fa-calendar"></i>April 25, 2014</li>
                    <li><a href="#"><i class="fa fa-folder-open"></i>Staff</a></li>
                    <li><a href="#"><i class="fa fa-comments"></i>17 comments</a></li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit quisque tempus ac eget diam et laoreet
                    phasellus ut nisi id leo molestie. adipiscing vitae vel quam proin eget mauris eget. <a
                            class="readMore" href="#">Read More <i class="fa fa-angle-right"></i></a></p>
                <hr class="hrNews">
            </div>
        </div>
    </div>`;
        }


    })

    div_padre.innerHTML = html;

}


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
    //console.log(data.home.titoli_home);
    let html = '';

    data.home.titoli_home.forEach(function (item) {
        //console.log(item.titolo);

        var div = document.getElementById("camera_wrap_1");

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

    let html = '';
    var div_padre = document.querySelector("#home > div:nth-child(3) > div > div");
    var ultimo_testo_home = data.home.ultimo_testo_home;

    //console.log(data);

    var h3 = ultimo_testo_home.h3;
    var h4 = ultimo_testo_home.h4;
    //var imagen = ultimo_testo_home.img;

    html += `<h3>${h3}</h3>
    <h4>${h4}</h4>`;
    div_padre.innerHTML = html;

}

function carica_immagine(data) {
    //console.log("carica_immagine--------------");
    let html = '';
    document.querySelector("#home > div:nth-child(4) > div > div");

    var div_padre = document.querySelector("#home > div:nth-child(4) > div > div");
    var immagine_home = data.home.ultimo_testo_home.img;

    html += `<img src="${immagine_home}">`;
    div_padre.innerHTML = html

}

function carica_primo_paragrafo_bs(data) {
    //console.log("carica carica_primo_paragrafo_bs ------------------");
    let html = '';
    var div_padre = document.querySelector("#besteller > div.line3 > div > div.row.Ama > div");

    var h3 = data.besteller.primo_paragrafo_bs.h3;
    var p = data.besteller.primo_paragrafo_bs.p;

    html += `<h3>${h3}</h3>
             <p>${p}</p>
    `;
    div_padre.innerHTML = html;

}

function carica_ul_opzioni(data) {
    //console.log("carica_ul_opzioni----------------------------------");
    let html = '';
    var div_padre = document.getElementById("filter");
    //console.log(div_padre);

    data.besteller.opzioni_libri.forEach(function (item) {

        //console.log(item);

        if (item.opzione == "tutti i besteller") {
            html += `<li><a class="selected" href="#filter" data-option-value="${item.data_option_value}">${item.opzione}</a></li>`;
        } else {
            html += `<li> <a href ="#filter"  data-option-value=".${item.data_option_value}" >${item.opzione}</a></li>`;
        }
    });
    div_padre.innerHTML = html;
}

function carica_portfolio_block(data) {
    //console.log("carica_portfolio_block");
    //console.log("data: ", data);

    let html = '';
    var div_padre = document.querySelector("div.portfolio_block");
    data.besteller.lista_besteller.forEach(function (item) {

        html += `<div class="element col-sm-4 gall ${item.data_option_value}">
        <a class="plS" href="custom/img_libri_timber/${item.img}" rel="prettyPhoto[gallery2]">
            <img class="img-responsive picsGall" src="custom/img_libri_timber/${item.img}" alt="pic1 Gallery"/>
        </a>
        <div class="view project_descr ">
            <h3><a  href="custom/img_libri_timber/${item.img} " rel="prettyPhoto[gallery3]">${item.title_a}</a></h3>
            <ul>
                <li><i class="fa fa-eye"></i>${item.fa_eye}</li>
                <li><i class="fa-heart-o"></i>${item.fa_heart_o}</li>
            </ul>
        </div>
    </div>`;
    })

    div_padre.innerHTML = html;

    prettyPhoto();


}

function prettyPhoto() {
    $(".pretty a[rel^='prettyPhoto']").prettyPhoto({
        animation_speed: 'normal',
        theme: 'light_square',
        slideshow: 3000,
        autoplay_slideshow: true,
        social_tools: ''
    });
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















