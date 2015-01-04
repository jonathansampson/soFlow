var fsys = require( "fs" ),
	stackoverflow = require( "./stackoverflow" );

var ids = [ 54680 ],
	tagnames = [ "internet-explorer" ];

/* Users */

stackoverflow.users.getInfo(
	{ filter: "!LnNkvqp9u-aTwPWz1ZvckY" }, ids, function ( json ) {
		fsys.writeFile(
			"./data/staff.json",
			JSON.stringify( json.items )
		);
	});

stackoverflow.users.getComments(
	{ filter: "!9YdnSNNBB" }, ids, function ( json ) {
		fsys.writeFile(
			"./data/comments.json",
			JSON.stringify( json.items )
		);
	});

stackoverflow.users.getAnswers(
	{ filter: "!.FjwPGDVPvKrXz2PZAw-beudQI.hK" }, ids, function ( json ) {
		fsys.writeFile(
			"./data/answers.json",
			JSON.stringify( json.items )
		);
	});

stackoverflow.users.getReputationHistory(
	{ filter: "!-.i.zYwWy0CU" }, ids, function ( json ) {
		fsys.writeFile(
			"./data/reputationHistory.json",
			JSON.stringify( json.items )
		);
	});

/* Tags */

stackoverflow.tags.getInfo(
	{ filter: "!-.G.68phH_FI" }, tagnames, function ( json ) {
		fsys.writeFile(
			"./data/tags.json",
			JSON.stringify( json.items )
		);
	});

tagnames.forEach(function ( tagname ) {
	stackoverflow.tags.getTopAnswerers(
		{ filter: "!)Q2B_A7.Dok)xCMc6u6FrecY" }, tagname, "month", function ( json ) {
			fsys.writeFile(
				"./data/" + tagname + ".json",
				JSON.stringify( json.items )
			);
		});
});

/* Questions */

stackoverflow.questions.awaitingAnswers(
	{ tagged: "internet-explorer", 
	  filter: "!gB4j)jX-VQazvs1gYGzwD(UW)e4hgXgiw66" }, function ( json ) {
		fsys.writeFile(
			"./data/awaitingAnswers.json",
			JSON.stringify( json.items )
		);
	});