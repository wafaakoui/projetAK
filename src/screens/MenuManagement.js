import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Animated } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/Sidebar';  // Importer le composant Sidebar

const MenuManagement = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([
    { id: 1, name: 'Pizza', price: 10 },
    { id: 2, name: 'Pasta', price: 8 },
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // Pour gérer la modification
  const [fadeAnim] = useState(new Animated.Value(0));  // Valeur initiale pour l'animation du titre

  // Sidebar options
  const options = [
    { title: 'Gérer les utilisateurs', icon: 'users', screen: 'UserManagement' },
    { title: 'Assignation des catégories pour les stations', icon: 'tasks', screen: 'CategoryAssignment' },
    { title: 'Gestion du menu', icon: 'utensils', screen: 'MenuManagement' },
  ];

  // Fonction pour ajouter un produit
  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    setProducts((prevProducts) => [
      ...prevProducts,
      { id: prevProducts.length + 1, name: newProduct.name, price: parseFloat(newProduct.price) },
    ]);
    setNewProduct({ name: '', price: '' });
    setIsAddingProduct(false);
  };

  // Fonction pour modifier un produit
  const updateProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    setProducts((prevProducts) => {
      return prevProducts.map((product) =>
        product.id === editingProduct.id
          ? { ...product, name: newProduct.name, price: parseFloat(newProduct.price) }
          : product
      );
    });
    setEditingProduct(null); // Fermer le mode d'édition
    setNewProduct({ name: '', price: '' });
    setIsAddingProduct(false); // Fermer le formulaire d'ajout
  };

  // Fonction pour supprimer un produit
  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Fonction pour activer la modification d'un produit
  const editProduct = (product) => {
    setEditingProduct(product); // Passer le produit en mode d'édition
    setNewProduct({ name: product.name, price: product.price.toString() }); // Pré-remplir les champs avec les données du produit
    setIsAddingProduct(true); // Afficher le formulaire d'ajout comme mode d'édition
  };

  // Animation au moment du montage du composant
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Durée de l'animation en millisecondes
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      {/* Utilisation du Sidebar dans MenuManagement */}
      <Sidebar options={options} /> 

      {/* Contenu sans animation */}
      <View style={styles.content}>
        <Animated.Text style={[styles.header, { opacity: fadeAnim }]}>
          Gestion du Menu
        </Animated.Text>

        <ScrollView style={styles.productList}>
          {products.map((product) => (
            <View key={product.id} style={styles.productItem}>
              <Text style={styles.productText}>{product.name} - ${product.price.toFixed(2)}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => editProduct(product)} style={styles.button}>
                  <FontAwesome5 name="edit" size={20} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeProduct(product.id)} style={styles.button}>
                  <FontAwesome5 name="trash" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {isAddingProduct && (
          <View style={styles.addProductContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nom du produit"
              value={newProduct.name}
              onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Prix du produit"
              value={newProduct.price}
              onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={editingProduct ? updateProduct : addProduct} style={styles.addButton}>
              <Text style={styles.addButtonText}>{editingProduct ? 'Modifier le produit' : 'Ajouter produit'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsAddingProduct(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isAddingProduct && !editingProduct && (
          <TouchableOpacity onPress={() => setIsAddingProduct(true)} style={styles.addButton}>
            <Text style={styles.addButtonText}>Ajouter un produit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E73E01',
    textAlign: 'center',
    marginBottom: 20,
  },
  productList: {
    marginBottom: 20,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productText: {
    fontSize: 18,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#E73E01',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  addProductContainer: {
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#bbb',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default MenuManagement;
