var references = [
  { 
        type: 'script', 
        source: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
        childrens: [
            { type: 'script', source: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js'}
        ]
    }
  ,{ type: 'css', source: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css'}  
];

(function(references){

    console.log(references);

    var getScriptElement = function(script){

        var scriptElement = document.createElement('script');  
        scriptElement.type = 'text/javascript'; 
        scriptElement.src = script.source;
        var parentScript = script;
        scriptElement.onload = function() { 

            if(!parentScript.childrens) return;
            for(var i=0; i<parentScript.childrens.length; i++){
                console.log(parentScript.childrens[i]);
             var scriptTag = getScriptElement(parentScript.childrens[i]);
             rootReferenceElement.appendChild(scriptTag);   
             document.body.appendChild(rootReferenceElement);
            }
        }

        scriptElement.onerror = function(error) {
            console.log(error); 
            console.log('There was an error while loading script from server...');
        }
        return scriptElement;  

    }

    var getLinkElement = function(link){

        var linkElement = document.createElement('link');  
        linkElement.rel = 'stylesheet'; 
        linkElement.href = link.source;
        return linkElement;  
    }

    var length = references.length;
   
    var rootReferenceElement  = document.createElement("div");  
    rootReferenceElement.style = 'display:none';

    for(var i=0; i< length; i++ ){

        var element  = null;
        
        var type =  references[i].type.toLocaleLowerCase(); 

        if( type === 'script'){
            element = getScriptElement(references[i]);
        }else if( type === 'css'){
            element = getLinkElement(references[i]);
        }

        if(element){
            rootReferenceElement.appendChild(element);
        }
    }

    document.body.appendChild(rootReferenceElement);


})(references);