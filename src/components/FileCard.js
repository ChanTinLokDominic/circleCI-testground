import { Text } from '@chakra-ui/react'
import { Card, CardBody, HStack, Button} from '@chakra-ui/react'
import { Link } from 'react-router-dom';


export function FileCard(props) {
    const link = "/location/" + props.venueCode
    return (
        <>
            <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            >
            <HStack>
            <Text></Text>
            <Button 
                isLoading={props.isLoading ? props.isLoading : false} 
                colorScheme='blue' 
                onClick={props.onClick ? props.onClick : () => { return }}
            >
                +
            </Button>
                <CardBody >
                    <Text>
                    <Link to={link} color='teal.500' >
                        {props.name ? props.name : "Rendering Venue name..."} 
                    </Link>
                    <p>{props.count ? `Number of events: ${props.count}` : ""}</p>
                    </Text>  
                </CardBody>
                
            </HStack>
            </Card>
        </>
    )
}
