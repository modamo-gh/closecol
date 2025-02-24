import { Skia, useImage } from "@shopify/react-native-skia";
import { useState } from "react";
import { Image } from "react-native";

export const useImageColor = () => {
	const [averageColor, setAverageColor] = useState(null);
	const [paint, setPaint] = useState();
	const [skiaImage, setSkiaImage] = useState();

	const extractColor = async (imageURI: string, canvasRef) => {
		if (!canvasRef.current) {
			return;
		}

		const image = Image.getSize(imageURI, async (height, width) => {
            const skiaData = await Skia.Data.fromURI(imageURI)
			const skImage = Skia.Image.MakeImageFromEncoded(skiaData);

			setSkiaImage(skImage);
		});
	};

	return { averageColor, extractColor, skiaImage };
};
