import { useColor } from "@/context/ColorContext";
import { useImageColor } from "@/hooks/useImageColor";
import { ResultProps } from "@/types/ResultProps";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const Result: React.FC<ResultProps> = ({ photo, timeSolved }) => {
	const { score } = useImageColor();

	return (
		<View style={styles.container}>
			<Text
				style={{ fontSize: 20, color: "#000000" }}
			>{`Solved in ${Math.floor(Number(timeSolved) / 60)} minutes and ${
				Number(timeSolved) % 60
			} seconds`}</Text>
			<Text style={{ fontSize: 20, color: "#000000" }}>{`Your Score: ${
				score * ((210 - Number(timeSolved)) / 210)
			}`}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 8,
		flex: 1,
		justifyContent: "center",
		marginHorizontal: 8
	}
});

export default Result;
