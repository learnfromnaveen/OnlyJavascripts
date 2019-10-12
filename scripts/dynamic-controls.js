function loadUsers(container){ 
    var users  = getUsers();  
    var table  =  getUsersTableControl(users); 
    var control = document.querySelector(container);  
    if(control){ 
        control.appendChild(table);
    }
}

function getUsersTableControl(users){ 
    var usersTable  = document.createElement("table");  
    
    usersTable.className = "table table-striped";  

    generateHeader(usersTable);
   
    generateTableBody(usersTable, users);

    return usersTable;
}

function generateHeader(usersTable){
    var userTableHeader  = document.createElement("thead");  
    
    var userHeaderRow = document.createElement("tr");  

    generateHeaderColumns(userHeaderRow);  

    userTableHeader.appendChild(userHeaderRow);  
    
    usersTable.appendChild(userTableHeader);
}

function generateHeaderColumns(userHeaderRow) { 
    var nameColumn  = document.createElement("td");  
    nameColumn.innerText = "Name";
    
    var usernameColumn  = document.createElement("td");  
    usernameColumn.innerText = "Username";

    var emailColumn  = document.createElement("td");  
    emailColumn.innerText = "Email";

    userHeaderRow.appendChild(nameColumn);
    userHeaderRow.appendChild(usernameColumn);
    userHeaderRow.appendChild(emailColumn);
}


function generateTableBody(usersTable, users){ 
    var tbody = document.createElement("tbody");  
    for(i=0; i<users.length; i++){
        generateTableRow(tbody, users[i]);
    }

    usersTable.appendChild(tbody);
}

function generateTableRow(usersTableBody, user){ 
    var row = document.createElement("tr");  
    generateColumns(row, user);
    usersTableBody.appendChild(row);  
}

function generateColumns(row, user){
    
    var generateColumn = function(columnValue){
        var c = document.createElement("td");  
        c.innerText = columnValue;  
        return c;
    };

    row.appendChild(generateColumn(user.name));
    row.appendChild(generateColumn(user.username));
    row.appendChild(generateColumn(user.email));
}