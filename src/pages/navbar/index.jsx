import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state/index";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import logo1 from "../../assets/logo1.png";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import FitbitIcon from '@mui/icons-material/Fitbit';

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);

  const getUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  const fullName = user ? `${user?.firstName} ${user?.lastName}` : `Me`;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="5px"
        >
          <Avatar
            alt="Brand"
            src={logo1}
            onClick={() => navigate("/home")}
            sx={{
              padding: "3px",
              width: "50px",
              height: "50px",
              cursor: "pointer",
            }}
          />
        </Box>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <PeopleAltRoundedIcon
            onClick={() => navigate("/userlist")}
            sx={{
              fontSize: "25px",
              cursor: "pointer",
              color: theme.palette.mode === "dark" ? "#ffff" : "#33658a",
            }}
          />
          <FitbitIcon
            onClick={() => navigate("/channel")}
            sx={{
              fontSize: "25px",
              cursor: "pointer",
              color: theme.palette.mode === "dark" ? "#ffff" : "#33658a",
            }}
          />
          <Message
            onClick={() => navigate("/message")}
            sx={{
              fontSize: "25px",
              cursor: "pointer",
              color: theme.palette.mode === "dark" ? "#ffff" : "#33658a",
            }}
          />
          {/* <Notifications sx={{ fontSize: "25px" }} /> */}
          {/* <Help sx={{ fontSize: "25px" }} /> */}
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <PeopleAltRoundedIcon
              onClick={() => navigate("/userlist")}
              sx={{
                fontSize: "25px",
                cursor: "pointer",
                color: theme.palette.mode === "dark" ? "#ffff" : "#33658a",
              }}
            />
            <FitbitIcon
              onClick={() => navigate("/channel")}
              sx={{
                fontSize: "25px",
                cursor: "pointer",
                color: theme.palette.mode === "dark" ? "#ffff" : "#33658a",
              }}
            />
            <Message
              onClick={() => navigate("/message")}
              sx={{
                fontSize: "25px",
                cursor: "pointer",
                color: theme.palette.mode === "dark" ? "#ffff" : "#33658a",
              }}
            />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
