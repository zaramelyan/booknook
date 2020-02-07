

var main = document.querySelector('.main');
var sender = document.querySelector('#sendit');


var search = '';
function btn() {
     search = document.getElementById('search').value;
     fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
     .then((response) => {
        return response.json();
      })
    .then((myJson) => {
        var logging = myJson.items
        console.log(logging)
      var i = 0;
     while (i < logging.length) {
          main.innerHTML += `<ul><li><a href="${logging[i].saleInfo.buyLink}">${logging[i].volumeInfo.title}</a></li></ul>`
          i++
      }
  
  });
}
console.log(search)

const books = fetch(`https://www.googleapis.com/books/v1/volumes?q=harry`)
.then((response) => {
    return response.json();
  })
.then((myJson) => {
      var data = myJson.items
      console.log(data)
    var i = 0;
   while (i < data.length) {
        main.innerHTML += '<ul><li>' + data[i].volumeInfo.title + '</li></ul>'
        i++
    }

});


