var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 8888;

var server = http.createServer(function(request, response){

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  //从这里开始看，上面不要看

  if(path === '/'){  // 如果用户请求的是 / 路径
    var string = fs.readFileSync('./index.html')  
    response.setHeader('Content-Type', 'text/html;charset=utf-8')  
    response.end(string)   
  }else if(path === '/signUp' && method === 'POST'){
    getPostData(request, function(postData){
      let {email, password, password_confirmation} = postData
      let errors = {}
      // check email
      if(email.indexOf('@') <= 0){
        errors.email = '邮箱不合法'
      }
      if(password.length < 6){
        errors.password = '密码太短'
      }

      if(password_confirmation !== password){
        errors.password_confirmation = '两次输入密码不匹配'
      }

      // 写数据库

      response.setHeader('Content-Type', 'text/html;charset=utf-8') 
      response.end(JSON.stringify(errors)) // 运行在node.js
    })
  }else if(path === '/node_modules/jquery/dist/jquery.min.js'){
    let string = fs.readFileSync('./node_modules/jquery/dist/jquery.min.js')  
    response.setHeader('Content-Type', 'application/javascript;charset=utf-8')  
    response.end(string)   
  }else if(path === '/main.js'){
    let string = fs.readFileSync('./main.js')  
    response.setHeader('Content-Type', 'application/javascript;charset=utf-8')  
    response.end(string)   
  }else{  
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8') 
    response.end('找不到对应的路径，你需要自行修改 index.js')
  }

  // 代码结束，下面不要看
  console.log(method + ' ' + request.url)
})

function getPostData(request, callback){
    data = ''
    request.on('data', (postData) => {
      data += postData.toString()
    })

    request.on('end', () => {
      let array = data.split('&')
      let postData = {}
      for(var i=0; i<array.length; i++){
        let parts = array[i].split('=')
        let key = decodeURIComponent(parts[0])
        let value = decodeURIComponent(parts[1])
        postData[key] = value
      }
      callback.call(null, postData)
    })
}

server.listen(port)
console.log('监听 ' + port + ' 成功，请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
