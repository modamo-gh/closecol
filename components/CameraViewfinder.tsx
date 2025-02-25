import { useColor } from "@/context/ColorContext";
import { useTimer } from "@/context/TimerContext";
import { useImageColor } from "@/hooks/useImageColor";
import { Canvas, useCanvasRef } from "@shopify/react-native-skia";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

const CameraViewfinder = ({ hasSubmitted, setHasSubmitted, setTimeSolved }) => {
	const [canvasSize, setCanvasSize] = useState({ height: 0, width: 0 });
	const ref = useCanvasRef();

	const { targetColor } = useColor();

	const { averageColor, calculateScore, extractColor, score, skiaImage } =
		useImageColor();

	const { timeLeft } = useTimer();

	useEffect(() => {
		if (!permissions?.granted) {
			setPermissions(permissions?.status === "granted");
		}
	}, []);

	

	const takePicture = async () => {
		if (cameraRef.current) {
			const p = await cameraRef.current.takePictureAsync();
			setPhoto(p);
		}
	};

	const onCanvasLayout = (event) => {
		const { height, width } = event.nativeEvent.layout;

		setCanvasSize({ height, width });

		console.log({ height, width });
	};

	useEffect(() => {
		if (photo && canvasSize.width > 0 && canvasSize.height > 0 &&ref.current) {
			extractColor(photo.uri, ref);
		}
	}, [photo, canvasSize,ref]);

	useEffect(() => {
		if (averageColor) {
			calculateScore(targetColor, averageColor);
		}
	}, [averageColor]);
	return (
		
			{!photo ? (
				<CameraView
					ref={cameraRef}
					style={{
						borderRadius: 8,
						flex: 1,
						alignItems: "center",
						justifyContent: "flex-end"
					}}
				>
					<Pressable
						onPress={async () => takePicture()}
						style={{
							backgroundColor: "#FFFFFF",
							height: 72,
							width: 72,
							borderRadius: 50,
							marginBottom: 16
						}}
					/>
				</CameraView>
			) : (
				<View
					style={{
						position: "relative",
						width: "100%",
						height: "100%"
					}}
				>
					{!hasSubmitted && (
						<View
							style={{
								flexDirection: "row",
								padding: 16,
								position: "absolute",
								top: 0,
								left: 0,
								justifyContent: "space-between",
								zIndex: 1,
								width: "100%"
							}}
						>
							<Text
								onPress={() => setPhoto(null)}
								style={{ color: "#FFFFFF", fontSize: 16 }}
							>
								Retake
							</Text>
							<Text
								onPress={() => {
									setTimeSolved(210 - timeLeft);
									setHasSubmitted(true);
								}}
								style={{ color: "#FFFFFF", fontSize: 16 }}
							>
								Submit
							</Text>
						</View>
					)}
					<Canvas
						onLayout={onCanvasLayout}
						ref={ref}
						style={{
							flex: 1
						}}
					>
						{skiaImage && (
							<Image
								image={skiaImage}
								height={canvasSize.height}
								width={canvasSize.width}
								x={0}
								y={0}
							/>
						)}
					</Canvas>
				</View>
			)}
		</View>
	);
};

export default CameraViewfinder;
