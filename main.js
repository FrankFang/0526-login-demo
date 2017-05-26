let $loginForm = $('form[name=login]')
$loginForm.on('submit', (e)=>{
  e.preventDefault()
  let string = $loginForm.serialize()
  $.ajax({
    url: $loginForm.attr('action'),
    method: $loginForm.attr('method'),
    data: string,
    success: function(){
      location.href = '/home'
    },
    error: function(){

    }
  })
})

let $signUpForm = $('form[name=signUp]')
$signUpForm.on('submit', (e)=>{
  e.preventDefault()
  let string = $signUpForm.serialize()
  // check form
  let errors = checkForm($signUpForm)

  if(Object.keys(errors).length !== 0){
    showErrors($signUpForm, errors)
  }else{
    $.ajax({
      url: $signUpForm.attr('action'),
      method: $signUpForm.attr('method'),
      data: string,
      success: function(response){
        alert('注册成功')
      },
      error: function(xhr){
        let errors =JSON.parse(xhr.responseText) 
        showErrors($signUpForm, errors)
      }
    })
  }
  

})

function checkForm($signUpForm){
  let email = $signUpForm.find('[name=email]').val()
  let password = $signUpForm.find('[name=password]').val()
  let password_confirmation = $signUpForm.find('[name=password_confirmation]').val()
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

  return errors

}

function showErrors($signUpForm, errors){
  $signUpForm.find(`span[name$=_error]`).each((index, span)=>{
    $(span).text('')
  })
  for(var key in errors){
    let value = errors[key]
    $signUpForm.find(`span[name=${key}_error]`).text(value)
  }
}
