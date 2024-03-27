const Properties = PropertiesService.getScriptProperties();
const driveService = getService_();

function getService_()
{
  return OAuth2.createService("auth42")
    .setAuthorizationBaseUrl("https://api.intra.42.fr/oauth/authorize")
    .setTokenUrl("https://api.intra.42.fr/oauth/token")
    .setClientId(Properties.getProperty('clientId'))
    .setClientSecret(Properties.getProperty('clientSecret'))
    .setCallbackFunction('authCallback_')
    .setPropertyStore(PropertiesService.getUserProperties())
    .setCache(CacheService.getUserCache())
    .setScope('projects public');
}

function authCallback_(request)
{
  const isAuthorized = driveService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success!');
  } else {
    return HtmlService.createHtmlOutput('Denied.');
  }
}