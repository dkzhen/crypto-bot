const headersRequest = async (token) => {
  const headers = {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      rawdata: token,
      "sec-ch-ua":
        '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126", "Microsoft Edge WebView2";v="126"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      cookie:
        "_ga=GA1.1.587369325.1722760309; _ga_KFJM6GVFXD=GS1.1.1722760309.1.1.1722761234.0.0.0",
      Referer: "https://app.tabibot.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  };
  return headers;
};
module.exports = { headersRequest };
