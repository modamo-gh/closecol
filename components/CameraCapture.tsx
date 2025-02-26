import { usePhotoContext } from "@/context/PhotoContext";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import ImageProcessor from "./ImageProcessor";

const CameraCapture = () => {
	const [permissions, setPermissions] = useCameraPermissions();
	const cameraRef = useRef<CameraView | null>(null);
	const { photo, setPhoto } = usePhotoContext();

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
					autofocus="on"
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
				<ImageProcessor />
			)}
		</View>
	);
};

export default CameraCapture;
