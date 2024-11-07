const develop = false;

function get42Userdata_(accesstoken)
{
  var apiUrl = 'https://api.intra.42.fr/v2/me/scale_teams/as_corrector?filter[future]=true&sort=begin_at';
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
  return usrDataResponse.getContentText();
}

function main()
{
  if (develop === true) return ;
  try {
    const authUrl = service.getAuthorizationUrl();//ユーザー認証URL生成
    console.log(authUrl);//ユーザー認証切れの場合ここから認証
    var accesstoken = service.getAccessToken();//アクセストークン取得
    Logger.log(accesstoken);
    var userData = get42Userdata_(accesstoken);
    var cnt = extractBeginAt_(userData);
    Logger.log(cnt);

  } catch(error) {
    Logger.log(error);
  }
}