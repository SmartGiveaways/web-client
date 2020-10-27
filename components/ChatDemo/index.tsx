import { useRef, useState } from 'react';

import Typing from 'react-typing-animation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './chatdemo.module.css';

const timeout = (delay: number) => {
  return new Promise(resolve => setTimeout(resolve, delay));
}

interface Input {
  id: number;
  name: string;
  message: string;
  time: string;
}

const ChatDemo = ({}) => {
  const [waiting, setWaiting] = useState<boolean>(false);
  const [dialogue, setDialogue] = useState<Input[]>([]);
  const [stage, setStage] = useState<number>(0);

  const addToDialogue = (input: Input) => {
    setDialogue(oldDialogue => [...oldDialogue, input])
  }

  const animateTyping = (text: string, callback: () => void) => {
    return (
      <Typing onFinishedTyping={callback} speed={100} hideCursor>
        <span className={styles.input_text}>{text}</span>
        <Typing.Reset delay={200} />
      </Typing>
    );
  }

  const jimboMessage = (message: string) => {
    addToDialogue({
      id: 1,
      name: "Jimbo",
      message: message,
      time: "00:06 AM"
    });
  }
  
  const botMessage = () => {
    setWaiting(true);
    return timeout(2000).then(() => {
      setWaiting(false);
      addToDialogue({
          id: 2,
          name: "Bot",
          message: "response",
          time: "00:06 AM"
      });
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.dialogue}>
        {dialogue.map(input => {
          const {id, name, message, time} = input;
          return <div key={id} className={styles.message} > 
            <div className={styles.profile_picture} style={{background: name === "Bot" ? "#FF6BB2" : "#FF6B6B"}} />
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
        {stage === 0 && animateTyping(">presets list", async () => {
            jimboMessage(">presets list");
            await botMessage();
            await timeout(500);
            setStage(1);
        })}
        {stage === 1 && animateTyping(">giveaway", async () => {
            jimboMessage(">giveaway");
            await botMessage();
            await timeout(500);
            setStage(2);
        })}
        {stage === 2 && animateTyping(">g create test 1day #giveaways 2 Discord Nitro Giveaway", async () => {
            jimboMessage(">g create test 1day #giveaways 2 Discord Nitro Giveaway");
            await botMessage();
            await botMessage();
            await timeout(5000);
            setStage(0);
            setDialogue([]);
        })}
      </div>
      {waiting && (
        <div className={styles.waiting}>
          <div className={styles.waiting_dot} />
          <div className={styles.waiting_dot} />
          <div className={styles.waiting_dot} />
          <p><span>Bot</span> is typing...</p>
        </div>
      )}
    </div>
  )
}

export default ChatDemo;