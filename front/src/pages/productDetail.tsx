import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { getProductById } from "../services/product.service";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import type { Product } from "../types";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, fetchCart, addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch {
        console.error("Erreur lors de la récupération du produit");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (user) {
      fetchCart(user.id);
    }
  }, [user]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!cart) return;
    await addToCart(cart.id, Number(id));
    alert("Produit ajouté au panier !");
  };

  if (loading) return <Text p="8">Chargement...</Text>;
  if (!product) return <Text p="8">Produit introuvable</Text>;

  return (
    <Box p="8" maxW="900px" mx="auto">
      <Button mb="6" onClick={() => navigate("/")} variant="outline">
        ← Retour
      </Button>

      <HStack gap="8" align="start">
        {/* Image */}
        <Image
          src={product.Images[0]?.link || "https://via.placeholder.com/400"}
          alt={product.name}
          width="400px"
          height="400px"
          objectFit="cover"
          borderRadius="lg"
        />

        {/* Infos */}
        <VStack align="start" gap="4" flex="1">
          <Heading>{product.name}</Heading>

          <Badge colorScheme="blue">{product.Category?.name}</Badge>

          <Text fontSize="2xl" fontWeight="bold">
            {product.price} €
          </Text>

          <Text color="gray.600">{product.description}</Text>

          <Text>
            Stock :{" "}
            <Text as="span" fontWeight="bold" color={product.stock > 0 ? "green.500" : "red.500"}>
              {product.stock > 0 ? `${product.stock} disponibles` : "Rupture de stock"}
            </Text>
          </Text>

          <Button
            width="100%"
            bg="rgba(48, 88, 166, 0.35)"
            color="white"
            _hover={{ bg: "rgba(48, 88, 166, 0.5)" }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Ajouter au panier
          </Button>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ProductDetail;