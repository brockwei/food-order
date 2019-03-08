# Food ordering web app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Built with
- React.js
- Ant-design
- socket.io
- momentjs

## Set up

### Client
1. Change `server_url` to server url in `src/config.json`
2. run `npm install` or `yarn install`
3. run `npm run start` or `yarn start`

### Server/Backend
1. Change `PORT` to port for backend server
2. run `npm install`
3. run `npm run start`

- To update/add new menus:
    - Add menu file `{menu-name}.js` into `data/menus` (use existing files for reference)
    - import `{menu}.js` file into `data/index.js` file and add import to `restaurantMenus` object