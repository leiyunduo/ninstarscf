function tlsLogin(){TLSHelper.goLogin({sdkappid:loginInfo.sdkAppID,acctype:loginInfo.accountType,url:window.location.href});}function tlsGetUserSig(res){if(res.ErrorCode==webim.TLS_ERROR_CODE.OK){loginInfo.identifier=webim.Tool.getQueryString("identifier");loginInfo.userSig=res.UserSig;loginInfo.sdkAppID=loginInfo.appIDAt3rd=Number(webim.Tool.getQueryString("sdkappid"));var accountType=webim.Tool.getCookie('accountType');if(accountType){loginInfo.accountType=accountType;webimLogin();}else{alert('accountType非法');}}else{if(res.ErrorCode==webim.TLS_ERROR_CODE.SIGNATURE_EXPIRATION){tlsLogin();}else{alert("["+res.ErrorCode+"]"+res.ErrorInfo);}}}function webimLogin(){webim.login(loginInfo,listeners,options,function(resp){loginInfo.identifierNick=resp.identifierNick;loginInfo.headurl=resp.headurl;initDemoApp();},function(err){alert(err.ErrorInfo);});}