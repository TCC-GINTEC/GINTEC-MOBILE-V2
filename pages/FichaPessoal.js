import React, { useEffect, useState } from 'react';
import { View, Image, Text, ActivityIndicator, FlatList, ImageBackground, TouchableOpacity, } from 'react-native';
import styles from '../utils/styles';

const FichaPessoal = ({ navigation }) => {
    return (
        <View style={{ marginTop: 80 }}>
            <TouchableOpacity onPress={() => { navigation.navigate("Home") }}>
                <Image source={require("../assets/voltar.png")} style={styles.voltar} />
            </TouchableOpacity>
            <Text style={{ ...styles.title2, marginTop: 30 }}>Ficha de Atividades</Text>
            <TouchableOpacity onPress={() => { navigation.navigate("Atividades") }}>
                <ImageBackground source={require("../assets/atividades.png")} style={styles.jogos} imageStyle={styles.jogosImage}>
                    <View>
                        <Text style={styles.jogoText}>Jogos no pátio</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            <ImageBackground source={require("../assets/campeonatosquadra.png")} style={styles.jogos} imageStyle={styles.jogosImage}>
                <View>
                    <Text style={styles.jogoText}>Campeonatos {"\n"} de Quadra</Text>
                </View>
            </ImageBackground>
            <ImageBackground source={require("../assets/campeonatospatio.png")} style={styles.jogos} imageStyle={styles.jogosImage}>
                <View>
                    <Text style={styles.jogoText}>Campeonatos {"\n"} de Pátio</Text>
                </View>
            </ImageBackground>
            <ImageBackground source={require("../assets/oficinas.png")} style={styles.jogos} imageStyle={styles.jogosImage}>
                <View>
                    <Text style={styles.jogoText}>Oficinas</Text>
                </View>
            </ImageBackground >
        </View >
    );
};

export default FichaPessoal;