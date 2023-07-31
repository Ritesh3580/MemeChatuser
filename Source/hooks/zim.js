import React, { useReducer, createContext, useContext } from "react"
import ZIM from "zego-zim-react-native"
import Toast from "react-native-toast-message"
import { zego_config } from "../config/ZegoConfig"
// import { appConfig, avatarPrefix } from "../assets/js/config"

ZIM.create({appID: Number(zego_config.appID),appSign:zego_config.appSign});
const zim = ZIM.getInstance();

const initState = {
  isLogin: false,
  avatarMap: {},
  convInfo: {},
  user: {
    userName: "",
    userID: "",
    extendedData: "My extendedData",
    userAvatar: "",
  },
  userMap: {},
  convs: [],
  unreadCount: 0,
  chatMap: {},
  groupList: [],
  totalMemberCount: 0,
  currentBarTitle: "name[id]",
  users: [],
  callID: "",
}

let scrollViewList

const zimReducer = (state, action) => {
  const _state = Object.assign({}, state)
  if (action.type == "login") {
    _state.isLogin = true
    _state.user = { ...state.user, ...action.payload }
  } else if (action.type === "setAvatar") {
    const { userID, avatar } = action.payload
    _state.avatarMap[userID] = avatar
  } else if (action.type === "updateUser") {
    const { userID, userName } = action.payload
    userID && (_state.user.userID = userID)
    userName && (_state.user.userName = userName)
  } else if (action.type === "setConvs") {
    const { convs } = action.payload
    _state.convs = convs
    _state.unreadCount = convs.reduce((prev, curr) => {
      const count =
        curr.unreadMessageCount <= 0 || curr.notificationStatus == 2
          ? 0
          : curr.unreadMessageCount
      return prev + count
    }, 0)
  } else if (action.type === "setChat") {
    const { messages, id } = action.payload
    if (!_state.chatMap[id]) _state.chatMap[id] = []
    if (messages.length) {
      _state.chatMap[id].push(...messages)
    } else {
      _state.chatMap[id].length = 0
    }
  } else if (action.type === "setGroupList") {
    const { groupList } = action.payload
    _state.groupList = groupList
  } else if (action.type === "setMemberCount") {
    const { totalMemberCount } = action.payload
    _state.totalMemberCount = totalMemberCount
  } else if (action.type === "setUnreadCount") {
    const { total } = action.payload
    _state.unreadCount = total
  } else if (action.type === "clearChat") {
    const { conversationID } = action.payload
    if (_state.chatMap[conversationID]) {
      _state.chatMap[conversationID].length = 0
    }
  } else if (action.type === "setConvInfo") {
    const { convInfo } = action.payload
    _state.convInfo = Object.assign({}, convInfo)
  } else if (action.type === "setCallID") {
    const { callID } = action.payload
    _state.callID = callID
  } else if (action.type == "setUserMap") {
    const { userList } = action.payload
    userList.forEach((item) => {
      _state.userMap[item.baseInfo.userID] = {
        ...item.baseInfo,
        memberAvatarUrl: item.userAvatarUrl,
      }
    })
  } else if (action.type == "setUser") {
    const { user } = action.payload
    _state.user = Object.assign(_state.user, user)
  }

  return _state
}

const injectEvent = {
  callEventTimeout: () => {},
  callInvitationReceived: () => {},
}

