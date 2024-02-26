import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
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
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import { SliderBox } from "react-native-image-slider-box";


export default function Home({ navigation }) {


  const [ENTRIES, SETENTITIES] = useState([]);
  const [user, setUser] = useState({});
  const [company, setCompany] = useState({});
  const isFocused = useIsFocused();
  useEffect(() => {

    __getTransaction();

  }, []);

  const __getTransaction = () => {
    getData('user').then(res => {
      setUser(res);
    })

    axios.post(apiURL + 'company').then(res => {
      console.log('company', res.data)
      setCompany(res.data)
    })

    axios.post(apiURL + 'slider').then(res => {
      console.log(res.data)
      SETENTITIES(res.data);
    })

  }


  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };



  const MyMenu = ({ img, judul, onPress, desc }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{
        marginVertical: 5,
        borderRadius: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        height: windowHeight / 8
      }} >
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
          <Image source={img} style={{
            width: 50,
            height: 50,
            resizeMode: 'contain'
          }} />
        </View>
        <View>
          <Text style={{
            fontFamily: fonts.secondary[600],
            color: colors.white,
            fontSize: 15,

          }}>{judul}</Text>
          <Text style={{
            fontFamily: fonts.secondary[400],
            color: colors.white,
            fontSize: 12,

          }}>{desc}</Text>
        </View>
      </TouchableOpacity>
    )
  }


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
      {/* header */}
      <View style={{
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>

        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 32,
              color: colors.white
            }}>Selamat datang, {user.nama_lengkap}</Text>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>{MYAPP}</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30
          }}>
            <Icon type='ionicon' name='person' color={colors.white} />

          </TouchableOpacity>

        </View>


      </View>
      <SliderBox
        images={ENTRIES}
        sliderBoxHeight={200}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        dotColor={colors.white}
        inactiveDotColor={colors.primary}
      />

      <View style={{
        flex: 1,
        justifyContent: 'center'
      }}>
        <MyMenu onPress={() => navigation.navigate('SCek')} img={require('../../assets/A3.png')} judul="Kartu Tanda Anggota" desc="Informasi kartu tanda anggota" />
        <MyMenu onPress={() => navigation.navigate('SAdd', user)} img={require('../../assets/A2.png')} judul="Pendaftaran Perkara" desc="Input pendaftaran perkara" />
        <MyMenu onPress={() => navigation.navigate('SDaftar')} img={require('../../assets/A1.png')} judul="Perwakilan LBH Musba" desc="Data kantor perwakilan LBH Musba" />


      </View>

      <View style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{
          textAlign: 'center',
          maxWidth: '90%',
          fontFamily: fonts.secondary[400],
          fontSize: 12,
          marginBottom: 5,
        }}>Segala akibat hukum yang timbul disebabkan penyalahgunaan aplikasi ini adalah menjadi tanggung jawab pribadi masing-masing</Text>
        <Text style={{
          textAlign: 'center',
          fontFamily: fonts.secondary[600],
          fontSize: 12,
          marginBottom: 5,
        }}>By LBH Musba 2023</Text>
      </View>

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: windowHeight,
    height: windowWidth / 2,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});