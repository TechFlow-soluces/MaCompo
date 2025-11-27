import { prisma } from '@config/database';
import { User } from '@prisma/client';

export class UserService {
  async getOrCreateUser(username: string): Promise<User> {
    // Try to find existing user
    let user = await prisma.user.findUnique({
      where: { username },
    });

    // Create if doesn't exist
    if (!user) {
      user = await prisma.user.create({
        data: { username },
      });
    }

    return user;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { username },
    });
  }
}
