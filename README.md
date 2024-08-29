# DOING
TODO: Allow to turn on and off the bot without stopping the server
TODO: Allow settings configuration from front-end


# Onboarding Experience
TODO: Migrate old settings settings into a dialog box

# Demo Button
TODO: Add dialog to open demo opportunities
TODO: Make demo opportunities clear after 1 day or settings change
TODO: Allow user to open a demo opportunity

# Concurrency Handling
TODO: Make sure bot is not running when setting is changed
TODO: Make sure Running and Demo is not running at the same time


# Logs
- TODO: make new logs go to start of the table
- TODO: use DB to retrieve logs from backend

# UI-related
- TODO: Exchange images etc.
- TODO: Add timer for interactivity
- TODO: Improve page loading speed: [Improve-Speed](https://mui.com/material-ui/guides/
minimizing-bundle-size/)
    - May have to migrate solely to tailwind css
    - Look into _tree-shaking_ and purge unused components

TODO: Add settings for different sizes

# Instructions
- TODO: Add Instructions in Home page if there are no Positions


# Add to backend or Migrate to backend
- TODO: Make backend send Log objects to front-end rather than `string[]` - look into the Log class and write changes to the code
- TODO: Enum usage for representing exchanges, rather than `strings`
- TODO: Trade information: total profits, total positions, 

# Code reuse:
- TODO: reuse of socketio code


# Future related work
- TODO: Allow user to use testnet: from changing settings
- TODO: Add Mobile version for mobile size
- TODO: add a Telegram version of the bot
- TODO: add an iOS and Android version of the bot using `React Native`
