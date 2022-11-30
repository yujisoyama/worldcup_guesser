import { Heading, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find() {
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('');
    const toast = useToast();
    const { navigate } = useNavigation();

    async function handleJoinPoll() {
        try {
            setIsLoading(true);

            if (!code.trim) {
                return toast.show({
                    title: 'Informe o código',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }

            await api.post('/polls/join', { code })

            toast.show({
                title: 'Você entrou no bolão com sucesso!',
                placement: 'top',
                bgColor: 'green.500'
            });
            
            navigate('polls');
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            if (error.response?.data?.message === 'Pool not found.') {
                return toast.show({
                    title: 'Bolão não encontrado',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }

            if (error.response?.data?.message === 'You already joined this poll.') {
                return toast.show({
                    title: 'Você já está nesse bolão',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }

            toast.show({
                title: 'Erro inesperado',
                placement: 'top',
                bgColor: 'red.500'
            });
        }
    }

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
                    onChangeText={setCode}
                    autoCapitalize="characters"
                />

                <Button
                    title='BUSCAR BOLÃO'
                    onPress={handleJoinPoll}
                    isLoading={isLoading}
                />

            </VStack>
        </VStack>
    )
}

