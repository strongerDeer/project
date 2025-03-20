"use client";
import { useState } from "react";

import "@sendbird/uikit-react/dist/index.css";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import GroupChannelList from "@sendbird/uikit-react/GroupChannelList";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import UserProfile from "./UserProfile";
import GroupChannelListHeader from "@sendbird/uikit-react/GroupChannelList/components/GroupChannelListHeader";
import CustomChannelPreview from "./CustomChannelPreview";

export default function SendbirdUI({ id }: { id: string }) {
  const [currentChannelUrl, setCurrentChannelUrl] = useState<string>("");

  const appId = process.env.NEXT_PUBLIC_APP_ID!;

  return (
    <div className="flex h-screen w-full">
      <SendbirdProvider appId={appId} userId={id}>
        <UserProfile />
        <div className="w-80 h-full border-r border-gray-200">
          {/* 대화방 리스트 */}
          <GroupChannelList
            // 선택된 채널
            selectedChannelUrl={currentChannelUrl}
            //채널 생성중
            onChannelCreated={(channel) => {
              setCurrentChannelUrl(channel.url);
            }}
            // 채널 선택 시
            onChannelSelect={(channel) => {
              if (!channel) return;
              setCurrentChannelUrl(channel.url);
            }}
            // 타이핑 여부
            isTypingIndicatorEnabled={true}
            // header
            renderHeader={() => (
              <GroupChannelListHeader
                renderLeft={() => <>Left</>}
                renderMiddle={() => <>Middle</>}
                renderRight={() => <>Right</>}
              />
            )}
            // preview
            renderChannelPreview={({ channel, onLeaveChannel }) => (
              <CustomChannelPreview
                channel={channel}
                onLeaveChannel={onLeaveChannel}
              />
            )}
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

              // renderMessage={({ message }) => (
              //   <CustomizedMessageItem message={message} />
              // )}
            />
          </div>
        )}
      </SendbirdProvider>
    </div>
  );
}
