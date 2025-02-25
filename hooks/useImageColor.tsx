import { Skia } from "@shopify/react-native-skia";
import Color from "colorjs.io";
import { useState } from "react";

export const useImageColor = () => {
	const [averageColor, setAverageColor] = useState<{
		red: number;
		green: number;
		blue: number;
	}>();
	const [skiaImage, setSkiaImage] = useState();
	const [score, setScore] = useState<number>(0);

	const calculateScore = (targetColor, userColor) => {
		const color1 = new Color("srgb", [
			targetColor.red / 255,
			targetColor.green / 255,
			targetColor.blue / 255
		]);
		const color2 = new Color("srgb", [
			userColor.red / 255,
			userColor.green / 255,
			userColor.blue / 255
		]);

		const deltaE = color1.deltaE2000(color2);

		setScore(deltaE);
	};

	const extractColor = async (imageURI: string, canvasRef) => {
		if (!canvasRef.current) {
			return;
		}

		const skiaData = await Skia.Data.fromURI(imageURI);
		const skImage = Skia.Image.MakeImageFromEncoded(skiaData);

		setSkiaImage(skImage);

		if (skImage) {
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

	return { averageColor, calculateScore, extractColor, score, skiaImage };
};
