  
        Jetlink.Settings.Widget.OnlineWidgetUrl = "http://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/chat-2-icon.png";
        Jetlink.Settings.Widget.SendButtonText = "Send the message";
        Jetlink.Settings.Widget.MessageTextBoxPlaceholder = "Type Here";

        Jetlink.Rules.IsVisitorEmailRequired = true;
        Jetlink.Settings.Widget.WelcomeText = "Welcome to our live support system."
        Jetlink.Settings.Widget.ChatWindowBackgroundColor = "#cccccc";
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