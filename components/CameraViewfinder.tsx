import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";

const CameraViewfinder = () => {
	const [facing, setFacing] = useState<CameraType>("back");
	const [permissions, setPermissions] = useCameraPermissions();
	const cameraRef = useRef(null);

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

	const takePicture = async () => {
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePictureAsync();
			console.log("Photo taken:", photo.uri);
		}
	};

	return (
		<CameraView
			ref={cameraRef}
			style={{
				borderRadius: 8,
				flex: 1,
				alignItems: "center",
				justifyContent: "flex-end"
			}}
		>
			<Pressable
				onPress={async () => takePicture()}
				style={{
					backgroundColor: "#FFFFFF",
					height: 72,
					width: 72,
					borderRadius: 50,
					marginBottom: 16
				}}
			/>
		</CameraView>
	);
};

export default CameraViewfinder;
