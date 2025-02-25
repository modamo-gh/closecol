import { TimerProps } from "@/types/TimerProps";
import { StyleSheet, Text, View } from "react-native";

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 20, color: "black" }}>
				{`${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
					.toString()
					.padStart(2, "0")}`}
			</Text>
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

export default Timer;
