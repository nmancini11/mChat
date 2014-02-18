// makes messages available for both the client and the server
Messages = new Meteor.Collection('messages');


if (Meteor.isClient) {
    Template.messages.messages = function () {
        return Messages.find({}, {
            sort: {
                time: 1
            }
        });
    };

    //Create global variable for username
    var userName;
    var getUsername = function(name) {
          userName = prompt("Please enter your name");

          if (userName!=null)
            {
            x="Hello " + userName + "! Welcome to mChat";
            $("#welcome").text=x;
            }
    }    
    //Run getUsername function if Meteor.isClient
    getUsername();

    Template.entryfield.events = {
        "keydown #message": function (event) {
            // this line checks to see if the "Enter / Return key was pressed"
            // the enter key has a value of 13
            if (event.which == 13) {
                //Submit 'ze form please
                //Figure out how to grab the name on a new session and store it
                var message = document.getElementById('message');
                var name = userName;
                // adjusting time
                var a_p = "";
                var time = new Date();
                var curr_hour = time.getHours();
                var curr_min = time.getMinutes();
                var curr_seconds = time.getSeconds();


                if (curr_hour < 12)
                   {
                   a_p = "AM";
                   }
                else
                   {
                   a_p = "PM";
                   }
                if (curr_hour === 0)
                   {
                   curr_hour = 12;
                   }
                if (curr_hour > 12)
                   {
                   curr_hour = curr_hour - 12;
                   }

                // make the time pretty so that people can read it
                var displayTime = curr_hour + ":" + ('0' + curr_min).slice(-2) + ":" + ('0' + curr_seconds).slice(-2) + " " + a_p;

                // insert message to DB as long as message.value is not blank
                if (message.value !== '') {
                    Messages.insert({
                        name: userName,
                        message: message.value,
                        time: displayTime
                    });
                    
                    // name.value = '';
                    message.value = '';
                }
            }
        }
    };


}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup


    });
}