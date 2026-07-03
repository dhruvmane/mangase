interface IAppInstance {
     _ACTIVE_PROFILE?: IProfile
     _AVAILABLE_PROFILES?: IProfile[],
     _NOTICE?: {
          fileName: string,
          showNotice: boolean
     }
}

interface IProfile {
     id: string,
     name: string,
     c_FollowedMangas?: IManga[]
}

interface IManga {
     id: string,
     details: {
          name: string,
          description: string,
          author: {
               id: string,
          }
          publisher: {
               id: string,
          }
     },
     chapters?: {
          max?: number,
          released?: number,
     }
}

interface IAuthor {
     id: string,
     details: {
          name: string,
          description: string
     },
     mangas?: IManga[]
}

interface IPublisher {
     id: string,
     details: {
          name: string,
          description: string
     },
     mangas?: IManga[]
}

let AppInstance: IAppInstance = $state({
     _NOTICE: {
          fileName: "notice",
          showNotice: true
     }
})

export { AppInstance }