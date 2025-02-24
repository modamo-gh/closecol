import { GLView } from "expo-gl"
import * as ImageManipulator from "expo-image-manipulator"
import { useState } from "react"

export const useImageColor = () => {
    const [dominantColor, setDominantColor] = useState(null)

    const extractColor = async (imageURI: string) => {
        const image = await ImageManipulator.manipulateAsync(imageURI, [])
        const { height, width } = image;

        
    }

    return { extractColor };
}