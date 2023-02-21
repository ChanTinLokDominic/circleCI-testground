import {  Input, InputGroup, IconButton, InputRightElement, Stack, Textarea, Text } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons';


export function CommentInput(props) {
    return (
        <>
        <Text fontSize='3xl'>Comments</Text>
        {props.commentArray ? props.commentArray.map(item => <Textarea isReadOnly>{item.comment}</Textarea>) : <Textarea isReadOnly></Textarea>}
        
        <Stack spacing="4px" width="xl">
            <InputGroup>
                <Input
                    value={props.value}
                    placeholder="Add comment..."
                    onChange={props.onChange ? props.onChange : () => { return }}
                    borderRadius='20px'
                    id = "commentBox"
                />
                <InputRightElement>
                    <IconButton
                        colorScheme="gray"
                        icon={<EditIcon />}
                        borderRadius='20px'
                        onClick={props.onClick ? props.onClick : () => { return }}
                        isLoading={props.isLoading ? props.isLoading : false}
                    />
                </InputRightElement>
            </InputGroup>
        </Stack>
        </>
    )
}