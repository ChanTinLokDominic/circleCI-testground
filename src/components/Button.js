import { Text, Button as ChakraButton } from "@chakra-ui/react";

export function Button({
    primary,
    label,
    disallow,
    isLoading,
    ...props
}) {
    return (
        <ChakraButton
            w={props.width ?? props.width}
            h={props.height ?? props.height}
            minH='40px'
            borderRadius='20px'
            backgroundColor={
                primary ? "#A8B0B9" : "white"
            }
            onClick={
                props.onClick && !disallow && !isLoading
                    ? props.onClick
                    : () => {
                        return;
                    }
            }
        >
            <Text>{label}</Text>
        </ChakraButton >
    )
}