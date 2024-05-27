import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface Movie {
  poster_path: string;
  title: string;
  release_date: string;
  genre_names: string[];
  cast: string[];
  director: string;
  overview: string;
}

interface MovieCardProps {
  movie: Movie;
}

const windowWidth = Dimensions.get('window').width;

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <View style={[tw`border-gray-200 bg-white`, styles.card, { width: windowWidth / 2.2 }]}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={[tw`h-36 self-center`, { width: windowWidth / 2.2 }]}
      />
      <View style={tw`flex-1 p-4 border-b`}>
        <Text style={tw`text-xl font-bold text-black`}>{movie.title}</Text>
        <Text style={tw`text-black`}>Release Date: {movie?.release_date}</Text>
        <Text style={tw`text-black`}>Genre: {movie.genre_names ? movie.genre_names.join(', ') : 'NA'}</Text>
        <Text style={tw`text-black`}>Cast: {movie.cast ? movie.cast?.join(', ') : 'NA'}</Text>
        <Text style={tw`text-black`}>Director: {movie?.director ? movie?.director:'NA' }</Text>
        <Text style={tw`mt-2 text-black`} numberOfLines={2}>{movie.overview}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    margin:8
  },
});

export default MovieCard;
