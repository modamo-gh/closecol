import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

const CameraCapture = () => {
	const [permissions, setPermissions] = useCameraPermissions();
	const [photo, setPhoto] = useState();
	const cameraRef = useRef(null);

	const takePicture = async () => {
		if (cameraRef.current) {
			const p = await cameraRef.current.takePictureAsync();
			setPhoto(p);
		}
	};

	if (!permissions) {
		return <View />;
	}

	if (!permissions.granted) {
		return <Text>Camera permissions are needed</Text>;
	}

	return (
		<View
			style={{
				backgroundColor: "blue",
				flex: 8,
				borderRadius: 8,
				marginHorizontal: 8,
				overflow: "hidden"
			}}
		>
			{!photo ? (
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
				<Image
					source={{ uri: photo.uri }}
					style={{ width: "100%", height: "100%" }}
				/>
			)}
		</View>
	);
};

export default CameraCapture;
