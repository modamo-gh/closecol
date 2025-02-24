import CameraViewfinder from "@/components/CameraViewfinder";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "expo-router";

export default function HomeScreen() {
	const navigation = useNavigation();

	const [targetColor, setTargetColor] = useState(() => {
		const red = Math.floor(Math.random() * 255);
		const green = Math.floor(Math.random() * 255);
		const blue = Math.floor(Math.random() * 255);

		return { red, green, blue };
	});

	const fontColor = [
		targetColor.red,
		targetColor.green,
		targetColor.blue
	].some((value) => value > Math.floor(255 / 2))
		? "#000000"
		: "#FFFFFF";

	const color = `rgb(${targetColor.red}, ${targetColor.green}, ${targetColor.blue})`;

	useEffect(() => {
		navigation.setOptions({ tabBarStyle: { display: "none" } });
		return () => navigation.setOptions({ tabBarStyle: undefined });
	}, []);

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
					marginHorizontal: 8,
					overflow: "hidden"
				}}
			>
				<CameraViewfinder />
			</View>
		</SafeAreaView>
	);
}
