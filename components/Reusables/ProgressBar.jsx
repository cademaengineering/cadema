import { StyleSheet, View } from "react-native";

const ProgressBar = ({ progress = 0.5, fillerColor = "#16A34A" }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.filler,
          { width: `${progress * 100}%`, backgroundColor: fillerColor },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: "100%",
    backgroundColor: "#E5E5E5",
    borderRadius: 4,
    overflow: "hidden",
  },
  filler: {
    height: "100%",
    borderRadius: 4,
  },
});

export default ProgressBar;
