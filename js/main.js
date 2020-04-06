$(document).ready(function(){

    var htmlDay = $('#calendar-template').html();              //do in pasto il la mia variabile al template
    var templateGiorno = Handlebars.compile(htmlDay);

    var datautile= moment('2018-01-01','YYYY-MM-DD');           //imposto una data fissa
    console.log(datautile.format('YYYY-MM-DD'));

    stampafestivi();

    $('.succ').click(function(){
        datautile.add(1 , 'months');                             //funzioni create per aggiungere e sottrare mesi alla var da noi impostata, e ridarle alla stampa con il mese successivo o precedente
        stampaGiorniMese(datautile);
    });

    $('.prec').click(function(){
        datautile.subtract(1 , 'months')
        stampaGiorniMese(datautile);
    });

    function stampafestivi() {
        $.ajax({
            url:'https://flynn.boolean.careers/exercises/api/holidays',
            method: 'GET',
            data: {
                year: 2018,
                month: 0
            },
            success: function (data) {
                var giorniFestivi= data.response;
                for (var i = 0; i < giorniFestivi.length; i++) {
                    var giornoFestivo= giorniFestivi[i]
                    var dataFestivo= giornoFestivo.date;
                    var nomeFestivo= giornoFestivo.name;
                    console.log(dataFestivo);
                    console.log(nomeFestivo);
                }
            }


        });
    }

    stampaGiorniMese(datautile)

    function stampaGiorniMese(meseDaStampare) {

        $('#calendar').empty();
        var giorniMese= meseDaStampare.daysInMonth()     //mi da i giorni in un mese

        var nomeMese= meseDaStampare.format('MMMM');    //mi da il nome in stringa del mese

        $('#nome-mese').text(nomeMese+ ' ')

        for (var i = 0; i < giorniMese; i++) {
            // $('#calendar').append('<li>'+ i + ' ' + nomeMese + '</li>')     //mi cicla i giorni nel mese di gennaio
            var giornoDaInserire = {
                day: i + ' ' + nomeMese,
            }

            var templateFinale = templateGiorno(giornoDaInserire);               //popolo il template
            $('#calendar').append(templateFinale);
        }
    }
});
