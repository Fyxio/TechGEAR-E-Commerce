import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Image,
  Separator,
} from "@chakra-ui/react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";

const Cart = () => {
  const { cart, fetchCart, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchCart(user.id);
  }, [user]);

  const handleRemove = async (productId: number) => {
    if (!cart) return;
    await removeFromCart(cart.id, productId);
  };

  const handleOrder = () => {
    alert("Commande confirmée ! Merci pour votre achat 🎉");
    navigate("/");
  };

  if (!cart || cart.Products.length === 0) {
    return (
      <Box p="8" textAlign="center">
        <Heading mb="4">Votre panier</Heading>
        <Text mb="6">Votre panier est vide</Text>
        <Button
          bg="rgba(48, 88, 166, 0.35)"
          color="white"
          _hover={{ bg: "rgba(48, 88, 166, 0.5)" }}
          onClick={() => navigate("/")}
        >
          Continuer mes achats
        </Button>
      </Box>
    );
  }

  return (
    <Box p="8" maxW="800px" mx="auto">
      <Heading mb="6">Votre panier</Heading>

      <VStack gap="4" align="stretch">
        {cart.Products.map((product) => (
          <Box key={product.id} borderWidth="1px" borderRadius="lg" p="4">
            <HStack gap="4">
              {/* Image */}
              <Image
                src={product.Images[0]?.link || "https://via.placeholder.com/100"}
                alt={product.name}
                width="100px"
                height="100px"
                objectFit="cover"
                borderRadius="md"
              />

              {/* Infos */}
              <VStack align="start" flex="1" gap="1">
                <Text fontWeight="bold" fontSize="lg">{product.name}</Text>
                <Text color="gray.600">{product.price} €</Text>
              </VStack>

              {/* Supprimer */}
              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => handleRemove(product.id)}
              >
                Supprimer
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>

      {/* Total */}
      <Separator my="6" />
      <HStack justify="space-between" mb="6">
        <Text fontSize="xl" fontWeight="bold">Total</Text>
        <Text fontSize="xl" fontWeight="bold">{cart.total} €</Text>
      </HStack>

      {/* Boutons */}
      <HStack gap="4">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          flex="1"
        >
          Continuer mes achats
        </Button>
        <Button
          bg="rgba(48, 88, 166, 0.35)"
          color="white"
          _hover={{ bg: "rgba(48, 88, 166, 0.5)" }}
          onClick={handleOrder}
          flex="1"
        >
          Commander
        </Button>
      </HStack>
    </Box>
  );
};

export default Cart;