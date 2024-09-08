# DOING
TODO: Completing onboarding means load the position monitor
    - Add option to change url to connect to bot below `BotStatusIndicator`
TODO: Allow to turn on and off the bot without stopping the server
TODO: Migrate old settings to dialog boxes

# Onboarding Experience
- Have routes to check if certain files are valid: 
    - eg: `config.yaml` if not send notification warning for bot

# TODO: Fix Settings
- Migrate old settings to new one

# Demo Button
TODO: Add dialog to open demo opportunities
TODO: Make demo opportunities clear after 1 day / notification of datetime or settings change
TODO: Allow user to open a demo opportunity

# Close Position Pair Button
TODO: Group Positions into 1
TODO: Add dialog for close_reason

# Concurrency Handling
TODO: Make sure bot is not running when setting is changed
TODO: Make sure Running and Demo is not running at the same time

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
- TODO: Trade information: total profits, total positions, 


# Hosting on server
- CODE: git clone
- `npm run dev` - deployable instead
    - localhost:port

# Running the bot
- `pip install -e . && project-run-ui && npm run dev`

