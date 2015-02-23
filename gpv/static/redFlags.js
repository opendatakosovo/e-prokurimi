
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