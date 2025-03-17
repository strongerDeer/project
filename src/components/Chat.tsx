"use client";
import { useState } from "react";

import "@sendbird/uikit-react/dist/index.css";
import GroupChannelList from "@sendbird/uikit-react/GroupChannelList";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";

export default function Chat() {
  const [currentChannelUrl, setCurrentChannelUrl] = useState<string>();

  // SendBird 연결에 필요한 환경 변수 확인
  if (!process.env.NEXT_PUBLIC_APP_ID || !process.env.NEXT_PUBLIC_USER_ID) {
    return <div>SendBird 환경 변수가 설정되지 않았습니다.</div>;
  }

  return (
    <div className="flex h-screen w-full">
      <SendbirdProvider
        appId={process.env.NEXT_PUBLIC_APP_ID}
        userId={process.env.NEXT_PUBLIC_USER_ID}
        accessToken={process.env.NEXT_PUBLIC_ACCESS_TOKEN || undefined}
        nickname="왜 안돼"
      >
        <div className="sendbird-app__channellist-wrap">
          <GroupChannelList
            selectedChannelUrl={currentChannelUrl}
            onChannelCreated={(channel) => {
              setCurrentChannelUrl(channel.url);
            }}
            onChannelSelect={(channel) => {
              setCurrentChannelUrl(channel?.url);
            }}
          />
        </div>
        {currentChannelUrl && ( // 중요: 채널 URL이 있을 때만 GroupChannel 렌더링
          <div className="grow-1">
            <GroupChannel
              channelUrl={currentChannelUrl}
              renderChannelHeader={() => <div>Header</div>}
              renderMessage={(props) => {
                const { message } = props;
                return <div>{message.message}</div>;
              }}
            />
          </div>
        )}
      </SendbirdProvider>
    </div>
  );
}
