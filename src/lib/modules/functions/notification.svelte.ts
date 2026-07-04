import { AppInstance } from "../globals.svelte";
import { INotificationType, type INotification } from "../globals.svelte";

function createNotification(text: string, status: INotificationType) {
     // Create body and push to List
     let notificationBody: INotification = {
          text,
          isShown: false,
          type: status
     }
     AppInstance._NOTIFICATIONS?.push(notificationBody)
}
