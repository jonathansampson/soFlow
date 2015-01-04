var retrieve = require( "../retriever" );

function awaitingAnswers ( options, callback ) {

	retrieve( options, "questions/no-answers", function ( response ) {
		callback( response );
	});

}

module.exports = {
	awaitingAnswers: awaitingAnswers
}
