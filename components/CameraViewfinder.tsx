import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

const CameraViewfinder = () => {
	const [facing, setFacing] = useState<CameraType>("back");
	const [permissions, setPermissions] = useCameraPermissions();
	const cameraRef = useRef(null);
	const [photo, setPhoto] = useState();

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
			const p = await cameraRef.current.takePictureAsync();
			setPhoto(p);
		}
	};

	{
		return !photo ? (
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
		) : (
			<View
				style={{ position: "relative", width: "100%", height: "100%" }}
			>
				<View
					style={{
						flexDirection: "row",
						padding: 16,
						position: "absolute",
						top: 0,
						left: 0,
						justifyContent: "space-between",
						zIndex: 1,
						width: "100%"
					}}
				>
					<Text
						onPress={() => setPhoto(null)}
						style={{ color: "#FFFFFF", fontSize: 16 }}
					>
						Retake
					</Text>
					<Text
						onPress={() => router.push(`/analysis?uri=${encodeURIComponent(photo.uri)}`)}
						style={{ color: "#FFFFFF", fontSize: 16 }}
					>
						Submit
					</Text>
				</View>
				<Image
					source={{ uri: photo.uri }}
					style={{ height: "100%", width: "100%" }}
				/>
			</View>
		);
	}
};

export default CameraViewfinder;
