import { TodaysColorsProps } from "@/types/TodaysColorProps";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TodaysColor: React.FC<TodaysColorsProps> = ({ color }) => {
	const colorString = `rgb(${color.red}, ${color.green}, ${color.blue})`;
	const luminance =
		(0.299 * color.red + 0.587 * color.green + 0.114 * color.blue) / 255;
	const fontColor = luminance > 0.5 ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)";

	return (
		<View style={[styles.container, { backgroundColor: colorString }]}>
			<Text
				style={[styles.text, { color: fontColor }]}
			>{`Today's Color`}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		borderRadius: 8,
		flex: 1,
		justifyContent: "center",
		marginHorizontal: 8
	},
	text: { fontSize: 20 }
});

export default TodaysColor;
