# Concurrency Handling
    TODO: Make sure bot is not running when setting is changed

# Dashboard
- TODO: Trade information: total profits, total positions, 


# Make a notification Section:
- Software updates - guide etc.
- allow to recieve email service if trade executed or closed

# Demo Button
TODO: Change card ui of demo opp

# Onboarding Experience
- Add `.env` pair for private key with a lot of explanation
- Add powershell code to run the bot:
    - set path to `C:\funding-rate-arbitrage`
    - set path to `~/funding-rate-arbitrage`
- Add warning if `${backendURL}/settings/find` is giving error

# Close Position Pair Button
TODO: Group Positions into 1
TODO: Add dialog for close_reason


# Instructions
- TODO: Add Instructions in Home page if there are no Positions

# Logs Clear
- Clear Log by sending backend request


# Future related work
- TODO: Allow user to use testnet: from changing settings
- TODO: Add Mobile version for mobile size
- TODO: add a Telegram version of the bot
- TODO: add an iOS and Android version of the bot using `React Native`

### Logs
- TODO: use DB to retrieve logs from backend
- TODO: Log File counter: error different types of error etc...

### # UI-related
- TODO: Exchange images etc.
- TODO: Add timer for interactivity
- TODO: Improve page loading speed: [Improve-Speed](https://mui.com/material-ui/guides/
minimizing-bundle-size/)
    - May have to migrate solely to tailwind css
    - Look into _tree-shaking_ and purge unused components

TODO: Add settings for different sizes

### Add to backend or Migrate to backend
- TODO: Make backend send Log objects to front-end rather than `string[]` - look into the Log class and write changes to the code
- TODO: Enum usage for representing exchanges, rather than `strings`

