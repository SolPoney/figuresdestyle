import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const DATA_DIR = path.resolve(__dirname, '../../frontend/src/assets/data');

async function main() {
  console.log('🌱 Seed: chargement des figures de style...');

  // Lire modules-config.json
  const modulesConfig: Array<{
    id: string;
    type: string;
    figures: string[];
    titre: string;
    description: string;
  }> = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, 'modules-config.json'), 'utf-8'),
  );

  // Collecter toutes les figures uniques
  const allFigureSlugs = new Set<string>();
  for (const mod of modulesConfig) {
    for (const fig of mod.figures) {
      allFigureSlugs.add(fig);
    }
  }

  // Insérer les figures et leurs questions
  for (const slug of allFigureSlugs) {
    const filePath = path.join(DATA_DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`  ⚠️  Fichier manquant : ${slug}.json — ignoré`);
      continue;
    }

    const data: {
      id: string;
      titre: string;
      description: string;
      questions: Array<{
        question: string;
        reponses: string[];
        correct: number;
      }>;
    } = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    await prisma.figure.upsert({
      where: { id: slug },
      update: {
        titre: data.titre,
        description: data.description,
      },
      create: {
        id: slug,
        titre: data.titre,
        description: data.description,
      },
    });

    // Supprimer les anciennes questions pour ce slug avant de ré-insérer
    await prisma.question.deleteMany({ where: { figureId: slug } });

    await prisma.question.createMany({
      data: (data.questions || []).map((q) => ({
        figureId: slug,
        question: q.question,
        reponses: JSON.stringify(q.reponses),
        correct: q.correct,
      })),
    });

    console.log(
      `  ✅ ${slug} — ${(data.questions || []).length} questions`,
    );
  }

  // Insérer les modules
  for (let i = 0; i < modulesConfig.length; i++) {
    const mod = modulesConfig[i];

    await prisma.module.upsert({
      where: { id: mod.id },
      update: {
        titre: mod.titre,
        description: mod.description,
        type: mod.type,
        ordre: i + 1,
      },
      create: {
        id: mod.id,
        titre: mod.titre,
        description: mod.description,
        type: mod.type,
        ordre: i + 1,
      },
    });

    // Supprimer les anciennes liaisons
    await prisma.moduleFigure.deleteMany({ where: { moduleId: mod.id } });

    // Re-créer les liaisons module ↔ figure
    for (let j = 0; j < mod.figures.length; j++) {
      const slug = mod.figures[j];
      const figureExists = await prisma.figure.findUnique({ where: { id: slug } });
      if (!figureExists) continue;

      await prisma.moduleFigure.create({
        data: { moduleId: mod.id, figureId: slug, ordre: j + 1 },
      });
    }

    console.log(`  📚 Module ${mod.id}: ${mod.titre}`);
  }

  console.log('✨ Seed terminé !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
