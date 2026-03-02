import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Heading,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import banniere from "../image/Banniere.techgear.jpg";
import { getProducts } from "../services/product.service";
import { getCategories } from "../services/category.Services";
import type { Product, Category } from "../types";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async (categoryId?: number) => {
    setLoading(true);
    try {
      let data;
      if (categoryId) {
        const res = await import("../services/category.Services");
        data = await res.getProductsByCategory(categoryId);
      } else {
        data = await getProducts();
      }
      setProducts(data);
    } catch {
      console.error("Erreur lors de la récupération des produits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    getCategories().then((data) => setCategories(data));
  }, []);

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId ?? undefined);
  };

  return (
    <Box p="8">
      <Heading mb="6">Nos produits</Heading>

      {/* Bannière */}
<Box mb="8" borderRadius="lg" overflow="hidden">
  <Image
    src={banniere}
    alt="Bannière"
    width="100%"
    height="450px"
    objectFit="cover"
  />
</Box>

      {/* Filtres catégories */}
      <HStack gap="3" mb="8" flexWrap="wrap">
        <Badge
          px="3"
          py="2"
          borderRadius="full"
          cursor="pointer"
          bg={selectedCategory === null ? "rgba(48, 88, 166, 0.35)" : "gray.100"}
          color={selectedCategory === null ? "white" : "black"}
          onClick={() => handleCategoryClick(null)}
        >
          Tous
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category.id}
            px="3"
            py="2"
            borderRadius="full"
            cursor="pointer"
            bg={selectedCategory === category.id ? "rgba(48, 88, 166, 0.35)" : "gray.100"}
            color={selectedCategory === category.id ? "white" : "black"}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </Badge>
        ))}
      </HStack>

      {/* Grille de produits */}
      {loading ? (
        <Text>Chargement...</Text>
      ) : products.length === 0 ? (
        <Text>Aucun produit trouvé</Text>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap="6">
          {products.map((product) => (
            <Box
              key={product.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              _hover={{ shadow: "md", transform: "translateY(-2px)", transition: "all 0.2s" }}
            >
              <Image
                src={product.Images[0]?.link || "https://via.placeholder.com/250"}
                alt={product.name}
                height="200px"
                width="100%"
                objectFit="cover"
              />
              <VStack p="4" align="start" gap="2">
                <Badge colorScheme="blue">{product.Category?.name}</Badge>
                <Heading size="md">{product.name}</Heading>
                <Text color="gray.600" fontSize="sm" lineClamp={2}>
                  {product.description}
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  {product.price} €
                </Text>
                <Button
                  width="100%"
                  bg="rgba(48, 88, 166, 0.35)"
                  color="white"
                  _hover={{ bg: "rgba(48, 88, 166, 0.5)" }}
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  Voir le détail
                </Button>
              </VStack>
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Home;