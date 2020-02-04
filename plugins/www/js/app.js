var $$ = Dom7;
var server = 'http://dfm.demosoftwares.biz/';

var app = new Framework7({
  root: '#app', // App root element

  name: 'Dial4Maid', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },

    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');

    },
  },
  // App routes
  routes: routes,


// on: {
//     init: function () {

//       var f7 = this;
//       f7.statusbar.hide();

//       if (f7.device.cordova) {
//         // Init cordova APIs (see cordova-app.js)
//         cordovaApp.init(f7);
//       }

//       if (network === "none") {
//         console.log("Offline");
//         app.dialog.alert('Please Connect to internate', "App Is offline");
//       }
      
//     },
//   },



});

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {

  var email = $$('#my-login-screen [name="email"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  app.preloader.show();

  login(email,password);

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  // app.dialog.alert('Username: ' + email + '<br>Password: ' + password);
});



// Login Screen Demo
 // $$('#signIn').on('click', function () {
$$('#login-btn').on('click', function () {
  app.dialog.alert("Hiii");
  
  var email = $$('#login-form [name="email"]').val();
  var password = $$('#login-form [name="password"]').val();

  app.preloader.show();

  login(email,password);

  // Alert username and password
  app.dialog.alert('Username: ' + email + '<br>Password: ' + password);
});




function login(email, password) {
app.request.post(
        server+'api/login',
          {                            
            email,
            password,   
          },
          function (data)
            {
              console.log(data);

              // window.localStorage.setItem("token", tableno);
              app.preloader.hide();
              app.dialog.alert('Login Successful');
            },                        
      );
}







    