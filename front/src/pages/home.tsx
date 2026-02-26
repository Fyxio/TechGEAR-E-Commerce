import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Heading,
  Text,
  Image,
  Button,
  Input,
  VStack,
} from "@chakra-ui/react";
import { getProducts } from "../services/product.service";
import type { Product } from "../types";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async (searchTerm?: string) => {
    setLoading(true);
    try {
      const data = await getProducts(searchTerm);
      setProducts(data);
    } catch {
      console.error("Erreur lors de la récupération des produits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    fetchProducts(e.target.value);
  };

  return (
    <Box p="8">
      <Heading mb="6">Nos produits</Heading>

      {/* Barre de recherche */}
      <Input
        placeholder="Rechercher un produit..."
        value={search}
        onChange={handleSearch}
        mb="8"
        maxW="400px"
      />

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
              {/* Image du produit */}
              <Image
                src={product.Images[0]?.link || "https://via.placeholder.com/250"}
                alt={product.name}
                height="200px"
                width="100%"
                objectFit="cover"
              />

              {/* Infos du produit */}
              <VStack p="4" align="start" gap="2">
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