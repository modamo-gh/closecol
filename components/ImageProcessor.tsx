import { useColor } from "@/context/ColorContext";
import { usePhotoContext } from "@/context/PhotoContext";
import { useTimer } from "@/context/TimerContext";
import { useImageColor } from "@/context/ImageColorContext";
import { Canvas, Image, useCanvasRef } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const ImageProcessor = () => {
	const [canvasSize, setCanvasSize] = useState({ height: 0, width: 0 });
	const { averageColor, calculateScore, extractColor, skiaImage } =
		useImageColor();
	const { hasSubmitted, photo, setHasSubmitted, setPhoto } =
		usePhotoContext();
	const { targetColor } = useColor();
	const { timeLeft, setTimeSolved } = useTimer();
	const ref = useCanvasRef();

	const onCanvasLayout = (event) => {
		const { height, width } = event.nativeEvent.layout;

		setCanvasSize({ height, width });

		console.log({ height, width });
	};

	useEffect(() => {
		if (!photo || !canvasSize.width || !canvasSize.height) {
			return;
		}

		extractColor(photo.uri, ref);
	}, [photo, canvasSize]);

	useEffect(() => {
		if (averageColor) {
			calculateScore(targetColor, averageColor);
		}
	}, [averageColor]);

	return (
		<View style={{ flex: 1, position: "relative" }}>
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
	);
};

export default ImageProcessor;
