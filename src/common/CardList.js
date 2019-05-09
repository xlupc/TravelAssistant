import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import * as constants from '../constants/index'
import Icon from "react-native-vector-icons/Ionicons";
import Rating from '../common/Rating';

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formatDistance (dis) {
    if(Number.parseInt(dis, 10) > 1000) {
        return `${(dis/1000).toFixed(1)} 公里`;
    } else {
        return dis + ' 米';
    }
  }

  _renderItem = ({item, index}) => (
    <View style={{width: 140, marginVertical: 16, marginLeft: index=='0'? 16: 8, marginRight: index=='19'? 16: 8}}>
        <BoxShadow setting={Object.assign({}, shadowOpt, { width: 140, height: 210})}>
              <View style={{borderRadius: 6, width: 140, overflow: 'hidden'}}>
              <Image
                style={{width: "100%", height: 120}}
                source={item.photos.length? {uri: item.photos[0].url} : require('../assets/img/empty1.png')}
              />
              <View style={{backgroundColor: '#fff', height: 90}}>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>{item.name}</Text>
                <Rating rating={item.biz_ext.rating.constructor === Array? 0 : item.biz_ext.rating } />
                <Text style={{paddingHorizontal: 8, paddingVertical: 3, fontSize: 12, color: constants.GRAY_DARK}}>
                    {this.formatDistance(item.distance)}
                </Text>
              </View>
              </View>
            </BoxShadow>
    </View>
  );

  render() {
    let data = this.props.data;
    if(JSON.stringify(data) == "{}") {
      return null;
    }
    // alert(JSON.stringify(data));
    return (
        <View style={styles.container}>
          <View style={{flexDirection: "row", alignItems: "center", padding: 16, paddingBottom: 0}}>
            <View style={{backgroundColor: constants.MAIN_COLOR, width: 3, height: 30}} />
            <Text style={{marginLeft: 8, color: constants.GRAY_DARKEST, fontSize: 16}}>{this.props.cardTitle}</Text>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator = {false}
            data={data}
            extraData={this.state}
            keyExtractor={(item) => item.id}
            renderItem={this._renderItem}
          />
        </View>
    );
  }
}

const shadowOpt = {
    color: '#000',
    border: 10,
    radius: 6,
    opacity: 0.1,
    x: 0,
    y: 2,
    // style:{marginVertical:5}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center"
  },
  title: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    color: constants.GRAY_DARKEST,
    fontSize: 14,
  }
})

export default CardList;