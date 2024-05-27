import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { getMoviesByYear } from '../services/api';
import MovieCard from '../components/MovieCard';
import GenreFilter from '../components/GenreFilter';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(2012);
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const data = await getMoviesByYear(year, page);
      setMovies((prevMovies) => [...prevMovies, ...data]);
      setLoading(false);
    };
    fetchMovies();
  }, [year, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const renderFooter = () => {
    return loading ? (
      <View style={tw`p-4`}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  return (
    <View>
      <GenreFilter selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
      <FlatList
        data={movies}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default HomeScreen;