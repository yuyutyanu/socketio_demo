var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(1337);
function handler(req,res){
 switch(req.url) {
  case '/':fs.readFile(__dirname + '/index.html',function(err,data){
    if(err){
      res.writeHead(500);
      return res.end('Error');
    }
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });break;
  case '/style.css':fs.readFile(__dirname + '/style.css',function(err,data){
    if(err){
      res.writeHead(500);
      return res.end('Error');
    }
    res.writeHead(200,{'Content-Type': 'text/css'});
    res.write(data);
    res.end();
  });
  break;
 }
}

io.sockets.on('connection',function(socket){
  socket.on('emit_from_client',function(data){
  if(data.name != ''){
    io.sockets.emit('emit_from_server',data.name + ' : ' + data.msg);
  }
  });
});

console.log('server listen...');
