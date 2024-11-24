function createMessage_(obj) {
  try {
    let begin_at = obj[0]['begin_at'];

    if (begin_at === undefined || begin_at === null) {
      if (noReviewNotice === false) {
        return ["OK", '予定されているレビューはありません\n'];
      } else {
        return ["OK", ""];
      }
    }

    Logger.log("hoge");
    if (!begin_at) {
      if (noReviewNotice === false) {
        return ["OK", '予定されているレビューはありません\n'];
      } else {
        return ["OK", ""];
      }
    }

    let beginAtJstDate = convertUTCtoJST_(begin_at);
    let postBeginAt = beginAtJstDate.toISOString().replace('T', ' ').replace(':00.000Z', '');
    let name = obj[0]['correcteds'];
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

function getParam_(string) {
  var pattern = /"begin_at":\s*"([^"]+)"/;
  var str1 = pattern.exec(string);
  pattern = /"correcteds":\[\{"id":\d+,"login":"([^"]+)"/;
  var str2 = pattern.exec(string);
  return [str1, str2];
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

function testCreateMes() {
  let text = '{flag={icon=check-4, name=Ok, positive=true, created_at=2015-09-14T23:06:52.000Z, updated_at=2015-09-14T23:06:52.000Z, id=1.0}, truant={}, feedback=null, comment=null, begin_at=2024-11-21T09:15:00.000Z, team={closed?=true, project_id=1457.0, validated?=null, url=https://api.intra.42.fr/v2/teams/6189529, status=waiting_for_correction, project_session_id=9622.0, locked_at=2024-11-14T21:30:19.237Z, repo_uuid=intra-uuid-bdee4eb0-37a0-4bb9-b6d2-03d60e2fb456-6189529-yumatsui, updated_at=2024-11-21T08:33:10.689Z, final_mark=null, locked?=true, project_gitlab_path=pedago_world/42-cursus/outer-circle/multilayer-perceptron, terminating_at=null, users=[{id=177722.0, projects_user_id=4022876.0, occurrence=0.0, leader=true, login=yumatsui, validated=true, url=https://api.intra.42.fr/v2/users/yumatsui}], name=yumatsui';
  let param = createMessage_(text);
  Logger.log(param[1]);
}
