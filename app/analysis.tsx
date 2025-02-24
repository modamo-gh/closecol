import { useColor } from "@/context/ColorContext";
import { useImageColor } from "@/hooks/useImageColor";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

const AnalysisScreen = () => {
	const { targetColor } = useColor();

	const { uri } = useLocalSearchParams();

	const { extractColor } = useImageColor();

	useEffect(() => {
		const test = async () => {
			const eC = await extractColor(Array.isArray(uri) ? uri[0] : uri);

			console.log("test")
			console.log(eC.height, eC.width)
		}

		test();
	}, []);


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
		</View>
	);
};

export default AnalysisScreen;
