$('form[name=signUp]').on('submit', (e)=>{
  e.preventDefault()
  alert('我接管了 submit')
})
