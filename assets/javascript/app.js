
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCMw2SIv-aqudQIhhvMIDXmii6ZVp-WeIU",
    authDomain: "train-schedule-a4974.firebaseapp.com",
    databaseURL: "https://train-schedule-a4974.firebaseio.com",
    projectId: "train-schedule-a4974",
    storageBucket: "train-schedule-a4974.appspot.com",
    messagingSenderId: "641027052845"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destName = $("#destination-input").val().trim();
    var frstTime = $("#time-input").val().trim();
    var frq = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        dest: destName,
        time: frstTime,
        frq: frq
    };

    database.ref().push(newTrain);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("")
    $("#frequency-input").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    var trainName = childSnapshot.val().name;
    var destName = childSnapshot.val().dest;
    var firstTime = childSnapshot.val().time;
    var frq = childSnapshot.val().frq;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    
    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % frq;

    var tillTrain = frq - tRemainder;

    var nextTrain = moment().add(tillTrain, "minutes");

    var nextTrainConverted = moment(nextTrain).format("HH:mm a");


    $("#trains-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destName + "</td><td>" + frq + "</td><td>" + nextTrainConverted + "</td><td>" + tillTrain + "</td></tr>");

});

