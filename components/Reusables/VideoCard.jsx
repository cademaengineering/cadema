import CameraIcon from "@/assets/icons/camera-icon.svg";
import PlayDone from "@/assets/icons/play-done.svg";
import PlayNotDone from "@/assets/icons/play-not-done.svg";
import VideoDone from "@/assets/icons/video-done.svg";
import VideoNotDone from "@/assets/icons/video-not-done.svg";
import { TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";
import TextHeader from "./TextHeader";

const VideoCard = ({ played, title = "Overview", duration = "12min" }) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View
        className={`flex-row justify-between items-center p-5 rounded-[12px] ${
          played ? "border border-[#13E0A0] bg-[#13E0A00F]" : "bg-[#F2F2F2]"
        }`}
      >
        <View className="flex-row justify-start items-center gap-3">
          {played ? (
            <VideoDone width={44} height={44} />
          ) : (
            <VideoNotDone width={44} height={44} />
          )}
          <View className="gap-1">
            <TextHeader
              content={title}
              textStyles={`${
                played ? "text-[#030303]" : "text-[#999999]"
              } text-[16px]`}
              customLineHeight={16}
            />
            <View className="flex-row justify-start items-center gap-2">
              <CameraIcon width={16} height={16} />
              <TextContainer
                content={`Video | ${duration}`}
                textStyles={`text-[#ADADAD]`}
              />
            </View>
          </View>
        </View>
        {played ? (
          <PlayDone width={24} height={24} />
        ) : (
          <PlayNotDone width={24} height={24} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default VideoCard;
