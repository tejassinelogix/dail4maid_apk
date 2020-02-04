var $$ = Dom7;
var server = 'http://dfm.demosoftwares.biz/';

var app = new Framework7({
  root: '#app', // App root element
  template7Pages: true, // enable Template7 rendering for Ajax and Dynamic pages
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

//The View is basically the app router which is responsible for navigation:
var mainView = app.views.create('.view-main');

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

$$('#signup-form .signup-btn').on('click', function () {
            //app.dialog.alert("call page");
			var name= $$('#name').val();
			   var email= $$('#email').val();
			   var password= $$('#password').val();
			signup(name,email,password)
});
//-----------------Login Function--------------------------//

function login(email, password) {
app.request.post(
        server+'api/login',
          {                            
            email,
            password,   
          },
          function (data)
            {
              var token = data.success.token.id;
			  //app.dialog.alert(data.success.token.id);
			 // window.localStorage.setItem('userid',token);
			  window.localStorage.setItem("userid", token);
			  //var tokenerror = data.error;
			  app.dialog.alert('Login Successful');
			  
              if(token){
                mainView.router.navigate("/booking/");
              }
			  //elseif(tokenerror == "Unauthorised"){
				///  app.dialog.alert('Invalid login details');
			  //}             
            },  
            //dataType   
            'json'                   
      );
}
function signup(name,email,password){
	//app.dialog.alert(name);
	//app.dialog.alert(email);
	//app.dialog.alert(password);
	 
    app.request.post(
    server + 'api/signup',

    { 'name': name, 'email': email , 'password': password },

    function (response) {
      
	                var dataone = JSON.parse(response);
				  // app.dialog.alert(response);	
			//app.dialog.alert();
					if(dataone.success ==1){
					     app.dialog.alert("Thank you for  registration");	
                          mainView.router.navigate("/");						 
				  	  }else{ 
						 app.dialog.alert('somthing wrong');
					  }
    },


  );
	
}



    