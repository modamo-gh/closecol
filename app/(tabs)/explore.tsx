import { Image, SafeAreaView, Text, View } from "react-native";

import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";

export default function TabTwoScreen() {
	const { uri } = useLocalSearchParams();

	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({ tabBarStyle: { display: "none" } });
		return () => navigation.setOptions({ tabBarStyle: undefined });
	}, []);

	return (
		<SafeAreaView style={{ backgroundColor: "purple", flex: 1, gap: 16 }}>
			<Text></Text>
		</SafeAreaView>
	);
}
