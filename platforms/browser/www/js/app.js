var $$ = Dom7;
var network = navigator.connection.type;
//var server = 'http://dfm.demosoftwares.biz/';
var server = 'http://34.93.248.210/';

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

    onBackKeyDown: function() {

            var leftp = app.panel.left && app.panel.left.opened;
            var rightp = app.panel.right && app.panel.right.opened;

            if ( leftp || rightp ) {

                app.panel.close();
                return false;
            }else if ($$('.modal-in').length > 0) {
              
                app.dialog.close();
                app.popup.close();
                return false;
            } else if (app.views.main.router.url == '/services/') {

                    navigator.app.exitApp();
            } else {

                mainView.router.back();
           }

},

    helloWorld: function () {
      app.dialog.alert('Hello World!');

    },
  },
  // App routes
  routes: routes,

on: {
    init: function () {

      var f7 = this;
      f7.statusbar.hide();

      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }

      if (network === "none") {
        console.log("Offline");
        app.dialog.alert('Please Connect to internate', "App Is offline");
      }
      else{
        // services();
      }
      
    },
  },

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

$$('#logout-btn').on('click',function () {
  app.dialog.alert("call logout-btn");
  app.dialog.alert('hi');
  // navigator.app.exitApp() ;
  navigator.app.exitApp();
});

$$('#signup-form .signup-btn').on('click', function () {
            //app.dialog.alert("call page");
			var name= $$('#name').val();
			   var email= $$('#email').val();
			   var password= $$('#password').val();
			signup(name,email,password)
});
//-----------------Login Function--------------------------//

function login(email, password, remember) {
app.request.post(
        server+'api/login',
          {                            
            email,
            password,   
            remember,   
          },
          function (data)
            {
              var token = data.success.token.id;
              window.localStorage.setItem("userid", token); 
              window.localStorage.setItem("remember", data.success.token.remember);              			   
              window.localStorage.setItem("remember", data.success.token.password);              			                 
              if(token){
                mainView.router.navigate("/services/");
              }
      			  // else{
      				 //  app.dialog.alert(data.error);
      			  // }                           
            },  
            //error
            function (status) {
              console.log(status.response);
              app.dialog.alert("Invalid Credentials");              
            },




            //dataType   
            'json'                   
      );
}


//-----------------Register Function--------------------------//

function register(name, email, password, mobile) {
	
app.request.post(
        server+'api/register',
          {   
            name,                         
            email,
            password, 
            mobile,  
          },
		  
          function (data)
            {
				app.preloader.show();
              console.log(data);
              console.log(data.success);
              if(data.success){
				  app.preloader.hide();
                app.dialog.alert('Register Successful ! please check your email to activate your account');
              }
              else if(data.error)
              {
                app.dialog.alert(data.error);
              }
              else{
                app.dialog.alert("Invalid Details");              
              }
			  mainView.router.navigate("/login/");
            },  
            //error
          function (status) {
              console.log(status.response);
              app.dialog.alert("Invalid Details");              
            },
            //dataType   
            'json'                   
      );
}

//-----------------------Sign Up--------------------------------//

