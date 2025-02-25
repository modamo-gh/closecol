import { createContext, useContext, useEffect, useState } from "react";

const TimerContext = createContext<{
	isRunning: boolean;
	setIsRunning: (running: boolean) => void;
	setTimeLeft: (time: number) => void;
	setTimeSolved: (time: number) => void;
	timeLeft: number;
	timeSolved: number;
} | null>(null);

export const TimerProvider = ({ children }) => {
	const [isRunning, setIsRunning] = useState(true);
	const [timeLeft, setTimeLeft] = useState(210);
	const [timeSolved, setTimeSolved] = useState(0);

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
				isRunning,
				setIsRunning,
				setTimeLeft,
				setTimeSolved,
				timeLeft,
				timeSolved
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
