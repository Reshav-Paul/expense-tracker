import { useSelector } from "react-redux";

import { getMessages } from "../app/store";
import { messageClass, messageType, messageTypes } from "../utilities/types";

let MessagePanel: React.FC<{}> = function MessagePanel() {
  const messages = useSelector(getMessages);
  if (!messages) return <div></div>;
  if (messages.length === 0) return <div></div>;
  return <div style={{ 'position': 'absolute', 'bottom': '10px', 'right': '10px' }}>
    {
      messages.map(msgGrp => {
        return <MessageCard key={msgGrp.id} message={msgGrp} />
      })
    }
  </div>
}

let MessageCard: React.FC<{ message: messageType }> = function MessageCard(props) {
  let message = props.message;
  if (message.class === messageClass.list) {
    return < MultiLineMessageCard message={message} />;
  } else if (message.class === messageClass.multiline) {
    return < MultiLineMessageCard message={message} />;
  } else {
    return <SingleLineMessageCard message={message} />;
  }
}

let MultiLineMessageCard: React.FC<{ message: messageType }> = function (props) {
  let message = props.message;
  let msgTypeClass = getMessageTypeClass(message.type);

  return <div className={"msg-card " + msgTypeClass + ' ' + (message.removed ? 'removed' : 'visible')}>
    {message.prefix !== '' ? <h6>{message.prefix}</h6> : null}
    <ul className="pl-3">
      {
        message.messages.map((msg, idx) => {
          return <li id={message.id + idx} key={message.id + idx}>
            {message.class === messageClass.single
              ? <span style={{ marginRight: '6px' }}>{message.prefix}</span>
              : null}
            {msg}
          </li>;
        })
      }
    </ul>
  </div>;
}

let SingleLineMessageCard: React.FC<{ message: messageType }> = function (props) {
  let message = props.message;
  let msgTypeClass = getMessageTypeClass(message.type);

  return <div className={"msg-card " + msgTypeClass + ' ' + (message.removed ? 'removed' : 'visible')}>
    {
      message.messages.map((msg, idx) => {
        return <div id={message.id + idx} key={message.id + idx}>
          {message.class === messageClass.single
            ? <span style={{ marginRight: '6px' }}>{message.prefix}</span>
            : null}
          {msg}
        </div>;
      })
    }
  </div>;
}

function getMessageTypeClass(type: messageTypes) {
  return type === messageTypes.error
    ? 'error-msg'
    : type === messageTypes.warning
      ? 'warning-msg' : 'success-msg';
}

export default MessagePanel;