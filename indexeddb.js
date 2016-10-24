var db;
var version = 1;

window.indexedStore = {};

window.indexedStore.setup = function (handler) {
   // attempt to open the database
   var request = indexedDB.open("geomood", version);

   // upgrade/create the database if needed
   request.onupgradeneeded = function (event) {
      var db = request.result;
      if (event.oldVersion < 1) {
         // Version 1 is the first version of the database.
         var checkinsStore = db.createObjectStore("checkins", { keyPath: "time" });
         checkinsStore.createIndex("moodIndex", "mood", { unique: false });
      }
      if (event.oldVersion < 2) {
         // In future versions we'd upgrade our database here.
         // This will never run here, because we're version 1.
      }
      db = request.result;
   };

   request.onsuccess = function (ev) {
      // assign the database for access outside
      db = request.result;
      handler();
      db.onerror = function (ev) {
         console.log("db error", arguments);
      };
   };
};
