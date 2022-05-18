FROM reactnativecommunity/react-native-android:2.1

COPY package.json /exchange/client/package.json
WORKDIR /exchange/client
RUN npm install

COPY . .

EXPOSE 5037
EXPOSE 5554
EXPOSE 5555