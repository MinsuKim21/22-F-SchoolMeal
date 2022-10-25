import dayjs from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  LogBox,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilValue} from 'recoil';
import {isLunchSubmit} from '../states';
import LunchForm from './LunchForm';
import MenuList from './MenuList';

export default function MealCarousel({data, lunchName}) {
  const {width, height} = Dimensions.get('window');
  const lunchType = ['중식A', '중식B'];
  const [AorB, setLunchName] = useState('중식A');
  useEffect(() => {
    setLunchName(lunchType[page]);
    lunchName(AorB);
  });
  const [page, setPage] = useState(0); // 케러셀에서 포커스된 페이지 인덱스
  const [lunch, setLunch] = useState('lunchA');
  let now = dayjs();
  let date = now.format('MM.DD');

  const LunchSubmit = useRecoilValue(isLunchSubmit);

  return (
    <>
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          const newPage = Math.round(e.nativeEvent.contentOffset.x / width); //호라이즌 스크롤 값
          if (newPage === 0) {
            setPage(newPage);
            setLunch('lunchA');
          } else if (newPage === 1) {
            setPage(newPage);
            setLunch('lunchB');
          }
          console.log(page);
        }}
        scrollEventThrottle={1}
      >
        <MenuList data={data.lunchA} />
        <MenuList data={data.lunchB} />
      </ScrollView>
      <View style={styles.indicatorContainer}>
        <View style={page === 0 ? styles.indicatorOn : styles.indicatorOff}></View>
        <View style={page === 0 ? styles.indicatorOff : styles.indicatorOn}></View>
      </View>
      {date === data.date && !LunchSubmit ? (
        <LunchForm mealData={lunch === 'lunchA' ? data.lunchA : data.lunchB} title={'중식'} />
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  indicatorOn: {
    height: 8,
    width: 35,
    backgroundColor: '#071648',
    marginHorizontal: 4,
    borderRadius: 4,
  },
  indicatorOff: {
    height: 8,
    width: 35,
    backgroundColor: '#dfdfdf',
    marginHorizontal: 4,
    borderRadius: 4,
  },
  indicatorContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
