import { useColor } from "@/context/ColorContext";
import { Text, View } from "react-native";

const AnalysisScreen = () => {
	const { targetColor } = useColor();

	return (
		<View style={{ backgroundColor: "orange", flex: 1 }}>
			<Text
				style={{ fontSize: 20, color: "#FFFFFF" }}
			>{`Today's Color: #${targetColor.red
				.toString(16)
				.padStart(2, "0")
				.toUpperCase()}${targetColor.green
				.toString(16)
				.padStart(2, "0")
				.toUpperCase()}${targetColor.blue
				.toString(16)
				.padStart(2, "0")
				.toUpperCase()}`}</Text>
		</View>
	);
};

export default AnalysisScreen;
