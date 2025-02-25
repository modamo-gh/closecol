import { View } from "react-native";

const Result = () => {
	return (
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
			>{`Solved in ${Math.floor(Number(timeSolved) / 60)} minutes and ${
				Number(timeSolved) % 60
			} seconds`}</Text>
			<Text style={{ fontSize: 20, color: fontColor }}>{`Your Score: ${
				(score * (210 - timeSolved)) / 210
			}`}</Text>
		</View>
	);
};

export default Result;
