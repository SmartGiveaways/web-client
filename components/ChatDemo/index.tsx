import {useRef, useState} from "react";

import Typing from "react-typing-animation";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import styles from "./chatdemo.module.css";

const timeout = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

interface Input {
  id: number;
  name: string;
  message: string | JSX.Element;
  time: string;
}

const ChatDemo = ({}) => {
  const [waiting, setWaiting] = useState<boolean>(false);
  const [dialogue, setDialogue] = useState<Input[]>([]);
  const [stage, setStage] = useState<number>(0);
  const dialogueRef = useRef(null);

  const addToDialogue = (input: Input) => {
    setDialogue((oldDialogue) => [...oldDialogue, input]);
  };

  const animateTyping = (text: string, callback: () => void) => {
    return (
      <Typing onFinishedTyping={callback} speed={90} hideCursor>
        <div className={styles.input_text_container}>
          <div className={styles.input_text}>{text}</div>
        </div>
        <Typing.Reset delay={200}/>
      </Typing>
    );
  };

  enum input {
    BOT,
    JIMBO,
  }

  const message = (messenger, message: JSX.Element): void | Promise<void> => {
    const id = Math.random() * 1000;
    if (messenger === input.JIMBO) {
      addToDialogue({
        id,
        message,
        name: "Jimbo",
        time: "00:06 AM",
      });
      scrollToBottom();
    } else {
      setWaiting(true);
      return timeout(1500).then(() => {
        setWaiting(false);
        addToDialogue({
          id,
          message,
          name: "SmartGiveaways",
          time: "00:06 AM",
        });
        scrollToBottom();
      });
    }
  };

  const embed = (title: string, children: JSX.Element, reaction?: boolean): JSX.Element => {
    return (
      <div>
        <div className={styles.message_bottom + " " + styles.embed} style={{margin: reaction ? "0 0 10px 0" : ""}}>
          <div className={styles.embed_bar}/>
          <div className={styles.embed_content}>
            <h1>{title}</h1>
            {children}
          </div>
        </div>
        {reaction ? <div className={styles.reaction}>
          <img src="/party-popper.png" alt="pop"/>
          <span>1</span>
        </div> : <></>}
      </div>
    );
  }

  const highlight = (text: string) => {
    return <span style={{color: "#ff6bb2", background: "rgba(255, 107, 178, 0.2)", padding: "1px"}}>{text}</span>;
  }

  const scrollToBottom = () => {
    const {current} = dialogueRef;
    current.scrollTop = current.scrollHeight;
  }

  return (
    <div className={styles.container}>
      <div className={styles.dialogue} ref={dialogueRef}>
        {dialogue.map((input) => {
          const {id, name, message, time} = input;
          return (
            <div key={id} className={styles.message}>
              <div className={styles.profile_picture}
                   style={{background: `url(${name === "SmartGiveaways" ? "icon-50.png" : "jimbo.png"})`}}/>
              <div>
                <div className={styles.message_top}>
                  <span>{name}</span>
                  <span>Today at {time}</span>
                </div>
                <div className={styles.message_bottom}>{message}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.input}>
        <div className={styles.extensions_button}>
          <FontAwesomeIcon className={styles.extensions_button_icon} icon={faPlus}/>
        </div>
        {stage === 0 && animateTyping(">ghelp", async () => {
          message(input.JIMBO, <p>&gt;ghelp</p>);
          await message(input.BOT, embed("SmartGiveaways Help", (
            <div>
              <p style={{fontWeight: "bold", color: "white", fontSize: "13px"}}>General Commands</p>
              <p>&gt;entries</p>
              <p style={{fontWeight: "bold", color: "white", fontSize: "13px"}}>Admin Commands</p>
              <p>&gt;giveaway</p>
              <p>&gt;preset</p>
              <p>&gt;gadmin</p>
              <p>&gt;gban</p>
              <p>&gt;gsban</p>
              <p>&gt;gunban</p>
            </div>
          )));
          await timeout(800);
          setStage(1);
        })}
        {stage === 1 && animateTyping(">presets list ", async () => {
          message(input.JIMBO, <p>&gt;presets list</p>);
          await message(input.BOT, embed("Current Presets (2)", (
            <div>
              <p>default - This cannot be removed</p>
              <p>test</p>
            </div>
          )));
          await timeout(500);
          setStage(2);
        })}
        {stage === 2 && animateTyping(">giveaway", async () => {
          message(input.JIMBO, <p>&gt;giveaway</p>);
          await message(input.BOT, embed("Giveaway Command Help", (
            <div>
              <p>&gt;giveaway list</p>
              <p>&gt;giveaway create</p>
              <p>&gt;giveaway reroll</p>
              <p style={{fontSize: "9px"}}>Do &gt;ghelp for all commands.</p>
            </div>
          )));
          await timeout(500);
          setStage(3);
        })}
        {stage === 3 && animateTyping(">g create test 1day #giveaways 2 Nitro Giveaway", async () => {
          await message(input.JIMBO, <p>&gt;g create test 1day {highlight("#giveaways")} 2 Nitro Giveaway</p>);
          await message(input.BOT, <p>Created your giveaway in {highlight("#giveaways")}</p>);
          await message(input.BOT, embed("Giveaway: Nitro Giveaway", (
            <p>Ends in 23 hours 59 minutes with 2 winners</p>
          ), true));
          await timeout(10000);
          setStage(0);
          setDialogue([]);
        })}
      </div>
      {waiting && (
        <div className={styles.waiting}>
          <div className={styles.waiting_dot}/>
          <div className={styles.waiting_dot}/>
          <div className={styles.waiting_dot}/>
          <p><span>SmartGiveaways</span> is typing...</p>
        </div>
      )}
    </div>
  )
}

export default ChatDemo;
