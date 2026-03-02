import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { getUser, updateUser } from "../services/auth.service";
import type { User } from "../types";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    getUser(user.id).then((data) => {
      setProfile(data);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmailAddress(data.emailAddress);
    });
  }, [user]);

  const handleUpdate = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateUser(user.id, { firstName, lastName, emailAddress });
      setSuccess("Profil mis à jour avec succès !");
      setEditing(false);
    } catch {
      console.error("Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!profile) return <Text p="8">Chargement...</Text>;

  return (
    <Box p="8" maxW="600px" mx="auto">
      <Heading mb="6">Mon profil</Heading>

      <VStack gap="4" align="stretch">
        {/* Prénom */}
        <Box>
          <Text fontWeight="bold" mb="1">Prénom</Text>
          {editing ? (
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          ) : (
            <Text>{profile.firstName}</Text>
          )}
        </Box>

        {/* Nom */}
        <Box>
          <Text fontWeight="bold" mb="1">Nom</Text>
          {editing ? (
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          ) : (
            <Text>{profile.lastName}</Text>
          )}
        </Box>

        {/* Email */}
        <Box>
          <Text fontWeight="bold" mb="1">Email</Text>
          {editing ? (
            <Input
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          ) : (
            <Text>{profile.emailAddress}</Text>
          )}
        </Box>

        {success && <Text color="green.500">{success}</Text>}

        {/* Boutons */}
        <HStack gap="4">
          {editing ? (
            <>
              <Button
                bg="rgba(48, 88, 166, 0.35)"
                color="white"
                _hover={{ bg: "rgba(48, 88, 166, 0.5)" }}
                onClick={handleUpdate}
                loading={loading}
                flex="1"
              >
                Sauvegarder
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditing(false)}
                flex="1"
              >
                Annuler
              </Button>
            </>
          ) : (
            <Button
              bg="rgba(48, 88, 166, 0.35)"
              color="white"
              _hover={{ bg: "rgba(48, 88, 166, 0.5)" }}
              onClick={() => setEditing(true)}
              flex="1"
            >
              Modifier mon profil
            </Button>
          )}
        </HStack>

        <Button
          variant="outline"
          colorScheme="red"
          onClick={handleLogout}
        >
          Se déconnecter
        </Button>
      </VStack>
    </Box>
  );
};

export default Profile;