import * as ToastPrimitive from '@radix-ui/react-toast';
import { FC } from 'react';
import './toast.css'
import { NotifyEventData, closeNotify } from './toastProvider';
import cn from 'classnames'
import ReactIcon from '../../assets/react.svg'

export type ToastProps = NotifyEventData

export const Toast: FC<ToastProps> = ({ title, content, notifyId, duration, type }) => {
  return (
    <ToastPrimitive.Root 
      className={cn('ToastRoot', type)}
      duration={duration}
      onAnimationEndCapture={({animationName}) => {
        if (animationName === 'hide') {
          closeNotify(notifyId)
        }
      }}
    >
      <img src={ReactIcon} alt="" />
      <div className={'ToastContent'}>
        <ToastPrimitive.Title className="ToastTitle">{title}</ToastPrimitive.Title>
        <ToastPrimitive.Description className="ToastDescription">
          {content}
        </ToastPrimitive.Description>
      </div>
      <ToastPrimitive.Close className='ToastClose'>
        <span aria-hidden>x</span>
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
};