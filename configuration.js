var pattern = /{(\w+)}/g,
	template = "{protocol}://{address}/{version}/",
	configuration = {
		"version": 2.2,
		"protocol": "http",
		"site": "stackoverflow",
		/* stackapps.com/apps/oauth */
		"key": "",
		"address": "api.stackexchange.com"
	};

configuration.url = template.replace( pattern, function ( s, key ) {
    return configuration[ key ];
});

module.exports = configuration;
