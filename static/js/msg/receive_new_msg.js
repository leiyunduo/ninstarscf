var msgList=[];var dateStart=null;var dateEnd=null;function onMsgNotify(newMsgList){var sess,newMsg;var sessMap=webim.MsgStore.sessMap();for(var j in newMsgList){newMsg=newMsgList[j];if(!selToID){selToID=newMsg.getSession().id();selType=newMsg.getSession().type();selSess=newMsg.getSession();var headUrl;if(selType==webim.SESSION_TYPE.C2C){headUrl=friendHeadUrl;}else{headUrl=groupHeadUrl;}addSess(selType,selToID,newMsg.getSession().name(),headUrl,0,'sesslist');setSelSessStyleOn(selToID);}if(newMsg.getSession().id()==selToID){addMsg(newMsg);}msgList.push(newMsg.elems[0].content.text);}webim.setAutoRead(selSess,true,true);for(var i in sessMap){sess=sessMap[i];if(selToID!=sess.id()){if(!dateStart){dateStart=new Date();}updateSessDiv(sess.type(),sess.id(),sess.name(),sess.unread());console.debug(sess.id(),sess.unread());dateEnd=new Date();}}}function onBigGroupMsgNotify(newMsgList){var newMsg;for(var i=newMsgList.length-1;i>=0;i--){newMsg=newMsgList[i];webim.Log.warn('receive a new group(AVChatRoom) msg: '+newMsg.getFromAccountNick());addMsg(newMsg);}}function onMsgReadedNotify(notify){var sessMap=webim.MsgStore.sessMap()[webim.SESSION_TYPE.C2C+notify.From_Account];if(sessMap){var msgs=_.clone(sessMap.msgs());var rm_msgs=_.remove(msgs,function(m){return m.time<=notify.LastReadTime});var unread=sessMap.unread()-rm_msgs.length;unread=unread>0?unread:0;sessMap.unread(unread);if(unread>0){$("#badgeDiv_"+notify.From_Account).text(unread).show();}else{$("#badgeDiv_"+notify.From_Account).val("").hide();}}}