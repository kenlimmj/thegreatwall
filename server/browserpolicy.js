var rootUrl = __meteor_runtime_config__.ROOT_URL;

// Blanket block all DDPs from connecting to our app
BrowserPolicy.content.disallowConnect();

// Re-enable DDP connections from our own WS server
BrowserPolicy.content.allowConnectOrigin(rootUrl);
BrowserPolicy.content.allowConnectOrigin(rootUrl.replace('http', 'ws'));
BrowserPolicy.content.allowConnectOrigin(rootUrl.replace('https', 'wss'));

// FIXME: Temporary code to allow for DDP connections when hosting on meteor.com
BrowserPolicy.content.allowConnectOrigin("https://*.meteor.com");
BrowserPolicy.content.allowConnectOrigin("wss://*.meteor.com");

// Allow fonts to be loaded from the CDN, and via data URI
BrowserPolicy.content.allowOriginForAll('brick.a.ssl.fastly.net');
BrowserPolicy.content.allowFontDataUrl();

// Allow fonts to be loaded from the CDN, and via data URI
BrowserPolicy.content.allowOriginForAll('fonts.googleapis.com');
BrowserPolicy.content.allowOriginForAll('themes.googleusercontent.com');
BrowserPolicy.content.allowFontDataUrl();

// Allow GA to be loaded from the world of self-driving cars
BrowserPolicy.content.allowOriginForAll('*.google-analytics.com');

// Allow Mathjax to be loaded from the CDN
BrowserPolicy.content.allowScriptOrigin('beta.mathjax.org');
BrowserPolicy.content.allowScriptOrigin('cdn.mathjax.org');
BrowserPolicy.content.allowEval();

// Allow images from everywhere on the web
BrowserPolicy.content.allowImageOrigin('*');

// Prevent the app from rendering within an iframe
BrowserPolicy.framing.disallow()