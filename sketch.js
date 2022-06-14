

let dataServer;
let pubKey = "pub-c-f36fe4cb-8521-484d-b92b-3265cc0fffe3";
let subKey = "sub-c-fae7ce25-95cb-4d22-8dca-9e4f509e15cd";
let secretKey = "sec-c-ZjAzYzA2MWUtM2E1Mi00MzljLTliMzktNDUwZWYzNmE4MDcz";

let occupancy = 0; 

let channelName = "presenceTest";

let allowMessage = false;
let friend;

function preload() {

    friend = random(0,100000);
    console.log(friend);
    friend = int(friend);
    console.log(friend);
    friend = friend.toString();

}
  
function setup() {

    createCanvas(windowWidth, windowHeight);

    dataServer = new PubNub({
      subscribeKey: subKey,
      publishKey: pubKey,
      uuid: friend,
      secretKey: secretKey,
      heartbeatInterval: 0,
    });

     // listen for messages coming through the subcription feed on this specific channel. 

    dataServer.subscribe({ channels: [channelName],   withPresence: true });
    dataServer.addListener({ message: readIncoming, presence: whoisconnected });
   
  
  }
  
function draw() { 

 if (occupancy > 3) {
  background(255);
  textSize(40)
  text("This is a secret among three of us!", windowWidth/2, windowHeight/2);
  text("Shhh!!!! More than three people here!", windowWidth/3, windowHeight/3);


  allowMessage = false;

 } else if (occupancy > 1) {

  sendTheMessage();
  allowMessage = true;
  
 } else {
  background(255);
  textSize(20)
  text("This is a secret among three of us!", windowWidth/2, windowHeight/2); 
  allowmessage = false;

  }
}
  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases
  dataServer.publish({
    channel: channelName,
    message: {
      x: mouseX,
      y: mouseY
    },
  });
}

function readIncoming(inMessage) {

  if (allowMessage == true) { // if there is less than 3 people on the page draw circles then show the messages that are sent. 
 
    if (inMessage.channel == channelName) {
        console.log(inMessage);
    }

  } 
}

function whoisconnected(connectionInfo) {
  console.log(connectionInfo);

  occupancy = connectionInfo.occupancy;

  console.log(occupancy);

}