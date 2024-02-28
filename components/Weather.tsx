import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import { CityContext } from "../contexts/CityContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  scan: { data: string };
};

type Props = {
  navigation: NativeStackNavigationProp<{ scan: undefined }, "scan">;
  route: RouteProp<RootStackParamList, "scan">;
};

const Weather = ({ route, navigation }: Props) => {
  const ctx = useContext(CityContext);

  if (!ctx) {
    return (
      <StyledLoading>
        <ActivityIndicator size={"large"} />
      </StyledLoading>
    );
  }

  const { city, citiesList, isLoading, error, setApi, getWeather } = ctx;

  useEffect(() => {
    if (route.params) {
      setApi(route.params.data);
    }
  }, []);

  const handleNavigate = () => {
    navigation.navigate("scan");
  };

  const fetchWeather = (api: string) => {
    setApi(api);
  };

  if (isLoading) {
    return (
      <StyledLoading>
        <ActivityIndicator size={"large"} />
      </StyledLoading>
    );
  }

  if (error) {
    return <Error>Something went wrong</Error>;
  }

  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={getWeather} />
      }
    >
      <CityName>{city?.location.region}</CityName>
      <WeatherInfo>
        <Degree>{city?.current.temp_c}°</Degree>

        {city?.forecast.forecastday.map((item) => (
          <ConditionInfo key={item.date}>
            <WeatherImage
              source={{
                uri: `https:${item.day.condition.icon}`,
              }}
            />
            <Degree>
              {item.day.condition.text} {item.day.maxtemp_c}°/
              {item.day.mintemp_c}°
            </Degree>
          </ConditionInfo>
        ))}
      </WeatherInfo>
      <AddCityBtn>
        <Button title="Add City" onPress={handleNavigate} />
      </AddCityBtn>
      <StyledCityList>
        {citiesList.map((item) => (
          <StyledTouchableOpacity
            key={item.name}
            onPress={() => fetchWeather(item.url)}
          >
            <Text>{item.name}</Text>
          </StyledTouchableOpacity>
        ))}
      </StyledCityList>
    </Container>
  );
};

export default Weather;

const StyledLoading = styled(View)`
  flex: 1;
  text-align: center;
  margin: 40px 0 0 0;
`;

const Error = styled(Text)`
  color: #f00;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;

const Container = styled(ScrollView)`
  display: flex;
  flex-direction: column;
`;

const CityName = styled(Text)`
  font-size: 34px;
  font-weight: 600;
  margin: 40px 0 60px 0;
  text-align: center;
`;

const WeatherInfo = styled(View)``;

const ConditionInfo = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  word-break: break-all;
  width: 100%;
  padding: 0 50px;
`;

const Degree = styled(Text)`
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  margin: 0 0 10px 0;
`;

const WeatherImage = styled(Image)`
  width: 80px;
  height: 80px;
`;

const AddCityBtn = styled(View)`
  width: 200px;
  margin: 0 auto;
`;

const StyledCityList = styled(View)`
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledTouchableOpacity = styled(TouchableOpacity)`
  padding: 20px;
  border-width: 1px;
  border-style: solid;
  border-radius: 6px;
  margin: 10px;
  background-color: #fff;
`;
