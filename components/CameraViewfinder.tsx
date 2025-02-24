import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const CameraViewfinder = () => {
	const [facing, setFacing] = useState<CameraType>("back");
	const [permissions, setPermissions] = useCameraPermissions();

	useEffect(() => {
		if (!permissions?.granted) {
			setPermissions(permissions?.status === "granted");
		}
	}, []);

	if (!permissions) {
		return <View />;
	}

	if (!permissions.granted) {
		return <Text>Camera permissions are needed</Text>;
	}

	return <CameraView style={{ borderRadius: 8, flex: 1 }}></CameraView>;
};

export default CameraViewfinder;
