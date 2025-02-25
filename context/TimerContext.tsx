import { createContext, useContext, useEffect, useState } from "react";

const TimerContext = createContext<{
	timeLeft: number;
	setTimeLeft: (time: number) => void;
	isRunning: boolean;
	setIsRunning: (running: boolean) => void;
} | null>(null);

export const TimerProvider = ({ children }) => {
	const [isRunning, setIsRunning] = useState(true);
	const [timeLeft, setTimeLeft] = useState(210);

	useEffect(() => {
		if (isRunning && timeLeft) {
			const timer = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(timer);
		}
	}, [isRunning, timeLeft]);

	return (
		<TimerContext.Provider
			value={{
				timeLeft,
				setTimeLeft,
				isRunning,
				setIsRunning
			}}
		>
			{children}
		</TimerContext.Provider>
	);
};

export const useTimer = () => {
	const context = useContext(TimerContext);

	if (!context) {
		throw new Error("useTimer must be used within a TimeProvider");
	}

	return context;
};
