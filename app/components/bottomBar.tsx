import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BottomBar() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab}>
        <Text>🏠</Text>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text>🔍</Text>
        <Text>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text>⚙️</Text>
        <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#ffffffff',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    elevation: 5,
    width: '50%',
    
  },
  tab: {
    alignItems: 'center',
  },
});
