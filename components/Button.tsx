import { Pressable, Text } from "react-native";

const Button = ({ onPress, title }) => {
	return (
		<Pressable
			onPress={onPress}
			style={{
				alignItems: "center",
				flex: 1,
				borderRadius: 8,
				backgroundColor: "white",
				height: "100%",
				justifyContent: "center",
				width: "100%"
			}}
		>
			<Text style={{ fontSize: 20 }}>{title}</Text>
		</Pressable>
	);
};

export default Button;
