var jsTable  = { };  

jsTable.genarateTable = function(configuration){ 
    var table  =  jsTable.getUsersTableControl( configuration ); 
    var control = document.querySelector(configuration.targetContainer);  
    if(control){ 
        control.appendChild(table);
    }
};

jsTable.getUsersTableControl = function(configuration){ 
    var table  = document.createElement("table");  
    
    table.className = configuration.classNames;  

    jsTable.generateHeader(table, configuration.schema);
   
    jsTable.generateTableBody(table, configuration);

    return table;
};

jsTable.generateHeader = function(table, schema){
    
    var header  = document.createElement("thead");  
    
    var headerRow = document.createElement("tr");  

    jsTable.generateHeaderColumns(headerRow, schema);  

    header.appendChild(headerRow);  
    
    table.appendChild(header);
};  



jsTable.generateHeaderColumns = function(headerRow, schema) { 
    
    var headers  = Object.keys(schema);  

    for(var i=0; i<headers.length; i++){

        headerRow.appendChild(jsTable.generateColumn(headers[i]));
    }
};

jsTable.generateColumn = function(value){
    var c = document.createElement("td");  
    c.innerText = value;  
    return c;
};


jsTable.generateTableBody = function(table, configuration){ 

    var data = configuration.data.slice();  

    var tbody = document.createElement("tbody");  
    for(i=0; i<data.length; i++){
        jsTable.generateTableRow(tbody, data[i], configuration.schema);
    }

    table.appendChild(tbody);
};

jsTable.generateTableRow = function(tableBody, rowData, schema){ 
    var row = document.createElement("tr");  
    jsTable.generateColumns(row, rowData, schema);
    tableBody.appendChild(row);  
};

jsTable.generateColumns = function(row, rowData, schema){

    var keys  =  Object.keys(schema);  

    for(var i=0; i<keys.length; i++ ){ 
        var property = schema[keys[i]];
        var value  = rowData[property]; 
        row.appendChild( jsTable.generateColumn(value));
    }

};