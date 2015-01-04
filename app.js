var fsys = require( "fs" ),
	stackoverflow = require( "./stackoverflow" );

var ids = [ 54680, 530681, 788998, 2574883, 3587191 ],
	tagnames = [ "internet-explorer" ];

/* IE 6 through 11 */

for ( var i = 6; i < 12; i++ )
	tagnames.push( "internet-explorer-" + i );

/* Users */

stackoverflow.users.getInfo(
	{ filter: "!LnNkvqp9u-aTwPWz1ZvckY" }, ids, function ( json ) {
		fsys.writeFile(
			"./data/staff.json",
			JSON.stringify( json.items, null, "\t" )
		);
	});

stackoverflow.users.getComments(
	{ filter: "!9YdnSNNBB" }, ids, function ( json ) {
		fsys.writeFile(
			"./data/comments.json",
			JSON.stringify( json.items, null, "\t" )
		);
	});

stackoverflow.users.getAnswers(
	{ filter: "!.FjwPGDVPvKrXz2PZAw-beudQI.hK" }, ids, function ( json ) {
		fsys.writeFile(
			"./data/answers.json",
			JSON.stringify( json.items, null, "\t" )
		);
	});

stackoverflow.users.getReputationHistory(
	{ filter: "!-.i.zYwWy0CU" }, ids, function ( json ) {
		fsys.writeFile(
			"./data/reputationHistory.json",
			JSON.stringify( json.items, null, "\t" )
		);
	});

stackoverflow.users.getRecentlyActiveTags(
	{ filter: "!9f2VD2yfM" }, ids, function ( json ) {
		fsys.writeFile(
			"./data/users.tags.json",
			JSON.stringify( json.items, null, "\t" )
		);
	});

stackoverflow.users.getTopAnswerTags(
	{}, 54680, function ( json ) {
		fsys.writeFile(
			"./data/users.54680.top-answer-tags.json",
			JSON.stringify( json.items, null, "\t" )
		);
	});

/* Tags */

stackoverflow.tags.getInfo(
	{ filter: "!-.G.68phH_FI" }, tagnames, function ( json ) {
		fsys.writeFile(
			"./data/tags.json",
			JSON.stringify( json.items, null, "\t" )
		);
	});

tagnames.forEach(function ( tagname ) {
	stackoverflow.tags.getTopAnswerers(
		{ filter: "!)Q2B_A7.Dok)xCMc6u6FrecY" }, tagname, "month", function ( json ) {
			fsys.writeFile(
				"./data/" + tagname + ".json",
				JSON.stringify( json.items, null, "\t" )
			);
		});
});

/* Questions */

stackoverflow.questions.awaitingAnswers(
	{ tagged: "internet-explorer", 
	  filter: "!gB4j)jX-VQazvs1gYGzwD(UW)e4hgXgiw66" }, function ( json ) {
		fsys.writeFile(
			"./data/awaitingAnswers.json",
			JSON.stringify( json.items, null, "\t" )
		);
	});