# Jetlink Javascript SDK for our Live-Web-Widget
[![Website](https://app.jetlink.io/Assets/custom/img/jetlink-logo-medium.png)](https://jetlink.io)
## Table of Contents

- [Introduction](#introduction)
- [Quick step for Jetlink Web Widget Installation](#quick-step-for-jetlink-web-widget-installation)
- [Widget Settings](#widget-settings)
- [Localization](#localization)
- [User Settings](#user-settings)
- [Widget Rules](#widget-rules)
- [Sample Code](#sample-code)

## Introduction

You can use Jetlink Javascript SDK to customize our web widget for your own web site. There are lots of different options to use Jetlink live chat web widget to use with your custom needs. Appearance of web widget can be changed. And also different functionalites can be applied for how our web widget will work. 

## Quick step for Jetlink Web Widget Installation

Include the Jetlink plugin and initialization line on your web page before closing </ body> tag on your all pages that you want to show Jetlink Web Widget
```html
<script type="text/javascript">
var _j = document.createElement("script");
_j.setAttribute("src", "https://public.jetlink.io/Sdk/Jetlink.js?j=" + new Date(Date()).getTime() / 1000);
_j.onload = function () { Jetlink.Init("YOUR-APP-ID", "YOUR-APP-TOKEN"); };
document.head.appendChild(_j);
</script>
```

## Widget Settings

* `LauncherImageUrl` - Change web-widget button image
```javascript
Jetlink.Options.LauncherImageUrl = "http://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/chat-2-icon.png";
```
* `LauncherType` - You can change web widget image type using that property. Available Types: "Circular" or "Cornered"
```javascript
Jetlink.Options.LauncherType = "Circular";
```
* `ChatWindowBackgroundImageUrl` - Change chat window background image
```javascript
Jetlink.Options.ChatWindowBackgroundImageUrl = "https://openclipart.org/image/800px/svg_to_png/232120/lolipop-seamless-pattern.png";
```
* `MessageTextBoxPlaceholder` - Placeholder text  for the textbox message written 
```javascript
Jetlink.Options.MessageTextBoxPlaceholder = "Type your message...";
```
* `ThemeColor` - You can change widget window colors for your web site color harmony
```javascript
Jetlink.Options.ThemeColor = "#900";
```
* `FontFamily` - You can change widget font family
```javascript
Jetlink.Options.FontFamily = "Calibri";
```
* `ShowEmojiButton` - You can hide or show the emoji button
```javascript
Jetlink.Options.ShowEmojiButton = false;
```
* `ShowAttachmentButton` - You can hide or show the attachment button.
```javascript
Jetlink.Options.ShowAttachmentButton = false;
```
* `Height` - You can set your live-web widget window height by this property in terms of pixels.
```javascript
Jetlink.Options.Height = 600;
```
* `LauncherHeight` - You can set your live-web widget launcher height by this property in terms of pixels.
```javascript
Jetlink.Options.LauncherHeight = 80;
```
* `LauncherWidth` - You can set your live-web widget launcher width by this property in terms of pixels.
```javascript
Jetlink.Options.LauncherWidth = 80;
```
* `LauncherStyleBehaviour` - If LauncherStyleBehaviour has been set, LauncherHeight and LauncherWidth is applied. Available Behaviours: "default" and "custom"
```javascript
Jetlink.Options.LauncherStyleBehaviour = "default";
```

## Localization

You can localize jetlink web widget with your own language settings by just the one line of code. Now, we are supporting English and Turkish. More languages are coming soon.

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

* `IsVisitorEmailOrPhoneRequired`
You can make mandatory for email address or phone number enterence by visitors. 
If you add this line of code and make the property true, our web widget will ask visitors to enter his/her email address or phone number. After entering email address, the visitor can start to chat with a live agent.

Here is the code block.

```javascript
Jetlink.Options.IsVisitorEmailOrPhoneRequired = true;
```

* `HideLauncherWhenChatWindowOpen`
You can make hide launcher then opened chat window.

Here is the code block.

```javascript
Jetlink.Options.HideLauncherWhenChatWindowOpen = true;
```

* `ShowEmailAndPhoneRequest`
You can make mandatory for email address and phone number enterence by visitors. 
If you add this line of code and make the property true, our web widget will ask visitors to enter his/her email address and phone number without required.

Here is the code block.

```javascript
Jetlink.Options.ShowEmailAndPhoneRequest = true;
```

More rules for our web widget will be added on upcoming releases of our SDK. 

## Sample Code
```javascript
Jetlink.Options.LauncherType = "cornered";
Jetlink.Options.ShowEmailAndPhoneRequest = true;
Jetlink.Options.ThemeColor = "#900";
Jetlink.Options.HideLauncherWhenChatWindowOpen = false; 
Jetlink.Options.IsVisitorEmailOrPhoneRequired = false;

var user = {
    SourceUserId: "3234234324324",
    Email: "testuser@jetlink.io",
    Phone: "+905321231212",
    Name: "Name here",
    Surname: "Surname here"
};

Jetlink.SetUser(user);

Jetlink.Options.Language = "en";

Jetlink.Init("jetlink-web-chat-11111111111", "1111111111333333333332222222");
```


