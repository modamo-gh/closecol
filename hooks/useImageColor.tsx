import { useState } from "react";
import { Image as CanvasImage } from "react-native-canvas";

export const useImageColor = () => {
    const [averageColor, setAverageColor] = useState(null);

    const extractColor = async (imageURI: string, canvasRef) => {
        if (!canvasRef.current) return;

        const ctx = await canvasRef.current.getContext("2d");
        const image = new CanvasImage(canvasRef.current); // ✅ Correct usage

        image.src = imageURI;

        // ✅ Use onload instead of addEventListener
        image.onload = () => {
            const { width, height } = image;
            canvasRef.current.width = width;
            canvasRef.current.height = height;

            ctx.drawImage(image, 0, 0, width, height); // ✅ Correct method

            // Extract pixel data
            const imageData = ctx.getImageData(0, 0, width, height).data;

            let totalR = 0,
                totalG = 0,
                totalB = 0,
                count = 0;

            for (let i = 0; i < imageData.length; i += 4) {
                totalR += imageData[i]; // Red
                totalG += imageData[i + 1]; // Green
                totalB += imageData[i + 2]; // Blue
                count++;
            }

            const avgColor = {
                red: Math.round(totalR / count),
                green: Math.round(totalG / count),
                blue: Math.round(totalB / count),
            };

            setAverageColor(avgColor);
        };
    };

    return { averageColor, extractColor };
};
