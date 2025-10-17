import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

const BottomDrawer = forwardRef<BottomSheet>((props, ref) => {
  const [index, setIndex] = useState(0);

  // untuk onChange (saat posisi sudah selesai berubah)
  const handleSheetChanges = useCallback((i: number) => {
    console.log('Sheet position changed:', i);
    setIndex(i);
  }, []);

  // untuk onAnimate (saat transisi antar posisi)
  const handleSheetAnimate = useCallback((fromIndex: number, toIndex: number) => {
    console.log('Animating from', fromIndex, 'to', toIndex);
    setIndex(toIndex);
  }, []);

  return (
    <BottomSheet
      ref={ref}
      snapPoints={['10%', '75%']}
      enablePanDownToClose={false}
      onChange={handleSheetChanges}
      onAnimate={handleSheetAnimate}
      backgroundStyle={{ 
        backgroundColor: '#5c5c5cff',
        borderTopLeftRadius: 90,
        borderTopRightRadius: 90,
      }}
      handleIndicatorStyle={{ backgroundColor: 'gray' }}
    >
      <BottomSheetView
        style={[
          styles.content,
          index === 0 ? { opacity: 0 } :
          index === 1 ? { opacity: 0.5 }:
          index === 2 ? { opacity: 1 } :
          { opacity: 0 }
        ]}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>
          Hourly Forecast
        </Text>
        <BottomSheetScrollView>
          <Text>🌤 Clear - 25°</Text>
          <Text>🌤 Clear - 26°</Text>
          <Text>🌤 Clear - 24°</Text>
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
});

export default BottomDrawer;
