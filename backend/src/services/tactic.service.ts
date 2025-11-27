import { prisma } from '@config/database';
import { AppError } from '@types/index';
import { Tactic, Formation, Player } from '@prisma/client';

interface CreateTacticInput {
  name: string;
  description?: string;
  userId: string;
}

interface UpdateTacticInput {
  name?: string;
  description?: string;
}

interface CreateFormationInput {
  name: string;
  tacticId: string;
  players: CreatePlayerInput[];
}

interface CreatePlayerInput {
  numero: number;
  nom: string;
  prenom?: string;
  telephone?: string;
  couleur: string;
  positionX: number;
  positionY: number;
}

type TacticWithFormations = Tactic & {
  formations: (Formation & {
    players: Player[];
  })[];
};

export class TacticService {
  async createTactic(input: CreateTacticInput): Promise<Tactic> {
    return prisma.tactic.create({
      data: {
        name: input.name,
        description: input.description,
        userId: input.userId,
      },
    });
  }

  async getTactics(userId: string): Promise<Tactic[]> {
    return prisma.tactic.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTacticById(tacticId: string, userId: string): Promise<TacticWithFormations> {
    const tactic = await prisma.tactic.findFirst({
      where: {
        id: tacticId,
        userId,
      },
      include: {
        formations: {
          include: {
            players: true,
          },
        },
      },
    });

    if (!tactic) {
      throw new AppError(404, 'Tactic not found', 'TACTIC_NOT_FOUND');
    }

    return tactic;
  }

  async updateTactic(tacticId: string, userId: string, input: UpdateTacticInput): Promise<Tactic> {
    const existingTactic = await prisma.tactic.findFirst({
      where: { id: tacticId, userId },
    });

    if (!existingTactic) {
      throw new AppError(404, 'Tactic not found', 'TACTIC_NOT_FOUND');
    }

    return prisma.tactic.update({
      where: { id: tacticId },
      data: input,
    });
  }

  async deleteTactic(tacticId: string, userId: string): Promise<void> {
    const existingTactic = await prisma.tactic.findFirst({
      where: { id: tacticId, userId },
    });

    if (!existingTactic) {
      throw new AppError(404, 'Tactic not found', 'TACTIC_NOT_FOUND');
    }

    await prisma.tactic.delete({
      where: { id: tacticId },
    });
  }

  async createFormation(input: CreateFormationInput): Promise<Formation> {
    const { name, tacticId, players } = input;

    return prisma.formation.create({
      data: {
        name,
        tacticId,
        players: {
          create: players,
        },
      },
      include: {
        players: true,
      },
    });
  }

  async getPlayersForConvocation(formationId: string): Promise<Player[]> {
    const formation = await prisma.formation.findUnique({
      where: { id: formationId },
      include: {
        players: true,
      },
    });

    if (!formation) {
      throw new AppError(404, 'Formation not found', 'FORMATION_NOT_FOUND');
    }

    return formation.players;
  }
}
