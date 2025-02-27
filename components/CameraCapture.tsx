import { usePhotoContext } from "@/context/PhotoContext";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSharedValue, withTiming } from "react-native-reanimated";
import ImageProcessor from "./ImageProcessor";

const CameraCapture = () => {
	const [permissions, setPermissions] = useCameraPermissions();
	const { photo, setPhoto } = usePhotoContext();
	const cameraRef = useRef<CameraView | null>(null);

	const zoom = useSharedValue(0);
	const startScale = useSharedValue(1);

	const pinchGesture = Gesture.Pinch()
		.onStart(() => {
			startScale.value = 1;
		})
		.onUpdate((e) => {
			const scaleFactor = e.scale / startScale.value;

			const zoomDelta = (scaleFactor - 1) * 0.05;

			const newZoom = Math.min(Math.max(0, zoom.value + zoomDelta), 1);

			zoom.value = newZoom;

			startScale.value = e.scale;
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
