import CameraViewfinder from "@/components/CameraViewfinder";
import Timer from "@/components/Timer";
import TodaysColor from "@/components/TodaysColor";
import { useColor } from "@/context/ColorContext";
import { useTimer } from "@/context/TimerContext";
import { useNavigation } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

const HomeScreen = () => {
	const { targetColor } = useColor();
	const { timeLeft } = useTimer();

	return (
		<SafeAreaView style={{ backgroundColor: "purple", flex: 1, gap: 16 }}>
			<TodaysColor color={targetColor} />
			{timeLeft && <Timer timeLeft={timeLeft} />}
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
