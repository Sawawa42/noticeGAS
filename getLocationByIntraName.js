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
    return getFloorByLocation_(location);
  }
}

function getFloorByLocation_(location) {
  if (location.startsWith('c1')) {
    return location += ' 2F KOI';
  } else if (location.startsWith('c2')) {
    return location += ' 2F UME';
  } else if (location.startsWith('c3')) {
    return location += ' 3F WASHI';
  } else if (location.startsWith('c4')) {
    return location += ' 3F FUJI';
  } else if (location.startsWith('c5')) {
    return location += ' 4F SAKURA';
  } else if (location.startsWith('c6')) {
    return location += ' 4F TSURU';
  }
}

function testGetLocation() {
  let location = getLocationByIntraName_("syamasaw");
  Logger.log(location);
  location = getFloorByLocation_(location);
  Logger.log(location);
}
