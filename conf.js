var TestObject = require('./node_modules/testobject_api/lib/TestObject');

exports.config = {

    seleniumAddress: 'http://eu1.appium.testobject.com/wd/hub',
    specs: ['specs/*spec.js'],

    // restartBrowserBetweenTests: true,

    onPrepare: function() {
        var caps = browser.getCapabilities();
    },

    multiCapabilities: [{
        testobject_api_key: process.env.TESTOBJECT_API_KEY,
        testobject_device: 'Google_Pixel_real',
        testobject_test_name: Date.now() + " - Static",
        testobject_cache_device: "true",
        testobject_suite_name: "Static device allocation",
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 3,
    }, {
        testobject_api_key: process.env.TESTOBJECT_API_KEY,
        testobject_test_name: Date.now() + " - Dynamic",
        testobject_cache_device: "false",
        testobject_suite_name: "Dynamic device allocation",
        platformName: "Android",
        platformVersion: "7",
        phoneOnly: "true",
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 3
    },
    // add more configurations here
    ],

    onComplete: function(result) {
        var myAccount = new TestObject({
            username: process.env.TESTOBJECT_USER_NAME,
            apiKey: process.env.TESTOBJECT_API_KEY,
            password: process.env.TESTOBJECT_PASSWORD
        });

        console.log("result is " + result);

        var printSessionId = function(jobName) {
            browser.getSession().then(function(session) {
                console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
                myAccount.updateTest(session.getId(), {"passed": result}, function(res){
                });
            });
        }
        printSessionId("Insert Job Name Here");
    }
};
