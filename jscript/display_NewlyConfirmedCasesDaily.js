var json = [{"prefecture": "Hokkaido", "newly_confirmed_cases": 314}, {"prefecture": "Aomori", "newly_confirmed_cases": 100}, {"prefecture": "Iwate", "newly_confirmed_cases": 44}, {"prefecture": "Miyagi", "newly_confirmed_cases": 147}, {"prefecture": "Akita", "newly_confirmed_cases": 18}, {"prefecture": "Yamagata", "newly_confirmed_cases": 39}, {"prefecture": "Fukushima", "newly_confirmed_cases": 74}, {"prefecture": "Ibaraki", "newly_confirmed_cases": 220}, {"prefecture": "Tochigi", "newly_confirmed_cases": 114}, {"prefecture": "Gunma", "newly_confirmed_cases": 176}, {"prefecture": "Saitama", "newly_confirmed_cases": 1115}, {"prefecture": "Chiba", "newly_confirmed_cases": 1089}, {"prefecture": "Tokyo", "newly_confirmed_cases": 3099}, {"prefecture": "Kanagawa", "newly_confirmed_cases": 1738}, {"prefecture": "Niigata", "newly_confirmed_cases": 64}, {"prefecture": "Toyama", "newly_confirmed_cases": 37}, {"prefecture": "Ishikawa", "newly_confirmed_cases": 41}, {"prefecture": "Fukui", "newly_confirmed_cases": 17}, {"prefecture": "Yamanashi", "newly_confirmed_cases": 46}, {"prefecture": "Nagano", "newly_confirmed_cases": 58}, {"prefecture": "Gifu", "newly_confirmed_cases": 229}, {"prefecture": "Shizuoka", "newly_confirmed_cases": 429}, {"prefecture": "Aichi", "newly_confirmed_cases": 1719}, {"prefecture": "Mie", "newly_confirmed_cases": 248}, {"prefecture": "Shiga", "newly_confirmed_cases": 234}, {"prefecture": "Kyoto", "newly_confirmed_cases": 478}, {"prefecture": "Osaka", "newly_confirmed_cases": 2501}, {"prefecture": "Hyogo", "newly_confirmed_cases": 954}, {"prefecture": "Nara", "newly_confirmed_cases": 193}, {"prefecture": "Wakayama", "newly_confirmed_cases": 57}, {"prefecture": "Tottori", "newly_confirmed_cases": 21}, {"prefecture": "Shimane", "newly_confirmed_cases": 25}, {"prefecture": "Okayama", "newly_confirmed_cases": 163}, {"prefecture": "Hiroshima", "newly_confirmed_cases": 229}, {"prefecture": "Yamaguchi", "newly_confirmed_cases": 54}, {"prefecture": "Tokushima", "newly_confirmed_cases": 44}, {"prefecture": "Kagawa", "newly_confirmed_cases": 58}, {"prefecture": "Ehime", "newly_confirmed_cases": 31}, {"prefecture": "Kochi", "newly_confirmed_cases": 53}, {"prefecture": "Fukuoka", "newly_confirmed_cases": 795}, {"prefecture": "Saga", "newly_confirmed_cases": 50}, {"prefecture": "Nagasaki", "newly_confirmed_cases": 70}, {"prefecture": "Kumamoto", "newly_confirmed_cases": 171}, {"prefecture": "Oita", "newly_confirmed_cases": 115}, {"prefecture": "Miyazaki", "newly_confirmed_cases": 89}, {"prefecture": "Kagoshima", "newly_confirmed_cases": 91}, {"prefecture": "Okinawa", "newly_confirmed_cases": 565}]


//?????????????????????
function MakeHead(json){
  // table???????????????
  var table = document.createElement('table');
  var tr = document.createElement('tr');
  for (key in json[0]) {
      // th???????????????
      var th = document.createElement('th');
      // ??????????????????
      switch(key){
          case 'prefecture':
              heading = "????????????";
              break;
          case 'newly_confirmed_cases':
              heading = "??????????????????";
              break;
          case 'Deaths':
              heading = "????????????????????????";
              break;
          case 'severe_cases':
              heading = "????????????";
              break;
          default:
              heading = key;
        }
        // th?????????????????????????????????
        th.textContent = heading;
        // th?????????tr???????????????????????????
        tr.appendChild(th);
        }
    // tr?????????table???????????????????????????
    table.appendChild(tr);
    return table;
}

function MakeBody(table, json){
  // ???????????????????????????
  for (var i = 0; i < json.length; i++) {
    // tr???????????????
    var tr = document.createElement('tr');
    // th???td??????????????????
    for (key in json[0]) {
          // td???????????????
          var td = document.createElement('td');
          // td?????????????????????????????????
          td.textContent = json[i][key];
          // td?????????tr???????????????????????????
          tr.appendChild(td);
        }
    // tr?????????table???????????????????????????
    table.appendChild(tr);
    }
  return table;  
}


function MakeTable(array, maintable){
  table = MakeHead(array);
  table = MakeBody(table, array);
  // ????????????table?????????????????????
  document.getElementById(maintable).appendChild(table);
}


function MakeTable1(){
  array = json.slice(0, 16);
  MakeTable(array, 'maintable1');
}
function MakeTable2(){
  array = json.slice(16, 32);
  MakeTable(array, 'maintable2');
}
function MakeTable3(){
  array = json.slice(32, 48);
  MakeTable(array, 'maintable3');
}