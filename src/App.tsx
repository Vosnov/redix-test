import { useState } from 'react'
import './App.css'
import { Button, TextFieldInput } from '@radix-ui/themes';
import { Modal } from './components/modal/modal';

function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Modal open={open} onOpenChange={setOpen} title={'Title'} trigger={<Button>Modal</Button>}>
        <form className="form">
          <div>
            <p>Login</p>
            <TextFieldInput/>
          </div>
          <div>
            <p>Password</p>
            <TextFieldInput/>
          </div>
          <Button onClick={() => setOpen(false)} type='button'>Submit</Button>
        </form>
      </Modal>

      <Modal title={'Title 2'} trigger={<Button>Modal 2</Button>}>
        <form className="form">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore atque molestias sequi consectetur magnam tempora quis ut perferendis voluptates ipsam quidem at mollitia dicta quibusdam fuga, ipsa, error doloremque maxime in? Aperiam mollitia magnam, sapiente recusandae fugiat consequuntur placeat repudiandae omnis commodi ut, natus reprehenderit laborum nesciunt non harum voluptatum.</p>
        </form>
      </Modal>
    </>
  )
}

export default App
