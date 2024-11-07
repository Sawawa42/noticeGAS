function postDiscordMessage_(botName, message) {
  try {
    const webhookURL = Properties.getProperty('webhook');

    const payload = {
      username: botName,
      content: message,
    };

    let response = UrlFetchApp.fetch(webhookURL, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
    });

    return ["OK", response.getResponseCode(), response.getContentText()];

  } catch(error) {
    Logger.log(error);
    return ["Error", 500, ""];
  }

}

function testPostDiscord() {
  let res = postDiscordMessage_("test bot", "test");
  Logger.log(res[0]);
  Logger.log(res[1]);
}

// function postDiscord_(time, jstDate, name) {
//   var location = getLocationByIntraName(name);
//   var now = new Date(getTime_());
//   var begin_at = new Date(jstDate);

//   begin_at.setMinutes(begin_at.getMinutes() - 15);//現在の時刻とレビュー開始15分前を比べる
//   if (now >= begin_at)
//   {
//     var contents = '次のレビュー開始時刻(JST): ' + time + '\nレビュイー名: ' + name + '\n現在地: ' + location + '\n最新の情報を確認: https://profile.intra.42.fr/';
//   }else{
//     var contents = '次のレビュー開始時刻(JST): ' + time;
//   }

//   let res = postDiscordMessage("レビュー時間通知bot", contents);
//   if (200 <= res[0] && res[0] < 300) {
//     Logger.log(res[0] + "OK: postDiscordMessage");
//   } else {
//     Logger.log(res[0] + "Error: " + res[1]);
//   }
// }

// function getTime_() {
//   var now = new Date();
//   var jstOffset = 9 * 60;
//   var nowTimestamp = now.getTime() + (jstOffset * 60 * 1000);
//   var nowDate = new Date(nowTimestamp);
//   return nowDate;
// }

// function convertUTCtoJST_(time, name) {
//   // UTCの日時文字列をDateオブジェクトに変換
//   var utcDate = new Date(time);
//   // UTCの時刻をJSTに変換
//   var jstOffset = 9 * 60; // JSTはUTC+9
//   var jstTimestamp = utcDate.getTime() + (jstOffset * 60 * 1000);
//   var jstDate = new Date(jstTimestamp);

//   time = jstDate.toISOString().replace('T', ' ').replace(':00.000Z', '');
//   postDiscord_(time, jstDate, name);
// }

// function postNothing_()
// {
//   const webhookURL = Properties.getProperty('webhook');
//   const payload = {
//     username: "レビュー時間通知",
//     content: '次のレビュー予定はありません'
//   };

//   UrlFetchApp.fetch(webhookURL, {
//     method: "post",
//     contentType: "application/json",
//     payload: JSON.stringify(payload),
//   });
// }

// //最初に一致したbegin_atとnameを抽出する
// function extractBeginAt_(text) {
//   var pattern = /"begin_at":\s*"([^"]+)"/;
//   var pattern_name = /"correcteds":\[\{"id":\d+,"login":"([^"]+)"/;
//   var result = pattern.exec(text);
//   var result_name = pattern_name.exec(text);
//   if (result) {
//     if (result_name) {
//       convertUTCtoJST_(result[1], result_name[1]);
//     }else {
//       convertUTCtoJST_(result[1], 'unknown');
//     }
//     Properties.setProperty('postedCnt', 0);
//     return cnt;
//   }else {
//     var cnt = Properties.getProperty('postedCnt');
//     if (cnt == 0) {
//       postNothing_();
//       cnt++;
//     }else if (cnt > 0) {
//       cnt++;
//     }
//     if (cnt == 24) {
//       Properties.setProperty('postedCnt', 0);
//     }else {
//       Properties.setProperty('postedCnt', cnt);
//     }
//     return cnt;
//   }
// }
