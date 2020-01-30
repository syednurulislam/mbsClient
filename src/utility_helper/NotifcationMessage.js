import { message } from "antd";
import { NotificationType } from "./HelperConstant";

message.config({
  top: 10,
  duration: 5,
  maxCount: 3
});

export function Notification(notify) {
  console.log("Notification=> ", notify);
  if (notify.type === NotificationType.Success) {
    message.success(notify.message);
  } else if (notify.type === NotificationType.Info) {
    message.info(notify.message);
  } else if (notify.type === NotificationType.Warning) {
    message.warning(notify.message);
  } else if (notify.type === NotificationType.Error) {
    message.error(notify.message);
  }
}
