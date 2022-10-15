import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {widthPercentage, heightPercentage, fontPercentage} from '../Responsive';
import axios from 'axios';

const postData = {
  SatisfyType: '', // Good or Bad
  MealType: '', // 중식 or 석식
  SelectList: null, // 선택된 리스트
};

export default function Btn({btnName, data, type}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [SatisfyType, setSatisfyType] = useState('');
  const [MealType, setMealType] = useState('');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [checkedData, setCheckedData] = useState([]);

  useEffect(() => {
    btnName === '네!' ? setSatisfyType('Good') : setSatisfyType('Bad');
    type === '중식' ? setMealType('중식') : setMealType('석식');
    // console.log(checkedData);
  }, [checkedData]);

  const transText =
    SatisfyType === 'Good' ? '맛있었던 메뉴를 선택해주세요!' : '별로였던 메뉴를 선택해주세요!';
  const subText = btnName === '네!' ? '이 메뉴가 맛있었어요!' : '이 메뉴는 별로였어요..';

  return (
    <View style={isModalVisible ? btn.isPress : btn.default}>
      <TouchableOpacity activeOpacity={0.8} onPress={toggleModal}>
        <Text style={isModalVisible ? btn.isPressText : btn.text}>{btnName}</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
          setCheckedData([]);
        }}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      >
        <View style={modalComponent.component}>
          <Text style={modalComponent.modalTitle}>{transText}</Text>
          {data &&
            data.map(menu => (
              <View style={modalComponent.itemComponent}>
                <BouncyCheckbox
                  key={menu}
                  size={25}
                  fillColor="#071648"
                  unfillColor="#fff"
                  textStyle={modalComponent.itemText}
                  text={menu}
                  innerIconStyle={{borderWidth: 2}}
                  onPress={() => {
                    if (checkedData.indexOf(menu) === -1) {
                      setCheckedData([menu, ...checkedData]);
                    } else {
                      checkedData.splice(checkedData.indexOf(menu), 1);
                    }
                  }}
                />
              </View>
            ))}
          <TouchableOpacity
            style={modalComponent.submitBtn}
            activeOpacity={0.5}
            onPress={async () => {
              postData.MealType = MealType;
              postData.SatisfyType = MealType;
              postData.SelectList = checkedData;
              console.log(postData);
              await axios.post('#', {
                postData,
              });
              setModalVisible(false); //
            }}
          >
            <Text style={modalComponent.submitText}>{subText}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const modalComponent = StyleSheet.create({
  component: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: widthPercentage(15),
    paddingVertical: heightPercentage(15),
    width: widthPercentage(320),
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  itemComponent: {
    width: widthPercentage(280),
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    textDecorationLine: 'none',
    marginTop: heightPercentage(8),
    marginBottom: heightPercentage(8),
    color: '#000000',
  },
  modalTitle: {
    fontSize: fontPercentage(16),
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#071648',
    marginBottom: heightPercentage(10),
  },
  submitBtn: {
    width: widthPercentage(280),
    height: heightPercentage(40),
    backgroundColor: '#071648',
    borderRadius: 10,
    marginTop: heightPercentage(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: fontPercentage(16),
    fontWeight: '500',
    fontStyle: 'normal',
  },
});

const btn = StyleSheet.create({
  isPress: {
    width: widthPercentage(190),
    height: heightPercentage(50),
    borderRadius: 4,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#071648',
    justifyContent: 'center',
  },
  default: {
    width: widthPercentage(190),
    height: heightPercentage(50),
    borderRadius: 4,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    justifyContent: 'center',
  },
  text: {
    fontSize: fontPercentage(16),
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'center',
    color: '#a8a8a8',
  },
  isPressText: {
    fontSize: fontPercentage(16),
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'center',
    color: '#000000',
  },
});