import CameraCapture from "@/components/CameraCapture";
import CameraViewfinder from "@/components/CameraViewfinder";
import Result from "@/components/Result";
import Timer from "@/components/Timer";
import TodaysColor from "@/components/TodaysColor";
import { useColor } from "@/context/ColorContext";
import { useTimer } from "@/context/TimerContext";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

const HomeScreen = () => {
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [timeSolved, setTimeSolved] = useState(0);
	const { targetColor } = useColor();
	const { timeLeft } = useTimer();

	useEffect(() => {
		if (!timeLeft) {
			setHasSubmitted(true);
			setTimeSolved(0);
		}
	}, [timeLeft]);

	return (
		<SafeAreaView style={{ backgroundColor: "purple", flex: 1, gap: 16 }}>
			<TodaysColor color={targetColor} />
			{hasSubmitted || timeLeft === 0 ? (
				<Result timeSolved={timeSolved} />
			) : (
				<Timer timeLeft={timeLeft} />
			)}
			{/* <CameraViewfinder
				hasSubmitted={hasSubmitted}
				setHasSubmitted={setHasSubmitted}
				setTimeSolved={setTimeSolved}
			/> */}
			<CameraCapture />
		</SafeAreaView>
	);
};

export default HomeScreen;