const zimHooks = () => {
  const [state, dispatch] = useReducer(zimReducer, initState, () => ({
    ...initState,
  }))

  const errorHandle = (error) => {
    console.log("errorHandle", error)
    Toast.show({
      type: "error",
      text1: "Tips",
      text2: error,
    })
    return Promise.reject()
  }

  const injectAppEvent = (eventName, cb) => {
    injectEvent[eventName] = cb
  }

  const queryUsersInfo = (ids, isSelf = false) => {
    zim
      .queryUsersInfo(ids, { isQueryFromServer: true })
      .then(({ userList }) => {
        console.log(userList);
        if (isSelf) {
          dispatch({
            type: "setUser",
            payload: { user: userList[0] },
          })
        } else {
          dispatch({
            type: "setUserMap",
            payload: { userList },
          })
        }
      })
  }

  const login = (loginForm) => {
    dispatch({
      type: "login",
      payload: loginForm,
    })
    return zim
      .login(loginForm, "")
      .then((res) => {
        queryUsersInfo([loginForm.userID], true)
        return res
      })
      .catch(errorHandle)
  }

  const logout = () => {
    return zim.logout()
  }

  const setAvatarMap = (ids) => {
    if (!ids || !ids.length) return
    zim.queryUsersInfo(ids).then(({ userList }) => {
      userList.forEach((item) => {
        if (item.extendedData) {
          dispatch({
            type: "setAvatar",
            payload: {
              userID: item.baseInfo.userID,
              avatar: JSON.parse(item.extendedData).avatar,
            },
          })
        }
      })
    })
  }

  const updateUserInfo = (name, avatar, extendedData) => {
    if (name) {
      zim.updateUserName(name).then((res) => {
        dispatch({ type: "updateUser", payload: { userName: name } })
        console.log("updated name:",res);
      })
    }

    if (avatar) {
      avatar = zego_config.avatarPrefix + avatar
      zim.updateUserAvatarUrl(avatar).then((res) => {
        dispatch({ type: "updateUser", payload: { userAvatarUrl: avatar } })
        console.log("updated avatar:",res);
      })
    }

    if (extendedData) {
      zim.updateUserExtendedData(extendedData).then(() => {
        // this.state.user.extendedData = extendedData;
      })
    }
  }

  const getConversationUnreadMessageCount = () => {
    const total = state.convs.reduce((prev, curr) => {
      const count =
        curr.unreadMessageCount <= 0 || curr.notificationStatus == 2
          ? 0
          : curr.unreadMessageCount
      return prev + count
    }, 0)
    dispatch({ type: "setUnreadCount", payload: { total } })
    return total
  }

  const queryConversationList = () => {
    return zim
      .queryConversationList({
        count: 100,
      })
      .then((res) => {
        dispatch({
          type: "setConvs",
          payload: { convs: res.conversationList },
        })
        const ids = []
        console.log("Resss...........................",res);
        res.conversationList.forEach((item) => {
          if (!item.type) ids.push(item.conversationID)
        })
         console.log("conversationList-------------------------------", res);
        setAvatarMap(ids)
        return res
      })
      .catch(errorHandle)
  }

  const setConversationNotificationStatus = (status, id, type) => {
    return zim
      .setConversationNotificationStatus(status, id, type)
      .catch(errorHandle)
  }

  const clearConversationUnreadMessageCount = (convID, type) => {
    return zim
      .clearConversationUnreadMessageCount(convID, type)
      .catch(errorHandle)
  }

  const setMessage = (id, messages) => {
    messages = messages.sort((a, b) => a.orderKey - b.orderKey)
    dispatch({ type: "setChat", payload: { id, messages } })
  }

  const queryHistoryMessage = (convID, type, config) => {
    // orderKey-排序、去重
    return zim
      .queryHistoryMessage(convID, type, config)
      .then((res) => {
        console.warn("queryHistoryMessage", res)
        dispatch({ type: "clearChat", payload: { conversationID: convID } })
        setMessage(convID, res.messageList)
        return res
      })
      .catch(errorHandle)
  }

  const sendChatMessage = (convType, message, convID, isByte = false) => {
    message = isByte
      ? Uint8Array.from(
          Array.from(unescape(encodeURIComponent(message))).map((c) =>
            c.charCodeAt(0)
          )
        )
      : message
    const msgType = isByte ? 2 : 1
    return zim
      .sendMessage(
        { message, type: msgType },
        convID,
        +convType,
        { priority: 2 },
        {
          onMessageAttached: (msg) => {
            console.log("onAttached", JSON.stringify(msg))
          },
        }
      )
      .then((res) => {
        setMessage(convID, [res.message])
        return res
      })
      .catch(errorHandle)
  }

  const sendMediaMessage = (message, convID, convType, config, progress) => {
    const _config = { priority: 2, ...config }
    return zim
      .sendMediaMessage(message, convID, convType, _config, {
        onMessageAttached: (msg) => {
          console.log("onAttached", JSON.stringify(msg))
        },
        onMediaUploadingProgress: (msg, a, b) => {
          console.log("onProgress", a, b, JSON.stringify(msg))
          progress && progress(msg, a, b)
        },
      })
      .then((res) => {
        setMessage(convID, [res.message])
        return res
      })
      .catch((err) => {
        errorHandle(err)
      })
  }

  const createGroup = (groupInfo, users, config = {}) => {
    if (groupInfo.groupAvatarUrl)
      groupInfo.groupAvatarUrl = zego_config.avatarPrefix + groupInfo.groupAvatarUrl
    return zim
      .createGroup(groupInfo, users, {
        groupAttributes: {},
        groupNotice: "",
        ...config,
      })
      .catch(errorHandle)
  }

  const joinGroup = (groupID) => {
    return zim.joinGroup(groupID).catch(errorHandle)
  }

  const updateGroupAvatarUrl = (groupID, groupAvatarUrl) => {
    groupAvatarUrl = zego_config.avatarPrefix + groupAvatarUrl
    return zim
      .updateGroupAvatarUrl(groupAvatarUrl, groupID)
      .then((res) => {
        return res
      })
      .catch(errorHandle)
  }

  const setGroupAttributes = (groupID, groupAttributes) => {
    return zim.setGroupAttributes(groupAttributes, groupID).catch(errorHandle)
  }

  const queryGroupAttributes = (groupID, keys) => {
    if (keys?.length) {
      return zim.queryGroupAttributes(keys, groupID).catch(errorHandle)
    }

    return zim.queryGroupAllAttributes(groupID).catch(errorHandle)
  }

  const createRoom = (roomInfo, roomAttr = {}) => {
    const { roomID, roomName } = roomInfo
    return zim.createRoom({ roomID, roomName }).catch(errorHandle)
  }

  const joinRoom = (roomID) => {
    return zim.joinRoom(roomID).catch(errorHandle)
  }

  const leaveRoom = (roomID) => {
    return zim.leaveRoom(roomID).catch(errorHandle)
  }

  const deleteAllMessage = (conversationID, conversationType, config) => {
    return zim
      .deleteAllMessage(conversationID, conversationType, config)
      .then((res) => {
        dispatch({ type: "clearChat", payload: { conversationID } })
        return res
      })
      .catch(errorHandle)
  }

  const getGroupList = () => {
    return zim
      .queryGroupList()
      .then((res) => {
        console.warn("==getGroupList==", res)
        dispatch({
          type: "setGroupList",
          payload: { groupList: res.groupList },
        })
        return res
      })
      .catch(errorHandle)
  }

  const updateGroupName = (groupID, groupName) => {
    return zim.updateGroupName(groupName, groupID).catch(errorHandle)
  }

  const updateGroupNotice = (groupID, groupNotice) => {
    return zim.updateGroupNotice(groupNotice, groupID).catch(errorHandle)
  }

  const transferGroupOwner = (groupID, userID) => {
    return zim.transferGroupOwner(userID, groupID).catch(errorHandle)
  }

  const inviteUsersIntoGroup = (userIDs, groupID) => {
    return zim.inviteUsersIntoGroup(userIDs, groupID).catch(errorHandle)
  }

  const kickGroupMembers = (userIDs, groupID) => {
    return zim.kickGroupMembers(userIDs, groupID).catch(errorHandle)
  }

  const queryGroupMemberList = (groupID, config) => {
    return zim.queryGroupMemberList(groupID, config).catch(errorHandle)
  }

  const queryGroupMemberCount = (groupID) => {
    return zim
      .queryGroupMemberCount(groupID)
      .then((res) => {
        dispatch({
          action: "setMemberCount",
          payload: { totalMemberCount: res.count },
        })
        return res
      })
      .catch(errorHandle)
  }

  const queryGroupInfo = (groupID) => {
    return zim.queryGroupInfo(groupID).catch(errorHandle)
  }

  const deleteConversation = (id, type, config) => {
    const _config = {
      isAlsoDeleteServerConversation: true,
      isAlsoDeleteLocalHistoryMessage: true,
      ...config,
    }
    return zim.deleteConversation(id, type, _config).catch(errorHandle)
  }

  const leaveGroup = (groupID) => {
    return zim
      .leaveGroup(groupID)
      .then((res) => {
        const index = state.groupList.findIndex(
          (item) => item.groupID == groupID
        )
        if (index !== -1) {
          const groupList = state.groupList.splice(index, -1)
          dispatch({ type: "setGroupList", payload: { groupList } })
        }
        return res
      })
      .catch(errorHandle)
  }

  const dismissGroup = (groupID) => {
    return zim
      .dismissGroup(groupID)
      .then((res) => {
        const index = this.state.groupList.findIndex(
          (item) => item.groupID == groupID
        )
        if (index !== -1) {
          const groupList = state.groupList.splice(index, -1)
          dispatch({ type: "setGroupList", payload: { groupList } })
        }
        return res
      })
      .catch(errorHandle)
  }

  const queryRoomMember = (roomID) => {
    const config = {
      nextFlag: "",
      count: 100,
    }
    return zim
      .queryRoomMemberList(roomID, config)
      .then((res) => {
        // const ids = res.memberList.map((item) => item.userID);
        // setAvatarMap(ids);
        return res
      })
      .catch(errorHandle)
  }

  const queryRoomOnlineMemberCount = (roomID) => {
    return zim
      .queryRoomOnlineMemberCount(roomID)
      .then((res) => {
        dispatch({
          action: "setMemberCount",
          payload: { totalMemberCount: res.count },
        })
        return res
      })
      .catch(errorHandle)
  }

  const setScrollView = (ref) => {
    scrollViewList = ref
  }

  const actionScrollView = () => {
    setTimeout(() => {
      scrollViewList &&
        scrollViewList.current &&
        scrollViewList.current.scrollToEnd()
    }, 200)
  }

  const setConvInfo = (convInfo) => {
    dispatch({ action: "setConvInfo", payload: { convInfo } })
  }

  const callClear = () => {
    dispatch({ type: "setCallID", payload: { callID: "" } })
  }

  const callSetID = (callID) => {
    dispatch({ type: "setCallID", payload: { callID } })
  }

  const callInvite = (invitees, config) => {
    return zim
      .callInvite(invitees, config)
      .then((res) => {
        callSetID(res.callID)
      })
      .catch(errorHandle)
  }

  const callCancel = (invitees, callID, config) => {
    return zim
      .callCancel(invitees, callID, config)
      .then(() => callClear(), console.log("Already canceled"))
      .catch(errorHandle)
  }

  const callAccept = (callID, config) => {
    return zim
      .callAccept(callID, config)
      .then((res) => callClear(), console.log("Already accepted"))
      .catch(errorHandle)
  }

  const callReject = (callID, config) => {
    return zim
      .callReject(callID, config)
      .then(() => callClear(), console.log("Already rejected"))
      .catch(errorHandle)
  }

  const initEvent = () => {
    zim.on("receivePeerMessage", (zim, data) => {
      console.warn("==receivePeerMessage==", data)
      const { messageList, fromConversationID } = data
      setMessage(fromConversationID, messageList)
      actionScrollView()
    })
    zim.on("receiveGroupMessage", (zim, data) => {
      console.warn("==receiveGroupMessage==", data)
      const { messageList, fromConversationID } = data
      setMessage(fromConversationID, messageList)
      actionScrollView()
    })
    zim.on("receiveRoomMessage", (zim, data) => {
      console.warn("==receiveRoomMessage==", data)
      const { messageList, fromConversationID } = data
      setMessage(fromConversationID, messageList)
      actionScrollView()
    })
    zim.on("conversationChanged", (zim, data) => {
      console.warn("==conversationChanged==", data)
      queryConversationList()
    })
    zim.on("groupNameUpdated", (zim, data) => {
      console.warn("==groupNameUpdated==", data)
      queryConversationList()
    })
    zim.on("groupMemberStateChanged", (zim, data) => {
      console.warn("==groupMemberStateChanged==", data)
      // queryGroupMemberCount(data.groupID);
    })
    zim.on("groupStateChanged", (zim, data) => {
      console.warn("==groupStateChanged==", data)
      // Invited
      if (state.isLogin && data.event == 4) {
        queryConversationList()
      }
    })
    zim.on("roomStateChanged", (zim, data) => {
      const { state, event, extendedData, roomID } = data
      console.log("===roomStateChanged===", state, event, extendedData, roomID)
      const stateTips = ["Disconnect", "connecting", "connected"]
      Toast.show({
        type: "info",
        text1: "Tips",
        text2: stateTips[state],
      })
      if (
        state == 0 &&
        roomID == state.convInfo.id &&
        state.convInfo.type == 1
      ) {
        // this.routeBack();
      }
    })
    zim.on("roomMemberJoined", (zim, data) => {
      const { memberList, roomID } = data
      console.log("===roomMemberJoined===", memberList, roomID)
      if (roomID !== state.convInfo.id) return
      memberList.forEach((user) => {
        const userID = user.userID
        const index = state.users.findIndex((item) => userID === item.userID)
        if (index == -1) {
          state.users.push(user)
        }
      })
      queryRoomOnlineMemberCount()
    })
    zim.on("roomMemberLeft", (zim, data) => {
      const { memberList, roomID } = data
      console.log("===roomMemberLeft===", memberList, roomID)
      if (roomID !== state.convInfo.id) return
      memberList.forEach((user) => {
        const userID = user.userID
        const index = state.users.findIndex((item) => userID === item.userID)
        if (index == -1) {
          state.users.splice(index, 1)
        }
      })
      queryRoomOnlineMemberCount()
    })
    zim.on("callInvitationReceived", (zim, data) => {
      console.warn("==callInvitationReceived==", data)
      // callSetID(data.callID)
      injectEvent.callInvitationReceived(data.callID, data.inviter)
    })
    zim.on("callInvitationCancelled", (zim, data) => {
      console.warn("==callInvitationCancelled==", data)
    })
    zim.on("callInvitationTimeout", (zim, data) => {
      console.warn("==callInvitationTimeout==", data)
      callClear()
    })
    zim.on("callInvitationAccepted", (zim, data) => {
      console.warn("==callInvitationAccepted==", data)
    })
    zim.on("callInvitationRejected", (zim, data) => {
      console.warn("==callInvitationRejected==", data)
    })
    zim.on("callInviteesAnsweredTimeout", (zim, data) => {
      console.warn("==callInviteesAnsweredTimeout==", data)
      callClear()
      injectEvent.callEventTimeout()
    })
    return zim
  }

  return {
    state,
    login,
    initEvent,
    logout,
    queryUsersInfo,
    setAvatarMap,
    updateUserInfo,
    queryConversationList,
    setConversationNotificationStatus,
    clearConversationUnreadMessageCount,
    queryHistoryMessage,
    sendChatMessage,
    sendMediaMessage,
    createGroup,
    joinGroup,
    updateGroupAvatarUrl,
    setGroupAttributes,
    queryGroupAttributes,
    createRoom,
    joinRoom,
    leaveRoom,
    getGroupList,
    updateGroupName,
    updateGroupNotice,
    transferGroupOwner,
    inviteUsersIntoGroup,
    kickGroupMembers,
    queryGroupMemberList,
    queryGroupMemberCount,
    queryGroupInfo,
    deleteConversation,
    leaveGroup,
    dismissGroup,
    queryRoomMember,
    queryRoomOnlineMemberCount,
    setScrollView,
    deleteAllMessage,
    getConversationUnreadMessageCount,
    setConvInfo,
    callInvite,
    callCancel,
    injectAppEvent,
    callClear,
    callSetID,
    callAccept,
    callReject,
  }
}

const Context = createContext()

const useZIM = () => useContext(Context)

const ZimProvider = ({ children }) => {
  const { state, ...action } = zimHooks()

  return <Context.Provider value={[state, action]}>{children}</Context.Provider>
}

export { zimHooks, useZIM, ZimProvider }
