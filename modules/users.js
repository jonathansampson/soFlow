var retrieve = require( "../retriever" );

function getInfo ( options, ids, callback ) {
	retrieve( options, "users/" + ids.join(";"), function ( response ) {
		callback( response );
	});
}

function getComments ( options, ids, callback ) {
	retrieve( options, "users/" + ids.join(";") + "/comments", function ( response ) {
		callback ( response );
	});
}

function getAnswers ( options, ids, callback ) {
	retrieve( options, "users/" + ids.join(";") + "/answers", function ( response ) {
		callback( response );
	});
}

function getReputationHistory ( options, ids, callback ) {
	retrieve( options, "users/" + ids.join(";") + "/reputation-history", function ( response ) {
		callback( response );
	});
}

function getRecentlyActiveTags ( options, ids, callback ) {
	retrieve( options, "users/" + ids.join(";") + "/tags", function ( response ) {
		callback( response );
	});
}

function getTopAnswerTags ( options, id, callback ) {
	retrieve( options, "users/" + id + "/top-answer-tags", function ( response ) {
		callback( response );
	});
}

module.exports = {
	getInfo: getInfo,
	getComments: getComments,
	getAnswers: getAnswers,
	getReputationHistory: getReputationHistory,
	getRecentlyActiveTags: getRecentlyActiveTags,
	getTopAnswerTags: getTopAnswerTags
};
