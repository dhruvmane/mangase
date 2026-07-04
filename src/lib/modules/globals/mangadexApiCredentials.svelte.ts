let mangadexApiAccessToken = "";
let mangadexApiRefreshToken = "";

function setTokens( access_token: string, refresh_token: string ) {
     mangadexApiAccessToken = access_token;
     mangadexApiRefreshToken = refresh_token;
     console.log(`SERVER: MangaDex API Tokens Loaded Successfully.`)

}

export { mangadexApiAccessToken, mangadexApiRefreshToken }
export { setTokens }