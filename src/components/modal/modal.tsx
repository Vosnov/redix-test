import { FC} from "react";
import * as Dialog from '@radix-ui/react-dialog';
import crossIcon from '../../assets/cross.svg'
import { Button } from "@radix-ui/themes";
import styles from './modal.module.css'

type Props = {
  children?: React.ReactNode
  trigger: React.ReactNode
  title?: string
  showCloseBtn?: boolean
} & Dialog.DialogProps

export const Modal: FC<Props> = ({children, trigger, title, showCloseBtn = true, ...props}) => {
  return (
    <Dialog.Root {...props} modal={true}>
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>

      <Dialog.Overlay className={styles.dialogOverlay} />
      <Dialog.Content className={styles.dialogContent + " radix-themes"}>
        {title && <Dialog.Title className={styles.modalTitle}>{title}</Dialog.Title>}
        {children}
        {showCloseBtn && (
          <Dialog.Close asChild>
            <Button variant="ghost" className={styles.crossButton}>
              <img src={crossIcon} />
            </Button>
          </Dialog.Close>
        )}
      </Dialog.Content>

    </Dialog.Root>
  )
}