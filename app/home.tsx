import Button from "@/components/Button";
import CameraCapture from "@/components/CameraCapture";
import Result from "@/components/Result";
import Timer from "@/components/Timer";
import TodaysColor from "@/components/TodaysColor";
import { useColor } from "@/context/ColorContext";
import { useImageColor } from "@/context/ImageColorContext";
import { usePhotoContext } from "@/context/PhotoContext";
import { useTimer } from "@/context/TimerContext";
import { Camera } from "expo-camera";
import { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import Share from "react-native-share";

const HomeScreen = () => {
	const { score } = useImageColor();
	const { capturePhoto, hasSubmitted, photo, setHasSubmitted, setPhoto } =
		usePhotoContext();
	const { targetColor } = useColor();
	const { setTimeSolved, timeLeft, timeSolved } = useTimer();

	const requestCameraPermissions = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync();

		if (status !== "granted") {
			alert("Camera access is required to take pictures");
		}
	};

	const shareImage = async (photoUri: string) => {
		const shareOptions = {
			title: "Share your color match!",
			message: `That was a #CloseCol! I scored ${Math.round(score)} in ${
				timeSolved >= 60
					? `${Math.floor(Number(timeSolved) / 60)} minutes and`
					: null
			}
			${Number(timeSolved) % 60} seconds. Think you can beat me? 🔥🎨`,
			url: photoUri,
			type: "image/jpeg"
		};

		try {
			await Share.open(shareOptions);
		} catch (error) {
			console.log("Error sharing:", error);
		}
	};

	useEffect(() => {
		if (!timeLeft && !hasSubmitted) {
			setHasSubmitted(true);
			setTimeSolved(0);
		}
	}, [timeLeft, hasSubmitted]);

	useEffect(() => {
		requestCameraPermissions();
	}, []);

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
					borderRadius: 8,
					display: "flex",
					flex: 1,
					flexDirection: "row",
					gap: 8,
					justifyContent: "space-between",
					marginHorizontal: 8,
					overflow: "hidden"
				}}
			>
				{!photo ? (
					<Button onPress={capturePhoto} title="Take Picture" />
				) : hasSubmitted ? (
					<Button
						onPress={() => shareImage(photo.uri)}
						title={"Share"}
					/>
				) : (
					<>
						<Button
							onPress={() => setPhoto(null)}
							title={"Retake"}
						/>
						<Button
							onPress={() => {
								setTimeSolved(210 - timeLeft);
								setHasSubmitted(true);
							}}
							title={"Submit"}
						/>
					</>
				)}
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;
