require.config({
   paths: {
     'backbone': 'lib/backbone-0.5.3.optamd3',
     'underscore': 'lib/underscore-1.2.3',
     'jquery': 'lib/jquery-1.7.1'
   },
   baseUrl: ".",
   waitSeconds: 15,
   urlArgs: "bust=" +  (new Date()).getTime()
});

require([
  'test/models/player',
  'test/models/buildings',
  'test/models/cost',
  'test/models/field',
  'test/models/payment',
  'test/models/specialhut',
  'test/models/toolhut',
  'test/models/civilizationcard'
]);
