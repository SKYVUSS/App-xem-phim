import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeMovie from "../../screens/home/HomeMovie";
import DetailPage from "../../screens/detail/detail";
import FavoriteScreen from "../../screens/favorite/FavoriteScreen";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import CategoryTrending from "../home/MovieList/MovieTrending";
import CategoryPopular from "../home/MovieList/MoviePopular";
import CategoryRecommend from "../home/MovieList/MovieRecommend";
import CategoryKid from "../home/MovieList/MovieKid";
import CategoryDebut from "../home/MovieList/MovieDebut";
import CategoryAction from "../home/MovieList/MovieAction";
import CategoryRomance from "../home/MovieList/MovieRomance";
import SearchMovie from "../../screens/search/SearchMovie";
import HeaderMovie from "../home/MovieList/MovieHeader";
import CategoryFun from "../home/MovieList/MovieFun";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator cho tab Home
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <HeaderMovie />,
        headerShown: true,
      }}
    >
      <Stack.Screen name="HomeMovie" component={HomeMovie} />
      <Stack.Screen name="DetailPage" component={DetailPage} />
      <Stack.Screen name="CategoryTrending" component={CategoryTrending} />
      <Stack.Screen name="CategoryPopular" component={CategoryPopular} />
      <Stack.Screen name="CategoryRecommend" component={CategoryRecommend} />
      <Stack.Screen name="CategoryKid" component={CategoryKid} />
      <Stack.Screen name="CategoryAction" component={CategoryAction} />
      <Stack.Screen name="CategoryRomance" component={CategoryRomance} />
      <Stack.Screen name="CategoryFun" component={CategoryFun} />
      <Stack.Screen name="CategoryDebut" component={CategoryDebut} />
      <Stack.Screen
        name="SearchMovie"
        component={SearchMovie}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Stack Navigator cho tab Favorite
const FavoriteStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <HeaderMovie />,
        headerShown: true,
      }}
    >
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Stack.Screen name="DetailPage" component={DetailPage} />
      <Stack.Screen name="SearchMovie" component={SearchMovie} />
    </Stack.Navigator>
  );
};

// Stack Navigator cho tab Profile
const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <HeaderMovie />,
        headerShown: true,
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="SearchMovie" component={SearchMovie} />
    </Stack.Navigator>
  );
};

// Root Navigator
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Favorite") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FDC252",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#2A2D45",
          borderTopWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen
        name="Favorite"
        component={FavoriteStack}
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "Favorite",
                  state: {
                    routes: [{ name: "FavoriteScreen" }],
                  },
                },
              ],
            });
          },
        })}
      />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
