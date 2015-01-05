var http = require( "http" ),
	zlib = require( "zlib" ),
	qStr = require( "querystring" ),
	config = require( "./configuration");

/* Used for storing pages of data
   between requests so as to hand all
   of it back over to app.js intact */
var pages = {};

module.exports = function getdata ( params, path, callback ) {

	if ( ! ( path in pages ) ) {
		/* Pages of data are stored under paths. Otherwise we
		   get data from one API request winding up in the 
		   response of another API request. Nasty stuff */
		pages[ path ] = { items: [] };
	}

	params.key = config.key;
	params.site = config.site;
	params.page = params.page || 1;
	params.pagesize = config.pagesize;

	var location = config.url + path + "?" + qStr.stringify( params );

	http.get( location, function ( response ) {

		var chunks = [],
			gunzip = zlib.createGunzip();

		response.pipe( gunzip );

		gunzip.on( "data", function ( chunk ) {
			chunks.push( chunk );
		});

		gunzip.on( "end", function () {

			var parsed = JSON.parse( chunks.join("") );

			console.log( "Quota Remaining: " + parsed.quota_remaining );

			pages[ path ].items = pages[ path ].items.concat( parsed.items );

			if ( parsed.has_more ) {
				params.page++;
				getdata( params, path, callback )
			} else {
				callback( pages[ path ] );
				pages[ path ].items = [];
			}

		});

	});

}