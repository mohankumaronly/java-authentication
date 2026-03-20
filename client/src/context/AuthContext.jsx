import { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as AuthApi from "../services/auth/authApi";
import api from "../services/api"

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("🔄 initAuth - refreshToken:", refreshToken ? "✅ Present" : "❌ Missing");
        
        if (!refreshToken) {
          console.log("No refresh token, user not logged in");
          setLoading(false);
          return;
        }

        // Try to get user from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          console.log("📦 Found stored user:", JSON.parse(storedUser));
          setUser(JSON.parse(storedUser));
        }

        try {
          console.log("📡 Fetching profile...");
          const userData = await AuthApi.getProfile();
          console.log("📡 Profile fetched:", userData);
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } catch (profileError) {
          console.error("❌ Profile fetch failed:", profileError);
          
          if (profileError.status === 403) {
            console.log("Using stored user as fallback for 403");
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
          } else {
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Auth init error:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      setError(null);
      
      const res = await AuthApi.login(credentials);
      console.log("Login response:", res);

      if (res.refreshToken) {
        localStorage.setItem("refreshToken", res.refreshToken);
        console.log("✅ Refresh token stored in localStorage");
      } else {
        console.warn("⚠️ No refreshToken in response!");
      }

      const userData = {
        email: res.email,
        fullName: res.fullName,
        role: res.role,
        profileImage: res.profileImage,
        id: res.email
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("✅ User data stored:", userData);

      return { success: true, user: userData };
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed");
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await AuthApi.logout(refreshToken);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setUser(null);
      setError(null);
    }
  }, []);

  const uploadAvatar = useCallback(async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await api.post("/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      if (response.data.profileImage) {
        setUser(prev => ({
          ...prev,
          profileImage: response.data.profileImage
        }));
        
        if (user) {
          const updatedUser = {
            ...user,
            profileImage: response.data.profileImage
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Upload error:", error);
      return { success: false, error: error.message };
    }
  }, [user]);

  const deleteAvatar = useCallback(async () => {
    try {
      const response = await api.delete("/users/avatar");
      
      setUser(prev => ({
        ...prev,
        profileImage: null
      }));
      
      if (user) {
        const updatedUser = {
          ...user,
          profileImage: null
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Delete error:", error);
      return { success: false, error: error.message };
    }
  }, [user]);

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    uploadAvatar,
    deleteAvatar,
    hasRole: (role) => user?.role === role,
    isAuthenticated: !!user,
    isStudent: user?.role === "STUDENT",
    isProfessor: user?.role === "PROFESSOR",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export default AuthContext;