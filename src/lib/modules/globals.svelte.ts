interface IAppInstance {
     _NOTIFICATIONS?: INotification[]
     _ACTIVE_PROFILE?: IProfile
     _AVAILABLE_PROFILES?: IProfile[],
     _NOTICE?: {
          fileName: string,
          showNotice: boolean
     },
     _USER_CONFIG?: {}
}

interface INotification {
     text: string,
     isShown: boolean,
     type: INotificationType
}

enum INotificationType {
     'SUCCESS',
     'FAIL',
     'PENDING'
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
          authors: IAuthor[],
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

let AppInstance: IAppInstance = $state({})

export { AppInstance }
export { INotificationType, type INotification }