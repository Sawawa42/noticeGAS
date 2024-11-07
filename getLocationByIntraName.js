function getLocationByIntraName_(intraname) {
  let accesstoken = service.getAccessToken();
  let apiUrl = 'https://api.intra.42.fr/v2/users/' + intraname;

  var options = {
    'method': 'get',
    'headers': {
    'Authorization': 'Bearer ' + accesstoken
    }
  };
  let res = UrlFetchApp.fetch(apiUrl, options);
  if (res.getResponseCode() < 200 || 300 <= res.getResponseCode()) return 'Error';
  let json = JSON.parse(res);
  let location = json['location'];
  if (location === null) {
    return 'Unavailable';
  } else {
    return location;
  }
}

function testGetLocation() {
  let location = getLocationByIntraName_("syamasaw");
  Logger.log(location);
}
