/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {ReactNode} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {anidb} from './api';
import {AnimeInfo} from './typings';
const jojoImg = require("./assets/jojo.jpeg");

export interface IState {
  list: AnimeInfo[];
  currentLang: string;
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    // fontSize: 32,
  },
  total: {
    height: 200,
    justifyContent: "flex-end",
  },
  totalContainer: {
    padding: 10,
    backgroundColor: "white",
  },
  totalText: {
    fontSize: 20,
  },
  button: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#ff5000",
    width: 50,
    height: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSelected: {
    backgroundColor: "blue",
  },
  buttonText:{
    color: "white",
    textAlign: "center",
    fontSize: 12,
  },
  langList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

const LANGS = [
  { value: "ja", text: "日文" },
  { value: "zh-Hans", text: "中文" },
  { value: "en", text: "英文" },
  
  { value: "ko", text: "韩文" },
];

export interface LangListProps {
  onPress: (value: string) => void;
  currentLang: string;
}

const LangList = ({ onPress, currentLang }: LangListProps) => {
  
 
  return (
    <View style={styles.langList}>
      <Text>语言: </Text>
      {
        LANGS.map(lan => {
          const buttonStyle = [styles.button];
          if (currentLang === lan.value) {
            buttonStyle.push(styles.buttonSelected);
          }
          return  (
            <TouchableOpacity
              style={buttonStyle}
              onPress={() => {
                onPress(lan.value)
              }}
              key={lan.value}
            >
              <Text style={styles.buttonText}>{lan.text}</Text>
            </TouchableOpacity>
          );
        })
      }
    </View>
  );
}

export interface AnimeItemProps {
  data: AnimeInfo;
  currentLang: string;
}

const Item = ({data, currentLang } : AnimeItemProps) => {
  const resultTitles = data.titles.filter(obj => obj.lang === currentLang);
  const currentTitle = resultTitles.length > 0 ? resultTitles[0].title : "--";
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{data.aid}. {currentTitle}</Text>
    </View>
  );
};


class MainScreen extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      list: [],
      currentLang: LANGS[0].value,
    };
  }

  componentDidMount = () => {
    this.getAnimes();
  }

  getAnimes = async() => {
    const res = await anidb.list();
    this.setState({
      list: res.result,
    });
  }

  renderItem = ({ item }: any) => (
    <Item
     data={item}
     currentLang={this.state.currentLang}
      />
  );

  onLangPress = (value: string) => {
    this.setState({
      currentLang: value,
    });
  }

  renderContent = (): ReactNode => {
    const { list } = this.state;
    return (
      <View>
        <ImageBackground 
          style={styles.total}
          source={jojoImg}
        >
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>总计: {list.length}条</Text>
            <LangList onPress={this.onLangPress} currentLang={this.state.currentLang} />
          </View>
        </ImageBackground>
        <FlatList
          data={list}
          renderItem={this.renderItem}
          keyExtractor={item => item.aid + ""}
        />
      </View>
     
    );
  };

  render = () => {
    
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          {this.renderContent()}
        </SafeAreaView>
      </>
    );
  }
}


export default MainScreen;
