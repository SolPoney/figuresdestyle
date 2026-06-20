import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ModulesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const modules = await this.prisma.module.findMany({
      orderBy: { ordre: 'asc' },
      include: {
        figures: {
          orderBy: { ordre: 'asc' },
          include: { figure: { select: { id: true, titre: true, description: true } } },
        },
      },
    });

    return modules.map((mod) => ({
      id: mod.id,
      titre: mod.titre,
      description: mod.description,
      type: mod.type,
      ordre: mod.ordre,
      figures: mod.figures.map((mf) => mf.figure.id),
    }));
  }

  async findOne(id: string) {
    const mod = await this.prisma.module.findUnique({
      where: { id },
      include: {
        figures: {
          orderBy: { ordre: 'asc' },
          include: {
            figure: {
              include: {
                questions: true,
              },
            },
          },
        },
      },
    });

    if (!mod) throw new NotFoundException(`Module ${id} introuvable`);

    return {
      id: mod.id,
      titre: mod.titre,
      description: mod.description,
      type: mod.type,
      figures: mod.figures.map((mf) => ({
        id: mf.figure.id,
        titre: mf.figure.titre,
        description: mf.figure.description,
        questions: mf.figure.questions.map((q) => ({
          id: q.id,
          question: q.question,
          reponses: JSON.parse(q.reponses) as string[],
          correct: q.correct,
        })),
      })),
    };
  }

  async findFigure(slug: string) {
    const figure = await this.prisma.figure.findUnique({
      where: { id: slug },
      include: { questions: true },
    });

    if (!figure) throw new NotFoundException(`Figure "${slug}" introuvable`);

    return {
      id: figure.id,
      titre: figure.titre,
      description: figure.description,
      questions: figure.questions.map((q) => ({
        id: q.id,
        question: q.question,
        reponses: JSON.parse(q.reponses) as string[],
        correct: q.correct,
      })),
    };
  }
}
