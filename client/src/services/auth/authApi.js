import api from "../api";

class AuthService {
  // Student Registration
  async studentRegister(userData) {
    try {
      const response = await api.post("/auth/register", {
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        role: "STUDENT"
      });
      
      // Store tokens if they come in response (they do in your test cases)
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("user", JSON.stringify({
          email: response.data.email,
          fullName: response.data.fullName,
          role: response.data.role
        }));
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Professor Registration
  async professorRegister(userData) {
    try {
      const response = await api.post("/auth/register", {
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        role: "PROFESSOR",
        instituteName: userData.instituteName,
        areaOfExpertise: userData.areaOfExpertise
      });
      
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("user", JSON.stringify({
          email: response.data.email,
          fullName: response.data.fullName,
          role: response.data.role
        }));
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Login
  async login(credentials, role) {
    try {
      const response = await api.post("/auth/login", {
        email: credentials.email,
        password: credentials.password
      });
      
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("user", JSON.stringify({
          email: response.data.email,
          fullName: response.data.fullName,
          role: response.data.role
        }));
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Refresh Token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token");

      const response = await api.post("/auth/refresh", {
        refreshToken: refreshToken
      });
      
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }
      
      return response.data;
    } catch (error) {
      this.logout();
      throw this.handleError(error);
    }
  }

  // Logout
  async logout() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await api.post("/auth/logout", { refreshToken });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  }

  // Email Verification
  async verifyEmail(token) {
    try {
      const response = await api.get(`/auth/verify-email?token=${token}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Forgot Password
  async forgotPassword(email) {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Reset Password
  async resetPassword(token, newPassword) {
    try {
      const response = await api.post("/auth/reset-password", {
        token,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error Handler
  handleError(error) {
    if (error.response) {
      // Server responded with error
      return {
        message: error.response.data.message || "An error occurred",
        status: error.response.status
      };
    } else if (error.request) {
      // Request made but no response
      return {
        message: "Network error. Please check your connection.",
        status: 0
      };
    } else {
      // Something else happened
      return {
        message: error.message || "An unexpected error occurred",
        status: 500
      };
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("accessToken");
  }

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }
}

export default new AuthService();