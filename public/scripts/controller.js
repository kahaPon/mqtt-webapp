// basic functionalities
var btnConnect = document.getElementById("btn-connect");
var btnDisconnect = document.getElementById("btn-disconnect");

//disconnect
btnDisconnect.addEventListener("click", function (e) {
  e.preventDefault();
  let status = document.getElementById("inpStatus");
  status.value = "Disconnected"
  client.end();
})

//connect
btnConnect.addEventListener("click", function (e) {
  e.preventDefault();

  let status = document.getElementById("inpStatus");
  console.log("working Connect Button");
  client = mqtt.connect(document.getElementById("inpAddress").value) // connect to broker

  client.on("connect", function () {
    console.log("Successfully connected");
    status.value = "Connected"
  })

  client.on("message", function (topic, payload) { 
    console.log([topic, payload].join(": "));
    $("#messageBody").append("<tr><td>" + topic + "</td><td>" + payload + "</td><td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td></tr>");
  })
})

//publish
document.getElementById("btn-publish").addEventListener("click", function (e) {
  e.preventDefault();
  let topic = $("input[name=topic]").val();
  let payload = $("input[name=payload]").val();
  client.publish(topic, payload);
  $("#publishBody").append("<tr><td>" + topic + "</td><td>" + payload + "</td><td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td></tr>");

})

//subscribe
document.getElementById("btn-subscribe").addEventListener("click", function (e) {
  e.preventDefault();
  let topic = $("input[name=subsTopic]").val();
  client.subscribe(topic);
  $("#subscribeBody").append("<tr><td>" + topic + "</td><td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td></tr>");

})

//unsubscribe
document.getElementById("btn-unsubscribe").addEventListener("click", function (e) {
  e.preventDefault();
  let topic = $("input[name=subsTopic]").val();
  client.unsubscribe(topic);
})

