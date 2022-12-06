export interface INotificationState {
  notificationArray: INotification[];
}

export interface INotification {
  message: any;
  timestamp: Date;
  type: NotificationType;
  title?: string;
}

export const enum NotificationType {
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
  Info = 'info',
}
