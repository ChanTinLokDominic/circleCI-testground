import { Input, InputGroup, IconButton, InputRightElement, Stack } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';

export function SearchBar(props) {
    return (
        <Stack spacing="4px" width={props.width ? props.width : "md"}>
            <InputGroup>
                <Input
                    placeholder="Search for events..."
                    onChange={props.onChange ? props.onChange : () => { return }}
                    borderRadius='20px'
                />
                <InputRightElement>
                    <IconButton
                        colorScheme="gray"
                        icon={<SearchIcon />}
                        borderRadius='20px'
                        isLoading={props.isLoading ? props.isLoading : false}
                        onClick={props.onClick ? props.onClick : () => { return }}
                    />
                </InputRightElement>
            </InputGroup>
        </Stack>
    )
}