import CameraViewfinder from "@/components/CameraViewfinder";
import Result from "@/components/Result";
import Timer from "@/components/Timer";
import TodaysColor from "@/components/TodaysColor";
import { useColor } from "@/context/ColorContext";
import { useTimer } from "@/context/TimerContext";
import { SafeAreaView, View } from "react-native";

const HomeScreen = () => {
	const { targetColor } = useColor();
	const { timeLeft } = useTimer();

	return (
		<SafeAreaView style={{ backgroundColor: "purple", flex: 1, gap: 16 }}>
			<TodaysColor color={targetColor} />
			{timeLeft ? (
				<Timer timeLeft={timeLeft} />
			) : (
				<Result timeLeft={timeLeft} />
			)}
			
				<CameraViewfinder />
			
		</SafeAreaView>
	);
};

export default HomeScreen;
