function createMessage_(json) {
  try {
    let begin_at = json['begin_at'];

    if (begin_at === undefined || begin_at === null) {
      if (noReviewNotice === true) {
        return ["OK", '予定されているレビューはありません\n'];
      } else {
        return ["OK", ""];
      }
    }

    let beginAtJstDate = convertUTCtoJST_(begin_at);
    let postBeginAt = beginAtJstDate.toISOString().replace('T', ' ').replace(':00.000Z', '');
    let name = json['correcteds'];
    let location = getLocationByIntraName_(name);
    let message = `次のレビュー開始時刻(JST): ${postBeginAt}\n`;

    if (new Date(getTime_()) >= beginAtJstDate.getMinutes - 15) {
      let message1 = `レビュイーのintra名: ${name}\n`;
      let message2 = `レビュイーの現在地: ${location}\n`;
      let message3 = '最新の情報を確認: https://profile.intra.42.fr/';
      message = message + message1 + message2  + message3;
    }

    return ["OK", message];

  } catch(error) {
    Logger.log(error);
    return ["Error", ""];
  }
  
}

function convertUTCtoJST_(utcString) {
  let utcDate = new Date(utcString);
  let jstOffset = 9 * 60; // JST(UTC+9)
  let jstTimestamp = utcDate.getTime() + (jstOffset * 60 * 1000);
  let jstDate = new Date(jstTimestamp);

  return jstDate;
}

function getTime_() {
  var now = new Date();
  var jstOffset = 9 * 60;
  var nowTimestamp = now.getTime() + (jstOffset * 60 * 1000);
  var nowDate = new Date(nowTimestamp);
  return nowDate;
}
