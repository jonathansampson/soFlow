var http = require( "http" ),
	zlib = require( "zlib" ),
	qStr = require( "querystring" ),
	config = require( "./configuration");

module.exports = function ( params, path, callback ) {

	params.key = config.key;
	params.site = config.site;

	var location = config.url + path + "?" + qStr.stringify( params );

	http.get( location, function ( response ) {

		var chunks = [],
			gunzip = zlib.createGunzip();

		response.pipe( gunzip );

		gunzip.on( "data", function ( chunk ) {
			chunks.push( chunk );
		});

		gunzip.on( "end", function () {
			callback( JSON.parse( chunks.join("") ) );
		});

	});

}