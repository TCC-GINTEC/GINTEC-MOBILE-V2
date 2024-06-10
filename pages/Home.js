import React, { useEffect, useState } from 'react';
import { View, Image, Text, ActivityIndicator, FlatList, TouchableOpacity, } from 'react-native';
import styles from '../utils/styles';


const Home = ({ navigation }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setNotifications([{ title: "Campeonato de pátio", body: "Campeonato de pátio" }, { title: "Campeonato de pátio", body: "Campeonato de pátio" }, { title: "Campeonato de pátio", body: "Campeonato de pátio" }, { title: "Campeonato de pátio", body: "Campeonato de pátio" }, { title: "Campeonato de pátio", body: "Campeonato de pátio" }])
            setLoading(false)
        }, 500);
    }, [])

    const renderNotification = ({ item }) => (
        <View style={{ margin: 10, padding: 10, borderRadius: 5, flexDirection: "row" }}>
            <View style={{ backgroundColor: "red", height: "100%", width: 8, marginRight: 6, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
            </View>
            <View>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationBody}>{item.body}</Text>
            </View>
        </View>
    );
    return (
        <View style={{ marginTop: 50 }}>
            <View>
                <Image source={require("../assets/sinoAtivado.png")} style={{ alignSelf: 'flex-end', marginRight: 40 }} height={140} />
            </View>
            <Text style={{ ...styles.title2, alignSelf: 'flex-start', marginLeft: 30, marginBottom: 30 }}>Olá, seja Bem-Vindo</Text>
            <View style={{ height: 270, display: "flex", flexDirection: "row" }}>
                <View style={{ alignItems: "center", justifyContent: "center", width: "50%", height: "100%" }}>
                    <TouchableOpacity onPress={() => {navigation.navigate('FichaPessoal')}}>
                    <Image source={require("../assets/fichaPessoal.png")} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: "center", justifyContent: "space-evenly", width: "50%", height: "100%" }}>
                    <Image source={require("../assets/ranking.png")} />
                    <Image source={require("../assets/perfil.png")} />
                </View>
            </View>
            <Text style={{ ...styles.title2, alignSelf: 'flex-start', marginLeft: 30, marginBottom: 30 }}>Últimas notificações</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={notifications}
                    renderItem={renderNotification}
                    style={{ marginLeft: 25 }}
                />
            )}

        </View>
    );
};

export default Home;