/*
    configuration will be a json with below syntak  
    { 
        classNames : '<css class names>',  
        data :  '<data>',  
        schema: { 
            <header-name1>:  <property-to-bind1>,
             <header-name2>:  <property-to-bind2>,
              <header-name3>:  <property-to-bind3>,
        },  
        targetContainer: '<container-name>'
    }
*/
function genarateTable(configuration){ 
    var table  =  getUsersTableControl( configuration ); 
    var control = document.querySelector(configuration.targetContainer);  
    if(control){ 
        control.appendChild(table);
    }
}

function getUsersTableControl(configuration){ 
    var table  = document.createElement("table");  
    
    table.className = configuration.classNames;  

    generateHeader(table, configuration.schema);
   
    generateTableBody(table, configuration);

    return table;
}

function generateHeader(table, schema){
    
    var header  = document.createElement("thead");  
    
    var headerRow = document.createElement("tr");  

    generateHeaderColumns(headerRow, schema);  

    header.appendChild(headerRow);  
    
    table.appendChild(header);
}

function generateHeaderColumns(headerRow, schema) { 
    
    var headers  = Object.keys(schema);  

    for(var i=0; i<headers.length; i++){

        headerRow.appendChild(generateColumn(headers[i]));
    }
}

function generateColumn(value){
    var c = document.createElement("td");  
    c.innerText = value;  
    return c;
}


function generateTableBody(table, configuration){ 

    var data = configuration.data.slice();  

    var tbody = document.createElement("tbody");  
    for(i=0; i<data.length; i++){
        generateTableRow(tbody, data[i], configuration.schema);
    }

    table.appendChild(tbody);
}

function generateTableRow(tableBody, rowData, schema){ 
    var row = document.createElement("tr");  
    generateColumns(row, rowData, schema);
    tableBody.appendChild(row);  
}

function generateColumns(row, rowData, schema){

    var keys  =  Object.keys(schema);  

    for(var i=0; i<keys.length; i++ ){ 
        var property = schema[keys[i]];
        var value  = rowData[property]; 
        row.appendChild( generateColumn(value));
    }

}