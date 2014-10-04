var utils = require('./utils');

var objectIdCounter = 1;

var messages = [
  {
    text: "Hello World",
    username: "fred",
    objectId: objectIdCounter
  }
];

var actions = {
    'GET': function(request, response){
      utils.sendResponse(response, {results: messages});
    },

    'POST': function(request, response){
      utils.collectData(request, function(message){
        objectIdCounter++;
        message.objectId = objectIdCounter;
        messages.push(message);
        utils.sendResponse(response, {objectId: objectIdCounter}, 201);
      });
    },

    'OPTIONS': function(request, response){
      utils.sendResponse(response, null);
    }
};

module.exports = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  var action = actions[request.method];
  if( action ){
    action(request, response);
  } else {
    utils.sendResponse(response, null, 404);
  }
};
