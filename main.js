const develop = false;
const noReviewNotice = false;

function main()
{
  if (develop === true) return ;
  try {
    outputAuthUrl();

    let userData = getScaleTeams_();
    if (userData[0] !== "OK") {
      throw Error();
    }
    let message = createMessage_(userData[1]);
    if (message[0] !== "OK") {
      throw Error();
    } else if (message[1] === "") {
      Logger.log("Nothing.");
      return ;
    }
    Logger.log(message[1]);
    let res = postDiscordMessage_("レビュー時間通知bot", message[1]);
    if (res[0] !== "OK") {
      throw Error();
    }
    if (200 <= res[1] && res[1] < 300) {
      Logger.log(res[1] + " OK: postDiscordMessage");
    } else {
      Logger.log(res[1] + " Error: " + res[2]);
    }

  } catch(error) {
    postDiscordMessage_("レビュー時間通知bot", error);
    return ;
  }
}