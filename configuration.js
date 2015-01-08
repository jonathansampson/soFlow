var pattern = /{(\w+)}/g,
	template = "{protocol}://{address}/{version}/",
	configuration = {
		"version": 2.2,
		"pagesize": 100,
		"protocol": "http",
		"site": "stackoverflow",
		/* stackapps.com/apps/oauth */
		"key": "7EI*9EMH6MhHSXHZFVV6jA((",
		"address": "api.stackexchange.com"
	};

configuration.url = template.replace( pattern, function ( s, key ) {
    return configuration[ key ];
});

module.exports = configuration;
