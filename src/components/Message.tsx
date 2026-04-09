import type { MessageItem } from "../types";

type MessageProps = {
  messageInfo: MessageItem;
};

const getSentimentEmoji = (sentiment?: string | null) => {
  switch (sentiment) {
    case "positive":
      return "😊";
    case "negative":
      return "😠";
    case "neutral":
      return "😐";
    case "mixed":
      return "🤔";
    default:
      return "";
  }
};

export const Message = ({ messageInfo }: MessageProps) => {
  if (messageInfo.type === "system") {
    return (
      <div className="text-center text-sm text-gray-500 italic">
        <strong>{messageInfo.userName}:</strong> {messageInfo.message}
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-gray-100 px-4 py-3">
      <div className="font-semibold text-gray-800">{messageInfo.username}</div>
      <div className="text-gray-700">{messageInfo.text}</div>

      {messageInfo.sentiment && (
        <div className="mt-1 text-sm text-gray-500">
          {getSentimentEmoji(messageInfo.sentiment)} {messageInfo.sentiment}
        </div>
      )}
    </div>
  );
};
