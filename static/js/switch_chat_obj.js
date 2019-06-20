function updateSessDiv(sess_type,to_id,name,unread_msg_count){var badgeDiv=document.getElementById("badgeDiv_"+to_id);if(badgeDiv&&unread_msg_count>0){if(unread_msg_count>=100){unread_msg_count='99+';}badgeDiv.innerHTML="<span>"+unread_msg_count+"</span>";badgeDiv.style.display="block";}else if(badgeDiv==null){var headUrl;if(sess_type==webim.SESSION_TYPE.C2C){headUrl=friendHeadUrl;}else{headUrl=groupHeadUrl;}addSess(sess_type,to_id,name,headUrl,unread_msg_count,'sesslist');}}function addSess(sess_type,to_id,name,face_url,unread_msg_count,sesslist,addPositonType){var sessDivId="sessDiv_"+to_id;var sessDiv=document.getElementById(sessDivId);if(sessDiv){return;}var sessList=document.getElementsByClassName(sesslist)[0];sessDiv=document.createElement("div");sessDiv.id=sessDivId;sessDiv.className="sessinfo";sessDiv.onclick=function(){if(sessDiv.className=="sessinfo-sel")return;onSelSess(sess_type,to_id);};var faceImg=document.createElement("img");faceImg.id="faceImg_"+to_id;faceImg.className="face";faceImg.src=face_url;if(name.length>maxNameLen){name=name.substr(0,maxNameLen)+"...";}var delchat=document.createElement("div");delchat.className='delChat';delchat.innerHTML='删除会话';delchat.onclick=function(e){var selSess=webim.MsgStore.sessByTypeId(sess_type,to_id);if(sess_type=='C2C'){sess_type=1;webim.setAutoRead(selSess,true,false)}else{sess_type=2;webim.groupMsgReaded({"GroupId":to_id,"MsgReadedSeq":selSess._impl.curMaxMsgSeq})}delChat(sess_type,to_id);e.preventDefault();e.stopPropagation();return false;};var nameDiv=document.createElement("div");nameDiv.id="nameDiv_"+to_id;nameDiv.className="name";nameDiv.innerHTML=name;var badgeDiv=document.createElement("div");badgeDiv.id="badgeDiv_"+to_id;badgeDiv.className="badge";if(unread_msg_count>0){if(unread_msg_count>=100){unread_msg_count='99+';}badgeDiv.innerHTML="<span>"+unread_msg_count+"</span>";badgeDiv.style.display="block";}
sessDiv.appendChild(faceImg);
sessDiv.appendChild(nameDiv);
sessDiv.appendChild(badgeDiv);
sessDiv.appendChild(delchat);
if(!addPositonType||addPositonType=='TAIL'){
    sessList.appendChild(sessDiv);
}else if(addPositonType=='HEAD'){sessList.insertBefore(sessDiv);}else{console.log(webim.Log.error('未知addPositonType'+addPositonType));}}function delChat(sess_type,to_id){var data={'To_Account':to_id,'chatType':sess_type};webim.deleteChat(data,function(resp){$("#sessDiv_"+to_id).remove();});}function onSelSess(sess_type,to_id){if(selToID!=null){setSelSessStyleOff(selToID);webim.setAutoRead(selSess,false,false);var msgtosend=document.getElementsByClassName("msgedit")[0].value;var msgLen=webim.Tool.getStrBytes(msgtosend);if(msgLen>0){webim.Tool.setCookie("tmpmsg_"+selToID,msgtosend,3600);}document.getElementsByClassName("msgflow")[0].innerHTML="";selToID=to_id;setSelSessStyleOn(to_id);var tmgmsgtosend=webim.Tool.getCookie("tmpmsg_"+selToID);if(tmgmsgtosend){$("#send_msg_text").val(tmgmsgtosend);}else{$("#send_msg_text").val('');}bindScrollHistoryEvent.reset();var sessMap=webim.MsgStore.sessMap();var sessCS=webim.SESSION_TYPE.GROUP+selToID;if(sessMap&&sessMap[sessCS]){selType=webim.SESSION_TYPE.GROUP
    bindScrollHistoryEvent.init();function compare(property){return function(a,b){var value1=a[property];var value2=b[property];return value1-value2;}}var sessMapOld=sessMap[sessCS]._impl.msgs.sort(compare('time'));for(var i=0;i<sessMapOld.length;i++){addMsg(sessMapOld[i]);}}else{if(sess_type==webim.SESSION_TYPE.GROUP){if(selType==webim.SESSION_TYPE.C2C){selType=webim.SESSION_TYPE.GROUP;}selSess=null;webim.MsgStore.delSessByTypeId(selType,selToID);getLastGroupHistoryMsgs(function(msgList){getHistoryMsgCallback(msgList);bindScrollHistoryEvent.init();},function(err){alert(err.ErrorInfo);});}else{if(selType==webim.SESSION_TYPE.GROUP){selType=webim.SESSION_TYPE.C2C;}if(selToID==AdminAcount){var sess=webim.MsgStore.sessByTypeId(selType,selToID);if(sess&&sess.msgs()&&sess.msgs().length>0){getHistoryMsgCallback(sess.msgs());}else{getLastC2CHistoryMsgs(function(msgList){getHistoryMsgCallback(msgList);bindScrollHistoryEvent.init();},function(err){alert(err.ErrorInfo);});}return;}getLastC2CHistoryMsgs(function(msgList){getHistoryMsgCallback(msgList);bindScrollHistoryEvent.init();},function(err){alert(err.ErrorInfo);});}}}}function deleteSessDiv(sess_type,to_id){var sessDiv=document.getElementById("sessDiv_"+to_id);sessDiv&&sessDiv.parentNode.removeChild(sessDiv);}function updateSessNameDiv(sess_type,to_id,newName){var nameDivId="nameDiv_"+to_id;var nameDiv=document.getElementById(nameDivId);if(nameDiv){if(newName.length>maxNameLen){newName=newName.substr(0,maxNameLen)+"...";}nameDiv.innerHTML=webim.Tool.formatText2Html(newName);}}function updateSessImageDiv(sess_type,to_id,newImageUrl){if(!newImageUrl){return;}var faceImageId="faceImg_"+to_id;var faceImage=document.getElementById(faceImageId);if(faceImage){faceImage.innerHTML=webim.Tool.formatText2Html(newImageUrl);}}function setSelSessStyleOn(newSelToID){var selSessDiv=document.getElementById("sessDiv_"+newSelToID);if(selSessDiv){selSessDiv.className="sessinfo-sel";}else{webim.Log.warn("不存在selSessDiv: selSessDivId="+"sessDiv_"+newSelToID);}var selBadgeDiv=document.getElementById("badgeDiv_"+newSelToID);if(selBadgeDiv){selBadgeDiv.style.display="none";}else{webim.Log.warn("不存在selBadgeDiv: selBadgeDivId="+"badgeDiv_"+selToID);}}function setSelSessStyleOff(preSelToId){var preSessDiv=document.getElementById("sessDiv_"+preSelToId);if(preSessDiv){preSessDiv.className="sessinfo";}else{webim.Log.warn("不存在preSessDiv: selSessDivId="+"sessDiv_"+preSelToId);}}