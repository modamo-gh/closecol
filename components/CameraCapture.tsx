import { usePhotoContext } from "@/context/PhotoContext";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSharedValue, withTiming } from "react-native-reanimated";
import ImageProcessor from "./ImageProcessor";

const CameraCapture = () => {
	const [permissions, setPermissions] = useCameraPermissions();
	const { photo, setPhoto } = usePhotoContext();
	const cameraRef = useRef<CameraView | null>(null);

	const zoom = useSharedValue(0);

	const pinchGesture = Gesture.Pinch()
		.onUpdate((e) => {
			zoom.value = Math.min(Math.max(0, zoom.value + (1 / e.scale - zoom.value) * 0.2), 1);
		})
		.onEnd(() => {
			console.log("Final Zoom:", zoom.value); // Debug log
		});

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
		<GestureDetector gesture={pinchGesture}>
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
						zoom={zoom.value}
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
		</GestureDetector>
	);
};

export default CameraCapture;
