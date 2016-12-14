var Jetlink = {

    Settings: {
        Widget: {
            OnlineWidgetUrl: "",
            ChatWindowBackgroundImageUrl: "",
            ChatWindowBackgroundColor: "",
            SendButtonText: "",
            MessageTextBoxPlaceholder: "",
            //IsVisitorNameRequired: false
            //IsVisitorPhoneRequired: false,
        },
    },
    Rules: {
        IsVisitorEmailRequired: false,
    },

    Init: function (appId, appToken) {
        var script = document.createElement('script');
        script.src = SDKSource.General.BaseUrl + '/files/js/jquery-3.1.0.min.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);

        script = document.createElement('script');
        script.src = SDKSource.General.BaseUrl + '/files/js/strophe.min.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);

        setTimeout(function () {
            SDKSource.CheckAppId(appId, appToken);
        }, 1000)
    },

    Localize: function (code) {
        SDKSource.Language.Code = code;
    }
}

var SDKSource = {
    Language: {
        Code: "en",
        Data: null
    },
    General: {
        BaseUrl: "https://public.jetlink.io",
        CompanyId: "",
        CompanyChatUserId: "",
        SenderChatUserId: "",
        SenderChatUserPsw: "",
        UserId: "",
        IsNewConversation: true
    },
    ChatServer: {
        ChatConn: null,
        ChatConnStatus: null,
        BoshService: "",
        ChatDomain: "",
        UserChatPsw: "",
    },

    CheckAppId: function (appId, appToken) {
        $.get(SDKSource.General.BaseUrl + '/WebChatData/GetApiKeyDetail?appId=' + appId + '&appToken=' + appToken,
            function (result) {
                if (result == "") {
                    console.log("Jetlink Error: Invalid appId or appToken!");
                    return;
                }
                SDKSource.General.CompanyId = result.CompanyId;
                SDKSource.CreateChatLinkElement();

                $.getJSON(SDKSource.General.BaseUrl + '/JsonData/LanguageDataWebWidget.json', function (data) {
                    SDKSource.Language.Data = data;
                });

                SDKSource.ApplyDeveloperSettings();
            });
    },
    ApplyDeveloperSettings: function () {
        if (Jetlink.Settings.Widget.OnlineWidgetUrl != "") {
            $("#imgOpenChatWindow").attr("src", Jetlink.Settings.Widget.OnlineWidgetUrl);
        }
        if (Jetlink.Settings.Widget.SendButtonText != ""){
            $("#btnMessageSend").html(Jetlink.Settings.Widget.SendButtonText);
        }
        if (Jetlink.Settings.Widget.MessageTextBoxPlaceholder != "") {
            $("#txtMessageContent").attr("placeholder", Jetlink.Settings.Widget.MessageTextBoxPlaceholder);
        }
        if ((Jetlink.Settings.Widget.ChatWindowBackgroundColor == "") && (Jetlink.Settings.Widget.ChatWindowBackgroundImageUrl == "")) {
            $("#jtlnk-conversation").css("background-image", "url('https://public.jetlink.io/files/img/chat-window-bg.png')");
            $("#jtlnk-conversation").css("background-size", "100%");
        }
        else {
            console.log("a")
            if (Jetlink.Settings.Widget.ChatWindowBackgroundImageUrl != "")
            {
                $("#jtlnk-conversation").css("background-image", "url('" + Jetlink.Settings.Widget.ChatWindowBackgroundImageUrl + "')");
                $("#jtlnk-conversation").css("background-size", "100%");
            }
            else if (Jetlink.Settings.Widget.ChatWindowBackgroundColor != "") {
                $("#jtlnk-conversation").css("background-color", "" + Jetlink.Settings.Widget.ChatWindowBackgroundColor + "");
            }
        }
    },
    Localize: function () {
        $("#spanTypeYourEmail").text(SDKSource.GetLanguageData("type_email"));
        $("#txtEmail").attr("placeholder", SDKSource.GetLanguageData("type_here_email"));
        $("#btnMessageSend").html(SDKSource.GetLanguageData("send"));
        $("#txtMessageContent").attr("placeholder", SDKSource.GetLanguageData("type_here_message"));
    },
    CreateChatLinkElement: function () {
        jQuery.ajaxSetup({ async: false });
        $.get(SDKSource.General.BaseUrl + '/files/html_templates/WebChatLink.html', function (template) {
            $("body").append(template);
        });
    },
    OpenChatWindow: function () {
        $("#JetlinkWebChat").remove();

        $.get(SDKSource.General.BaseUrl + '/files/html_templates/WebChatWindow.css?v=10', function (css_content) {
            css_content = "<style type=\"text/css\" id=\"cssChatWindow\">" + css_content + "</style>";
            $("head").append(css_content);
        });

        $.get(SDKSource.General.BaseUrl + '/files/html_templates/WebChatWindow.html?v=3', function (template) {
            $.ajax({
                url: SDKSource.General.BaseUrl + "/WebChatData/GetCompanyDetail?id=" + SDKSource.General.CompanyId,
                type: "GET", data: "",
                success: function (result) {
                    if (result != "") {
                        template = template.replace(/%WebChatInfoTitle%/g, result.WebChatInfoTitle);
                        template = template.replace(/%WebChatInfoText%/g, result.WebChatInfoText);
                        template = template.replace(/%WebChatInfoImage%/g, result.WebChatInfoImage);
                    }
                    else {
                        template = template.replace(/%WebChatInfoTitle%/g, "Jetlink");
                        template = template.replace(/%WebChatInfoText%/g, SDKSource.GetLanguageData("we_are_here"));
                        template = template.replace(/%WebChatInfoImage%/g, SDKSource.General.BaseUrl + "/files/img/jetlink-icon-white.png");
                    }

                    $.get(SDKSource.General.BaseUrl + '/WebChatData/GetCompanyGeneralChatUser?companyId=' + SDKSource.General.CompanyId,
                    function (result) {
                        if (result == "") {
                            console.log("Jetlink Error: Invalid Agent Id!");
                            return;
                        }
                        SDKSource.General.CompanyChatUserId = result;

                        $.get(SDKSource.General.BaseUrl + '/WebChatData/GetSystemConfigurations?companyId=' + SDKSource.General.CompanyId,
                        function (result) {
                            if (result == "") {
                                console.log("Jetlink Error: Invalid System Configuration!");
                                return;
                            }
                            for (var i = 0; i < result.length; i++) {
                                if (result[i].Key == "ChatServerDomain")
                                    SDKSource.ChatServer.ChatDomain = result[i].Value;
                                else if (result[i].Key == "BoshServiceUrl")
                                    SDKSource.ChatServer.BoshService = result[i].Value;
                                else if (result[i].Key == "UsersDefaultChatPassword")
                                    SDKSource.ChatServer.UserChatPsw = result[i].Value;
                            }

                            //tüm işlemler bitti...
                            $("body").append(template);
                            SDKSource.Localize();
                            SDKSource.ApplyDeveloperSettings();

                            if (SDKSource.GetCookie("Jetlink-LastConversationId") != "") {
                                SDKSource.DisplayPreviousMessages();
                            }

                            if (SDKSource.GetCookie("Jetlink-UserId") == "") {
                                if (Jetlink.Rules.IsVisitorEmailRequired == true) {
                                    if (SDKSource.GetCookie("Jetlink-LastConversationId") == "") {
                                        $("#btnMessageSend").show();
                                        $("#txtEmail").show();

                                        $.get(SDKSource.General.BaseUrl + '/files/html_templates/WebChatMessageItem.html', function (template) {
                                            template = template.replace(/%MessageCssClass%/g, "jtlnk-row jtlnk-left-row");
                                            template = template.replace(/%MessageId%/g, "11");
                                            template = template.replace(/%FromName%/g, "");
                                            template = template.replace(/%AvatarUrl%/g, "");
                                            template = template.replace(/%MessageContent%/g, SDKSource.GetLanguageData("type_email"));

                                            $("#divJetlinkMessageList").append(template);
                                            $("#divFromName_11").remove();
                                            $("#imgAvatarUrl_11").remove();

                                            $("#jtlnk-conversation").animate({ scrollTop: $("#jtlnk-conversation")[0].scrollHeight }, 1000);
                                        });
                                    }
                                    else {
                                        $("#btnMessageSend").show();
                                        $("#txtMessageContent").show();

                                        SDKSource.StartConversation();
                                    }
                                }
                                else {
                                    $("#btnMessageSend").show();
                                    $("#txtMessageContent").show();

                                    SDKSource.StartConversation();
                                }
                            }
                            else
                            {
                                SDKSource.StartConversation();
                            }

                        });
                    });
                }
            });
        });
    },
    MessageSend: function()
    {
        if (Jetlink.Rules.IsVisitorEmailRequired == true)
        {
            var email = $("#txtEmail").val();
            if (email != "") {
                if (SDKSource.validateEmail(email)) {
                    $.get(SDKSource.General.BaseUrl + '/WebChatData/ChatUserDetail?email=' + email + '&companyId=' + SDKSource.General.CompanyId,
                    function (result) {
                        if (result != "") {
                            SDKSource.General.SenderChatUserId = result.ChatUserId;
                            SDKSource.General.UserId = result.UserId;
                            SDKSource.General.SenderChatUserPsw = result.ChatPsw;

                            SDKSource.SetCookie("Jetlink-Visitor-ChatUserId", SDKSource.General.SenderChatUserId);
                            SDKSource.SetCookie("Jetlink-Visitor-ChatUserPsw", SDKSource.General.SenderChatUserPsw);
                            SDKSource.SetCookie("Jetlink-Visitor-UserId", SDKSource.General.UserId);

                            $.get(SDKSource.General.BaseUrl + '/files/html_templates/WebChatMessageItem.html', function (template) {
                                template = template.replace(/%MessageCssClass%/g, "jtlnk-row jtlnk-left-row");
                                template = template.replace(/%MessageId%/g, "11");
                                template = template.replace(/%FromName%/g, "");
                                template = template.replace(/%AvatarUrl%/g, "");
                                template = template.replace(/%MessageContent%/g, SDKSource.GetLanguageData("we_got_email"));

                                $("#divJetlinkMessageList").append(template);
                                $("#divFromName_11").remove();
                                $("#imgAvatarUrl_11").remove();

                                $("#jtlnk-conversation").animate({ scrollTop: $("#jtlnk-conversation")[0].scrollHeight }, 1000);
                            });

                            $("#txtMessageContent").focus();

                            SDKSource.StartConversation();
                        }
                    });
                }
                else {
                    $.get(SDKSource.General.BaseUrl + '/files/html_templates/WebChatMessageItem.html', function (template) {
                        template = template.replace(/%MessageCssClass%/g, "jtlnk-row jtlnk-left-row");
                        template = template.replace(/%MessageId%/g, "111222");
                        template = template.replace(/%FromName%/g, "");
                        template = template.replace(/%AvatarUrl%/g, "");
                        template = template.replace(/%MessageContent%/g, "<font color=red>" + SDKSource.GetLanguageData("invalid_email") + "</font>");

                        $("#divJetlinkMessageList").append(template);

                        $("#divFromName_111222").remove();
                        $("#imgAvatarUrl_111222").remove();

                        $("#txtEmail").val("");
                        $("#txtEmail").focus();

                        $("#jtlnk-conversation").animate({ scrollTop: $("#jtlnk-conversation")[0].scrollHeight }, 1000);
                    });
                }
            }
        }

        var messageContent = $("#txtMessageContent").val();
        if (messageContent == "") return;

        if (SDKSource.General.SenderChatUserId == "")
        {
            $.get(SDKSource.General.BaseUrl + '/WebChatData/ChatUserDetail?email=&companyId=' + SDKSource.General.CompanyId,
                function (result) {
                    if (result != "") {
                        SDKSource.General.SenderChatUserId = result.ChatUserId;
                        SDKSource.General.UserId = result.UserId;
                        SDKSource.General.SenderChatUserPsw = result.ChatPsw;

                        SDKSource.SetCookie("Jetlink-Visitor-ChatUserId", SDKSource.General.SenderChatUserId);
                        SDKSource.SetCookie("Jetlink-Visitor-ChatUserPsw", SDKSource.General.SenderChatUserPsw);

                        $("#txtMessageContent").focus();

                        SDKSource.StartConversation();
                    }
            });
        }

        if (SDKSource.GetCookie("Jetlink-LastConversationId") != "") {
            $.get(SDKSource.General.BaseUrl + '/WebChatData/GetConversatonStatus?id=' + SDKSource.GetCookie("Jetlink-LastConversationId"),
                function (result) {
                    if (result != "") {
                        if (result == "3") {
                            SDKSource.General.IsNewConversation = true;
                        }
                        else {
                            SDKSource.General.IsNewConversation = false;
                        }
                    }
                });
        }

        $.ajax({
            url: SDKSource.General.BaseUrl + "/WebChatData/InsertUserMessage?isNewConversation=" + SDKSource.General.IsNewConversation + "&fromUserChatId=" + SDKSource.General.SenderChatUserId + "&toUserChatId=" + SDKSource.General.CompanyChatUserId + "&message=" + messageContent,
            type: "GET",
            data: "",
            success: function (result) {
                if (result == "null") return;
                $.get(SDKSource.General.BaseUrl + '/files/html_templates/WebChatMessageItem.html', function (template) {
                    template = template.replace(/%MessageCssClass%/g, "jtlnk-row jtlnk-right-row");
                    template = template.replace(/%MessageId%/g, result.MessageId);
                    template = template.replace(/%FromName%/g, result.FromName);
                    template = template.replace(/%AvatarUrl%/g, result.AvatarUrl);
                    template = template.replace(/%MessageContent%/g, result.MessageContent);

                    $("#divJetlinkMessageList").append(template);
                    $("#divFromName_" + result.MessageId).remove();
                    if (result.AvatarUrl == "")
                        $("#imgAvatarUrl_" + result.MessageId).remove();

                    $("#jtlnk-conversation").animate({ scrollTop: $("#jtlnk-conversation")[0].scrollHeight }, 1000);
                    SDKSource.General.IsNewConversation = false;

                    SDKSource.SetCookie("Jetlink-LastConversationId", result.ConversationId);
                });
            }
        });

        $("#txtMessageContent").val("");
    },
    onConnect: function (status) {
        SDKSource.ChatServer.ChatConnStatus = status;

        if (SDKSource.ChatServer.ChatConnStatus == Strophe.Status.CONNECTED) {
            SDKSource.ChatServer.ChatConn.send($pres());

            SDKSource.ChatServer.ChatConn.addHandler(SDKSource.onMessage, null, 'message', null, null, null);
        }
    },
    onMessage: function(msg) {
        var body = msg.getElementsByTagName('body')[0];
        var messageContent = Strophe.getText(body);
        messageContent = messageContent.replace(/&quot;/g, "\"");
        var messageJson = jQuery.parseJSON(messageContent);

        $.ajax({
            url: SDKSource.General.BaseUrl + "/WebChatData/GetLastReceivedMessage?toUserId=" + SDKSource.General.UserId,
            type: "GET",
            data: "",
            success: function (result) {
                if (result == "null") return;
                $.get(SDKSource.General.BaseUrl + '/files/html_templates/WebChatMessageItem.html', function (template) {
                    template = template.replace(/%MessageCssClass%/g, "jtlnk-row jtlnk-left-row");
                    template = template.replace(/%MessageId%/g, result.MessageId);
                    template = template.replace(/%FromName%/g, result.FromName);
                    template = template.replace(/%AvatarUrl%/g, result.AvatarUrl);
                    template = template.replace(/%MessageContent%/g, messageJson.MessageText);

                    if (result.AvatarUrl == "")
                        template = template.replace(/%FromNameStyle%/g, "margin-left:0px;");
                    else
                        template = template.replace(/%FromNameStyle%/g, "");

                    $("#divJetlinkMessageList").append(template);

                    if (result.FromName == "")
                        $("#divFromName_" + result.MessageId).remove();
                    if (result.AvatarUrl == "")
                        $("#imgAvatarUrl_" + result.MessageId).remove();

                    if ($("#jtlnk-conversation").height() != undefined)
                        $("#jtlnk-conversation").animate({ scrollTop: $("#jtlnk-conversation")[0].scrollHeight }, 1000);
                });
            }
        });

        return true;
    },
    StartConversation: function () {
        var userId = SDKSource.GetCookie("Jetlink-Visitor-UserId");
        var chatUserId = SDKSource.GetCookie("Jetlink-Visitor-ChatUserId");
        var chatUserPsw = SDKSource.GetCookie("Jetlink-Visitor-ChatUserPsw");

        if (userId == "")
        {
            $.get(SDKSource.General.BaseUrl + '/WebChatData/ChatUserDetail?email=&companyId=' + SDKSource.General.CompanyId,
            function (result) {
                if (result != "") {
                    SDKSource.General.SenderChatUserId = result.ChatUserId;
                    SDKSource.General.SenderChatUserPsw = result.ChatPsw;
                    SDKSource.General.UserId = result.UserId;
                    
                }
            });
        }
        else
        {
            if ((chatUserId == "") || (chatUserPsw == "")) {
               $.get(SDKSource.General.BaseUrl + '/WebChatData/GetUserDetailById?userId=' + userId,
               function (result) {
                   if (result != "") {
                       chatUserId = result.ChatUserId;
                       chatUserPsw = result.ChatUserPsw;

                       SDKSource.General.SenderChatUserId = chatUserId
                       SDKSource.General.SenderChatUserPsw = chatUserPsw;
                   }
               });
            }
            else
            {
                SDKSource.General.UserId = userId
                SDKSource.General.SenderChatUserId = chatUserId
                SDKSource.General.SenderChatUserPsw = chatUserPsw;
            }
        }
        
        SDKSource.SetCookie("Jetlink-Visitor-ChatUserId", SDKSource.General.SenderChatUserId);
        SDKSource.SetCookie("Jetlink-Visitor-ChatUserPsw", SDKSource.General.SenderChatUserPsw);
        SDKSource.SetCookie("Jetlink-Visitor-UserId", SDKSource.General.UserId);

        SDKSource.ChatServer.ChatConn = new Strophe.Connection(SDKSource.ChatServer.BoshService);
        SDKSource.ChatServer.ChatConn.connect(SDKSource.General.SenderChatUserId, SDKSource.General.SenderChatUserPsw, SDKSource.onConnect);

        $("#txtEmail").val("");
        $("#txtEmail").hide();

        $("#txtMessageContent").show();
        $("#btnMessageSend").show();
    },
    DisplayPreviousMessages: function()
    {
        var lastConversationId = SDKSource.GetCookie("Jetlink-LastConversationId");
        if (lastConversationId != "")
        {
            $.get(SDKSource.General.BaseUrl + '/WebChatData/GetPreviousMessages?lastConversationId=' + lastConversationId + '&companyId=' + SDKSource.General.CompanyId,
                function (result) {
                    for (var i = 0; i < result.length; i++) {
                        var msgItem = result[i];
                        $.get(SDKSource.General.BaseUrl + '/files/html_templates/WebChatMessageItem.html', function (template) {
                            if (msgItem.IsAgent == true)
                                template = template.replace(/%MessageCssClass%/g, "jtlnk-row jtlnk-left-row");
                            else
                                template = template.replace(/%MessageCssClass%/g, "jtlnk-row jtlnk-right-row");
                            template = template.replace(/%MessageId%/g, msgItem.MessageId);
                            template = template.replace(/%FromName%/g, msgItem.FromName);
                            template = template.replace(/%AvatarUrl%/g, msgItem.AvatarUrl);
                            template = template.replace(/%MessageContent%/g, msgItem.Content);
                            if (msgItem.AvatarUrl == "")
                                template = template.replace(/%FromNameStyle%/g, "margin-left:0px;");
                            else
                                template = template.replace(/%FromNameStyle%/g, "");

                            $("#divJetlinkMessageList").append(template);
                            $("#divFromName_" + msgItem.MessageId).remove();
                            if (msgItem.AvatarUrl == "")
                                $("#imgAvatarUrl_" + msgItem.MessageId).remove();
                        });
                    }
                });
            $("#jtlnk-conversation").animate({ scrollTop: $("#jtlnk-conversation")[0].scrollHeight }, 1000);
        }
    },
    validateEmail: function(email){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    CloseWebChatWindow: function(){
        $("#cssChatWindow").remove();
        $("#jtlnk-holder").remove();

        SDKSource.CreateChatLinkElement();
        SDKSource.ApplyDeveloperSettings();
    },
    MessageKeyPress: function(e) {
        if (e.which == 13) {
            SDKSource.MessageSend();
        }
    },
    EmailKeyPress: function (e) {
        if (e.which == 13) {
            SDKSource.MessageSend();
        }
    }, 
    GetLanguageData: function (itemCode) {
        var result = "";

        $.each(SDKSource.Language.Data, function (i, v) {
            if (i == itemCode) {
                result = v[SDKSource.Language.Code];
                return result;
            }
        });

        return result;
    },
    SetCookie: function (cname, cvalue) {
        var d = new Date();
        d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 is day count
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    GetCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}