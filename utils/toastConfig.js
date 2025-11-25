import { BaseToast } from "react-native-toast-message";
import { View } from "react-native";
import SuccessIcon from "@/assets/icons/success.svg";
import ErrorIcon from "@/assets/icons/error.svg";
import InfoIcon from "@/assets/icons/info.svg";

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#E8FFF8", backgroundColor: "#E8FFF8" }}
      contentContainerStyle={{ paddingHorizontal: 15, borderRadius: 30 }}
      text1Style={{ fontSize: 15, fontWeight: "bold", color: "#04583E" }}
      text2Style={{ fontSize: 13, color: "#04583E" }}
      renderLeadingIcon={() => (
        <View style={{ paddingLeft: 15, justifyContent: "center" }}>
          <SuccessIcon width={24} height={24} />
        </View>
      )}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#FBD7D6", backgroundColor: "#FBD7D6" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 15, fontWeight: "bold", color: "#CE2121" }}
      text2Style={{ fontSize: 13, color: "#CE2121" }}
      renderLeadingIcon={() => (
        <View style={{ paddingLeft: 15, justifyContent: "center" }}>
          <ErrorIcon width={24} height={24} />
        </View>
      )}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#FFEFD0", backgroundColor: "#FFEFD0" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 15, fontWeight: "bold", color: "#E26C24" }}
      text2Style={{ fontSize: 13, color: "#E26C24" }}
      renderLeadingIcon={() => (
        <View style={{ paddingLeft: 15, justifyContent: "center" }}>
          <InfoIcon width={24} height={24} />
        </View>
      )}
    />
  ),
};

export default toastConfig;
