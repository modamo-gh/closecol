import { useColor } from "@/context/ColorContext";
import { useImageColor } from "@/context/ImageColorContext";
import { usePhotoContext } from "@/context/PhotoContext";
import { Canvas, Image, useCanvasRef } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { View } from "react-native";

const ImageProcessor = () => {
	const ref = useCanvasRef();
	const { targetColor } = useColor();
	const { photo } = usePhotoContext();
	const { averageColor, calculateScore, extractColor, skiaImage } =
		useImageColor();
	const [canvasSize, setCanvasSize] = useState({ height: 0, width: 0 });

	const onCanvasLayout = (event) => {
		const { height, width } = event.nativeEvent.layout;

		setCanvasSize({ height, width });

		console.log({ height, width });
	};

	useEffect(() => {
		if (!photo || !canvasSize.width || !canvasSize.height) {
			return;
		}

		extractColor(photo.uri, ref);
	}, [photo, canvasSize]);

	useEffect(() => {
		if (averageColor) {
			calculateScore(targetColor, averageColor);
		}
	}, [averageColor]);

	return (
		<View style={{ flex: 1 }}>
			<Canvas
				onLayout={onCanvasLayout}
				ref={ref}
				style={{
					flex: 1
				}}
			>
				{skiaImage && (
					<Image
						image={skiaImage}
						height={canvasSize.height}
						width={canvasSize.width}
						x={0}
						y={0}
					/>
				)}
			</Canvas>
		</View>
	);
};

export default ImageProcessor;
