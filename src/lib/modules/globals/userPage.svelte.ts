// _TOGGLED_DISPLAY: MANGA_LIST / REVIEWS / COMMENTS
let userPageConfig = $state({
     _TOGGLED_DISPLAY: "MANGA_LIST"
})

function switchDisplay(state: string) {
     userPageConfig._TOGGLED_DISPLAY = state
}

export { userPageConfig }
export { switchDisplay }