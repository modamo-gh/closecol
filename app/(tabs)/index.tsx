import CameraViewfinder from "@/components/CameraViewfinder";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	return (
		<SafeAreaView style={{ backgroundColor: "purple", flex: 1, gap: 16 }}>
			<View
				style={{
					backgroundColor: `rgb(${red}, ${green}, ${blue})`,
					flex: 1,
					borderRadius: 8,
					marginHorizontal: 8,
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<Text style={{ fontSize: 20 }}>{`Today's Color: #${red
					.toString(16)
					.padStart(2, "0")
					.toUpperCase()}${green
					.toString(16)
					.padStart(2, "0")
					.toUpperCase()}${blue
					.toString(16)
					.padStart(2, "0")
					.toUpperCase()}`}</Text>
			</View>
			<View
				style={{
					backgroundColor: "green",
					flex: 1,
					borderRadius: 8,
					marginHorizontal: 8
				}}
			/>
			<View
				style={{
					backgroundColor: "blue",
					flex: 8,
					borderRadius: 8,
					marginHorizontal: 8
				}}
			>
				<CameraViewfinder />
			</View>
		</SafeAreaView>
	);
}
