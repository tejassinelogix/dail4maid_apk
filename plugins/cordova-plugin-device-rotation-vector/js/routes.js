
var routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/booking/',
    url: './pages/booking.html',
  },
  {
    path: '/booking-date-time/',
    url: './pages/booking-date-time.html',
  },
  {
    path: '/booking-contact-details/',
    url: './pages/booking-contact-details.html',
  },
  {
    path: '/booking-payment/',
    url: './pages/booking-payment.html',
  },
  {
    path: '/login/',
    url: './pages/login.html',

    // async: function (routeTo, routeFrom, resolve, reject) {
    //   // Router instance
    //   var router = this;

    //   // App instance
    //   var app = router.app;

    //   // Show Preloader
    //   app.preloader.show();

    //   app.request.post(
    //     'http://dfm.demosoftwares.biz/api/login',
    //       {                            
    //         email: 'pooja@etcspl.com',
    //         password: 'pooja123',   
    //       },
    //       function (data)
    //         {
    //           console.log(data);
    //           app.preloader.hide();
    //           app.dialog.alert('Thank you for your feedback!');
    //         },                        
    //     );
    //   },

  },
  {
    path: '/signup/',
    url: './pages/signup.html',
  },
  {
    path: '/my-account/',
    url: './pages/my-account.html',
  },
  {
    path: '/my-booking/',
    url: './pages/my-booking.html',
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
  {
    path: '/login/submit/',

    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      var email = $$("#email").val();
      var password = $$("#password").val();
      app.dialog.alert(email);
      app.dialog.alert(password);
    }

  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
