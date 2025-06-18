export interface Subscriber {
  id?: string;
  email: string;
  lastNotification: Date | null;
}
