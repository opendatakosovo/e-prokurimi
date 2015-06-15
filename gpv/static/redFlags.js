
    var RED_FLAG_ID_VALUE_ZERO = 0;
        var RED_FLAG_ID_PRICE_ZERO = 1;
        var RED_FLAG_ID_PRICE_ARE_EQUAL = 2;
        var RED_FLAG_ID_VALUE_PRICE_DIFF = 3;
        var RED_FLAG_ID_VALUE_PRICE_ANNEX_DIFF = 4;
        var RED_FLAG_ID_PRICE_IS_ROUND_NUMBER = 5;
        var RED_FLAG_ID_VALUE_PRICE_DIFF_TOO_SMALL = 6;
        var RED_FLAG_ID_VALUE_PRICE_ANNEX_DIFF_TOO_SMALL = 7;
        var RED_FLAG_ID_VALUE_PRICE_DIFF_UNDER_10000 = 8;
        var RED_FLAG_ID_VALUE_PRICE_DIFF_UNDER_10_PERCENT = 9;

        var redFlags = new Array();
        redFlags[RED_FLAG_ID_VALUE_ZERO] = 'Vlera e paraparë nga komuna është €0.';
        redFlags[RED_FLAG_ID_PRICE_ZERO] = 'Vlera e kontraktuar nga komuna është €0.';
        redFlags[RED_FLAG_ID_PRICE_ARE_EQUAL] = ' Vlera e kontraktuar nga komuna është e barabartë me vlerën e paraparë nga komuna.';
        redFlags[RED_FLAG_ID_PRICE_IS_ROUND_NUMBER] = 'Vlera e kontraktuar nga komuna është e rrumbullakësuar.';
        redFlags[RED_FLAG_ID_VALUE_PRICE_DIFF] = 'Vlera e kontraktuar nga komuna dallon nga vlera e paraparë nga komuna më shumë se 10% .';
        redFlags[RED_FLAG_ID_VALUE_PRICE_ANNEX_DIFF] = 'Ndryshimi në mes (Vlerës së kontraktuar + Çmimit Aneks) dhe Vlerës së paraparë është më i madh se 10% i vlerës së paraparë.';
        redFlags[RED_FLAG_ID_VALUE_PRICE_DIFF_TOO_SMALL] = 'Ndryshimi mes vlerës së kontraktuar nga komuna dhe vlerës së paraparë nga komuna është më i vogël se €100.';
        redFlags[RED_FLAG_ID_VALUE_PRICE_ANNEX_DIFF_TOO_SMALL] = 'Ndryshimi në mes (Vlerës së kontraktuar + Çmimit Aneks) dhe Vlerës së paraparë është shum i vogel (nën €100).';
        redFlags[RED_FLAG_ID_VALUE_PRICE_DIFF_UNDER_10000] = "Ndryshimi në mes (Vlerës të kontraktuar + Çmimit Aneks) dhe vlerës së paraparë për 'Vlerën e paraparë deri €10,000', është shum i vogel (nën €100).";
        redFlags[RED_FLAG_ID_VALUE_PRICE_DIFF_UNDER_10_PERCENT] = "Ndryshimi në mes vlerës të kontraktuar nga komuna dhe vlerës së paraparë nga komuna është më i vogël se 10% i vlerës së paraparë nga komuna.";


    function buildTable(jsonResult, year){
        var redFlagTrackerArray = new Array();
        var totali = 0;
        var red_flags_number;
        var row_index = 0;
        $('#table').empty();
        $('#table').append("<table id='results_"+ year +"' class='display' cellspacing='0' width='100%'><thead><tr><th class='td-head'>Kompania</th><th class='td-head'>Selia</th><th style='font-size: 13px; font-weight:bold; color:black; width:500px;'>Aktiviteti</th><th class='td-head'>Vlera e paraparë</th><th class='td-head'>Vlera e kontraktuar</th><th class='td-head'>Aneks</th><th class='td-head'>Vlera e kontraktuar + Aneks</th></tr></thead><tbody class='table-body' id='red-flags-table-"+year+"'></tbody></table>");

        var totali_vlera = 0;
        var totali_qmimi = 0;
        var totali_aneks = 0; 
        var totali_total = 0;

        for ( var key in jsonResult ){
          totali = jsonResult[key].qmimi + jsonResult[key].qmimiAneks;
          totali_vlera = totali_vlera + jsonResult[key].vlera;
          totali_qmimi = totali_qmimi + jsonResult[key].qmimi;
          totali_aneks = totali_aneks + jsonResult[key].qmimiAneks;
          totali_total = totali_total + totali;
          $('#red-flags-table-' + year).append("<tr class='table-row' id='"+ row_index +"'>" +
            "<td class='td-body'>"+jsonResult[key].kompania+"</td>"+
            "<td class='td-body'>"+jsonResult[key].selia+"</td>"+
            "<td style='font-size: 13px; width:500px;'>"+jsonResult[key].pershkrimi+"</td>"+
            "<td value='"+ jsonResult[key].vlera + "' class='td-body1'>"+toCurrency(jsonResult[key].vlera, 1)+"</td>"+
            "<td value='"+ jsonResult[key].qmimi + "' class='td-body2'>"+toCurrency(jsonResult[key].qmimi, 1)+"</td>"+
            "<td value='"+ jsonResult[key].qmimiAneks + "' class='td-body3'>"+toCurrency(jsonResult[key].qmimiAneks, 1)+"</td>"+
            "<td class='td-body'>"+toCurrency(totali, 1)+"</td></tr></tbody></table>");
            row_index = row_index + 1;
        }

        $("#red-flags-table-"+ year +" tr").each(function() {
            var indeksi = $( this ).attr('id');
            var vlera = $( this ).find(".td-body1").attr('value');
            var qmimi = $( this ).find(".td-body2").attr('value');
            var aneks = $( this ).find(".td-body3").attr('value');
            
            red_flags_number = redFlagConditions(indeksi, vlera, qmimi, aneks, redFlagTrackerArray);
            //console.log(index, red_flags_number);
            if(red_flags_number > 0) {
              var colorHex = getRedFlagHexColor(red_flags_number);
              $(this).find('td').css('background', colorHex);
            }
            // compare id to what you want
        });

        $('#results_' + year).append("<tfoot><tr><th class='td-foot' style=color: red;>Totali</th><th class='td-foot'></th><th style='font-size: 14px; font-weight:bold; width:450px;'></th><th class='td-foot'>"+ toCurrency(totali_vlera, 1) +"</th><th class='td-foot'>"+ toCurrency(totali_qmimi, 1) +"</th><th class='td-foot'>"+toCurrency(totali_aneks, 1)+"</th><th class='td-foot'>"+toCurrency(totali_total, 1)+"</th></tr></tfoot>");

        $('#red-flags-table-' + year).on('click', 'tr', function () {
          var rowIndex = $( this ).attr('id');
          if(redFlagTrackerArray[rowIndex] != undefined){
              var arrayLength = redFlagTrackerArray[rowIndex].length;
              console.log(redFlagTrackerArray[rowIndex]);
              var companyName = $('td', this).eq(0).text();

              $( "#jqueryUIRedFlag" ).dialog({
                 draggable: false,
                 autoOpen: false, 
                 resizable: false,
                 hide: "slide",
                 show : "slide",
                 position: {my: "top", at: "top+220", of: window},
                 closeOnEscape: true,
                 width: 700      
              });

              $("#jqueryUIRedFlag").empty();
            
              $( "#jqueryUIRedFlag" ).append('"Red Flags" për kompaninë: ' + companyName + ':');

              $( "#jqueryUIRedFlag" ).append('<ul>');
              for (var i = 0; i < arrayLength; i++) { 
                  $( "#jqueryUIRedFlag" ).append('<li>' + redFlagTrackerArray[rowIndex][i] + '</li>'); 
              }
              $( "#jqueryUIRedFlag" ).append('</ul>');

              $( "#jqueryUIRedFlag" ).dialog( "open" );
            } else {
              $("#jqueryUIRedFlag").empty();
            }
        });
      }

