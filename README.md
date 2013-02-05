Ninja Blocks Remote Webapp
================

### Requirements
1. Node.js (http://nodejs.org/)
2. Redis (http://redis.io/)
3. Have registered a Ninja App

### Required Environment Variables
1. NINJA_CLIENT_ID - OAuth Client ID from https://a.ninja.is/hacking
2. NINJA_CLIENT_SECRET - OAuth Client Secret from https://a.ninja.is/hacking

## Sample Heroku Install
### Step 1 - Create Heroku App
```
heroku apps:create --addons redistogo:nano
```
**Important**: You must note down the app URL you create in this step as it must be used for the callback when creating a Ninja App

### Step 2 - Create Ninja App
This can be done at https://a.ninja.is/hacking.

**Important**: Your callback URL will be the _[heroku url]_/auth/ninjablocks. For example, if the result of step 1 was:
```
Creating sheltered-sands-8183... done, stack is cedar
Adding redistogo:nano to sheltered-sands-8183... done
http://sheltered-sands-8183.herokuapp.com/ | git@heroku.com:sheltered-sands-8183.git
```
Your callback url would be http://sheltered-sands-8183.herokuapp.com/auth/ninjablocks

The Client ID and Secret given will be used in Step 3.

### Step 3 - Configure Apps
```
heroku config:set NINJA_CLIENT_ID=12345
heroku config:set NINJA_CLIENT_SECRET="Your Ninja Secret"
```

### Step 4 - Push Code to Heroku
```
git push heroku master
```

## License
MIT
