import Image from "next/image";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { UserMessage } from "@sendbird/chat/message";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface CustomChannelPreviewProps {
  channel: GroupChannel;
  onLeaveChannel?: (channel: GroupChannel) => Promise<void>;
}

export default function CustomChannelPreview({
  channel,
  onLeaveChannel,
}: CustomChannelPreviewProps) {
  const { lastMessage, memberCount, inviter, isTyping } = channel;
  const formattedTime = format(
    new Date(lastMessage?.createdAt ?? ""),
    "a h:mm",
    {
      locale: ko,
    }
  );
  console.log(isTyping);
  return (
    <div className="flex items-center gap-3 p-3">
      <Image
        height={40}
        width={40}
        src={channel.coverUrl}
        alt="Channel Cover"
        className="rounded-full"
      />
      <div className="grow-1">
        <strong>
          {memberCount === 2 ? (
            <>{inviter?.nickname}</>
          ) : (
            <>
              {channel.members
                .slice(0, 2)
                .map((member) => member.nickname)
                .join(",")}
              {memberCount}
            </>
          )}
        </strong>
        <div className="text-sm text-gray-800">
          <span>
            {isTyping ? (
              <>작성중...</>
            ) : (
              <>{(channel.lastMessage as UserMessage)?.message}</>
            )}
          </span>
        </div>
      </div>
      <span className="text-xs text-gray-500">{formattedTime}</span>

      <button
        onClick={() => onLeaveChannel && onLeaveChannel(channel)}
        className="text-xs text-white  bg-red-400 w-10 h-10 rounded"
      >
        Leave
      </button>
    </div>
  );
}
