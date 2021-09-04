from flask import Flask,render_template,jsonify,make_response,abort,request
from peewee import *
import peewee
import json
import datetime

# 初期設定
app = Flask(__name__)

# SQLiteDBの生成
db= peewee.SqliteDatabase("data.db")

################################################################################
# データモデルクラス
class NewlyConfirmedCasesDaily(peewee.Model):
    date = peewee.DateField(formats=["%Y/%m/%d"])
    prefecture = peewee.TextField()
    newly_confirmed_cases = peewee.IntegerField(null=True,default=0)

    class Meta:
        database = db

class DeathsCumulativeDaily(peewee.Model):
    date = peewee.DateField(formats=["%Y/%m/%d"])
    prefecture = peewee.TextField()
    Deaths = peewee.IntegerField(null=True,default=0)

    class Meta:
        database = db

class SevereCasesDaily(peewee.Model):
    date = peewee.DateField(formats=["%Y/%m/%d"])
    prefecture = peewee.TextField()
    severe_cases = peewee.IntegerField(null=True,default=0)

    class Meta:
        database = db
################################################################################

# テーブルの作成
db.create_tables([NewlyConfirmedCasesDaily,DeathsCumulativeDaily,SevereCasesDaily])

# API実装


# 登録API
@app.route('/addData/NewlyConfirmedCasesDaily/', methods=['POST'])
def addData_NewlyConfirmedCasesDaily():
    # POSTされたJSONデータからキーを元にデータ取得
    #print(request.json)
    jsonData = json.loads(request.json)
    #print(jsonData)

    # 同日時のデータがあれば更新、無ければ新規登録
    v = NewlyConfirmedCasesDaily(date=jsonData["date"],
                prefecture=jsonData["prefecture"],
                newly_confirmed_cases=jsonData["newly_confirmed_cases"])
    
    # データを保存
    v.save()
    return "ok"


@app.route('/addData/DeathsCumulativeDaily/', methods=['POST'])
def addData_DeathsCumulativeDaily():
    # POSTされたJSONデータからキーを元にデータ取得
    print(request.json)
    jsonData = json.loads(request.json)
    print(jsonData)

    # 同日時のデータがあれば更新、無ければ新規登録
    v = DeathsCumulativeDaily(date=jsonData["date"],
                prefecture=jsonData["prefecture"],
                Deaths=jsonData["Deaths"])

    # データを保存
    v.save()
    return "ok"

@app.route('/addData/SevereCasesDaily/', methods=['POST'])
def addData_SevereCasesDaily():
    # POSTされたJSONデータからキーを元にデータ取得
    print(request.json)
    jsonData = json.loads(request.json)
    print(jsonData)

    # 同日時のデータがあれば更新、無ければ新規登録
    v = SevereCasesDaily(date=jsonData["date"],
                prefecture=jsonData["prefecture"],
                severe_cases=jsonData["severe_cases"])

    # データを保存
    v.save()
    return "ok"

#データ表示API
@app.route('/dispData/NewlyConfirmedCasesDaily/<string:str_date>')
def dispData_NewlyConfirmedCasesDaily(str_date):
    _datetime = datetime.datetime.strptime(str_date, '%Y-%m-%d')
    _date = datetime.date(_datetime.year,_datetime.month,_datetime.day)
    #datefield_date = date.year + '/' + date.month + '/' + date.day

    datalist = NewlyConfirmedCasesDaily.filter(NewlyConfirmedCasesDaily.date == _date, NewlyConfirmedCasesDaily.prefecture != 'ALL')
    prefecture = []
    datasets = []
    for v in datalist:
        datasets.append({"prefecture":v.prefecture, "newly_confirmed_cases":v.newly_confirmed_cases})

    with open('templates/jscript/table_ver2.js','r',encoding="utf-8") as file:
        html = file.read()
    file.closed

    html = html.replace('jsonData', json.dumps(datasets))
    
    with open('templates/jscript/display_NewlyConfirmedCasesDaily.js','w',encoding="utf-8") as newfile:
        newfile.write(html)
    newfile.closed
    return render_template('display_NewlyConfirmedCasesDaily.html')
    
@app.route('/dispData/DeathsCumulativeDaily/<string:str_date>')
def dispData_DeathsCumulativeDaily(str_date):
    date = datetime.datetime.strptime(str_date, '%Y-%m-%d')
    datalist = DeathsCumulativeDaily.filter(DeathsCumulativeDaily.date == date).order_by(DeathsCumulativeDaily.prefecture)
    prefecture = []
    dataset = []
    for v in datalist:
        prefecture.append(v.prefecture)
        dataset.append(v.Deaths)
    result = {
        "labels":prefecture,
        "datasets":dataset
    }
    with open('display.html','r') as file:
        html = file.read()
    file.closed
    
    html = html.replace('jsonData', make_response(jsonify(result)))
    return render_template('display.html')

@app.route('/dispData/SevereCasesDaily/<string:str_date>')
def dispData_SevereCasesDaily(str_date):
    date = datetime.datetime.strptime(str_date, '%Y-%m-%d')
    datalist = SevereCasesDaily.filter(SevereCasesDaily.date == date).order_by(SevereCasesDaily.prefecture)
    prefecture = []
    dataset = []
    for v in datalist:
        prefecture.append(v.prefecture)
        dataset.append(v.severe_cases)
    result = {
        "labels":prefecture,
        "datasets":dataset
    }
    with open('display.html','r') as file:
        html = file.read()
    file.closed
    
    html = html.replace('jsonData', make_response(jsonify(result)))
    return render_template('display.html')
#####################################################################
# ページ遷移
# 初期ページ
@app.route('/')
def index():
    # トップページを表示
    return render_template('index.html')
####################################################################

# サービス起動
if __name__ == '__main__':
    app.run(host='localhost', port=80)