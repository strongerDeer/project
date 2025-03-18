"use client";
import { useState } from "react";

import "@sendbird/uikit-react/dist/index.css";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import GroupChannelList from "@sendbird/uikit-react/GroupChannelList";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import UserProfile from "./UserProfile";

export default function SendbirdUI({ id }: { id: string }) {
  const [currentChannelUrl, setCurrentChannelUrl] = useState<string>("");

  const appId = process.env.NEXT_PUBLIC_APP_ID!;

  return (
    <div className="flex h-screen w-full">
      <SendbirdProvider appId={appId} userId={id}>
        <UserProfile />
        <div className="w-80 h-full border-r border-gray-200">
          <GroupChannelList
            // 채널 선택 시
            onChannelSelect={(channel) => {
              if (channel) {
                setCurrentChannelUrl(channel.url);
              }
            }}
            //채널 생성중
            onChannelCreated={(channel) => {
              setCurrentChannelUrl(channel.url);
            }}
            // 선택된 채널
            selectedChannelUrl={currentChannelUrl}
            // 타이핑 여부
            isTypingIndicatorEnabled={true}
          />
        </div>
        {currentChannelUrl && (
          <div className="grow-1">
            <GroupChannel
              channelUrl={currentChannelUrl}
              renderChannelHeader={() => (
                <div className="p-3 border-b border-gray-200 bg-white">
                  <h2 className="font-semibold">채팅방</h2>
                </div>
              )}
              // renderMessage={(props) => {
              //   const { message } = props;
              //   return <div>{message.message}</div>;
              // }}
            />
          </div>
        )}
      </SendbirdProvider>
    </div>
  );
}
