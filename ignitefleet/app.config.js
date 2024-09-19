import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
  "expo": {
    "name": "decompression",
    "slug": "decompression",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#202024"
    },
    "ios": {
      "supportsTablet": true,
      "config": {
        "googleMapsApiKey": process.env.googleMapsApiKey
      },
      "infoPlist": {
        "UIBackgroundModes": ["location"]
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#202024"
      },
      "package": "com.lagacioneandre.ignitefleet",
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOATION",
        "ACCESS_BACKGROUND_LOCATRION"
      ],
      "config": {
        "googleMaps": {
          "apiKey": process.env.googleMapsApiKey
        }
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "pluguins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ]
    ]
  }
}
