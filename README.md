# DOING
- Search Bar and filters for searching trades
- Button for viewing trade history
- Load trades and its state

# React-related
### TODO: `LogsTable` two items with the same key
### TODO: Allow settings configuration from front-end
### TODO: Fetching log data from backend
### TODO: Getting logs and live log updates on client side
### TODO: Store data not only on the bot but also on the browser:
    - another way for users to view their trading positions offline, or close trades in case no backend etc.
    - provide links to position in HMX or ByBit etc.

# UI-related
- TODO: Unecessary scrolling

- TODO: Disable Open and Close buttons if no positions available

- TODO: Remove space and fixed sizing for navbar
    - TODO: Add Mobile version for mobile size

- TODO: Exchange images etc.
- TODO: Add timer for interactivity

- TODO: Improve page loading speed: [Improve-Speed](https://mui.com/material-ui/guides/minimizing-bundle-size/)
    - May have to migrate solely to tailwind css
    - Look into _tree-shaking_ and purge unused components



# Migrate tasks to backend
- TODO: Make backend send Log objects to front-end rather than `string[]`
- TODO: Enum usage for representing exchanges, rather than `strings`


# Code reuse:
- TODO: reuse of socketio code



# Future related work
- TODO: add a Telegram version of the bot
- TODO: add an iOS and Android version of the bot using `React Native`
