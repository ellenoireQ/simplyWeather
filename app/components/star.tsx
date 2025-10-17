import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Stars() {
  const stars = Array.from({ length: 40 });

  return (
    <View style={styles.background} pointerEvents="none">
      {stars.map((_, i) => (
        <View
          key={i}
          style={[
            styles.star,
            {
              top: Math.random() * height,
              left: Math.random() * width,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  star: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
    opacity: 0.3,
  },
});
