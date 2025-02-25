import CameraCapture from "@/components/CameraCapture";
import ImageProcessor from "@/components/ImageProcessor";
import Result from "@/components/Result";
import Timer from "@/components/Timer";
import TodaysColor from "@/components/TodaysColor";
import { useColor } from "@/context/ColorContext";
import { usePhotoContext } from "@/context/PhotoContext";
import { useTimer } from "@/context/TimerContext";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

const HomeScreen = () => {
	const { hasSubmitted, setHasSubmitted } = usePhotoContext();
	const { targetColor } = useColor();
	const { setTimeSolved, timeLeft, timeSolved } = useTimer();

	useEffect(() => {
		if (!timeLeft && !hasSubmitted) {
			setHasSubmitted(true);
			setTimeSolved(0);
		}
	}, [timeLeft, hasSubmitted]);

	return (
		<SafeAreaView style={{ backgroundColor: "purple", flex: 1, gap: 16 }}>
			<TodaysColor color={targetColor} />
			{hasSubmitted || timeLeft === 0 ? (
				<Result timeSolved={timeSolved} />
			) : (
				<Timer timeLeft={timeLeft} />
			)}
			<CameraCapture />
		</SafeAreaView>
	);
};

export default HomeScreen;
