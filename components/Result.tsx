import { useImageColor } from "@/context/ImageColorContext";
import { useTimer } from "@/context/TimerContext";
import { ResultProps } from "@/types/ResultProps";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Result: React.FC<ResultProps> = () => {
	const { score } = useImageColor();
	const { timeSolved } = useTimer();

	return (
		<View style={styles.container}>
			<Text
				style={{ fontSize: 20, color: "#000000" }}
			>{`Solved in ${Math.floor(Number(timeSolved) / 60)} minutes and ${
				Number(timeSolved) % 60
			} seconds`}</Text>
			<Text
				style={{ fontSize: 20, color: "#000000" }}
			>{`Your Score: ${Math.round(score)}`}</Text>
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
