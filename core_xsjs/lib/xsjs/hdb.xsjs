/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

let conn = await $.hdb.getConnection();
let query =
	`SELECT
     "M"."ID" AS "ID" ,
     "M"."CREATEDAT" AS "CREATEDAT" ,
     "M"."TEXT" AS "TEXT"      
FROM "Messages" AS "M" WHERE "M"."IDSTATUS" = 0 `;

let rs = await conn.executeQuery(query);

let body = "";
for(let item of rs){
   if(item.Amount >= 500){
	body += item.ID + "\t" +
			item.CREATEDAT + "\t" + item.Amount + "\n";
   }
}
$.response.setBody(body);
$.response.contentType = "application/vnd.ms-excel; charset=utf-16le";
$.response.headers.set("Content-Disposition",
		"attachment; filename=Excel.xls");
$.response.status = $.net.http.OK;
