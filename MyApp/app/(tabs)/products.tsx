import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';        // ✅ جديد
import api from '../../src/api';
import ProductCard from '../../components/ProductCard';


type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
};

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // حقول الفورم
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceText, setPriceText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get<Product[]>('/products');
      setProducts(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء جلب المنتجات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!name.trim()) {
      setError('اسم المنتج مطلوب');
      return;
    }

    const priceNumber = Number(priceText.replace(',', '.'));
    if (Number.isNaN(priceNumber) || priceNumber <= 0) {
      setError('السعر غير صالح');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await api.post<Product>('/products', {
        name: name.trim(),
        description: description.trim() || undefined,
        price: priceNumber,
        imageUrl: imageUrl.trim() || undefined,
      });

      setName('');
      setDescription('');
      setPriceText('');
      setImageUrl('');

      await loadProducts();
    } catch (err: any) {
      console.error(
        'POST /products error:',
        err?.response?.status,
        err?.response?.data ?? err,
      );
      setError('حدث خطأ أثناء إضافة المنتج');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>جاري تحميل المنتجات...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>المنتجات</Text>

      <View style={styles.form}>
        <Text style={styles.formTitle}>إضافة منتج جديد</Text>

        <TextInput
          style={styles.input}
          placeholder="اسم المنتج"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="وصف (اختياري)"
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          style={styles.input}
          placeholder="السعر"
          keyboardType="numeric"
          value={priceText}
          onChangeText={setPriceText}
        />

        <TextInput
          style={styles.input}
          placeholder="رابط صورة (اختياري)"
          value={imageUrl}
          onChangeText={setImageUrl}
        />

        <TouchableOpacity
          style={[styles.button, submitting && styles.buttonDisabled]}
          onPress={handleAddProduct}
          disabled={submitting}
        >
          <Text style={styles.buttonText}>
            {submitting ? 'جاري الإضافة...' : 'إضافة المنتج'}
          </Text>
        </TouchableOpacity>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      {/* حالة لا توجد منتجات */}
      {products.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>لا توجد منتجات حتى الآن.</Text>
          <Text style={styles.emptyTextSmall}>
            جرّب إضافة أول منتج من النموذج أعلاه 🙂
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <ProductCard
              name={item.name}
              description={item.description}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  error: {
    marginTop: 8,
    color: 'red',
  },
  emptyBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
  },
  emptyTextSmall: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
});
