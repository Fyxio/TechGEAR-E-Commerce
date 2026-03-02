import { useNavigate } from "react-router-dom";
import {
  Box,
  HStack,
  Image,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";
import { useEffect, useState } from "react";
import logo from "../image/logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (user) {
      fetchCart(user.id);
    }
  }, [user]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/?search=${search}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const cartCount = cart?.Products?.length || 0;

  return (
    <Box
      px="8"
      py="4"
      borderBottomWidth="1px"
      bg="white"
      position="sticky"
      top="0"
      zIndex="100"
    >
      <HStack justify="space-between">

        {/* Logo */}
        <Image
          src={logo}
          alt="Logo"
          width="80px"
          cursor="pointer"
          onClick={() => navigate("/")}
        />

        {/* Barre de recherche */}
        <Input
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          maxW="400px"
        />

        {/* Icônes droite */}
        <HStack gap="4">

          {/* Panier */}
          <Button
            variant="ghost"
            onClick={() => navigate("/cart")}
            position="relative"
          >
            🛒
            {cartCount > 0 && (
              <Box
                position="absolute"
                top="-1"
                right="-1"
                bg="red.500"
                color="white"
                borderRadius="full"
                width="18px"
                height="18px"
                fontSize="10px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {cartCount}
              </Box>
            )}
          </Button>

          {/* Compte */}
          {user ? (
            <HStack gap="2">
              <Text
                cursor="pointer"
                fontWeight="bold"
                onClick={() => navigate("/profile")}
              >
                👤 {user.firstName}
              </Text>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Déconnexion
              </Button>
            </HStack>
          ) : (
            <Button
              bg="rgba(48, 88, 166, 0.35)"
              color="white"
              _hover={{ bg: "rgba(48, 88, 166, 0.5)" }}
              onClick={() => navigate("/login")}
            >
              Connexion
            </Button>
          )}

        </HStack>
      </HStack>
    </Box>
  );
};

export default Navbar;