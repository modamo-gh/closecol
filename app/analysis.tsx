import { useColor } from "@/context/ColorContext";
import { useImageColor } from "@/hooks/useImageColor";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import Canvas from "react-native-canvas";

const AnalysisScreen = () => {
	const { targetColor } = useColor();

	const { uri } = useLocalSearchParams();

	const { averageColor, extractColor } = useImageColor();
	const canvasRef = useRef(null)

	useEffect(() => {
		if (uri) {
			extractColor(Array.isArray(uri) ? uri[0] : uri, canvasRef)
		}
	}, [uri]);

	console.log(averageColor)

	return (
		<View style={{ backgroundColor: "orange", flex: 1 }}>
			<Text
				style={{ fontSize: 20, color: "#FFFFFF" }}
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
			<Canvas ref={canvasRef} style={{ width: 1, height: 1, opacity: 0 }} />
			{averageColor ? (
				<Text style={{ fontSize: 20, color: "#FFFFFF", marginTop: 10 }}>
					Extracted Color: #
					{averageColor.red.toString(16).padStart(2, "0").toUpperCase()}
					{averageColor.green.toString(16).padStart(2, "0").toUpperCase()}
					{averageColor.blue.toString(16).padStart(2, "0").toUpperCase()}
				</Text>
			) : (
				<Text style={{ fontSize: 18, color: "#FFFFFF", marginTop: 10 }}>
					Extracting color...
				</Text>
			)}
		</View>
	);
};

export default AnalysisScreen;
