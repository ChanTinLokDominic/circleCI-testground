This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
# Member:
|||
|:-:|:-:|
|Chan Tin Lok|1155126874|
|Nip Yung Lok|1155143849|
|Sze Hoi Keun|1155142404|
|Lee Wing Yin|1155143391|
|Ho Tsz Chun|1155137888|
|Ng Ka Lun|1155131283|


# Version requirement
- Node v18.12.1
- npm 8.19.2


## Packages
The following commands install all required packages
```bash
npm install
```
## Start the server
To start the server, run
```
node server/server.js
```

## Development
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```bash
npm start
```


## Storybook
To start the storybook service, run
```
npm run storybook
```
And view the component-demo on [http://localhost:6006](http://localhost:6006)

# Data preprocessing
To download the data from LSCD and carry out data preprocessing, run the following command:
```
cd preprocessing/raw_data
chmod u+x download.sh
./download.sh
cd ..
python3 preprocess.py
python3 csv2json.py
```



