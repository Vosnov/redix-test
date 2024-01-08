import * as ToastPrimitive from '@radix-ui/react-toast';
import { FC, useEffect, useState } from 'react';
import { Toast } from './toast';

export type NotifyEventData = {
  title: string
  content: string
  notifyId: number
  duration?: number
  type?: 'success' | 'error'
}

const OPEN_NOTIFY_EVENT = 'open_notify'
const CLOSE_NOTIFY_EVENT = 'close_notify'

declare global {
  interface DocumentEventMap {
    [OPEN_NOTIFY_EVENT]: CustomEvent<NotifyEventData>
    [CLOSE_NOTIFY_EVENT]: CustomEvent<number>
  }
}

export const openNotify = (data: Omit<NotifyEventData, 'notifyId'>) => {
  const newNotify: NotifyEventData = {...data, notifyId: new Date().getTime()}
  document.dispatchEvent(new CustomEvent<NotifyEventData>(OPEN_NOTIFY_EVENT, {detail: newNotify}))
}

export const closeNotify = (id: number) => {
  document.dispatchEvent(new CustomEvent<number>(CLOSE_NOTIFY_EVENT, {detail: id}))
}

export const ToastProvider: FC = () => {
  const [notifications, setNotifications] = useState<NotifyEventData[]>([])
  console.log(notifications)

  useEffect(() => {
    const openNotify = ((event: CustomEvent<NotifyEventData>) => {
      setNotifications(prev => [...prev, event.detail])
    })

    const closeNotify = ((event: CustomEvent<number>) => {
      setNotifications(prev => prev.filter(notify => notify.notifyId !== event.detail))
    })

    document.addEventListener(OPEN_NOTIFY_EVENT, openNotify)
    document.addEventListener(CLOSE_NOTIFY_EVENT, closeNotify)

    return () => {
      document.removeEventListener(OPEN_NOTIFY_EVENT, openNotify)
      document.removeEventListener(CLOSE_NOTIFY_EVENT, closeNotify)
    }
  }, [])

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {notifications.map(notify => (
        <Toast
          key={notify.notifyId}
          {...notify}
        />
      ))}

      <ToastPrimitive.Viewport className="ToastViewport" />
    </ToastPrimitive.Provider>
  )
}


