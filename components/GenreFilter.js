import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { getGenres } from '../services/api';

const GenreFilter = ({ selectedGenres, setSelectedGenres }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      setGenres(data);
    };
    fetchGenres();
  }, []);

  const toggleGenre = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  return (
    <ScrollView horizontal style={tw`p-4`}>
      {genres.map((genre) => (
        <TouchableOpacity
        key={genre.id}
        style={[tw`mr-2 mb-4 p-2 rounded-full`, selectedGenres.includes(genre.id) ? tw`bg-red-600` : tw`bg-gray-200`, { height: 35}]}
        onPress={() => toggleGenre(genre.id)}
      >
          <Text style={tw`${selectedGenres.includes(genre.id) ? 'text-white' : 'text-gray-800'}`}>
            {genre.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default GenreFilter;