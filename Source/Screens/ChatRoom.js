import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  createRef,
} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
// import { Bubble, GiftedChat } from 'react-native-gifted-chat';
// import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../Assetst/Constants/Colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment/moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// import Avatar from 'react-native-boring-avatars';

import {Layout, Button, Input} from '@ui-kitten/components';
import {useZIM} from '../hooks/zim';
import Modal from 'react-native-modal';
import axios from 'axios';
import {baseurl} from '../config/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleToast from 'react-native-simple-toast';
// import ActionSheet from 'react-native-actions-sheet';

const msgStyles = isMe =>
  isMe
    ? {
        messageDirection: {flexDirection: 'row-reverse'},
        bgc: {backgroundColor: Colors.lightPurple, borderRadius: 10},
        idDirection: {textAlign: 'right'},
      }
    : {
        messageDirection: {flexDirection: 'row'},
        bgc: {backgroundColor: Colors.gray, borderRadius: 10},
        idDirection: {textAlign: 'left'},
      };

const MessageItem = ({avatarMap, item, messages}) => {
  const currAvatar = avatarMap[item.senderUserID];
  const transMsg = item => {
    // console.log("itemm.......................................//",item.largeImageDownloadUrl);
    const stcikerUrl = item.largeImageDownloadUrl;
    const msg = item.message;
    const isURLImg = value =>
      /\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(value);
    if (msg) {
      if (isURLImg(msg)) {
        return (
          <>
            <Text>${msg}</Text>
            {/* <Image source={msg} resizeMode="cover" /> */}
          </>
        );
      }
    }

    return (
      <View style={{paddingVertical: 5}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.messageText}>{msg}</Text>
          {/* {console.log('messs.............................', msg)} */}
          {stcikerUrl == null ? null : (
            <Image
              source={{uri: stcikerUrl}}
              style={{height: 50, width: 50}}></Image>
          )}

          <Text
            style={{
              color: item.direction == 0 ? Colors.white : Colors.gray,
              fontSize: 10,
              paddingRight: 5,
            }}>
            {moment(Number(item.timestamp)).format('LT')}
          </Text>
        </View>
        <Text
          style={[
            styles.date_time_sender,
            {color: item.direction == 0 ? Colors.white : Colors.gray},
          ]}>
          {moment(Number(item.timestamp)).format('ll')}
        </Text>
      </View>
    );
  };
  return (
    <View
      style={[styles.message, msgStyles(item.direction == 0).messageDirection]}>
      {/* {
                currAvatar ?
                    <Avatar source={avatarMap[item.senderUserID]} style={styles.avatar} />
                    :
                    <Avatar
                        size={36}
                        name={`${item.senderUserID}`}
                        variant='beam'
                        colors={['#E3D88C', '#7BAEF3', '#C08FEF', '#EF9F9F', '#73CAAE']}
                    />
            } */}
      <View style={styles.messageBox}>
        {/* <View style={styles.idBox}>
                    <Text style={[styles.id, msgStyles(item.direction == 0).idDirection]}>{item.senderUserID}</Text>
                </View> */}
        <View
          style={[styles.messageTextBox, msgStyles(item.direction == 0).bgc]}>
          {transMsg(item)}
        </View>
      </View>
    </View>
  );
};

