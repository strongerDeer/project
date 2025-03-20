import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import React, { useMemo, useCallback } from "react";

import AdminMessage from "./AdminMessage";
import FileMessage from "./FileMessage";
import UserMessage from "./UserMessage";
import { useGroupChannelContext } from "@sendbird/uikit-react/GroupChannel/context";

export default function CustomizedMessageItem(props) {
  const { message } = props;

  const store = useSendbirdStateContext();
  const { currentChannel } = useGroupChannelContext();
  const onDeleteMessage_ = sendbirdSelectors.getDeleteMessage(store);
  const onUpdateMessage_ = sendbirdSelectors.getUpdateUserMessage(store);

  const onDeleteMessage = useCallback(
    (message) => {
      onDeleteMessage_(currentChannel, message);
    },
    [onDeleteMessage_, currentChannel]
  );

  const onUpdateMessage = useCallback(
    (messageId, params) => {
      onUpdateMessage_(currentChannel, messageId, params);
    },
    [onUpdateMessage_, currentChannel]
  );

  const MessageHOC = useMemo(() => {
    if (message.isAdminMessage && message.isAdminMessage()) {
      return () => <AdminMessage message={message} />;
    } else if (message.isFileMessage && message.isFileMessage()) {
      return () => (
        <FileMessage
          message={message}
          userId={store.config.userId}
          onDeleteMessage={onDeleteMessage}
        />
      );
    } else if (message.isUserMessage && message.isUserMessage()) {
      return () => (
        <UserMessage
          message={message}
          userId={store.config.userId}
          onDeleteMessage={onDeleteMessage}
          onUpdateMessage={onUpdateMessage}
        />
      );
    }
    return () => <div />;
  }, [message, store.config.userId, onDeleteMessage, onUpdateMessage]);

  return (
    <div id={message.messageId} className="customized-message-item">
      <MessageHOC />
      <br />
    </div>
  );
}
