// components/ProductCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export interface ProductCardProps {
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  onPress?: () => void; // ✅ جديد
}

export default function ProductCard({
  name,
  description,
  price,
  imageUrl,
  onPress,
}: ProductCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text style={styles.placeholderText}>لا صورة</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        {description ? <Text style={styles.desc}>{description}</Text> : null}
        <Text style={styles.price}>{price} ₺</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 10,
    color: '#777',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  desc: {
    marginTop: 4,
    color: '#555',
  },
  price: {
    marginTop: 8,
    fontWeight: 'bold',
  },
});
