import { createContext, useContext, useState, useCallback } from "react";
import { Skia } from "@shopify/react-native-skia";
import Color from "colorjs.io";

const ImageColorContext = createContext<{
	averageColor: { red: number; green: number; blue: number } | null;
	score: number;
	skiaImage: any;
	extractColor: (imageURI: string, canvasRef: any) => void;
	calculateScore: (targetColor: any, userColor: any) => void;
} | null>(null);

export const ImageColorProvider = ({ children }) => {
	const [averageColor, setAverageColor] = useState(null);
	const [skiaImage, setSkiaImage] = useState();
	const [score, setScore] = useState(0);

	const extractColor = useCallback(async (imageURI, canvasRef) => {
		if (!canvasRef.current) return;

		const skiaData = await Skia.Data.fromURI(imageURI);
		const skImage = Skia.Image.MakeImageFromEncoded(skiaData);
		setSkiaImage(skImage);

		if (skImage) {
			const pixelData = skImage.readPixels();
			let totalR = 0,
				totalG = 0,
				totalB = 0,
				count = 0;

			if (pixelData) {
				for (let i = 0; i < pixelData.length; i += 4) {
					totalR += pixelData[i];
					totalG += pixelData[i + 1];
					totalB += pixelData[i + 2];
					count++;
				}
			}

			setAverageColor({
				red: Math.round(totalR / count),
				green: Math.round(totalG / count),
				blue: Math.round(totalB / count)
			});
		}
	}, []);

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

	return (
		<ImageColorContext.Provider
			value={{ averageColor, score, skiaImage, extractColor, calculateScore }}
		>
			{children}
		</ImageColorContext.Provider>
	);
};

export const useImageColor = () => {
	const context = useContext(ImageColorContext);

	if (!context) {
		throw new Error("useImageColor must be used within an ImageColorProvider");
	}

	return context;
};
