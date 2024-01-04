"use strict";

console.log("***********************************************");	

var jsonObjectOut = {};
    jsonObjectOut.Error = ""; 

console.log("session:",$.session);
console.log("Session User :",$.session.getUsername());
jsonObjectOut.Session_user = $.session.getUsername();
console.log("samlUserInfo :",$.session.samlUserInfo);
console.log("samlAttribute :",$.session.samlAttribute );

if ($.session.hasAppPrivilege("Creator")) {
console.log("hasAppPrivilege - Creator");	
jsonObjectOut.Creator = true;
}

if ($.session.hasAppPrivilege("Updater")) {
console.log("hasAppPrivilege - Updater");	
jsonObjectOut.Updater = true;
}

if ($.session.hasAppPrivilege("Reader")) {
console.log("hasAppPrivilege - Reader");
jsonObjectOut.Reader = true;
}

if ($.session.hasAppPrivilege("TestingValue")) {
console.log("hasAppPrivilege - TestingValue");	
}

const c = await $.hdb.getConnection();
let query =	`SELECT TOP 1 CURRENT_USER,
						 CURRENT_SCHEMA,
						 SESSION_USER,
						 SESSION_CONTEXT('XS_APPLICATIONUSER'),
						 SESSION_CONTEXT('XS_CLIENT'),
						 SESSION_CONTEXT('XS_DESCRIPTION'),
						 SESSION_CONTEXT('XS_DATEEXP')
			FROM DUMMY;`;
let result = await c.executeQuery(query);

//$.response.contentType = "text/plain";
//$.response.setBody(result);

jsonObjectOut.result = result;
$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(jsonObjectOut));

$.response.status = $.net.http.OK;