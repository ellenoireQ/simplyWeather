import Entypo from '@expo/vector-icons/Entypo';
import { Search } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useZusState } from '../zustand/store';

interface AppBarProps {
  cityName: string;
  formatted: string;
  clr: string;
  bg: string
}

export default function AppBar({ cityName, formatted, clr, bg}: AppBarProps) {
  const open = useZusState((state) => state.setOpened);
  const isOpened = useZusState((state) => state.isOpened);

  console.log(clr)
  return (
    <View style={styles.appBarContainer}>
      <View style={styles.placeholder} />
      <View style={styles.locationContainer}>
        <View style={styles.locationHeader}>
          <Entypo name="location-pin" size={25} color={'orange'} />
          <Text style={[styles.cityText, {color: clr}]}>{cityName}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={[styles.descriptionText, {color: clr ?? 'black'}]}>{formatted}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[
          styles.searchButton, 
          isOpened && styles.searchButtonHidden
        ]} 
        onPress={open}
      >
        <Search style={styles.searchIcon} size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  appBarContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  placeholder: {
    width: 20,
  },
  locationContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 25,
    marginLeft: 4
    
  },
  descriptionContainer: {
    width: '80%',
    alignItems: 'center',
  },
  descriptionText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 9,
    textAlign: 'center',
  },
  searchButton: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#5a5a5a',
    backgroundColor: 'white',
  },
  searchButtonHidden: {
    opacity: 0,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
});