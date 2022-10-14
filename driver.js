'use strict';

const { Consumer } = require('sqs-consumer');
const { Producer } = require('sqs-producer');
const Chance = require('chance');
const chance = new Chance();

const producer = Producer.create({
  queueUrl: 'https://sqs.us-west-1.amazonaws.com/364628786962/delivered.fifo',
  region: 'us-west-1'
});

async function confirmDelivery(data){
  let message = '';
  try {
    let body = JSON.parse(data.Body)
    console.log('This is my driver')
    message = body.Message
    console.log(message);
  } catch (e){
    console.log('', e.message);
  }

  let stringifiedMessage = JSON.stringify(message)

  let payload = {
    id: chance.bb_pin(),
    body: stringifiedMessage,
    groupId: chance.hash({length: 15}),
    deduplicationId: chance.guid(),
  }

  try {
    let response = await producer.send(payload);
    console.log(response);
  } catch (e) {
    console.log(e)
  }

}

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-1.amazonaws.com/364628786962/confirmed',
  handleMessage: confirmDelivery
});

app.start();
