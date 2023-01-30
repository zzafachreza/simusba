import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';

export default function SCek({ navigation }) {
    const ref = useRef();
    const [myshare, setMyShare] = useState('');

    const [user, setUser] = useState({});
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            __getTransaction();
        }

    }, [isFocused]);

    const __getTransaction = () => {
        getData('user').then(res => {
            console.log(res)
            setUser(res);
        })
    }


    return (
        <>
            <ViewShot style={{
                flex: 1,
            }} ref={ref} options={{ fileName: "CARD_" + user.id_user, format: "jpg", quality: 0.9 }}>
                <ImageBackground source={require('../../assets/back.png')} style={{
                    flex: 1,
                    backgroundColor: colors.white,
                }}>
                    <View style={{
                        flex: 0.3,
                        backgroundColor: colors.tertiary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomRightRadius: 50,
                        borderBottomLeftRadius: 50,

                    }}>
                        <Image source={require('../../assets/logo.png')} style={{
                            width: 70,
                            resizeMode: 'contain'

                        }} />
                    </View>
                    <View>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            fontSize: windowWidth / 18,
                            color: colors.black,
                            textAlign: 'center',
                            textShadowColor: colors.white,
                            textShadowOffset: { width: 2, height: 2 },
                            textShadowRadius: 10,

                        }}>LEMBAGA BANTUAN HUKUM</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            fontSize: windowWidth / 12,
                            textShadowColor: colors.white,
                            textShadowOffset: { width: 2, height: 2 },
                            textShadowRadius: 10,
                            color: colors.black,
                            textAlign: 'center'
                        }}>MUSTIKA BANGSA</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <View style={{
                            width: 210,
                            height: 310,
                            backgroundColor: colors.black,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image source={{
                                uri: user.foto_user
                            }} style={{
                                width: 200,
                                height: 300,

                            }} />
                        </View>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            fontSize: windowWidth / 18,
                            color: colors.black,
                            textAlign: 'center',
                        }}>{user.nama_lengkap}</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            fontSize: windowWidth / 18,
                            color: colors.black,
                            textAlign: 'center',
                        }}>NIA. {user.id_user}</Text>
                    </View>
                    <View style={{
                        flex: 0.2,
                        backgroundColor: colors.tertiary,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 30,
                            color: colors.white
                        }}>KEPUTUSAN</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 30,
                            color: colors.white
                        }}>MENTRI HUKUM DAN HAM RI</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 30,
                            color: colors.white
                        }}>NO. AHU-0003123.AH.01.07.TAHUN 2015</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 30,
                            color: colors.white
                        }}>NO. AHU-0000334.AH.01.08.TAHUN 2018</Text>
                    </View>

                </ImageBackground >
            </ViewShot>
            <MyButton onPress={() => {

                ref.current.capture().then(uri => {
                    console.log("do something with ", uri);
                    Share.open({
                        url: uri
                    })
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            err && console.log(err);
                        });
                });

            }} radius={0} Icons="share-social-outline" warna={colors.danger} title="Share / Print" />
        </>
    )
}

const styles = StyleSheet.create({
    judul: {
        fontFamily: fonts.secondary[600],
        fontSize: windowWidth / 35
    },
    item: {
        fontFamily: fonts.secondary[400],
        fontSize: windowWidth / 35
    }
})