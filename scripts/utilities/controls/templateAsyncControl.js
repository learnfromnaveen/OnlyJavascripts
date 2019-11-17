function AsynTemplate() {
    var dataUrl;
    var templateUrl
    var control;
  
    this.set = function(object) {
      dataUrl = object.dataUrl;
      templateUrl = object.templateUrl;
      control = object.control;
    };
  
    this.load = function(template, data) {
      render(template, data);
    };
  
    this.onError = function(error) {
      console.log(error);
    };
  
    function render(template, data) {
        
        var t = document.createElement("div");
        t.innerHTML = template;  

        var controls = t.querySelectorAll("[data-bind]");

        for(var i=0;  i< controls.length; i++){ 
            var ctrl = controls[i];
            switch(ctrl.tagName.toLowerCase()){
                case "span":
                            var value  =  data[ctrl.getAttribute("data-bind")];
                            ctrl.innerText = value;
                            break;
                             

            }

        }

        control.appendChild(t);

    }
  }
  
  (function(config) {
    console.log(config);
    var controls = document.getElementsByTagName(config.tagName);
    for (var i = 0; i < controls.length; i++) {
      var dataUrl = controls[i].getAttribute("data-url");
      var templateUrl = controls[i].getAttribute("template-url");
  
      var asyncTemplate = new AsynTemplate();
  
      asyncTemplate.set({
        dataUrl: dataUrl,
        templateUrl: templateUrl,
        control: controls[i]
      });
  
      config.HttpClient.get(templateUrl, function(template){ 
        config.HttpClient.get(dataUrl, function(data){ 
            asyncTemplate.load(template, data);
        }, asyncTemplate.onError)
      }, asyncTemplate.onError, true);
    }
  })({
    tagName: "async-template",
    HttpClient: Application.HttpFactory.HttpClient
  });
  