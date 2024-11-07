function get42UserDataJSON_()
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
      throw new Error("Error: Failed UrlFetchApp.fetch in get42UserDataJSON_");
    }
    let json = JSON.parse(res);
    return ["OK", json];
  } catch(error) {
    Logger.log(error);
    return ["Error", {}];
  }
}
