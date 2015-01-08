var fsys = require( "fs" ),
	stackoverflow = require( "./stackoverflow" );

var ids = [ 54680, 530681, 2574883, 3587191, 3203524, 414145 ],
	tagnames = [ "internet-explorer" ],
	monthAgo = Math.floor( Date.now() * .001 - 2592000 );

	ids.push( 126229, 3538158 );

/* IE 6 through 11 */

for ( var i = 6; i < 12; i++ )
	//tagnames.push( "internet-explorer-" + i );

stackoverflow.users.getInfo(
	{ filter: "!LnNkvqp9u-aTwPWz1ZvckY" }, ids, function ( json ) {
		fsys.writeFile(
			"./data/users.json",
			JSON.stringify( json.items )
		);
	});

stackoverflow.users.getComments(
	{ fromdate: monthAgo, filter: "!9YdnSNNBB" }, ids, function ( json ) {
		fsys.writeFile(
			"./data/users.comments.json",
			JSON.stringify( json.items )
		);
	});

stackoverflow.users.getAnswers(
	{ fromdate: monthAgo, filter: "!SWKA(oRGwuxDpoZRYM" }, ids, function ( json ) {
		fsys.writeFile(
			"./data/users.answers.json",
			JSON.stringify( json.items )
		);
	});

stackoverflow.users.getReputationHistory(
	{ fromdate: monthAgo, filter: "!-.i.zYwWy0CU" }, ids, function ( json ) {
		fsys.writeFile(
			"./data/users.reputation-history.json",
			JSON.stringify( json.items )
		);
	});

stackoverflow.users.getRecentlyActiveTags(
	{ fromdate: monthAgo, filter: "!9f2VD2yfM" }, ids, function ( json ) {
		fsys.writeFile(
			"./data/users.tags.json",
			JSON.stringify( json.items )
		);
	});

// stackoverflow.users.getTopAnswerTags(
// 	{ fromdate: monthAgo }, 54680, function ( json ) {
// 		fsys.writeFile(
// 			"./data/users.54680.top-answer-tags.json",
// 			JSON.stringify( json.items )
// 		);
// 	});

stackoverflow.tags.getInfo(
	{ fromdate: monthAgo, filter: "!-.G.68phH_FI" }, tagnames, function ( json ) {
		fsys.writeFile(
			"./data/tags.json",
			JSON.stringify( json.items )
		);
	});


/*
	There's a problem with this next operation that may inflate
	actual user interaction on the site. If a question is tagged 
	[internet-explorer] and [internet-explorer-11], a user who 
	answers it will receive a single set of upvotes. However, both 
	tags will list that user has having one those points.

	Upon merging the data from both tags, we may mistakenly count
	the single votes from both locations as unique votes, and thus
	merge them. This can inflate the record of how many answers
	were given, as well as how many points were awarded.

	For now we will only query [internet-explorer]
*/

var global = [];

tagnames.forEach(function ( tagname, index, array ) {
	stackoverflow.tags.getTopAnswerers(
		{ filter: "!6JEiT(2F_W87n" }, tagname, "month", function ( json ) {

			global.push( json.items );

			// Simple check to see if all tag data has been recovered
			if ( global.length === array.length ) {
				global = global.reduce(function ( previous, current ) {
					current.forEach(function ( entry ) {
						for ( var i = 0; i < previous.length; i++ ) {
							if ( previous[i].user.user_id === entry.user.user_id ) {
								previous[i].score += entry.score;
								previous[i].post_count += entry.post_count;
								return;
							}
						}
						previous.push( entry );
					});
					return previous;
				}, []);

				fsys.writeFile(
					"./data/tags.top-answerers.month.json",
					JSON.stringify( global )
				);
			}
		});
});

stackoverflow.questions.awaitingAnswers(
	{ fromdate: monthAgo,
	  tagged: "internet-explorer" }, function ( json ) {
		fsys.writeFile(
			"./data/questions.no-answers.json",
			JSON.stringify( json.items )
		);
	});
