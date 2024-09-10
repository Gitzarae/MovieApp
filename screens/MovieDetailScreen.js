import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const API_KEY = "fb0ea7ce1086b7d9483bed6b8f590110";

const MovieDetailScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      setMovie(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!movie) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/original${movie.poster_path}` }}
        style={styles.posterImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.headerIcons}>
            <Ionicons
              name="arrow-back"
              size={28}
              color="#fff"
              onPress={() => {
               
              }}
            />
            <Ionicons name="heart-outline" size={28} color="#fff" />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.genre}>Adventure, Drama, Sci-Fi</Text>
            <Text style={styles.overview}>
              {movie.overview.length > 150
                ? movie.overview.substring(0, 150) + "..."
                : movie.overview}
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.watchButton}>
                <Text style={styles.watchButtonText}>Watch now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.trailerButton}>
                <Text style={styles.trailerButtonText}>Trailer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  posterImage: {
    width: "100%",
    height: Dimensions.get("window").height,
    justifyContent: "flex-end",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(,0 0, 0, 0.5)", 
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
  },
  textContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 30,
    borderRadius: 30,
    height: 320,
    marginBottom: 70,
    marginHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  genre: {
    color: "#bbb",
    fontSize: 16,
    marginBottom: 40,
    textAlign: "left",
  },
  overview: {
    color: "#ddd",
    fontSize: 16,
    marginBottom: 40,
    textAlign: "left",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  watchButton: {
    backgroundColor: "#E50914",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  watchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  trailerButton: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  trailerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#000",
    fontSize: 18,
  },
});

export default MovieDetailScreen;
