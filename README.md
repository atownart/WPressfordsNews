## Prerequisites
- Latest MongoDB server [found here](https://www.mongodb.com/download-center#community) _This will be used by the Web API, ensure  the Web API it is set to use the correct connection string for your MongoDB instance in WPressfords.News.WebApi\WPressfords.News.WebApi\appsettings.json_
- Visual Studio 2017 _created and tested with version 15.7.1_
- node tested with  _tested version 10.8.0_
- npm _tested with version 6.0.0_

## Application Build

The below should be built in the following order:

### Back-end Web API

1. Open \WPressfords.News.WebApi\WPressfords.News.WebApi.sln with Visual Studio
2. Build > Build Solution.
3. Debug > Start Debugging. **This will automatically start the app up at [http://localhost:44309](http://localhost:44309)**

### Front-end app

1. Open command line
2. Navigate to \wpressfords-news-app\
3. type `npm install` hit enter. **This may take a few minutes**
4. type `npm start` hit enter. **This will automatically start the front end app up at ["http://localhost:3000"](http://localhost:3000).**