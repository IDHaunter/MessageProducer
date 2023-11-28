"use strict";

console.log("***********************************************");	

var jsonObjectOut = {};
    jsonObjectOut.Error = ""; 

console.log("session:",$.session);
console.log("Session User :",$.session.getUsername());  
console.log("samlUserInfo :",$.session.samlUserInfo);
console.log("samlAttribute :",$.session.samlAttribute );

if ($.session.hasAppPrivilege("Creator")) {
console.log("Creator");	
}

if ($.session.hasAppPrivilege("TestingValue")) {
console.log("TestingValue");	
}

const c = await $.hdb.getConnection();
let query =	'SELECT * FROM "Messages"';
let result = await c.executeQuery(query);

//$.response.contentType = "text/plain";
//$.response.setBody(result);

jsonObjectOut.result = result;
$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(jsonObjectOut));

$.response.status = $.net.http.OK;