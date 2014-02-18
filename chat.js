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

    Template.entryfield.events = {
        "keydown #message": function (event) {
            // this line checks to see if the "Enter / Return key was pressed"
            // the enter key has a value of 13
            if (event.which == 13) {
                //Submit 'ze form please
                var name = document.getElementById('name');
                var message = document.getElementById('message');
                // adjusting time
                var a_p = "";
                var time = new Date();
                var curr_hour = time.getHours();
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

                var curr_min = time.getMinutes();
                var displayTime = curr_hour + ":" + ('0' + curr_min).slice(-2) + ":" + ('0' + curr_seconds).slice(-2) + " " + a_p;
                console.log(displayTime);

                if (name.value !== '' && message.value !== '') {
                    Messages.insert({
                        name: name.value,
                        message: message.value,
                        time: displayTime
                    });
                    
                    name.value = '';
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