# Jetlink Javascript SDK for our Live-Web-Widget
[![Website](https://app.jetlink.io/Assets/custom/img/jetlink_logo.png)](https://jetlink.io)
## Table of Contents

- [Introduction](#introduction)
- [Quick steps for Jetlink Web Widget Installation](#quick-step-for-jetlink-web-widget-installation)
- [Widget Settings](#widget-settings)
- [Localization](#localization)
- [User Settings](#user-settings)
- [Widget Rules](#widget-rules)
- [Sample Code](#sample-code)

## Introduction

You can use Jetlink Javascript SDK to customize our web widget for your own web site. There are lots of different options to use Jetlink live chat web widget to use with your custom needs. Appearance of web widget can be changed. And also different functionalites can be applied for how our web widget will work. 

## Quick step for Jetlink Web Widget Installation

Include the Jetlink plugin and initialization line on your web page before closing </body> tag on your all pages that you want to show Jetlink Web Widget
```html
<script type="text/javascript" src="https://public.jetlink.io/files/js/jetlink.min.js"></script>
<script type="text/javascript">
    Jetlink.Init("YOUR-APP-ID", "YOUR-APP-TOKEN");
</script>
```

## Widget Settings

* `OnlineWidgetUrl` - Change web-widget button image
```javascript
Jetlink.Settings.Widget.OnlineWidgetUrl = "http://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/chat-2-icon.png";
```
* `OnlineWidgetType` - You can change web widget image type using that property. Available Types: "Circular" or "Custom"
By changing this proprty to "Custom", you can use our own widget image, without any changes made by Jetlink.
```javascript
Jetlink.Settings.Widget.OnlineWidgetType = "Custom";
```
* `ChatWindowBackgroundImageUrl` - Change chat window background image
```javascript
Jetlink.Settings.Widget.ChatWindowBackgroundImageUrl = "http://www.intrawallpaper.com/static/images/518164-backgrounds.jpg";
```
* `ChatWindowBackgroundColor` - You can change chat window background color just a one line of code
```javascript
Jetlink.Settings.Widget.ChatWindowBackgroundColor = "#cccccc";
```
* `SendButtonText` - You can change message send button text
```javascript
Jetlink.Settings.Widget.SendButtonText = "Send the message";
```
* `MessageTextBoxPlaceholder` - Placeholder text  for the textbox message written 
```javascript
Jetlink.Settings.Widget.MessageTextBoxPlaceholder = "Type your message...";
```
* `WelcomeText` - You can send a customized welcome message for live-chat visitors.
```javascript
Jetlink.Settings.Widget.WelcomeText = "Welcome to jetlink live support. You can type anything to us that you need help.";
```
* `Height` - You can set your live-web widget height by this property in terms of pixels.
```javascript
Jetlink.Settings.Widget.Height = 500;
```
* `IsRotateWhenMouseover` - You can set this property to true if you want to rotate widget image when mouse is over. 
```javascript
Jetlink.Settings.Widget.IsRotateWhenMouseover = true;
```

## Localization

You can localize jetlink web widget with your own language settings by just the one line of code. Now, we are supporting English and Turkish. More languages are coming soon.

English: This is default language. No need to do anything.
Turkish: Just use language code as "tr"

Add below code after **Jetlink.Init(...)** line

```javascript
Jetlink.Localize("tr");
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

* `IsVisitorEmailRequired`
You can make mandatory for email address enterence by visitors. 
If you add this line of code and make the property true, our web widget will ask visitors to enter his/her email address. After entering email address, the visitor can start to chat with a live agent.

Here is the code block.

```javascript
Jetlink.Rules.IsVisitorEmailRequired = true;
```

* `HideWhenNoOnlineAgent`
You can hide Jetlink web widget icon when no online agent in Jetlink system by this rule. It is just simple doing this by adding one line of code below.

```javascript
Jetlink.Rules.HideWhenNoOnlineAgent = true;
```


More rules for our web widget will be added on upcoming releases of our SDK. 


## Sample Code
```javascript
Jetlink.Settings.Widget.SendButtonText = "Send the message";
Jetlink.Settings.Widget.MessageTextBoxPlaceholder = "Type Here";
Jetlink.Settings.Widget.OnlineWidgetUrl = "http://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/chat-2-icon.png"
Jetlink.Settings.Widget.WelcomeText = "Welcome to our live support system."
Jetlink.Settings.Widget.ChatWindowBackgroundColor = "#cccccc";
Jetlink.Rules.IsVisitorEmailRequired = true;

Jetlink.Init("jetlink-web-chat-11111111111", "1111111111333333333332222222");

var user = {
    SourceUserId: "3234234324324",
    Email: "testuser@jetlink.io",
    Phone: "+905321231212",
    Name: "Name here",
    Surname: "Surname here"
};
Jetlink.SetUser(user);

Jetlink.Localize("tr");
```


