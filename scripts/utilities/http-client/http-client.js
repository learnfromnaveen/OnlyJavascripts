var Application = {};

function FetchHttpClient() {
  this.get = function(url, onSuccessCallback, onFailureCallback, disableJsonConversion) {
    if (fetch) {
      fetch(url)
        .then(response => disableJsonConversion ? response : response.json())
        .then(data => onSuccessCallback(data))
        .catch(error =>
          onFailureCallback("There was an error while processing request")
        );
    }
  };
}

function XmlHttpClient() {
  this.get = function(url, onSuccessCallback, onFailureCallback, disableJsonConversion) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var data = disableJsonConversion ? xhttp.responseText : JSON.parse(xhttp.responseText);
        onSuccessCallback(data);
      }
    };

    xhttp.onerror = function() {
      onFailureCallback("There was an error while processing request");
    };

    xhttp.open("GET", url, true);
    xhttp.send();
  };
}

Application.HttpFactory = (function(configuration) {
  console.log(configuration.httpClient.trim() === "xmlhttp");

  var instance =
    configuration.httpClient === "xmlhttp"
      ? new XmlHttpClient()
      : new FetchHttpClient();

  return {
    HttpClient: instance
  };
})({ httpClient: "xmlhttp" });

//Application.HttpClient  =  Application.HttpFactory.HttpClient;
