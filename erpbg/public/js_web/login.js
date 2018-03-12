
frappe.utils.xss_sanitise = function (string, options) {
	// Reference - https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet
	let sanitised = string; // un-sanitised string.
	const DEFAULT_OPTIONS = {
		strategies: ['html', 'js'] // use all strategies.
	}
	const HTML_ESCAPE_MAP = {
		'<': '&lt',
		'>': '&gt',
		'"': '&quot',
		"'": '&#x27',
		'/': '&#x2F'
	};
	const REGEX_SCRIPT     = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi; // used in jQuery 1.7.2 src/ajax.js Line 14
	options          	   = Object.assign({ }, DEFAULT_OPTIONS, options); // don't deep copy, immutable beauty.

	// Rule 1
	if ( options.strategies.includes('html') ) {
		for (let char in HTML_ESCAPE_MAP) {
			const escape = HTML_ESCAPE_MAP[char];
			const regex = new RegExp(char, "g");
			sanitised = sanitised.replace(regex, escape);
		}
	}

	// Rule 3 - TODO: Check event handlers?
	if ( options.strategies.includes('js') ) {
		sanitised = sanitised.replace(REGEX_SCRIPT, "");
	}

	return sanitised;
}