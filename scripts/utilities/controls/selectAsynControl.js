function AsyncSelect() {
  var url;
  var valueProperty;
  var textProperty;
  var control;

  this.set = function(object) {
    url = object.url;
    valueProperty = object.value;
    textProperty = object.text;
    control = object.control;
  };

  this.load = function(data) {
    render(data);
  };

  this.onError = function(error) {
    console.log(error);
  };

  function render(collection) {
    var selectControl = document.createElement("select");
    collection.forEach(function(data) {
      var option = document.createElement("option");
      option.value = data[valueProperty];
      option.innerText = data[textProperty];
      selectControl.appendChild(option);
    });

    control.appendChild(selectControl);
  }
}

(function(config) {
  console.log(config);
  var controls = document.getElementsByTagName(config.tagName);
  for (var i = 0; i < controls.length; i++) {
    var url = controls[i].getAttribute("data-url");
    var value = controls[i].getAttribute("data-value");
    var text = controls[i].getAttribute("data-text");

    var asynSelect = new AsyncSelect();

    asynSelect.set({
      url: url,
      value: value,
      text: text,
      control: controls[i]
    });

    config.HttpClient.get(url, asynSelect.load, asynSelect.onError);
  }
})({
  tagName: "async-select",
  HttpClient: Application.HttpFactory.HttpClient
});