function redFlagConditions(i, vlera, qmimi, aneks, redFlagTrackerArray){
    var numberOfRedFlags = 0;
    var qmimi_str = qmimi.toString();

    // Check if vlera is 0 EUR
    if(vlera == 0){
      numberOfRedFlags = numberOfRedFlags + 1;
      trackRedFlag(redFlagTrackerArray, i, redFlags[RED_FLAG_ID_VALUE_ZERO]);
    }

    // Check if cmimi is 0 EUR
    if(qmimi == 0){
      numberOfRedFlags = numberOfRedFlags + 1;
      trackRedFlag(redFlagTrackerArray, i, redFlags[RED_FLAG_ID_PRICE_ZERO]);
    }

    // Check for red flag: if vlera kontraktuese is smaller than 10% of vlera e paraparë
    if(vlera > 0 && qmimi > 0){
      if(qmimi < getPercentage(vlera, 10)){
        numberOfRedFlags = numberOfRedFlags + 1;
        trackRedFlag(redFlagTrackerArray, i, redFlags[RED_FLAG_ID_VALUE_PRICE_DIFF_UNDER_10_PERCENT]);
      }
    }

    // Check for red flag: vlera equals cmimi
    if(qmimi == vlera){
      numberOfRedFlags = numberOfRedFlags + 1;

      // Keep track of this red flag in the red flag array (a global variable)
      trackRedFlag(redFlagTrackerArray, i, redFlags[RED_FLAG_ID_PRICE_ARE_EQUAL]);
    }else{

      // if qmimi - vlera is lesser than 10 EUR
      if(Math.abs(qmimi - vlera) <= 100){
        numberOfRedFlags = numberOfRedFlags + 1;
        trackRedFlag(redFlagTrackerArray, i, redFlags[RED_FLAG_ID_VALUE_PRICE_DIFF_TOO_SMALL]);
      }

      // if qmimi + aneks - vlera is lesser than 10 EUR
      if(aneks > 0 && (Math.abs(qmimi + aneks - vlera) <= 100)){
        numberOfRedFlags = numberOfRedFlags + 1;
        trackRedFlag(redFlagTrackerArray, i, redFlags[RED_FLAG_ID_VALUE_PRICE_ANNEX_DIFF_TOO_SMALL]);
      }  
    }

    // Check for red flag: cmimi is round number
    if (qmimi_str.length >= 6 && qmimi_str.substr(-5) == '00000'){
      numberOfRedFlags = numberOfRedFlags + 1;
      // Keep track of this red flag in the red flag array (a global variable)
      trackRedFlag(i, redFlags[RED_FLAG_ID_PRICE_IS_ROUND_NUMBER]);
    }
    else if (qmimi_str.length >= 5 && qmimi_str.substr(-4) == '0000'){
      numberOfRedFlags = numberOfRedFlags + 1;
      trackRedFlag(redFlagTrackerArray, i, redFlags[RED_FLAG_ID_PRICE_IS_ROUND_NUMBER]);
    }
    else if (qmimi_str.length >= 4 && qmimi_str.substr(-3) == '000'){
      numberOfRedFlags = numberOfRedFlags + 1;
      trackRedFlag(redFlagTrackerArray, i, redFlags[RED_FLAG_ID_PRICE_IS_ROUND_NUMBER]);
    }
    else if (qmimi_str.length >= 3 && qmimi_str.substr(-2) == '00'){
      numberOfRedFlags = numberOfRedFlags + 1;
      trackRedFlag(redFlagTrackerArray, i, redFlags[RED_FLAG_ID_PRICE_IS_ROUND_NUMBER]);
    }

    //if vlera < 10000
    if (vlera > 0 && vlera <= 10000){
      //if ((qmimi + aneks) - vlera) <= 100
      if (vlera != ( qmimi + aneks)){
        if(Math.abs(qmimi + aneks - vlera) <= 100){
        numberOfRedFlags = numberOfRedFlags + 1;
        trackRedFlag(redFlagTrackerArray, i, redFlags[RED_FLAG_ID_VALUE_PRICE_DIFF_UNDER_10000]);
        }
      }
    }
    // if qmimi - vlera is greater than 10% of vlera
    if((qmimi - vlera) > getPercentage(vlera, 10)){
      numberOfRedFlags = numberOfRedFlags + 1;
      trackRedFlag(redFlagTrackerArray, i, redFlags[RED_FLAG_ID_VALUE_PRICE_DIFF]);
    }

    // if qmimi + aneks - vlera is greater than 10% of vlera
    if(aneks > 0 && ((qmimi + aneks - vlera) > getPercentage(vlera, 10))){
      numberOfRedFlags = numberOfRedFlags + 1;
      trackRedFlag(redFlagTrackerArray, i, redFlags[RED_FLAG_ID_VALUE_PRICE_ANNEX_DIFF]);
    }
    return numberOfRedFlags;
  }

//creating a function that returns the color of red flags
function getRedFlagHexColor(numberOfRedFlags){
  var colorHex = '';

  if(numberOfRedFlags == 1){
   colorHex = '#fed976'; 
  }else if(numberOfRedFlags == 2){
   colorHex = '#feb24c'; 
  }else if(numberOfRedFlags == 3){
   colorHex = '#fd8d3c'; 
  }else if(numberOfRedFlags == 4){
   colorHex = '#fc4e2a'; 
  }else if(numberOfRedFlags == 5){
   colorHex = '#e31a1c'; 
  }else if(numberOfRedFlags == 6){
   colorHex = '#b10026'; 
  }
  return colorHex;
}

function trackRedFlag(redFlagTrackerArray, rowId, redFlagId){
  if(redFlagTrackerArray[rowId] == undefined){
    redFlagTrackerArray[rowId] = [redFlagId];
  }else{
    redFlagTrackerArray[rowId].push(redFlagId) + '<br>';
  }
}

function getPercentage(nr1, nr2){
  return Math.floor((nr1 * nr2) / 100);
}