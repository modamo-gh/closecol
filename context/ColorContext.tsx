import { createContext, useContext, useState, ReactNode } from "react";

type ColorType = {
	red: number;
	green: number;
	blue: number;
};

const ColorContext = createContext<{
	targetColor: ColorType;
	setTargetColor: (color: ColorType) => void;
} | null>(null);

export const ColorProvider = ({ children }: { children: ReactNode }) => {
	const [targetColor, setTargetColor] = useState<ColorType>(() => {
		const red = Math.floor(Math.random() * 255);
		const green = Math.floor(Math.random() * 255);
		const blue = Math.floor(Math.random() * 255);

		return { red, green, blue };
	});

	return (
		<ColorContext.Provider value={{ targetColor, setTargetColor }}>
			{children}
		</ColorContext.Provider>
	);
};

export const useColor = () => {
	const context = useContext(ColorContext);
	if (!context)
		throw new Error("useColor must be used within a ColorProvider");
	return context;
};
