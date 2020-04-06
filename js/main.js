$(document).ready(function(){

    var htmlDay = $('#calendar-template').html();              //do in pasto il la mia variabile al template
    var templateGiorno = Handlebars.compile(htmlDay);

    var datautile= moment('2018-01-01','YYYY-MM-DD');           //imposto una data fissa
    var limiteIniziale= moment('2018-01-01');
    var limiteFinale= moment('2018-12-31');

    stampafestivi(datautile);

    $('.succ').click(function(){
        $('.prec').prop('disabled', false);
        datautile.add(1 , 'months');                             //funzioni create per aggiungere e sottrare mesi alla var da noi impostata, e ridarle alla stampa con il mese successivo o precedente
        stampaGiorniMese(datautile);
        stampafestivi(datautile);
    });

    $('.prec').click(function(){
        if (datautile.isSameOrBefore(limiteIniziale)) {
            alert('te lo buco quell else')
        } else {
            datautile.subtract(1 , 'months')
            stampaGiorniMese(datautile);
            stampafestivi(datautile);
            if (datautile.isSameOrBefore(limiteIniziale)){
                $('.prec').prop('disabled', true);
            }
        }
    });

    function stampafestivi(variabileMese) {
        $.ajax({
            url:'https://flynn.boolean.careers/exercises/api/holidays',
            method: 'GET',
            data: {
                year: variabileMese.year(),
                month: variabileMese.month()
            },
            success: function (data) {
                var giorniFestivi= data.response;
                for (var i = 0; i < giorniFestivi.length; i++) {
                    var giornoFestivo= giorniFestivi[i]
                    var dataFestivo= giornoFestivo.date;
                    var nomeFestivo= giornoFestivo.name;
                    console.log(dataFestivo);
                    console.log(nomeFestivo);
                    $('#calendar li[data-day ="' + dataFestivo + '"]').addClass('festivo').append('-'+ nomeFestivo)
                }
            }


        });
    }

    stampaGiorniMese(datautile)

    function stampaGiorniMese(meseDaStampare) {

        $('#calendar').empty();
        var standardDay= meseDaStampare.clone()
        var giorniMese= meseDaStampare.daysInMonth()     //mi da i giorni in un mese

        var nomeMese= meseDaStampare.format('MMMM');    //mi da il nome in stringa del mese

        $('#nome-mese').text(nomeMese+ ' ')

        for (var i = 1; i <= giorniMese; i++) {
            // $('#calendar').append('<li>'+ i + ' ' + nomeMese + '</li>')     //mi cicla i giorni nel mese di gennaio
            var giornoDaInserire = {
                day: i + ' ' + nomeMese,
                dataDay: standardDay.format('YYYY-MM-DD')
            }

            var templateFinale = templateGiorno(giornoDaInserire);               //popolo il template
            $('#calendar').append(templateFinale);
            standardDay.add(1,'day')
        }
    }
});
