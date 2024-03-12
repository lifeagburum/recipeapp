import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Appbar, Card, Paragraph, Searchbar } from 'react-native-paper';
import { ScrollView } from 'react-native';

export default function App() {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

  const getMeals = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setMeals(data.categories);
  }

  useEffect(() => {
    getMeals();
  }, []);

  const onChangeSearch = query => {
    setSearchQuery(query);
    if (query === '') {
      setSearchResults([]);
    } else {
      const filteredMeals = meals.filter(meal =>
        meal.strCategory.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredMeals);
    }
  };

  return (
    
 
        <View style={styles.container}>
          <Appbar>
            <Appbar.Content title="Recipe Finder App" />
          </Appbar>
          <Searchbar
            placeholder="Search for meals"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <ScrollView>
            {(searchQuery === '' ? meals : searchResults).map((meal) => (
              <Card key={meal.idCategory}>
                <Card.Cover source={{ uri: meal.strCategoryThumb }} />
                <Card.Title title={meal.strCategory} />
                <Card.Content>
                  <Paragraph>{meal.strCategoryDescription}</Paragraph>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
          <StatusBar style="auto" />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
