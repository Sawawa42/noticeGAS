// ユーザ認証URLを生成する関数
function outputAuthUrl() {
  const authUrl = service.getAuthorizationUrl();
  Logger.log(authUrl);
}
