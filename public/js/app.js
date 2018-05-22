
var app = new Vue({
  el: '#app',
  data: {
    message: '现在你看到我了',
    seen: true,
    show: true
  },
  methods: {
      printt: function() {
        console.log("my function");
        this.seen = !this.seen;
      }
  }
});

app.$watch('message', function (newValue, oldValue) {
  console.log(oldValue);
  console.log(newValue);
  // 这个回调将在 `vm.a` 改变后调用
});
// (function dd(){
//   setTimeout(() => {
//     app.seen = !app.seen;
//      dd();
//   }, 3000);
// })();


