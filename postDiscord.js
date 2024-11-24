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
