import { useColor } from "@/context/ColorContext";
import { useImageColor } from "@/hooks/useImageColor";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Canvas, Image, Rect, useCanvasRef } from "@shopify/react-native-skia";

const AnalysisScreen = () => {
	const { targetColor } = useColor();

	const { uri } = useLocalSearchParams();

	const { averageColor, extractColor, skiaImage } = useImageColor();
	const ref = useCanvasRef();

	const [canvasSize, setCanvasSize] = useState({ height: 0, width: 0 });

	const onCanvasLayout = (event) => {
		const { height, width } = event.nativeEvent.layout;

		setCanvasSize({ height, width });

		console.log({ height, width });
	};

	useEffect(() => {
		if (uri) {
			extractColor(uri, ref);
		}
	}, [uri]);

	const fontColor = [
		targetColor.red,
		targetColor.green,
		targetColor.blue
	].some((value) => value > Math.floor(255 / 2))
		? "#000000"
		: "#FFFFFF";

	const color = `rgb(${targetColor.red}, ${targetColor.green}, ${targetColor.blue})`;

	const userColor = `rgb(${averageColor?.red}, ${averageColor?.green}, ${averageColor?.blue})`;

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
					backgroundColor: userColor,
					flex: 1,
					borderRadius: 8,
					marginHorizontal: 8,
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<Text
					style={{ fontSize: 20, color: fontColor }}
				>{`Your Avg Color: #${averageColor?.red
					.toString(16)
					.padStart(2, "0")
					.toUpperCase()}${averageColor?.green
					.toString(16)
					.padStart(2, "0")
					.toUpperCase()}${averageColor?.blue
					.toString(16)
					.padStart(2, "0")
					.toUpperCase()}`}</Text>
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
		</SafeAreaView>
	);
};

export default AnalysisScreen;
