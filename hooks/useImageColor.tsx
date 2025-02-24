import { Skia, useImage } from "@shopify/react-native-skia";
import { useState } from "react";
import { Image } from "react-native";
import { blue, green } from "react-native-reanimated/lib/typescript/Colors";

export const useImageColor = () => {
	const [averageColor, setAverageColor] = useState<{
		red: number;
		green: number;
		blue: number;
	}>();
	const [paint, setPaint] = useState();
	const [skiaImage, setSkiaImage] = useState();

	const extractColor = async (imageURI: string, canvasRef) => {
		if (!canvasRef.current) {
			return;
		}

		const skiaData = await Skia.Data.fromURI(imageURI);
		const skImage = Skia.Image.MakeImageFromEncoded(skiaData);

		setSkiaImage(skImage);

		if (skImage) {
			const height = skImage.height();
			const width = skImage.width();
			const pixelData = skImage.readPixels();

			let totalR = 0;
			let totalB = 0;
			let totalG = 0;
			let count = 0;

			if (pixelData) {
				for (let i = 0; i < pixelData.length; i += 4) {
					totalR += pixelData[i];
					totalG += pixelData[i + 1];
					totalB += pixelData[i + 2];

					count++;
				}
			}

			const meanColor = {
				red: Math.round(totalR / count),
				green: Math.round(totalG / count),
				blue: Math.round(totalB / count)
			};

			setAverageColor(meanColor);
		}
	};

	return { averageColor, extractColor, skiaImage };
};
