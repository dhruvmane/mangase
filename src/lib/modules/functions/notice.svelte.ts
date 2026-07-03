import { AppInstance } from "../globals.svelte"

function hideNotice() {
     if (!AppInstance._NOTICE) return;
     AppInstance._NOTICE.showNotice = false
     
     console.log("USER_ACTION: Notice Hidden. Reload the page to see it again.")
}

export { hideNotice }