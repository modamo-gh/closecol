import CameraCapture from "@/components/CameraCapture";
import ImageProcessor from "@/components/ImageProcessor";
import Result from "@/components/Result";
import Timer from "@/components/Timer";
import TodaysColor from "@/components/TodaysColor";
import { useColor } from "@/context/ColorContext";
import { usePhotoContext } from "@/context/PhotoContext";
import { useTimer } from "@/context/TimerContext";
import { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";

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
			<View
				style={{
					alignItems: "center",
					backgroundColor: "#FFFFFF",
					borderRadius: 8,
					flex: 1,
					justifyContent: "center",
					marginHorizontal: 8
				}}
			></View>
		</SafeAreaView>
	);
};

export default HomeScreen;
