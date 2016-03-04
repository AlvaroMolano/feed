var request = Npm.require('request');

/*
 Ref: https://github.com/danmactough/node-feedparser/blob/master/README.md#usage
*/
fetchAtomRss = function (feed) {

    // Define our streams
    var options = {
      url: feed.link, 
      headers: { 'content-type': 'application/json; charset=UTF-8' }
    };                                                                                     // 8
    var req = request(options);                                                                                  // 9
    var feedparser = new Feedparser();  
    feedparser = new Feedparser();
    req.headers= { 'content-type': 'application/json; charset=UTF-8' };  
    req.on('error', function (error) {
        // handle any request errors
        console.log("req error: " + error);
    });

    // Define our handlers
    req.on('response', function (res) {

        var stream = this;

        if (res.statusCode != 200) {
            console.log("res.statusCode:" + res.statusCode);

            return; // Run into some problem, ignore it
        }

        stream.pipe(feedparser);
    });

    feedparser.on('error', function (error) {
        // always handle errors
        console.log("feedparser error: " + error);
    });

    feedparser.on('readable', function () {
        // This is where the action is!
        var stream = this,
            meta = this.meta, // **NOTE** the "meta" is always available in the context of the feedparser instance
            item;

        while (item = this.read()) {
            processFeed(item, feed);
        }

    });
}
