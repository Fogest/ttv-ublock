let userAgent = "";

chrome.storage.onChanged.addListener((changes) => {
	if (changes.userAgent) userAgent = changes.userAgent.newValue;
});

chrome.storage.local.get(
	{ userAgent: "LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)" },
	({ userAgent: storageUserAgent }) => {
		userAgent = storageUserAgent;

		chrome.webRequest.onBeforeSendHeaders.addListener(
			({ requestHeaders }) => {
				for (const header of requestHeaders) {
					if (header.name.toLowerCase() === "user-agent")
						header.value = userAgent;
				}

				return { requestHeaders };
			},
			{ urls: ["*://*.ttvnw.net/*"] },
			["blocking", "requestHeaders"]
		);
	}
);
