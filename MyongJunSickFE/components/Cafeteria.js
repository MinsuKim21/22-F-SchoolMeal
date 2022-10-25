import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import { heightPercentage, widthPercentage } from '../Responsive';
import Btn from './Btn';
import DinnerForm from './DinnerForm';
import LunchForm from './LunchForm';
import MealSatisfaction from './MealSatisfaction';
import MealTiltle from './MealTiltle';
import MenuList from './MenuList';

export default function Cafeteria(props) {
  const mealData = props.mealData;
  let page = props.page;
  switch (page) {
    case 0:
      return (
        <ScrollView>
          <MealTiltle type={'중식'} time={'11-30 : 14:00'} />
          <MenuList data={mealData.lunch10} />
          <LunchForm mealData={mealData.lunch10} title={'중식'} />
          <MealTiltle type={'석식'} time={'17-30 : 19:00'} />
          <MenuList data={mealData.dinner10} />
          <View>
            <MealSatisfaction message="오늘의 석식 만족하시나요?" />
            <View style={btn.component}>
              <Btn type="석식" btnName="네!" data={mealData.dinner10} />
              <Btn type="석식" btnName="아니요.." data={mealData.dinner10} />
            </View>
          </View>
        </ScrollView>
      );
    case 1:
      return (
        <ScrollView>
          <MealTiltle type={'중식'} time={'11-30 : 14:00'} />
          <MenuList data={mealData.lunch11} />
          <LunchForm mealData={mealData.lunch11} title={'중식'} />
        </ScrollView>
      );
    case 2:
      return (
        <ScrollView>
          <MealTiltle type={'중식'} time={'11-30 : 14:00'} />
          <MenuList data={mealData.lunch12} />
          <LunchForm mealData={mealData.lunch12} title={'중식'} />
          <MealTiltle type={'석식'} time={'17-30 : 19:00'} />
          <MenuList data={mealData.dinner12} />
          <View>
            <MealSatisfaction message="오늘의 석식 만족하시나요?" />
            <View style={btn.component}>
              <Btn type="석식" btnName="네!" data={mealData.dinner12} />
              <Btn type="석식" btnName="아니요.." data={mealData.dinner12} />
            </View>
          </View>
        </ScrollView>
      );
  }
}


const btn = StyleSheet.create({
  component: {
    //박스를 감싸고 있는 컴포넌트
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: widthPercentage(12),
    marginTop: heightPercentage(16),
  },
});
