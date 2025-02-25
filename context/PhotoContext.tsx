import { createContext, useContext, useState } from "react";

const PhotoContext = createContext<{
	hasSubmitted: boolean;
	photo: any;
	setHasSubmitted: (submitted: boolean) => void;
	setPhoto: any;
} | null>(null);

export const PhotoProvider = ({ children }) => {
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [photo, setPhoto] = useState();

	return (
		<PhotoContext.Provider
			value={{
				hasSubmitted,
				photo,
				setHasSubmitted,
				setPhoto
			}}
		>
			{children}
		</PhotoContext.Provider>
	);
};

export const usePhotoContext = () => {
	const context = useContext(PhotoContext);

	if (!context) {
		throw new Error("usePhoto must be used within a PhotoProvider");
	}

	return context;
};
