import React, { useEffect, useState } from "react";
import { View, ImageBackground, Image, StyleSheet, Text, Picker } from "react-native";
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import RNPickerSelect from 'react-native-picker-select';

import axios from 'axios';

import api from '../../services/api';

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const Home = () => {
    const navigation = useNavigation();

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [selectedUf, setSelectedUf] = useState("0");
    const [selectedCity, setSelectedCity] = useState("0");


    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(
                response => {
                    const ufInitials = response.data.map(uf => uf.sigla);
                    setUfs(ufInitials);
                }
            );
    }, []);

    useEffect(() => {
        if (selectedUf == "0") return;
        // Carregar as cidades, sempre q a UF mudar
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(
                response => {
                    const cityNames = response.data.map(uf => uf.nome);
                    setCities(cityNames);
                }
            );
    }, [selectedUf]);

    function handleNavigatoToPoints() {

        navigation.navigate('Points', {
            city: selectedCity,
            uf: selectedUf
        });
    }
    function handleSelectUf(ufValue: string) {
        const uf = ufValue;
        setSelectedUf(uf);
        console.log('UF ' + uf);
    }

    function handleSelectCity(cityValue: string) {
        const city = cityValue;
        setSelectedCity(city);
    }

    return (
        <ImageBackground
            style={styles.container}
            source={require('../../assets/home-background.png')}
            imageStyle={{ width: 274, height: 368 }}
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente. </Text>
            </View>
            <View style={styles.footer}>

                {/* <RNPickerSelect
                    onValueChange={handleSelectCity}
                    items={ufs.map(uf => ({ label: uf, value: uf }))}
                    placeholder='Selecione a UF'
                />

                <RNPickerSelect
                    onValueChange={handleSelectCity}
                    items={[
                        { label: 'Football', value: 'football' },
                        { label: 'Baseball', value: 'baseball' },
                        { label: 'Hockey', value: 'hockey' },
                    ]}
                    placeholder='Selecione a Cidade'
                /> */}

                <Picker
                    selectedValue={selectedUf}
                    style={styles.input}
                    onValueChange={handleSelectUf}>
                    {ufs.map(uf => (
                        <Picker.Item key={uf} label={uf} value={uf} />

                    ))}
                </Picker>

                <Picker
                    selectedValue={selectedCity}
                    style={styles.input}
                    onValueChange={handleSelectCity}>
                    {cities.map(city => (
                        <Picker.Item key={city} label={city} value={city} />

                    ))}
                </Picker>

                <RectButton style={styles.button} onPress={handleNavigatoToPoints}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#FFF" size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>Entrar</Text>
                </RectButton>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },

    main: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {},

    select: {},

    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
});

export default Home;