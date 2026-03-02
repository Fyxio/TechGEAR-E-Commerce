import { type ReactNode } from "react";
import Navbar from "./navbar";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <Navbar />
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;