function signup(name,email,password,mobile){
  //app.dialog.alert(name);
  //app.dialog.alert(email);
  //app.dialog.alert(password);

  console.log(name,email,password,mobile);
   
    app.request.post(
    server + 'api/signup',
    { 
      name: name, 
      email: email, 
      password: password, 
      contact: mobile,
    },
    function(response){
      
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

//-----------------Appointment Function--------------------------//

function appointment() {
  // alert('www calls 123');
  // return false;
	  var userid = window.localStorage.getItem("userid");
   // app.dialog.alert(userid);
  var usertoken = window.localStorage.getItem("token");
service_cat_id = window.localStorage.getItem("service_id"),

cleanerNeed = window.localStorage.getItem("cleanerNeed"),
cleanerNeedCnt = window.localStorage.getItem("cleanerNeedCnt"),
cleaningMaterial = window.localStorage.getItem("cleaningMaterial"),
instructions = window.localStorage.getItem("instructions"),

cleanerStay = window.localStorage.getItem("cleanerStay"),
cleaningDate = window.localStorage.getItem("cleaningDate"),
//toCleaningTime = window.localStorage.getItem("toCleaningTime"),
fromCleaningTime = window.localStorage.getItem("fromCleaningTime"),

city = window.localStorage.getItem("city"),
region = window.localStorage.getItem("region"),
address = window.localStorage.getItem("address"),
name = window.localStorage.getItem("name"),
email = window.localStorage.getItem("email"),
mobile = window.localStorage.getItem("mobile"),

payWithCard = window.localStorage.getItem("payWithCard"),
payWithCash = window.localStorage.getItem("payWithCash"),
cardNumber = window.localStorage.getItem("cardNumber"),
expiryDate = window.localStorage.getItem("expiryDate"),
cvv = window.localStorage.getItem("cvv"),
amount = window.localStorage.getItem("amount"),
password = "Dial4Maid123",

// userid = "1",
amount = cleanerStay * 35 ;
console.log(amount);
console.log('paym net details');
console.log(cleanerNeed, cleanerNeedCnt, cleaningMaterial, instructions, cleanerStay, cleaningDate, fromCleaningTime, city, region, address);
console.log(name, email, mobile, payWithCash, amount, password, userid, service_cat_id);
console.log(name, email, mobile, payWithCard, payWithCash, cardNumber, expiryDate, cvv, amount, password, userid, service_cat_id);

telrService.start();

app.request.post(
        server+'api/appointment',
          {   
            name : name,                        
            email : email,
			      userid: userid,
            service_cat_id : service_cat_id,
            password : password,   
            region : region,
            address : address,
            contact : mobile,
            c_days : cleanerNeed,
            c_stay_hours : cleanerStay,
            c_qty : cleanerNeedCnt,
            c_material : cleaningMaterial,
            c_date : cleaningDate,
            c_from_time_slot : fromCleaningTime,
            //c_to_time_slot : toCleaningTime,
            c_instruction : instructions,
            pay_method : payWithCard,
            amount : amount,
           
          },
          function (data)
            {
              console.log(data.success);
              var token = data.success.token;
              window.localStorage.setItem("token", token);
              app.preloader.hide();
              if(token){
                mainView.router.navigate("/thankyou/");
              }  
            },  
            //dataType   
            'json'                   
      );
}
//-----------------Update Appointment Function--------------------------//

function update_appointment() {
    var userid = window.localStorage.getItem("userid");
   // app.dialog.alert(userid);
  var usertoken = window.localStorage.getItem("token");
  service_cat_id = window.localStorage.getItem("service_cat_id"),

  cleanerNeed = window.localStorage.getItem("cleanerNeed"),
  cleanerNeedCnt = window.localStorage.getItem("cleanerNeedCnt"),
  cleaningMaterial = window.localStorage.getItem("cleaningMaterial"),
  instructions = window.localStorage.getItem("instructions"),

  cleanerStay = window.localStorage.getItem("cleanerStay"),
  cleaningDate = window.localStorage.getItem("cleaningDate"),
  //toCleaningTime = window.localStorage.getItem("toCleaningTime"),
  fromCleaningTime = window.localStorage.getItem("fromCleaningTime"),

  // city = window.localStorage.getItem("city"),
  region = window.localStorage.getItem("region"),
  address = window.localStorage.getItem("address"),
  name = window.localStorage.getItem("name"),
  email = window.localStorage.getItem("email"),
  mobile = window.localStorage.getItem("mobile"),
  apt_id = window.localStorage.getItem("apt_id"),

payWithCard = window.localStorage.getItem("payWithCard"),
payWithCash = window.localStorage.getItem("payWithCash"),
cardNumber = window.localStorage.getItem("cardNumber"),
expiryDate = window.localStorage.getItem("expiryDate"),
cvv = window.localStorage.getItem("cvv"),
amount = window.localStorage.getItem("amount"),
password = "Dial4Maid123",

// userid = "1",

console.log(cleanerNeed, cleanerNeedCnt, cleaningMaterial, instructions, cleanerStay, cleaningDate, cleaningTime, city, region, address);

console.log(name, email, mobile, payWithCard, payWithCash, cardNumber, expiryDate, cvv, amount, password);

amount = cleanerStay * 35 ;
console.log(amount);

app.request.post(
        server+'api/update_appointment',
          {   
            apt_id : apt_id,
            name : name,                        
            email : email,
            userid: userid,
            service_cat_id : service_cat_id,
            region : region,
            address : address,
            contact : mobile,
            c_days : cleanerNeed,
            c_stay_hours : cleanerStay,
            c_qty : cleanerNeedCnt,
            c_material : cleaningMaterial,
            c_date : cleaningDate,
            c_from_time_slot : fromCleaningTime,
            //c_to_time_slot : toCleaningTime,
            c_instruction : instructions,
            pay_method : payWithCard,
            amount : amount,
           
          },
          function (data)
            {
              console.log(data.success);
              var token = data.success.token;
              window.localStorage.setItem("token", token);
              app.preloader.hide();
              if(token){
                app.dialog.alert('Update Appointment Successful');
                mainView.router.navigate("/my-booking/");
              }  
            },  
            //dataType   
            'json'                   
      );
}    

//-----------------Update Account Function--------------------------//

function update_account() {
  var userid = window.localStorage.getItem("userid");
   
  name = window.localStorage.getItem("name"),
  email = window.localStorage.getItem("email"),
  contact = window.localStorage.getItem("contact"),
  address = window.localStorage.getItem("address"),
  city = window.localStorage.getItem("city"),
  state = window.localStorage.getItem("state"),
  country = window.localStorage.getItem("country"),
  
  
app.request.post(
        server+'api/update_account',
          {   
            userid : userid,
            name : name,                        
            email : email,
            contact : contact,
            address : address,
            city : city,
            state : state,
            country : country,          
          },
          function (data)
            {
              console.log(data.success);
              var token = data.success.token;
              window.localStorage.setItem("token", token);
              app.preloader.hide();
              if(token){
                app.dialog.alert('Update Account Successful');
                mainView.router.navigate("/my-account/");
              }  
            },  
            //dataType   
            'json'                   
      );
}    