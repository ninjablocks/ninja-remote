'use strict';

yeomanApp.service('UIEvents', function() {

    var uiEvents = {

        /**
         * Pusher
         */
        PusherData:             'PusherData',
        PusherHeartbeat:        'PusherHeartbeat',
        PusherConfig:           'PusherConfig',
        PusherStream:           'PusherStream',

        /**
         * User
         */
        UserIsLoggedIn:         'UserIsLoggedIn',
        UserIsLoggedOut:        'UserIsLoggedOut',
        UserStatusChecked:      'UserStatusChecked',

        // Login
        UserLoggingIn:          'UserLoggingIn',
        UserLogin:              'UserLogin',
        UserLoginFailed:        'UserLoginFailed',

        // Logout
        UserLoggingOut:         'UserLoggingOut',
        UserLogout:             'UserLogout',
        UserLogoutFailed:       'UserLogoutFailed',

        // UserInfo
        UserInfoLoading:        'UserInfoLoading',
        UserInfoLoaded:         'UserInfoLoaded',
        UserInfoLoadFailed:     'UserInfoLoadFailed',


        /**
         * DEVICES
         */

        DevicePlugin:           'DevicePlugin',
        DeviceUnplug:           'DeviceUnplug',

        // Loading Devices
        DevicesLoading:         'DevicesLoading',
        DevicesLoaded:          'DevicesLoaded',
        DevicesLoadFailed:      'DevicesLoadFailed',

        // Removing a device from the UI
        DeviceRemoving:         'DeviceRemoving',
        DeviceRemoved:          'DeviceRemoved',
        DeviceRemoveFailed:     'DeviceRemoveFailed',

        // Device History
        DeviceHistoryLoaded:    'DeviceHistoryLoaded',

        ServiceUpdated:         'ServiceUpdated',



    };

    return uiEvents;
  
  });
