import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role: {
    name: string;
  };
  exp: number;
}

export const decodeJwt = (token: string): JwtPayload => {
  return jwtDecode<JwtPayload>(token);
};

export const getRoleFromToken = (token: string): string => {
  const decoded = decodeJwt(token);
  return decoded.role.name;
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeJwt(token);
  const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
  return decoded.exp < currentTime;
};