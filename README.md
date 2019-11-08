# Jetlink Javascript SDK for our Web Messenger
[![Website](https://app.jetlink.io/Assets/img/jetlink-logo-medium.png)](https://jetlink.io)
## Table of Contents

- [Introduction](#introduction)
- [Quick step for Jetlink Web Messenger Installation](#quick-step-for-jetlink-web-widget-installation)
- [Messenger Settings](#widget-settings)
- [Localization](#localization)
- [User Settings](#user-settings)
- [Messenger Rules](#widget-rules)
- [Messenger Functions](#widget-functions)
- [Messenger Events](#widget-events)
- [Sample Code](#sample-code)

## Introduction

You can use Jetlink Javascript SDK to customize our web messenger for your own web site. There are lots of different options to use Jetlink web messenger to use with your custom needs. Appearance of web messenger can be changed. And also different functionalites can be applied for how our web messenger will work. 

## Quick step for Jetlink Web Messenger Installation

Copy and paste Jetlink messenger code on your web page before closing </ body> tag. You must include this code snippet to all your pages that you want to show Jetlink Web Messenger.
```html
<script type="text/javascript">
var _j = document.createElement("script");
_j.setAttribute("src", "https://public.jetlink.io/Sdk/Jetlink.js?j=" + new Date(Date()).getTime() / 1000);
_j.onload = function () { Jetlink.Init("YOUR-APP-ID", "YOUR-APP-TOKEN"); };
document.head.appendChild(_j);
</script>
```

## Widget Settings

**You must insert all widget customization codes above Jetlink.Init(...) line**
```html
<script type="text/javascript">
var _j = document.createElement("script");
_j.setAttribute("src", "https://public.jetlink.io/Sdk/Jetlink.js?j=" + new Date(Date()).getTime() / 1000);
_j.onload = function () { 
            // JETLINK CUSTOMIZATION PART
            // ....
            // Jetlink.Options.ShowEmojiButton = true;
            // ...
            
            Jetlink.Init("YOUR-APP-ID", "YOUR-APP-TOKEN"); 
};
document.head.appendChild(_j);
</script>
```

**All widget settings must be written as above example**

* `LauncherImageUrl` - Change web-widget button image
```javascript
Jetlink.Options.LauncherImageUrl = "http://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/chat-2-icon.png";
```
* `LauncherType` - You can change web widget image type using that property. Available Types: "circular" or "cornered"
```javascript
Jetlink.Options.LauncherType = "circular";
```
* `ChatWindowBackgroundImageUrl` - Change chat window background image
```javascript
Jetlink.Options.ChatWindowBackgroundImageUrl = "https://openclipart.org/image/800px/svg_to_png/232120/lolipop-seamless-pattern.png";
```
* `MessageTextBoxPlaceholder` - Placeholder text  for the textbox message written 
```javascript
Jetlink.Options.MessageTextBoxPlaceholder = "Type your message...";
```
* `ShowEmojiButton` - To show or hide emoji button.
```javascript
Jetlink.Options.ShowEmojiButton = true;
```
* `ShowAttachmentButton` - To show or hide attachment button.
```javascript
Jetlink.Options.ShowAttachmentButton = true;
```
* `FontFamily` - to change the font family
```javascript
Jetlink.Options.FontFamily = "Arial";
```
* `LauncherStyleBehaviour` - If LauncherStyleBehaviour has been set, LauncherHeight and LauncherWidth is applied. Available Behaviours: "default" and "custom"
```javascript
Jetlink.Options.LauncherStyleBehaviour = "default";
```
* `LauncherHeight` - height for chat launcher image
```javascript
Jetlink.Options.LauncherHeight = "100"
```
* `LauncherWidth` - width for chat launcher image
```javascript
Jetlink.Options.LauncherWidth = "100";
```
* `Height` - height for messenger window
```javascript
Jetlink.Options.Height = "500";
```
* `LauncherBorderColor` - Border color of launcher button
```javascript
Jetlink.Options.LauncherBorderColor = "#ccc";
```
* `NewConversationButtonBackgroundColor`
```javascript
Jetlink.Options.NewConversationButtonBackgroundColor = "#cdcdcd";
```
* `NewConversationButtonFontColor` 
```javascript
Jetlink.Options.NewConversationButtonFontColor = "#cdcdcd";
```
* `HeaderGeneralFontColor`
```javascript
Jetlink.Options.HeaderGeneralFontColor = "#cdcdcd";
```
* `ConversationListPageGeneralFontColor`
```javascript
Jetlink.Options.ConversationListPageGeneralFontColor = "#cdcdcd";
```
* `EditorPageGeneralFontColor`
```javascript
Jetlink.Options.EditorPageGeneralFontColor = "#cdcdcd";
```
* `AgentMessageBackgroundColor`
```javascript
Jetlink.Options.AgentMessageBackgroundColor = "#cdcdcd";
```
* `AgentMessageFontColor`
```javascript
Jetlink.Options.AgentMessageFontColor = "#cdcdcd";
```
* `UserMessageBackgroundColor`
```javascript
Jetlink.Options.UserMessageBackgroundColor = "#cdcdcd";
```
* `UserMessageFontColor`
```javascript
Jetlink.Options.UserMessageFontColor = "#cdcdcd";
```
* `EditorPageBackButtonBackgroundColor`
```javascript
Jetlink.Options.EditorPageBackButtonBackgroundColor = "#cdcdcd";
```
* `HeaderAvatarImageBorderColor`
```javascript
Jetlink.Options.HeaderAvatarImageBorderColor = "#cdcdcd";
```
* `EmojiButtonBackgroundColor`
```javascript
Jetlink.Options.EmojiButtonBackgroundColor = "#cdcdcd";
```
* `EmojiButtonInnerColor`
```javascript
Jetlink.Options.EmojiButtonInnerColor = "#cdcdcd";
```
* `AttachmentButtonBackgroundColor`
```javascript
Jetlink.Options.AttachmentButtonBackgroundColor = "#cdcdcd";
```
* `AttachmentButtonInnerColor`
```javascript
Jetlink.Options.AttachmentButtonInnerColor = "#cdcdcd";
```
* `EditorPageAgentImageListWindowBorderLineColor`
```javascript
Jetlink.Options.EditorPageAgentImageListWindowBorderLineColor = "#cdcdcd";
```
* `MessageStatusFontColor`
```javascript
Jetlink.Options.MessageStatusFontColor = "#cdcdcd";
```
* `HeaderGeneralBackgroundColor`
```javascript
Jetlink.Options.HeaderGeneralBackgroundColor = "#cdcdcd";
```
* `GeneralBackgroundColor`
```javascript
Jetlink.Options.GeneralBackgroundColor = "#cdcdcd";
```


## Localization

You can localize jetlink web widget with your own language settings by just the one line of code. Now, Jetlink supports English and Turkish. More languages are coming soon.

Turkish: "tr"
English: "en"

Add below code before **Jetlink.Init(...)** line

```javascript
Jetlink.Options.Language = "tr";
```

## User Settings

You can open Jetlink Web Widget with your own logged in user settings. To do this, you need to add just a few lines of code to set current user in Jetlink SDK.

You can see following example to use this awesome featreu easily.

```javascript
var user = {
            SourceUserId: "54355353534", // User's unique ID in your own system
            Email: "useremail@gmail.com", // User's unique email in your own system
            Phone: "+905321231212", // User's unique phone number in your own system
            Name: "My Name",
            Surname: "My Surname"
        };
Jetlink.SetUser(user);
```

You need to set user information after **Jetlink.Init(...)** line

## Widget Rules

* `ShowContactInfoRequest`
You can collect contact information of your visitors.
After adding this line, you should also define which parts of user contact info will be collected.
These options are listed below.

```javascript
Jetlink.Options.ContactInfoNameIsExists = true | false;
Jetlink.Options.ContactInfoNameIsRequired = true | false;
Jetlink.Options.ContactInfoSurnameIsExists = true | false;
Jetlink.Options.ContactInfoSurnameIsRequired = true | false;
Jetlink.Options.ContactInfoEmailIsExists = true | false;
Jetlink.Options.ContactInfoEmailIsRequired = true | false;
Jetlink.Options.ContactInfoPhoneIsExists = true | false;
Jetlink.Options.ContactInfoPhoneIsRequired = true | false;
Jetlink.Options.ContactInfoGenderIsExists = true | false;
Jetlink.Options.ContactInfoGenderIsRequired = true | false;
Jetlink.Options.ContactInfoAgreementIsExists = true | false;
Jetlink.Options.ContactInfoAgreementIsRequired = true | false;
Jetlink.Options.ContactInfoAgreementLink = "";
Jetlink.Options.ContactInfoAgreementText = "";
```

* `IsVisitorContactInfoRequired`
If you want to make mandatory to enter contact information, you should set this property as true.
```javascript
Jetlink.Options.IsVisitorContactInfoRequired = true;
```

* `HideLauncherWhenChatWindowIsOpen`
You can hide launcher when chat windows is open.

```javascript
Jetlink.Options.HideLauncherWhenChatWindowIsOpen = true;
```

More rules for our web messenger will be added on upcoming releases of our Jetlink Javascript SDK. 

## Widget Functions

* `AddMessage`
This function can be used to add an informationm essage to Jetlink conversation screen.
For example, you may need to dispaly a message when the chat window opens for the first time.

```html
Jetlink.AddMessage("Thank you for visiting our web site.", 3000);
```
> Second parameter (3000) is optional. This defines how long typing indicator will be seen on screen. If this parameter is not set, typing indicator will not be displayed.

* `OpenChatWindow`
This function can be used to open jetlink chat window programmatically.
You need to call Jetlink.OpenChatWindow(); after Jetlink widget initialized and shown on screen.

```html
Jetlink.OpenChatWindow();
```

* `CloseChatWindow`
This function can be used to close jetlink chat window programmatically, after it opened.
You need to call Jetlink.CloseChatWindow(); after Jetlink chat window is opened and shown on screen.

```html
Jetlink.CloseChatWindow();
```

## Widget Events

* `OnChatWindowFirstOpened`
This event will be triggered when Jetlink widget launcher clicked only for the first time. Developers can add any javascript code inside of this part. For example you cand send an information message to the user.

```html
Jetlink.OnChatWindowFirstOpened = function () {
   Jetlink.AddMessage("Thank you for visiting our web site.", 3000);
};
```

* `OnChatWindowOpened`
This event will be triggered when Jetlink widget launcher clicked every time by the user. 
Developers can add any javascript code inside of this part. For example you cand send an information message to the user.

```html
Jetlink.OnChatWindowOpened = function () {
   launcherIconClickCount++;
};
```


## Sample Code
```html
<script type="text/javascript">
var _j = document.createElement("script");
_j.setAttribute("src", "https://public.jetlink.io/Sdk/Jetlink.js?j=" + new Date(Date()).getTime() / 1000);
_j.onload = function () { 
            var user = {
                SourceUserId: "3234234324324",
                Email: "testuser@jetlink.io",
                Phone: "+905321231212",
                Name: "Name here",
                Surname: "Surname here"
            };
            Jetlink.SetUser(user);
            
            Jetlink.Init("YOUR-APP-ID", "YOUR-APP-TOKEN"); 
};
document.head.appendChild(_j);
</script>
```

