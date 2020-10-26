import { useRef, useState } from 'react';

import Typing from 'react-typing-animation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './chatdemo.module.css';

const ChatDemo = ({}) => {
  const [dialogue, setDialogue] = useState<{
    id: number;
    name: string;
    message: string;
    time: string;
  }[]>([]);

  return (
    <div className={styles.container}>
      <div className={styles.dialogue}>
        {dialogue.map(input => {
          const {id, name, message, time} = input;
          return <div key={id} className={styles.message} > 
            <div className={styles.profile_picture} />
            <div>
              <div className={styles.message_top}>
                <span>{name}</span>
                <span>Today at {time}</span>
              </div>
              <p className={styles.message_bottom}>{message}</p>
            </div>
          </div>
        })}
      </div>
      <div className={styles.input}>
        <div className={styles.extensions_button}>
          <FontAwesomeIcon className={styles.extensions_button_icon} icon={faPlus} />
        </div>
        <Typing onFinishedTyping={() => {
            setDialogue([...dialogue, {
              id: 1234,
              name: "Jimbo",
              message: ">presets list",
              time: "00:06 AM"
            }])
        }}
        speed={100}
        >
          <span style={{color: "white"}}>&gt;presets list</span>
          <Typing.Reset count={1} delay={200} />
        </Typing>
      </div>
    </div>
  )
}

export default ChatDemo;