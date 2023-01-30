import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, Linking } from 'react-native'
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

export default function SDaftar({ navigation }) {

    const isFocused = useIsFocused();

    const [data, setData] = useState([]);

    useEffect(() => {

        if (isFocused) {
            axios.post(apiURL + 'perwakilan_data').then(res => {
                console.log(res.data);
                setData(res.data);
            })
        }


    }, [isFocused]);


    const __renderItem = ({ item }) => {

        return (
            <TouchableOpacity onPress={() => Linking.openURL(item.website)} style={{
                paddingVertical: 20,
                paddingHorizontal: 10,
                flexDirection: 'row',
                borderRadius: 5,
                backgroundColor: colors.primary,
                marginVertical: 2,
                alignItems: 'center'
            }}>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 20,
                    color: colors.white
                }}>{item.nama_perwakilan}</Text>
                <Image source={require('../../assets/A4.png')} style={{
                    width: 50,
                    height: 30,
                    resizeMode: 'contain'
                }} />
            </TouchableOpacity>
        )

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <FlatList data={data} renderItem={__renderItem} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})