import { CameraCapturedPicture, CameraView } from "expo-camera";
import { createContext, useContext, useRef, useState } from "react";

const PhotoContext = createContext<{
	cameraRef: React.MutableRefObject<CameraView | null>,
	capturePhoto: () => Promise<void>;
	hasSubmitted: boolean;
	photo: any;
	setHasSubmitted: (submitted: boolean) => void;
	setPhoto: any;
} | null>(null);

export const PhotoProvider = ({ children }) => {
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>();
	const cameraRef = useRef<CameraView | null>(null);

	const capturePhoto = async () => {
		if (cameraRef.current) {
			const p = await cameraRef.current.takePictureAsync();
			setPhoto(p);
		}
	};

	return (
		<PhotoContext.Provider
			value={{
				cameraRef,
				capturePhoto,
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
