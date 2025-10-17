import { Poppins_400Regular, useFonts } from "@expo-google-fonts/dev";
import { X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppBar from '../AppBar';
import Card from "../Card";
import { getCoords } from "../api/getCoords";
import { getWeatherByCoords } from "../api/weather";
import Stars from "../components/star";
import getOwmCode from "../func/getOwmCode";
import { useZusState } from "../zustand/store";

const weatherMap: Record<string, any> = {
  Clear: {
    img: require('../../assets/forecasts/glass/clear.png'),
    colorBg: "#a9f2ffff"
  },
  Cloudy: {
    img: require('../../assets/forecasts/glass/cloudy.png'),
    colorBg: "#222222ff"
  },
  Fog: {
    img: require('../../assets/forecasts/cloudy.png'),
    colorBg: "#e6e3e3ff"
  },
  Drizzle: {
    img: require('../../assets/forecasts/glass/rain.png'),
    colorBg: "#e6e3e3ff"
  },
  Showers: {
    img: require('../../assets/forecasts/glass/rain.png'),
    colorBg: "#e6e3e3ff"
  }
}

const specifyMode: Record<string, any> = {
  '0': {
    color: 'white',
    background: '#222222ff'
  },
  '1': {
    color: 'black',
    background: '#ffffffff'
  }
}

interface MeteoAPI {
  city: string | undefined;
  formatted: string;
  latitude: string;
  longtitude: string;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    rain: string;
    wind_speed_10m: string;
    relative_humidity_2m: string;
    is_day: string;
    weather_code: string;
  }
  current: {
    time: string;
    interval: string;
    temperature_2m: number;
    rain: string;
    wind_speed_10m: string;
    relative_humidity_2m: string;
    is_day: string;
    weather_code: string;
  }
}

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const setWeatherVal = useZusState((state) => state.setWeatherValues)
  const isOpen = useZusState((state) => state.isOpened)
  const open = useZusState((state) => state.setOpened)
  const [query, setQuery] = useState("");
  const [tempGeo, setTempGeo] = useState<{ lat: string, long: string }>()

  const handleSearch = async () => {
    const tray = await getCoords(query);
    if (!tray?.results?.length) return;

    const lat = tray.results[0].geometry.lat;
    const long = tray.results[0].geometry.lng;

    setTempGeo({ lat, long });
    await getWeather(lat, long);
  };

  const [meteoData, setMeteoData] = useState<MeteoAPI>()
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    "Gilroy": require("../../assets/fonts/Gilroy-Regular.ttf"),
    "Gilroy-Medium": require("../../assets/fonts/Gilroy-SemiBold.ttf")
  })

  const getWeather = async (lat: string, long: string) => {
    const url = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,rain,wind_speed_10m,relative_humidity_2m,is_day,weather_code&timezone=Asia%2FBangkok&forecast_days=1`
    );
    const res = await url.json()
    const temperature = Math.floor(res.current.temperature_2m);

    const apis = await getWeatherByCoords(lat ?? "-7.24917", long ?? "112.75083")

    setMeteoData({
      city: apis?.results[0].components.city ?? apis?.results[0].components.country,
      formatted: apis?.results[0].formatted,
      latitude: "12",
      longtitude: "12",
      current_units: {
        time: res.current_units.time,
        interval: res.current_units.interval,
        temperature_2m: res.current_units.temperature_2m,
        rain: res.current_units.rain,
        wind_speed_10m: res.current_units.wind_speed_10m,
        relative_humidity_2m: res.current_units.relative_humidity_2m,
        is_day: res.current_units.is_day,
        weather_code: res.current_units.weather_code,
      },
      current: {
        time: res.current.time,
        interval: res.current.interval,
        temperature_2m: Math.floor(res.current.temperature_2m),
        rain: res.current.rain,
        wind_speed_10m: res.current.wind_speed_10m,
        relative_humidity_2m: res.current.relative_humidity_2m,
        is_day: res.current.is_day,
        weather_code: res.current.weather_code,
      }
    })
    setWeatherVal(specifyMode[meteoData?.current.is_day ?? '']?.color, specifyMode[meteoData?.current.is_day ?? '']?.background)
  }

  useEffect(() => {
    getWeather("-7.24917", "112.75083")
  }, [])

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: specifyMode[meteoData?.current.is_day ?? '']?.background ?? "white", paddingTop: 23 }}>
      <ScrollView
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {meteoData?.current.is_day == "0"&& (
        <Stars />
        )
}
        <AppBar
          cityName={meteoData?.city ?? ""}
          formatted={meteoData?.formatted ?? ""}
          clr={specifyMode[meteoData?.current.is_day ?? '']?.color}
          bg={specifyMode[meteoData?.current.is_day ?? '']?.bg}
        />

        <View style={styles.search}>
          {isOpen && (
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
              <TextInput
                style={[styles.input, { color: specifyMode[meteoData?.current.is_day ?? '']?.color }]}
                placeholder="Cari kota..."
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
                autoFocus
              />
              <TouchableOpacity style={styles.searchBarToggle} onPress={open}>
                <X style={[styles.searchBarIcon, { color: specifyMode[meteoData?.current.is_day ?? '']?.color }]} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Image
          source={weatherMap[getOwmCode(parseInt(meteoData?.current.weather_code ?? ""))]?.img}
          style={{ width: 290, height: 200, marginTop: 22 }}
        />

        <Text style={[{ fontFamily: 'Gilroy', fontSize: 80, marginTop: 19, padding: 10 }, { color: specifyMode[meteoData?.current.is_day ?? '']?.color }]}>
          {meteoData?.current.temperature_2m}°
        </Text>

        <Text style={{ fontFamily: 'Gilroy-Medium', fontSize: 30, color: '#657382' }}>
          {getOwmCode(parseInt(meteoData?.current.weather_code ?? ""))}
        </Text>

        <View style={styles.cardGrid}>
          <Card title={`${meteoData?.current.wind_speed_10m} ${meteoData?.current_units.wind_speed_10m}`} desc={"Wind"} urlImg="wind" />
          <Card title={`${meteoData?.current.relative_humidity_2m} ${meteoData?.current_units.relative_humidity_2m}`} desc={"Humidity"} urlImg="humidity" />
          <Card title={`${meteoData?.current.rain} ${meteoData?.current_units.rain}`} desc={"Rain"} urlImg="rain" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    height: '100%',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  searchBarToggle: {
    padding: 5,
    margin: 3,
    borderRadius: 20,
    borderStyle: 'solid',
    borderColor: '#5a5a5aff',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchBarIcon: {
    width: 20,
    height: 19
  }
});