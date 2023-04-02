import { Text, Image, Flex } from '@chakra-ui/react';

interface LoadingProps {
	text: string;
}
function Loading({ text }: LoadingProps) {
	return (
		<Flex alignItems="center" flexDir="column" w="300px">
			<Image
				mb="16px"
				w="150px"
				src="images/box.png"
				alt="meeseeks box image"
			/>
			<Text fontSize="18px">{text}</Text>
		</Flex>
	);
}

export default Loading;
