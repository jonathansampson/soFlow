var retrieve = require( "../retriever" );

function getInfo ( options, tagnames, callback ) {

	retrieve( options, "tags/" + tagnames.join(";") + "/info", function ( response ) {
		callback( response );
	});

}

function getTopAnswerers ( options, tagname, period, callback ) {

	retrieve( options, "tags/" + tagname + "/top-answerers/" + period, function ( response ) {
		callback( response );
	});

}

module.exports = {
	getInfo: getInfo,
	getTopAnswerers: getTopAnswerers
}
