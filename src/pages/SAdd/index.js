import { Alert, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { maskJs, maskCurrency } from 'mask-js';
import DatePicker from 'react-native-modern-datepicker';
import moment from 'moment';
export default function SAdd({ navigation, route }) {

    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();

    const [kirim, setKirim] = useState({
        nomor: '',
        nama_anggota: route.params.nama_lengkap,
        no_nia: route.params.id_user,
        perwakilan: '',
        jenis_perkara: 'Pidana',
        keterangan: '',
        tanggal: moment(new Date()).format('YYYY-MM-DD')

    });






    // setLoading(false);

    const sendServer = () => {
        console.log(kirim);
        setLoading(true);

        axios.post(apiURL + 'insert_perkara', kirim).then(res => {
            console.log(res.data);
            if (res.data == 200) {
                Alert.alert('Simusba', 'Data berhasil di simpan !');
                navigation.goBack();
            }
        })
    }

    const [region, setRegion] = useState([]);
    const [user, setUser] = useState({});
    const [nomor, setNomor] = useState('');


    useEffect(() => {



        if (isFocused) {
            // getNomor()
            getPerwakilan();
        }






    }, [isFocused])

    const getNomor = () => {
        axios.post(apiURL + 'get_nomor').then(res => {
            console.log('nomor z', res.data);
            // setNomor(res.data);

            setKirim({
                ...kirim,
                nomor: res.data
            });

            setLoading(false)


        })
    }

    const getPerwakilan = () => {

        axios.post(apiURL + 'perwakilan').then(res => {

            setRegion(res.data);
            setKirim({
                ...kirim,
                perwakilan: res.data[0].value
            });
            getNomor()
        })
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>


            {!loading && <ScrollView showsVerticalScrollIndicator={false}>

                <DatePicker
                    options={{
                        backgroundColor: colors.white,
                        textHeaderColor: colors.primary,
                        textDefaultColor: colors.black,
                        selectedTextColor: colors.white,
                        mainColor: colors.primary,
                        textSecondaryColor: '#D6C7A1',
                        borderColor: 'rgba(122, 146, 165, 0.1)',
                    }}
                    current={kirim.tanggal}
                    selected={kirim.tanggal}
                    mode="calendar"
                    onDateChange={x => {
                        setKirim({
                            ...kirim,
                            tanggal: x.replace("/", "-").replace("/", "-")
                        })
                    }}

                    style={{ borderRadius: 10 }}
                />
                <MyInput iconname='document-text' label='Nomor Perkara' value={kirim.nomor} />
                <MyInput iconname='person' label='Nama Anggota' value={kirim.nama_anggota.toString()} />
                <MyInput iconname='card' label='No. NIA' value={kirim.no_nia.toString()} />
                <MyPicker iconname="location" onValueChange={x => setKirim({ ...kirim, perwakilan: x })} label="Kantor Perwakilan" data={region} />
                <MyPicker iconname="list" onValueChange={x => setKirim({ ...kirim, jenis_perkara: x })} label="Jenis Perkara" data={[
                    { label: 'Pidana', value: 'Pidana', },
                    { label: 'Perdata', value: 'Perdata', },
                ]} />
                <MyInput iconname='create' label='Keterangan' placeholder='Masukan keterangan' onChangeText={x => { setKirim({ ...kirim, keterangan: x }) }} />

            </ScrollView>}

            <MyGap jarak={20} />
            {!loading && <MyButton onPress={sendServer} title="SIMPAN" warna={colors.primary} Icons="person-add" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})