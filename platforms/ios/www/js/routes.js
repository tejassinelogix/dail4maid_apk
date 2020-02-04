
var routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/booking/',
    // url: './pages/booking.html',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // Simulate Ajax Request
      setTimeout(function () {
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/booking.html',
          },
        );
      }, 1000);
    },
  },
  {
    path: '/terms-condition/',
    // url: './pages/booking.html',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // Simulate Ajax Request
      setTimeout(function () {
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/terms-condition.html',
          },
        );
      }, 1000);
    },
  },
  {
    path: '/refund-policy/',
    // url: './pages/booking.html',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // Simulate Ajax Request
      setTimeout(function () {
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/refund-policy.html',
          },
        );
      }, 1000);
    },
  },
  {
    path: '/booking-date-time/',
    // url: './pages/booking-date-time.html',
      async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // Simulate Ajax Request
      setTimeout(function () {
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/booking-date-time.html',
          },
        );
      }, 1000);
    },
  },
  {
    path: '/booking-contact-details/',
    // url: './pages/booking-contact-details.html',
       async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;
      // App instance
      var app = router.app;
     
	 var userId = window.localStorage.getItem("userid");
      // Show Preloader
      app.preloader.show();
	  
   app.request.post(        
        server+'api/userDetails', 
          {                            
            userId : userId,   
          },                
        function (data)
            {
              console.log(data.success);
              var user_details = data.success;
              
              var user_data = [];

               $.each(user_details, function(key, value){
                  user_data[key] = user_details[key];
              });              
          app.preloader.hide();
              // Resolve route to load page
            resolve(
              {
                 componentUrl: './pages/booking-contact-details.html',
              },
              {
                context: {
                  userData: user_data,
                }
              }
            ); 

            },  
            //dataType   
            'json',                           
      );
      // Simulate Ajax Request
     // setTimeout(function () {
        // Hide Preloader
      //  app.preloader.hide();

        // Resolve route to load page
       // resolve(
        //  {
         //   componentUrl: './pages/booking-contact-details.html',
         // },
        //);
      //}, 1000);
    },
  },
  {
    path: '/booking-payment/',
    // url: './pages/booking-payment.html',
     async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // Simulate Ajax Request
      setTimeout(function () {
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/booking-payment.html',
          },
        );
      }, 1000);
    },
  },
  {
    path: '/login/',
    // url: './pages/login.html',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // Simulate Ajax Request
      setTimeout(function () {
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/login.html',
          },
        );
      }, 1000);
    },

    
  },
  {
    path: '/signup/',
    // url: './pages/signup.html',

    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // Simulate Ajax Request
      setTimeout(function () {
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/signup.html',
          },
        );
      }, 1000);
    },

  },
  {
    path: '/my-account/',
    // url: './pages/my-account.html',

    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;
      // App instance
      var app = router.app;      

      var userId = window.localStorage.getItem("userid");
      // console.log(userId);
      app.preloader.show();

      app.request.post(        
        server+'api/userDetails', 
          {                            
            userId : userId,   
          },                
        function (data)
            {
              console.log(data.success);
              var user_details = data.success;
              
              var user_data = [];

               $.each(user_details, function(key, value){
                  user_data[key] = user_details[key];
              });              

              // Resolve route to load page
            resolve(
              {
                componentUrl: './pages/my-account.html',
              },
              {
                context: {
                  userData: user_data,
                }
              }
            ); 

            },  
            //dataType   
            'json',                           
      );
    
    app.preloader.hide();
    }
  },
  {
    path: '/services/',
    // url: './pages/services.html',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;
      // App instance
      var app = router.app;      
      // Show Preloader
      app.preloader.show();

      app.request.post(        
        server+'api/services',               
        function (data)
            {
              console.log(data.success);
              var services = data.success;
              window.localStorage.setItem("servicesCat", services);

              var serviceItems = [];

               $.each(services, function(key, value){
                  serviceItems[key] = services[key];
              });

              // Resolve route to load page
            resolve(
              {
                componentUrl: './pages/services.html',
              },
              {
                context: {
                  servicesData: serviceItems,
                }
              }
            ); 

            },  
            //dataType   
            'json',                           
      );

      // Hide Preloader
      app.preloader.hide();
   
    }
  },
  {
    path: '/my-booking/',
    // url: './pages/my-booking.html',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;
      // App instance
      var app = router.app;      

      var userId = window.localStorage.getItem("userid");
      // console.log(userId);
      app.preloader.show();

      app.request.post(        
        server+'api/userAppointments', 
          {                            
            userId : userId,   
          },                
        function (data)
            {
              console.log(data.success);
              var appointments = data.success;
              
              var user_appointments = [];

               $.each(appointments, function(key, value){
                  user_appointments[key] = appointments[key];
              });              

              // Resolve route to load page
            resolve(
              {
                componentUrl: './pages/my-booking.html',
              },
              {
                context: {
                  appointmentData: user_appointments,
                }
              }
            ); 

            },  
            //dataType   
            'json',                           
      );
    
    app.preloader.hide();
    }

  },
  {
    path: '/appointment/:aptId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var aptId = routeTo.params.aptId;

      console.log(aptId);

      app.request.post(        
        server+'api/Appointment', 
          {                            
            aptId : aptId,   
          },                
        function (data)
            {
              console.log(data.success);
              var appointments = data.success;
              
              var user_appointments = [];

               $.each(appointments, function(key, value){
                  user_appointments[key] = appointments[key];
              });              

              // Resolve route to load page
            resolve(
              {
                componentUrl: './pages/appointment.html',
              },
              {
                context: {
                  appointmentData: user_appointments,
                }
              }
            ); 

            },  
            //dataType   
            'json',                           
      );

      app.preloader.hide();
    },
  },
  {
    path: '/thankyou/',
    url: './pages/thankyou.html',
  },
  {
    path: '/about/',
    url: './pages/old-pages/about.html',
  },
  {
    path: '/form/',
    url: './pages/old-pages/form.html',
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    componentUrl: './pages/old-pages/dynamic-route.html',
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/old-pages/request-and-load.html',
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
