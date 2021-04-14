import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'
import api from '../services/api';

function Main({ navigation }) {
    const [ devs, setDevs ] = useState([]);
    const [ currenteRegion, setCurrentRegion ] = useState(null);
    const [ techs, setTechs ] = useState('');

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                });
            }
        }

        loadInitialPosition();
    }, []);

    async function loadDevs(){
        const { latitude, longitude } = currenteRegion;

        // const response = await api.get('/search', {
        //     params: {
        //         latitude,
        //         longitude,
        //         techs: techs
        //     }
        // })

        const response = { 
            data: {
                devs: [
                    {
                        _id: 1,
                        location: {
                            coordinates: [
                                -40.2863892,
                                -20.3362378,
                            ]
                        },
                        avatar_url: "https://www.techreviews.com.br/wp-content/uploads/2020/04/VZI-0-monitor-hd-davidx-rq7e1qwspey-unsplash-scaled.jpg",
                        github_username: "matheusmauricio",
                        name: "Matheus Mauricio",
                        bio: "Dev na Quattror",
                        techs: [
                            "PHP",
                            "Laravel",
                            "React",
                        ]
                    },
                    {
                        _id: 2,
                        location: {
                            coordinates: [
                                -40.2924019,
                                -20.3351659,
                            ]
                        },
                        avatar_url: "https://www.techreviews.com.br/wp-content/uploads/2020/04/VZI-0-monitor-hd-davidx-rq7e1qwspey-unsplash-scaled.jpg",
                        github_username: "maraujo-quattror",
                        name: "Matheus Mauricio Quattror",
                        bio: "Dev na Quattror",
                        techs: [
                            "PHP",
                            "Laravel",
                            "React",
                            "React Native",
                        ]
                    },
                    {
                        _id: 3,
                        location: {
                            coordinates: [
                                -40.296393,
                                -20.331685,
                            ]
                        },
                        avatar_url: "https://www.techreviews.com.br/wp-content/uploads/2020/04/VZI-0-monitor-hd-davidx-rq7e1qwspey-unsplash-scaled.jpg",
                        github_username: "ccastro-quattror",
                        name: "Cadu",
                        bio: "Dev na Quattror",
                        techs: [
                            "PHP",
                            "Laravel",
                            "React, C#",
                        ]
                    },
                ]
            }
        }
        setDevs(response.data.devs);
    }

    function handleRegionChanged(region){
        setCurrentRegion(region);
    }

    if (!currenteRegion) {
        return null;
    }

    return (
        <>
            <MapView style={styles.map} initialRegion={currenteRegion} onRegionChangeComplete={handleRegionChanged} >
                { devs.map(dev => (
                    <Marker key={ dev._id } coordinate={{ latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0] }} >
                        <Image source={{ uri: dev.avatar_url }} style={ styles.avatar } />

                        <Callout onPress={() => {
                            navigation.navigate('Profile', { github_username: dev.github_username });
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{ dev.name }</Text>
                                <Text style={styles.devBio}>{ dev.bio }</Text>
                                <Text style={styles.devTechs}>{ dev.techs.join(', ') }</Text>
                            </View>
                        </Callout>
                    </Marker>
                )) }
            </MapView>
            <View style={styles.searchForm}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar devs por techs..."
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={techs}
                        onChangeText={text => setTechs(text)}
                    />

                    <TouchableOpacity style={styles.loadButton} onPress={loadDevs}>
                        <MaterialIcons name="my-location" size={20} color="#FFF" />
                    </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: "#fff"
    },

    callout: {
        width: 260
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: "#666",
        marginTop: 5
    },

    devTechs: {
        marginTop: 5
    },

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#fff",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 5
    },

    loadButton:{
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
})

export default Main;