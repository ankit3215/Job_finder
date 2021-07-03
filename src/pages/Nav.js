import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 60, md: 0 }} mr={60} display="flex">
    {children}
  </Text>
);

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Nav = (props) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <div className="nav">
      <Flex
        w="100%"
        mb={8}
        p={8}
        as="nav"
        align="center"
        bgImage="https://us.123rf.com/450wm/kpixmining/kpixmining1903/kpixmining190300040/119803962-electronic-flex-circuit-board-clear-membrane-of-dismantled-computer-keyboard-silicone-sheet-pcb-deta.jpg?ver=6"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        bgColor="gold"
        color="Yellow"
        borderRadius="sm"
        direction="column"
        alignItems="flex-start"
        {...props}
      >
        <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
          <svg
            fill="white"
            width="12px"
            viewBox="0 0 200 20"
            xmlns="http://www.w3.org/2000/svg"
          ></svg>
        </Box>

        <Box
          display={{ sm: show ? "block" : "none", md: "grid" }}
          width={{ sm: "full", md: "auto" }}
          alignItems="center"
          flexGrow={2}
        >
          <Button variant="contained" color="primary">
            <Link to="/signup">Sign up</Link>
          </Button>

          <Button variant="contained" color="secondary">
            <Link to="/About">About Us</Link>
          </Button>
      

        <Button variant="contained" color="primary" href="#contained-buttons">
          <Link to="/login">
            Log In
          </Link>
        </Button>
        </Box>
      </Flex>
    </div>
  );
};

export default Nav;
