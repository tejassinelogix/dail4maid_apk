	/*
			Initiate payment page script for mobile apps.
			for more details, please visit https://telr.com/support/knowledge-base/mobile-api-integration-guide/

			Devloped by hany.sakr@telr.com 
	*/

	function Device(id, type, agent, accept){
		this.type = type;		// Mobile device type : Description of the device the App is running on
		this.id = id;			// Mobile device ID : Unique ID for the mobile device (such as identifierForVendor in iOS)
		this.agent = agent; 	// (Optinal) WebView user agent header : The User-Agent and Accept headers that will be used in any webview based requests. These are required as part of E-Commerce class transactions. If no value is sent for these fields, then the gateway will use the headers that are sent as part of the mobile API request. See the section on 3-D Secure for more details.
		this.accept = accept; 	// (Optinal) WebView accept header : The User-Agent and Accept headers that will be used in any webview based requests. These are required as part of E-Commerce class transactions. If no value is sent for these fields, then the gateway will use the headers that are sent as part of the mobile API request. See the section on 3-D Secure for more details.
	};


	function App(id, name, user, version){
		this.id = id;			// Application installation ID
		this.name = name; 		// Application name
		this.user = user;		// Application user ID : Your reference for the customer/user that is running the App. This should relate to their account within your systems.
		this.version = version;	// Application version
	};

	function Name(first, last, title){
		this.first = first;		// Forename : the minimum required details for a transaction to be processed
		this.last = last;		// Surname : the minimum required details for a transaction to be processed
		this.title = title;		// Title
	};

	function Address(line1, city, country, region, line2, line3, zip){
		this.line1 = line1;		// Street address – line 1: the minimum required details for a transaction to be processed
		this.city = city;		// City : the minimum required details for a transaction to be processed
		this.country = country; // Country : Country must be sent as a 2 character ISO code. A list of country codes can be found at the end of this document. the minimum required details for a transaction to be processed
		this.region = region;	// Region
		this.line2 = line2;		// (Optinal)
		this.line3 = line3;		// (Optinal)
		this.zip = zip;			// (Optinal)
	};

	function Billing(name, address, email){
		this.name = name;
		this.address = address;
		this.email = email;		// : the minimum required details for a transaction to be processed
	};

	function Tran(test, type, clazz, cartid, description, currency, amount, ref){
		this.test = test;		// Test mode : Test mode of zero indicates a live transaction. If this is set to any other value the transaction will be treated as a test.
		this.type = type;		/* Transaction type 
										'auth'   : Seek authorisation from the card issuer for the amount specified. If authorised, the funds will be reserved but will not be debited until such time as a corresponding capture command is made. This is sometimes known as pre-authorisation.
										'sale'   : Immediate purchase request. This has the same effect as would be had by performing an auth transaction followed by a capture transaction for the full amount. No additional capture stage is required.
										'verify' : Confirm that the card details given are valid. No funds are reserved or taken from the card.
								*/
		this.cartid = cartid;	// Transaction cart ID : An example use of the cart ID field would be your own transaction or order reference.
		this.description = description; // Transaction description
		this.currency = currency; // Transaction currency : Currency must be sent as a 3 character ISO code. A list of currency codes can be found at the end of this document. For voids or refunds, this must match the currency of the original transaction.
		this.amount = amount;	// Transaction amount : The transaction amount must be sent in major units, for example 9 dollars 50 cents must be sent as 9.50 not 950. There must be no currency symbol, and no thousands separators. Thedecimal part must be separated using a dot.
		this.class = clazz;		// Transaction class only 'paypage' is allowed on mobile, which means 'use the hosted payment page to capture and process the card details'
		this.ref = ref;			// (Optinal) Previous transaction reference : The previous transaction reference is required for any continuous authority transaction. It must contain the reference that was supplied in the response for the original transaction.
	};

	function MobileRequest(store, key, device, app, tran, billing){
		this.store = store; 	// Store ID
		this.key = key; 		// Authentication Key : The Authentication Key will be supplied by Telr as part of the Mobile API setup process after you request that this integration type is enabled for your account. This should not be stored permanently within the App.
		this.device = device;	
		this.app = app;
		this.tran = tran;
		this.billing = billing;
	};

	function RootRequest(mobileRequest){
		this.mobile = mobileRequest;
	};

	var startURL;				// URL the customer must be directed to.
	var code;					// Transaction code used in completing the request
	var close;					// URL that marks the end of the process
	var abort;					// URL that marks an error during the process
	var ref;
	var initiatePaymentURL = "https://secure.innovatepayments.com/gateway/mobile.xml";
	var errorMessage;

	function initiatePayment(xml){
		var xmlDoc = xml.responseXML;
		startURL = xmlDoc.getElementsByTagName("start")[0];
		if(startURL!=null){
			startURL = xmlDoc.getElementsByTagName("start")[0].childNodes[0].nodeValue;
			code = xmlDoc.getElementsByTagName("code")[0].childNodes[0].nodeValue;
			close = xmlDoc.getElementsByTagName("close")[0].childNodes[0].nodeValue;
			abort = xmlDoc.getElementsByTagName("abort")[0].childNodes[0].nodeValue;		
			console.log("Reference code : " + code);
			prompt("Reference code : ", code);
			openURL(startURL);
		}else{
			errorMessage = xmlDoc.getElementsByTagName("message")[0].childNodes[0].nodeValue;
			alert("Error Message : " + errorMessage);
		}
	};

	function openURL(url){
    	window.location = url;
    	//window.open(url, '_blank', 'location=no');
	}

var telrService = {

	start : function(){
		
		var amountValue = window.localStorage.getItem("amount");
		var mobileRequest1 = new RootRequest(new MobileRequest("22475", "123456789", 
			new Device("36C0EC49-AA2F-47DC-A4D7-D9927A739F5F","Android"), 
			new App("123456789","TelrSDK","123456","0.0.1"), 
			new Tran("1", "auth", "paypage", Math.random()*100000000000000000, "Test Mobile API", "AED", amountValue), 
			new Billing(new Name("john","Sakr","Mrs"), new Address("SIT", "Dubai", "UAE", "Dubai"), "stackfortytwo@gmail.com")));
		
		var x2js = new X2JS();
		var xmlRequest = x2js.json2xml_str(mobileRequest1);

		//console.log("<?xml version=\"1.0\" encoding=\"UTF-8\"?> "+xmlRequest);	

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
    		if (this.readyState == 4 && this.status == 200) {
      			//document.getElementById("demo").innerHTML = this.responseText;
      			//console.log(this.responseText);
      			initiatePayment(this);
		
    		}
  		};
  		xhttp.open("POST", initiatePaymentURL, true);
  		xhttp.send("<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+xmlRequest);

	},


};
