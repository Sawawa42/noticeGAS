function createMessage_(obj) {
  try {
    if (obj.length === 0) {
      if (noReviewNotice === false) {
        return ["OK", '予定されているレビューはありません\n'];
      } else {
        return ["OK", ""];
      }
    }
    let beginAtJstDate = convertUTCtoJST_(obj[0]['begin_at']);
    let postBeginAt = beginAtJstDate.toISOString().replace('T', ' ').replace(':00.000Z', '');
    let name = obj[0]['correcteds'][0]['login'];
    let location = getLocationByIntraName_(name);
    let message = `次のレビュー開始時刻(JST): ${postBeginAt}\n`;

    if (new Date(getTime_()) >= beginAtJstDate.getMinutes() - 15) {
      message += `レビュイーのintra名: ${name}\n`;
      message += `レビュイーの現在地: ${location}\n`;
      message += '最新の情報を確認: https://profile.intra.42.fr/';
    }

    return ["OK", message];

  } catch(error) {
    return ["Error", error];
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
