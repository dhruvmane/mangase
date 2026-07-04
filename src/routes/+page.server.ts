import { mangadexApiRefreshToken, setTokens } from "$lib/modules/globals/mangadexApiCredentials.svelte"
import { MANGADEX_CLIENT_ID, MANGADEX_CLIENT_SECRET, MANGADEX_PASSWORD, MANGADEX_USERNAME } from "$env/static/private"
import type { PageServerLoad } from "./$types"

const authTokenRoute = "https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token"

// First Connection => Returns Access Token + Refresh Token
async function getApiAuthToken() {

     const body = new URLSearchParams({
          grant_type: 'password',
          username: MANGADEX_USERNAME,
          password: MANGADEX_PASSWORD,
          client_id: MANGADEX_CLIENT_ID,
          client_secret: MANGADEX_CLIENT_SECRET
     })

     let tokens = await fetch(authTokenRoute, {
          method: 'POST',
          headers: {
               "Content-Type": "application/x-www-form-urlencoded"
          },
          body
     })

     // Check if Access Token is expired.
     // ACCESS TOKEN EXPIRES EVERY 15 MINUTES.
     if (tokens.ok) {
          const responseData = await tokens.json();
          setTokens(responseData.access_token, responseData.refresh_token)
     } else {
          refreshAuthToken(mangadexApiRefreshToken)
     }

}

// Get new Access TOKEN
async function refreshAuthToken(refresh_token: string) {
     const body = new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token,
          client_id: MANGADEX_CLIENT_ID,
          client_secret: MANGADEX_CLIENT_SECRET
     })
     let responseData = await (await fetch(authTokenRoute, { method: "POST", headers: {"Content-Type": "application/x-www-form-urlencoded"}, body})).json();
     setTokens(responseData.access_token, refresh_token)
}

export const load: PageServerLoad = async () => {
     // getApiAuthToken()
}