import { Heading, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Find() {
    return (
        <VStack flex={1} bgColor='gray.900' >
            <Header title='Buscar por código' showBackButton />
            <VStack mt={8} mx={5} alignItems='center' >
                <Heading fontFamily='heading' color='white' fontSize='lg' mb={8} textAlign='center' >
                    Encontrar o bolão através {'\n'} de seu código único.
                </Heading>

                <Input
                    mb={2}
                    placeholder='Qual código do bolão?'

                />

                <Button 
                    title='BUSCAR BOLÃO'
                />

            </VStack>
        </VStack>
    )
}

