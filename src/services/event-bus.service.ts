import { Subject } from 'rxjs'

export enum EventBusName {
  Logout = 'LOGOUT',
  Login = 'LOGIN',
  Error = 'ERROR'
}

export interface BaseEventType {
  type: EventBusName
  payload?: any
}

export interface BaseEvent<Payload> {
  type: EventBusName
  payload?: Payload
}

export interface PushEventType {
  type: EventBusName
  payload?: any
}

export class EventBus {
  private static instance: EventBus
  private eventSubject = new Subject()

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus()
    }

    return EventBus.instance
  }

  get events(): any {
    return this.eventSubject.asObservable()
  }

  post<T extends BaseEventType>(event: T): void {
    this.eventSubject.next(event)
  }
}

export const onPushEventBusHandler = (data: PushEventType) => {
  const { type, payload } = data
  EventBus.getInstance().post({ type, payload })
}
