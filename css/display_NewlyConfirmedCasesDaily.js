var json = []


//ヘッダーを作成
function MakeHead(json){
  // table要素を生成
  var table = document.createElement('table');
  var tr = document.createElement('tr');
  for (key in json[0]) {
      // th要素を生成
      var th = document.createElement('th');
      // 見出しを指定
      switch(key){
          case 'prefecture':
              heading = "都道府県";
              break;
          case 'newly_confirmed_cases':
              heading = "新規感染者数";
              break;
          case 'Deaths':
              heading = "死亡者数（累積）";
              break;
          case 'severe_cases':
              heading = "重症者数";
              break;
          default:
              heading = key;
        }
        // th要素内にテキストを追加
        th.textContent = heading;
        // th要素をtr要素の子要素に追加
        tr.appendChild(th);
        }
    // tr要素をtable要素の子要素に追加
    table.appendChild(tr);
    return table;
}

function MakeBody(table, json){
  // テーブル本体を作成
  for (var i = 0; i < json.length; i++) {
    // tr要素を生成
    var tr = document.createElement('tr');
    // th・td部分のループ
    for (key in json[0]) {
          // td要素を生成
          var td = document.createElement('td');
          // td要素内にテキストを追加
          td.textContent = json[i][key];
          // td要素をtr要素の子要素に追加
          tr.appendChild(td);
        }
    // tr要素をtable要素の子要素に追加
    table.appendChild(tr);
    }
  return table;  
}


function MakeTable(array, maintable){
  table = MakeHead(array);
  table = MakeBody(table, array);
  // 生成したtable要素を追加する
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