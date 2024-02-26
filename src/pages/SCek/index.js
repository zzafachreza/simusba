import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import moment from 'moment';

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
                <ScrollView horizontal style={{ flex: 1, }}>
                    <View style={{
                        backgroundColor: colors.white,
                        width: windowWidth,
                        height: windowHeight,
                        position: 'relative',
                        alignItems: 'center',
                    }}>
                        <Image source={require('../../assets/back.png')} style={{
                            width: 360,
                            height: 640,
                        }} />
                        <View style={{
                            position: 'absolute',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 235,
                        }}>

                            <View style={{

                                width: 145,
                                height: 225,
                                backgroundColor: colors.black,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={{
                                    uri: user.foto_user
                                }} style={{
                                    width: 140,
                                    height: 220,

                                }} />
                            </View>
                            <Text style={{
                                marginTop: 10,
                                fontFamily: fonts.secondary[600],
                                fontSize: 15,
                                color: colors.black,
                                textAlign: 'center',
                            }}>{user.nama_lengkap}</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 15,
                                color: colors.black,
                                textAlign: 'center',
                            }}>NIA. {user.id_user}</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 15,
                                color: colors.black,
                                textAlign: 'center',
                            }}>{user.status}</Text>
                        </View>
                    </View>

                    <MyGap jarak={windowHeight / 8} />
                    <View style={{
                        backgroundColor: colors.white,
                        width: windowWidth,
                        height: windowHeight,
                        position: 'relative',
                        alignItems: 'center',
                    }}>
                        <Image source={require('../../assets/front.png')} style={{
                            width: 360,
                            height: 640,
                        }} />
                        <View style={{
                            position: 'absolute',
                            bottom: 100,
                            left: 40,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[800],
                                fontSize: windowWidth / 25,
                                color: colors.black,
                                textAlign: 'center',
                            }}>Expired: {moment(user.expired).format('DD/MM/YYYY')}</Text>
                        </View>
                    </View>

                </ScrollView>

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