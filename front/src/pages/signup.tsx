import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Text,
  Heading,
  VStack,
  Image,
} from "@chakra-ui/react";
import logo from "../image/logo.png";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup({ firstName, lastName, emailAddress, password });
      navigate("/login");
    } catch {
      setError("Une erreur est survenue lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="100px" p="8" borderWidth="1px" borderRadius="lg">
      <Image src={logo} alt="Logo" width="100px" mb="4" />
      <Heading mb="6" textAlign="center">Inscription</Heading>
      <form onSubmit={handleSubmit}>
        <VStack gap="4">
          <Input
            placeholder="Prénom"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Nom"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <Input
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Text color="red.500">{error}</Text>}
          <Button
            type="submit"
            bg="rgba(48, 88, 166, 1)"
            color="white"
            width="100%"
            loading={loading}
            _hover={{ bg: "rgba(48, 88, 166, 0.35)" }}
          >
            S'inscrire
          </Button>
          <Text>
            Déjà un compte ?{" "}
            <Link to="/login" style={{ color: "blue" }}>
              Se connecter
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default Signup;