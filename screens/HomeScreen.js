import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  TextInput,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const API_KEY = "fb0ea7ce1086b7d9483bed6b8f590110";
const API_URL_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const API_URL_TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

const HomeScreen = ({ navigation }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    fetchPopularMovies();
    fetchTopRatedMovies();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(API_URL_POPULAR);
      setPopularMovies(response.data.results);
      setFeaturedMovie(response.data.results[4]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTopRatedMovies = async () => {
    try {
      const response = await axios.get(API_URL_TOP_RATED);
      setTopRatedMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    const allMovies = [...popularMovies, ...topRatedMovies];
    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("MovieDetail", { movieId: item.id })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w1280${item.poster_path}` }}
        style={styles.movieImage}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <View style={styles.topBar}>
        {isSearchVisible ? (
          <View style={styles.searchBarContainer}>
            <TouchableOpacity onPress={() => setIsSearchVisible(false)}>
              <Ionicons
                name="arrow-back"
                size={24}
                color="#fff"
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInputFullWidth}
              placeholder="Search movies..."
              placeholderTextColor="#999"
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
              autoFocus={true}
            />
          </View>
        ) : (
          <>
            <Text style={styles.welcomeText}>For ADK:)</Text>
            <TouchableOpacity onPress={() => setIsSearchVisible(true)}>
              <Ionicons
                name="search"
                size={24}
                color="#fff"
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Series</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Films</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Categories</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        {featuredMovie && searchQuery === "" && (
          <TouchableOpacity
            style={styles.featuredContainer}
            onPress={() =>
              navigation.navigate("MovieDetail", { movieId: featuredMovie.id })
            }
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w1280${featuredMovie.backdrop_path}`,
              }}
              style={styles.featuredImage}
              resizeMode="cover"
            />
            <Text style={styles.featuredTitle}>{featuredMovie.title}</Text>
            <Text style={styles.featuredGenres}>
              Drama • Adventure • Sci-Fi
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.playButton}>
                <Ionicons name="play" size={16} color="#fff" />
                <Text style={styles.playButtonText}>Play</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.myListButton}>
                <Ionicons name="add" size={16} color="#fff" />
                <Text style={styles.myListButtonText}>My List</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}

        <Text style={styles.header}>
          {searchQuery ? "Search Results" : "Popular Movies"}
        </Text>
        <FlatList
          data={searchQuery ? filteredMovies : popularMovies}
          horizontal
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />

        {!searchQuery && (
          <>
            <Text style={styles.header}>Top Rated Movies</Text>
            <FlatList
              data={topRatedMovies}
              horizontal
              renderItem={renderMovieItem}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}
      </ScrollView>

      <View style={styles.bottomNavBar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="film" size={24} color="#fff" />
          <Text style={styles.navText}>Films</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="albums" size={24} color="#fff" />
          <Text style={styles.navText}>Categories</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#000",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backIcon: {
    marginRight: 10,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  searchIcon: {
    paddingRight: 15,
  },
  searchInputFullWidth: {
    backgroundColor: "#222",
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 35,
    flex: 1,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingRight: 100,
    backgroundColor: "#000",
  },
  categoryButton: {
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "#000",
    paddingVertical: 6,
  },
  categoryText: {
    color: "#fff",
    fontSize: 16,
  },
  featuredContainer: {
    padding: 15,
  },
  featuredImage: {
    width: "100%",
    height: Dimensions.get("window").width * 1,
    borderRadius: 10,
  },
  featuredTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  featuredGenres: {
    color: "#aaa",
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    flex: 1,
    marginTop: 10,
   
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e50914",
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 5,
  },
  playButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  myListButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginLeft: 10,
  },
  myListButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  header: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    paddingLeft: 15,
    paddingVertical: 10,
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  bottomNavBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#000",
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
});

export default HomeScreen;
