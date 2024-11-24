function getScaleTeams_()
{
  try {
    let accesstoken = service.getAccessToken();
    let apiUrl = 'https://api.intra.42.fr/v2/me/scale_teams/as_corrector?filter[future]=true&sort=begin_at';
    let options = {
      'method': 'get',
      'headers': {
      'Authorization': 'Bearer ' + accesstoken
      }
    };
    let res = UrlFetchApp.fetch(apiUrl, options);
    if (res.getResponseCode() < 200 || 300 <= res.getResponseCode()) {
      throw new Error("Error: Failed UrlFetchApp.fetch in getScaleTeams_");
    }
    return ["OK", JSON.parse(res.getContentText())];
  } catch(error) {
    Logger.log(error);
    return ["Error", []];
  }
}

function testGetData() {
  let res = getScaleTeams_();
  Logger.log(res[1][0]['begin_at']);
  Logger.log(res[1][0]['correcteds'][0]['login']);
}
