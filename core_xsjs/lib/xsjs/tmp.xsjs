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

if ($.session.hasAppPrivilege("LOAD_CAI_FILES")) {
console.log("hasAppPrivilege - LOAD_CAI_FILES");
jsonObjectOut.LOAD_CAI_FILES = true;
} else {
jsonObjectOut.LOAD_CAI_FILES = false;	
}

if ($.session.hasAppPrivilege("UNLOAD_NLP_FILES")) {
console.log("hasAppPrivilege - UNLOAD_NLP_FILES");
jsonObjectOut.UNLOAD_NLP_FILES = true;
} else {
jsonObjectOut.UNLOAD_NLP_FILES = false;	
}

const c = await $.hdb.getConnection();
let query =	`SELECT TOP 1 CURRENT_USER,
						 CURRENT_SCHEMA,
						 SESSION_USER,
						 SESSION_CONTEXT('XS_APPLICATIONUSER'),
						 SESSION_CONTEXT('XS_CLIENT'),
						 SESSION_CONTEXT('XS_DESCRIPTION'),
						 SESSION_CONTEXT('XS_DATEEXP'),
						 SESSION_CONTEXT('XS_EXPIRED_AT'),
						 SESSION_CONTEXT('XS_TENANT'),
						 SESSION_CONTEXT('XS_BOT')
			FROM DUMMY;`;
let result = await c.executeQuery(query);
query = 'SELECT * FROM M_SESSION_CONTEXT';
let M_SESSION_CONTEXT = await c.executeQuery(query);
//$.response.contentType = "text/plain";
//$.response.setBody(result);

jsonObjectOut.result = result;
jsonObjectOut.M_SESSION_CONTEXT = M_SESSION_CONTEXT;
$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(jsonObjectOut));

$.response.status = $.net.http.OK;