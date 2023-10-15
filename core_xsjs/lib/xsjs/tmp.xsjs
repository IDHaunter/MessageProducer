"use strict";
const c = await $.hdb.getConnection();
let query =	'SELECT * FROM "MP_1"."Messages"';
let result = await c.executeQuery(query);

$.response.setBody(JSON.stringify(result));

//$.response.contentType = "text/plain";
//$.response.setBody(result);

$.response.status = $.net.http.OK;