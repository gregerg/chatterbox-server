var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

exports.sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end( JSON.stringify(data) );
};

exports.collectData = function(request, callback){
  var message = "";
  request.on('data', function(chunk){
    message += chunk;
  });
  request.on('end', function(){
    callback( JSON.parse(message) );
  });
};
