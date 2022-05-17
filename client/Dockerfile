FROM reactnativecommunity/react-native-android:2.1

##
#### Ownership
##

## transfer ownership of $ANDROID_HOME (opt/android) so our new user can install additional sdk or build tools at build time. This is needed if you use libraries that target other Android SDK's.
#RUN useradd -ms /bin/bash reactnative
#RUN chown reactnative:reactnative $ANDROID_HOME -R
#USER reactnative
#
#COPY . /home/reactnative
#WORKDIR /home/reactnative

COPY package.json /exchange/client/package.json
WORKDIR /exchange/client
RUN npm install

COPY . .

EXPOSE 5037
EXPOSE 5554
EXPOSE 5555

