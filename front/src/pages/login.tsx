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

const Login = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signin(emailAddress, password);
      navigate("/");
    } catch {
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="100px" p="8" borderWidth="1px" borderRadius="lg">
      <Image src={logo} alt="Logo" width="100px" mb="4" />
      <Heading mb="6" textAlign="center">Connexion</Heading>
      <form onSubmit={handleSubmit}>
        <VStack gap="4">
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
            bg="rgba(48,88,166,1)"
            color="white"
            width="100%"
            loading={loading}
            _hover={{ bg: "rgba(48,88,166,0.35)" }}
          >
            Se connecter
          </Button>
          <Text>
            Pas encore de compte ?{" "}
            <Link to="/signup" style={{ color: "blue" }}>
              S'inscrire
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;