export default function ChatRoom({route, navigation}) {
  const currentUser = route?.params?.userData?.appData?.user;
  const targetHost = route?.params?.userData?.user;
  const actionSheetRef = createRef(false);
  // console.log(targetHost);
  const type = route?.params?.type;
  const id = route?.params?.id;
  const name = route?.params?.name;
  const [isByte, setIsByte] = useState(false);
  const [inputText, setInputText] = useState('');

  const [stickerIg, setstickerIg] = useState('');
  // const [count, setCount] = useState(0);
  const flatList = React.useRef(null);

  const [messages, setMessages] = useState([]);

  const [{avatarMap, chatMap}, zimAction] = useZIM();

  useEffect(() => {
    zimAction.setScrollView(flatList);
    zimAction
      .queryHistoryMessage(id, type, {count: 1000, reverse: true})
      .then(res => {
        // let MSGLIST = [];
        // res.messageList?.forEach((item) => {
        //     item['_id'] = item.localMessageID;
        //     item['text'] = item.message;
        //     item['createdAt'] = new Date(Number(item.timestamp));
        //     item['user'] = {
        //         _id: item.senderUserID,
        //         avatar: targetHost?.imageUrl || ''
        //     };
        //     MSGLIST.push(item);
        //     setMessages(MSGLIST.reverse());
        // });
        setTimeout(() => {
          flatList.current.scrollToEnd();
        }, 200);
      });
    return () => {
      zimAction.clearConversationUnreadMessageCount(id, type);
    };
  }, []);

  async function getSticker() {
    const token = await AsyncStorage.getItem('token');
    console.log('yess', token);

    try {
      axios
        .get(baseurl + `getAllChatSticker`, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(res => {
          // console.log(
          //   'ressssssssssssssssssssssssssssssssssssssssssssssss',
          //   res.data.result,
          // );
          setstickerIg(res.data.result);
        })
        .catch(err => {
          console.log('error St', err);
        });
    } catch (err) {
      console.log('Error Of Sticker ...', err);
    }
  }
  const msgs = chatMap[id] || [];

  // useEffect(() => {
  //     const interval = setInterval(() => {
  //       _getSMS();
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }, []);

  // const _getSMS = () => {
  //     setMessages(msgs);
  //     // console.log('ok');
  // };

  // const _getSMS = () => {
  //     msgs.map((item => {
  //         item['_id'] = item.localMessageID;
  //         item['text'] = item.message;
  //         item['createdAt'] = new Date(Number(item.timestamp));
  //         item['user'] = {
  //             _id: item.senderUserID,
  //             avatar: targetHost?.imageUrl || ''
  //         };
  //     }));
  //     setMessages(msgs.reverse());
  // };

  // const sendMessage = (messagesArray) => {
  //     // setInputText('');
  //     const msg = messagesArray[0];
  //     // let ID = '71669691';
  //     setMessages(previousMessages => GiftedChat.append(previousMessages, msg));

  //     zimAction.sendChatMessage(type, msg.text, id, isByte).then(() => {
  //         console.log('Message sent successfully😀');
  //         setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
  //         setTimeout(() => {
  //             flatList.current.scrollToEnd();
  //         }, 200);
  //     });
  // };

  // const sendMediaMsg = () =>{
  //   console.log("Press on gift....");
  //   // zimAction.sendMediaMessage(mediaMessage, id , type, isByte )
  //   // .then(() => {
  //   //   setTimeout(() => {
  //   //     flatList.current.scrollToEnd();
  //   //   }, 200);
  //   // })
  //   // .catch((err) =>
  //   // {
  //   //   console.log("Not send Message ", err);
  //   // });
  // }

  // const actionSheetRef = useRef();

  // const showActionSheet = () => {
  //   actionSheetRef.current?.setModalVisible();
  // };

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const [currentCoin, setcurrentCoin] = useState('');

  const toggleBottomSheet = () => {
    getSticker();
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };

  var config = {priority: 1};
  var notification = {
    onMessageAttached: function (message) {
      console.log("reeeessss';l'", message);
    },
    onMediaUploadingProgress: function (
      message,
      currentFileSize,
      totalFileSize,
    ) {
      console.log('-009009090090', message, currentFileSize);
    },
  };
  // console.log("Target Host ......",targetHost);

  async function coinsReduce() {
    console.log('Coin Reduces........');
    const token = await AsyncStorage.getItem('token');
    try {
      axios
        .get(baseurl + 'showProfile', {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(resp => {
          console.log('Response ...............', resp.data.total_coins);
          setcurrentCoin(resp.data.total_coins);
        })
        .catch(err => {
          console.log('error Of Coing', err);
        });
    } catch (err) {
      console.log('errror ...COing', err);
    }
  }

  const sendGift = async stkUrl => {
    coinsReduce();
    if (currentCoin < stkUrl.coins) {
      SimpleToast.show('Insufficient coin!');
      console.log('current coin,,', currentCoin);
    } else {
      //console.log("Target Host ......",targetHost);
      const data = {
        stickerSpentCoins: stkUrl.coins,
        userId: id,
      };
      console.log('Id................................', id);

      const token = await AsyncStorage.getItem('token');

      axios
        .put(baseurl + `updateCoinSticker`, data, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(res => {
          console.log('resp/////////////////////', res);

          setIsBottomSheetVisible(false);
          console.log('Stc0------------------------', stkUrl);
          var mediaMessageObj = {
            fileDownloadUrl: stkUrl.stickerUrl, //  Full Image
            thumbnailDownloadUrl: stkUrl.stickerUrl, // Thumbnail
            largeImageDownloadUrl: stkUrl.stickerUrl, // Large image
            type: 11,
          };

          zimAction
            .sendMediaMessage(mediaMessageObj, id, type, config, notification)
            .then(res => {
              console.log('ressssss=========', res);
            })
            .catch(err => {
              console.log('Error...///', err);
            });
        })
        .catch(err => {
          console.log('Eroorr', err);
        });
    }
  };

  const sendMessage = msg => {
    setInputText('');
    // let ID = '71669691';
    zimAction
      .sendChatMessage(type, msg, id, isByte)
      .then(() => {
        setTimeout(() => {
          flatList.current.scrollToEnd();
        }, 200);
      })
      .catch(err => {
        console.log('Not send Message ', err);
      });
  };

  // const byDate = msgs?.reduce((obj, item) => {
  //     console.log("obj",obj);
  //     if (obj[item.timestamp]) {
  //         obj[item.timestamp].push(item);

  //         return obj;
  //     }

  //     obj[item.timestamp] = [
  //         { ...item }
  //     ];
  //     return obj;
  // }, {});

  // const renderBubble = props => {
  //     return (
  //         <Bubble
  //             {...props}
  //             wrapperStyle={{
  //                 right: {
  //                     backgroundColor: Colors.lightBlue,
  //                     borderRadius: 5,
  //                 },
  //                 left: {
  //                     backgroundColor: Colors.lightBlue,
  //                     borderRadius: 5,
  //                 },
  //             }}
  //             textStyle={{
  //                 right: {
  //                     color: '#fff',
  //                 },
  //                 left: {
  //                     color: '#fff',
  //                 },
  //             }}
  //         />
  //     );
  // };

  // const scrollToBottom = () => (
  //     <FontAwesome name="angle-double-down" size={22} color="#333" />
  // );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign
            name="left"
            color="#000"
            size={24}
            onPress={() => {
              navigation.goBack();
            }}
          />
          {targetHost?.userImage ? (
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                marginHorizontal: 10,
                overflow: 'hidden',
              }}>
              <Image
                source={{uri: targetHost.userImage}}
                style={{height: '100%', width: '100%', borderRadius: 15}}
              />
            </View>
          ) : (
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                // backgroundColor: Colors.white,
                marginHorizontal: 10,
              }}>
              <Image
                source={require('../Assetst/Images/userss.png')}
                style={{height: '100%', width: '100%', borderRadius: 15}}
              />
            </View>
          )}
          {targetHost && targetHost?.FirstName ? (
            <Text style={styles.name}>
              {targetHost?.FirstName} {targetHost?.LastName}
            </Text>
          ) : (
            <Text style={styles.name}>{id}</Text>
          )}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <MaterialCommunityIcons name="dots-vertical" color="#000" size={26} style={{ marginLeft: 20 }} onPress={() => { }} /> */}
        </View>
      </View>

      <View style={styles.contain}>
        <FlatList
          ref={flatList}
          data={msgs}
          onContentSizeChange={() => {
            flatList.current?.scrollToEnd({animated: true});
          }}
          // initialScrollIndex={msgs.length - 1}
          renderItem={props => (
            <MessageItem
              key={props.item.messageID}
              avatarMap={avatarMap}
              {...props}
            />
          )}
          keyExtractor={item => item.id}
        />

        {/* -------------------------Message Input Panel-------------------------------------- */}
        <View style={styles.footer}>
          <View style={styles.input}>
            <Input
              style={{width: wp('77%')}}
              value={inputText}
              onChangeText={nextValue => setInputText(nextValue)}
            />
            <TouchableOpacity onPress={toggleBottomSheet}>
              <Image
                source={require('../Assetst/Images/giftico.png')}
                style={{height: 40, width: 40}}
              />
            </TouchableOpacity>
          </View>

          <Modal
            isVisible={isBottomSheetVisible}
            onBackdropPress={toggleBottomSheet}
            onBackButtonPress={toggleBottomSheet}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 16,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: hp('40%'),
                alignSelf: 'center',
                width: wp('100%'),
              }}>
              <FlatList
                horizontal={false}
                keyExtractor={item => item._id}
                numColumns={3}
                data={stickerIg}
                renderItem={({item, index}) => {
                  return (
                    <ScrollView>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: wp('20%'),
                          //backgroundColor: 'gray',
                          height: hp('10%'),
                          alignItems: 'center',
                          //paddingHorizontal:wp('4.5%'),
                          alignSelf: 'center',
                          marginVertical: 10,
                          //borderWidth: 1,
                          borderRadius: 10,
                          //  margin:10
                        }}>
                        <TouchableOpacity
                          style={{height: hp('10%'), width: wp('20%')}}
                          onPress={() => sendGift(item)}>
                          <Image
                            source={{uri: item.stickerUrl}}
                            style={{height: hp('8%'), width: wp('20%')}}
                          />
                          <View
                            style={{
                              alignSelf: 'center',
                              marginVertical: hp('0.5%'),
                              flexDirection: 'row',
                            }}>
                            <Image
                              source={require('../Assetst/Images/coins.png')}
                              style={{height: 20, width: 20}}
                            />
                            <Text style={{color: 'black', fontSize: 12}}>
                              {item.coins}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  );
                }}
              />
            </View>
          </Modal>

          <Pressable
            onPress={() => sendMessage(inputText)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 35,
              width: 35,
              backgroundColor: Colors.lightBlue,
              borderRadius: 20,
              marginHorizontal: 5,
            }}>
            <Ionicons
              name="send"
              size={18}
              color="#fff"
              style={{marginLeft: 2}}
            />
          </Pressable>
        </View>
        {/* <GiftedChat
                    messages={messages}
                    onSend={messages => sendMessage(messages)}
                    user={{
                        _id: currentUser?.userId
                    }}
                    showUserAvatar={false}
                    isTyping
                    textInputStyle={{ color: '#000' }}
                    scrollToBottom={true}
                    scrollToBottomComponent={scrollToBottom}
                    renderBubble={renderBubble}

                /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#b15eff',
  },
  name: {
    color: '#000',
    fontWeight: '500',
    // marginLeft: 20,
    fontSize: 16,
  },
  contain: {
    flex: 1,
    zIndex: 600,
  },
  converse: {
    flex: 1,
  },
  footer: {
    backgroundColor: 'white',
    height: 58,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center',
    paddingLeft: 10,
  },
  plus: {
    height: 25,
    width: 25,

    backgroundColor: 'white',
    borderColor: 'white',
  },
  input: {
    flex: 1,
    flexDirection: 'row',
  },
  inputButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 0,
    borderColor: 'white',
  },
  sendButton: {
    paddingLeft: 0,
    paddingVertical: 4,
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
  },
  inputIcon: {
    height: 30,
    width: 30,
  },
  chooseMore: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-around',
    height: 80,
    alignItems: 'center',
  },
  chooseButton: {
    height: 50,
    width: 50,
  },
  message: {
    // paddingHorizontal: 15,
    paddingVertical: 4,
  },
  avatar: {
    height: 35,
    width: 35,
    marginTop: 13,
    borderRadius: 35 / 2,
  },
  messageBox: {
    paddingHorizontal: 10,
  },
  id: {
    fontSize: 14,
    paddingBottom: 3,
  },
  idBox: {
    justifyContent: 'flex-end',
  },
  messageTextBox: {
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 4,
  },
  messageText: {
    paddingHorizontal: 8,
    maxWidth: 300,
    color: '#000',
  },
  more: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  date_time_sender: {
    color: Colors.white,
    fontSize: 10,
    paddingRight: 5,
    textAlign: 'right',
  },
  date_time_receiver: {
    // color: Colors.white,
    fontSize: 10,
    paddingLeft: 5,
    textAlign: 'left',
  },
});
