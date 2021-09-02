
const {
        Message,
        EventFilter,
        EventList,
        EventSubscription,
        ClientEventsSubscribeRequest,
        ClientEventsSubscribeResponse
} = require('sawtooth-sdk/protobuf');
const { Stream } = require('sawtooth-sdk/messaging/stream');
const { TextDecoder } = require('text-encoding/lib/encoding')

var decoder = new TextDecoder('utf8')
const VALIDATOR_URL = "tcp://validator:4004"
const stream = new Stream(VALIDATOR_URL);
let socket;
const setSocket = (currentSocket) => {
        socket = currentSocket;
}
const startEventListner = (socketConnection) => {
        console.log("Starting Event Listener");
        setSocket(socketConnection);
        stream.connect(() => {
                stream.onReceive(getEventsMessage);
                EventSubscribe(stream);
        })
}


function checkStatus(response) {
        let msg = ""
        if (response.status === 0) {
                msg = 'subscription : OK'
        } else if (response.status === 1) {
                msg = 'subscription : GOOD '
        } else {
                msg = 'subscription failed !'
        }
        return msg
}


function getEventsMessage(message) {
        let eventlist = EventList.decode(message.content).events
        eventlist.map(function (event) {
                if (event.eventType == 'sawtooth/block-commit') {
                        console.log("Sawtooth Block-commit-Event ", event);
                }
                else if (event.eventType == "Asset/WordMatch") {
                        console.log("Word-Match-Event", event);
                        socket.emit('Word-Match-Event', event);
                }
                else if (event.eventType == "Government/WordMatch") {
                        console.log("Government-Word-Match-Event", event);
                        socket.emit('Government-Word-Match-Event', event);
                }
        })
}


function EventSubscribe(stream) {
        try {
                console.log("Inside Subscription");
               
                const blockCommitSubscription = EventSubscription.create({ eventType: 'sawtooth/block-commit' })
              
                const wordMatchSubscription = EventSubscription.create({
                        eventType: 'Asset/WordMatch',
                        filters: [EventFilter.create({
                                key: "model",
                                matchString: "bmw",
                                filterType: EventFilter.FilterType.REGEX_ALL
                        })]

                })
               
                
                const wordMatchSubscription1 = EventSubscription.create({
                        eventType: 'Government/WordMatch',
                        filters: [EventFilter.create({
                                key: "department",
                                matchString: "police",
                                filterType: EventFilter.FilterType.REGEX_ALL
                        })]

                })
             
                const subscription_request = ClientEventsSubscribeRequest.encode({ subscriptions: [blockCommitSubscription, wordMatchSubscription, wordMatchSubscription1] }).finish();
                stream.send(Message.MessageType.CLIENT_EVENTS_SUBSCRIBE_REQUEST, subscription_request)
                        .then(function (response) { return ClientEventsSubscribeResponse.decode(response) })
                        .then(function (decoded_Response) {
                                console.log(checkStatus(decoded_Response))
                        })
        }
        catch (error) {
                console.log(error);
        }
}

module.exports = startEventListner;
