Alarms = new Mongo.Collection("alarms");

/*
  0: Ascending
  1: Descending
*/


if (Meteor.isClient) {
  Session.set("sortingOrder", 0);

  Template.body.helpers({
    alarms: function() {
      if(Session.get("sortingOrder") == 0)
        return Alarms.find({}, {sort: {money: -1}});
      else
        return Alarms.find({}, {sort: {money: 1}});
    },
    sortToggleIcon: function() {
      if(Session.get("sortingOrder") == 0) {
        return "/\\";
      } else {
        return "\\/";
      }
    }
  });


  Template.body.events({
    "click #sortToggle" : function() {
      if(Session.get("sortingOrder") == 0) {
        Session.set("sortingOrder", 1);
      } else {
        Session.set("sortingOrder", 0);
      }
    }
  });
}

if (Meteor.isServer) {

  Meteor.startup(function () {
    // code to run on server at startup
    Alarms.remove({});
    var data = Alarms.find({});
    if(data.count() == 0)
    Alarms.insert({
      name: "Gregory",
      profileImage: "images/greg.png",
      money: 6
    });
    Alarms.insert({
      name: "George",
      profileImage: "images/greg.png",
      money: 5
    });
    Alarms.insert({
      name: "Gregory",
      profileImage: "images/greg.png",
      money: 8
    });
    Alarms.insert({
      name: "George",
      profileImage: "images/greg.png",
      money: 20
    });
  });
}
