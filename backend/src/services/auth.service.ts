import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { prisma } from '@config/database';
import { config } from '@config/env';
import { AppError, JwtPayload } from '@types/index';
import { User, Role } from '@prisma/client';

interface RegisterInput {
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

interface AuthResponse {
  user: Omit<User, 'passwordHash'>;
  tokens: TokenPair;
}

export class AuthService {
  async register(input: RegisterInput): Promise<AuthResponse> {
    const { email, password } = input;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError(409, 'User already exists', 'USER_EXISTS');
    }

    // Hash password
    const passwordHash = await argon2.hash(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: Role.USER,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokenPair(user.id, user.email, user.role);

    // Remove passwordHash from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      tokens,
    };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const { email, password } = input;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError(401, 'Invalid credentials', 'INVALID_CREDENTIALS');
    }

    // Verify password
    const isValidPassword = await argon2.verify(user.passwordHash, password);

    if (!isValidPassword) {
      throw new AppError(401, 'Invalid credentials', 'INVALID_CREDENTIALS');
    }

    // Generate tokens
    const tokens = await this.generateTokenPair(user.id, user.email, user.role);

    // Remove passwordHash from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      tokens,
    };
  }

  async refreshToken(refreshToken: string): Promise<TokenPair> {
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as JwtPayload;

      if (decoded.type !== 'refresh') {
        throw new AppError(401, 'Invalid token type', 'INVALID_TOKEN_TYPE');
      }

      // Check if refresh token exists in database
      const storedToken = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      });

      if (!storedToken) {
        throw new AppError(401, 'Invalid refresh token', 'INVALID_REFRESH_TOKEN');
      }

      // Check if token is expired
      if (storedToken.expiresAt < new Date()) {
        await prisma.refreshToken.delete({ where: { id: storedToken.id } });
        throw new AppError(401, 'Refresh token expired', 'TOKEN_EXPIRED');
      }

      // Generate new token pair
      const tokens = await this.generateTokenPair(storedToken.user.id, storedToken.user.email, storedToken.user.role);

      // Delete old refresh token
      await prisma.refreshToken.delete({ where: { id: storedToken.id } });

      return tokens;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError(401, 'Invalid refresh token', 'INVALID_REFRESH_TOKEN');
      }
      throw error;
    }
  }

  async logout(refreshToken: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
  }

  private async generateTokenPair(userId: string, email: string, role: Role): Promise<TokenPair> {
    // Generate access token
    const accessPayload: JwtPayload = {
      userId,
      email,
      role,
      type: 'access',
    };

    const accessToken = jwt.sign(accessPayload, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpiration,
      algorithm: 'HS256',
    });

    // Generate refresh token
    const refreshPayload: JwtPayload = {
      userId,
      email,
      role,
      type: 'refresh',
    };

    const refreshToken = jwt.sign(refreshPayload, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiration,
      algorithm: 'HS256',
    });

    // Store refresh token in database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
