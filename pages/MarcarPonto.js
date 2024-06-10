import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import httpClient from '../service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MarcarPonto = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.getCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        httpClient.post("/Usuario/InformacoesQRCode", {
            token: data
        }).then((response) => {
            console.log(response);
            Alert.alert(
                `Deseja validar os pontos de ${response.data.nome}!`,
                '',
                [
                    {
                        text: 'Não',
                        onPress: () => { },
                        style: 'cancel',
                    },
                    {
                        text: 'Sim',
                        onPress: async () => {
                            var credencial = await handleGetAjudante();
                            httpClient.post("/Atividade/MarcarPontos", {
                                token: data,
                                atividadeCodigo: credencial.attCode,
                                campeonatoCodigo: credencial.campCode
                            }).then((response) => {
                                console.log(response);
                            }).catch((error) => {
                                console.error(error);
                            });
                        },
                    },
                ],
                { cancelable: false }
            );
            return;
        }).catch((error) => {
            console.error(error);
        });
    };

    const handleGetAjudante = async () => {
        const attCode = await AsyncStorage.getItem("atividadeCodigo");
        const campCode = await AsyncStorage.getItem("campeonatoCodigo");

        return {
            attCode: attCode,
            campCode: campCode
        };
    };

    if (hasPermission === null) {
        return <Text>Solicitando permissão para usar a câmera</Text>;
    }
    if (hasPermission === false) {
        return <Text>Sem acesso à câmera</Text>;
    }

    return (
        <View style={styles.container}>
            <CameraView
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr", "pdf417"],
                }}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
            )}
        </View>
    );
};


export default MarcarPonto;
