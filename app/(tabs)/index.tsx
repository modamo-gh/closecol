import CameraViewfinder from "@/components/CameraViewfinder";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "expo-router";

export default function HomeScreen() {
	const navigation = useNavigation();

	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	useEffect(() => {
		navigation.setOptions({ tabBarStyle: { display: "none" } });
		return () => navigation.setOptions({ tabBarStyle: undefined });
	}, []);

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
					marginHorizontal: 8,
					overflow: "hidden"
				}}
			>
				<CameraViewfinder />
			</View>
		</SafeAreaView>
	);
}
