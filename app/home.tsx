import CameraViewfinder from "@/components/CameraViewfinder";
import { useColor } from "@/context/ColorContext";
import { useTimer } from "@/context/TimerContext";
import { useNavigation } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

const HomeScreen = () => {
	const { timeLeft } = useTimer();

	const navigation = useNavigation();

	const { targetColor } = useColor();

	const fontColor = [
		targetColor.red,
		targetColor.green,
		targetColor.blue
	].some((value) => value > Math.floor(255 / 2))
		? "#000000"
		: "#FFFFFF";

	const color = `rgb(${targetColor.red}, ${targetColor.green}, ${targetColor.blue})`;

	return (
		<SafeAreaView style={{ backgroundColor: "purple", flex: 1, gap: 16 }}>
			<View
				style={{
					backgroundColor: color,
					flex: 1,
					borderRadius: 8,
					marginHorizontal: 8,
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<Text
					style={{ fontSize: 20, color: fontColor }}
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
			<View
				style={{
					backgroundColor: "white",
					flex: 1,
					borderRadius: 8,
					marginHorizontal: 8,
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<Text style={{ fontSize: 20, color: "black" }}>
					{`${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
						.toString()
						.padStart(2, "0")}`}
				</Text>
			</View>
			<View
				style={{
					backgroundColor: "blue",
					flex: 8,
					borderRadius: 8,
					marginHorizontal: 8,
					overflow: "hidden"
				}}
			>
				<CameraViewfinder />
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;
