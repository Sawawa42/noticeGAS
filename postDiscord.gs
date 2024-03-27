function getLocation_(name) {
  var accesstoken = driveService.getAccessToken();
  var apiUrl = 'https://api.intra.42.fr/v2/users/' + name;
  var pattern = /"location":\s*"([^"]+)"/;

  var headers =
  {
    'Authorization': 'Bearer ' + accesstoken
  };
  var options =
  {
    'method': 'get',
    'headers': headers
  };
  var usrDataResponse = UrlFetchApp.fetch(apiUrl, options);
  var result = pattern.exec(usrDataResponse);
  if (result) {
    if (result[1] == 'null') {
      return 'Unavailable';
    }else {
      return result[1];
    }
  }
}

function postDiscord_(time, jstDate, name) {
  const webhookURL = Properties.getProperty('webhook');
  var location = getLocation_(name);
  var now = new Date(getTime_());
  var begin_at = new Date(jstDate);

  begin_at.setMinutes(begin_at.getMinutes() - 15);//現在の時刻とレビュー開始15分前を比べる
  if (now >= begin_at)
  {
    var contents = '次のレビュー開始時刻(JST): ' + time + '\nレビュイー名: ' + name + '\n現在地: ' + location + '\n最新の情報を確認: https://profile.intra.42.fr/';
  }else{
    var contents = '次のレビュー開始時刻(JST): ' + time;
  }

  const payload = {
    username: "レビュー時間通知",
    content: contents,
  };

  UrlFetchApp.fetch(webhookURL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  });
}

function getTime_() {
  var now = new Date();
  var jstOffset = 9 * 60;
  var nowTimestamp = now.getTime() + (jstOffset * 60 * 1000);
  var nowDate = new Date(nowTimestamp);
  return nowDate;
}

function convertUTCtoJST_(time, name) {
  // UTCの日時文字列をDateオブジェクトに変換
  var utcDate = new Date(time);
  // UTCの時刻をJSTに変換
  var jstOffset = 9 * 60; // JSTはUTC+9
  var jstTimestamp = utcDate.getTime() + (jstOffset * 60 * 1000);
  var jstDate = new Date(jstTimestamp);

  time = jstDate.toISOString().replace('T', ' ').replace(':00.000Z', '');
  postDiscord_(time, jstDate, name);
}

function postNothing_()
{
  const webhookURL = Properties.getProperty('webhook');
  const payload = {
    username: "レビュー時間通知",
    content: '次のレビュー予定はありません'
  };

  UrlFetchApp.fetch(webhookURL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  });
}

//最初に一致したbegin_atとnameを抽出する
function extractBeginAt_(text) {
  var pattern = /"begin_at":\s*"([^"]+)"/;
  var pattern_name = /"correcteds":\[\{"id":\d+,"login":"([^"]+)"/;
  var result = pattern.exec(text);
  var result_name = pattern_name.exec(text);
  if (result) {
    if (result_name) {
      convertUTCtoJST_(result[1], result_name[1]);
    }else {
      convertUTCtoJST_(result[1], 'unknown');
    }
    Properties.setProperty('postedCnt', 0);
    return cnt;
  }else {
    var cnt = Properties.getProperty('postedCnt');
    if (cnt == 0) {
      postNothing_();
      cnt++;
    }else if (cnt > 0) {
      cnt++;
    }
    if (cnt == 24) {
      Properties.setProperty('postedCnt', 0);
    }else {
      Properties.setProperty('postedCnt', cnt);
    }
    return cnt;
  }
}