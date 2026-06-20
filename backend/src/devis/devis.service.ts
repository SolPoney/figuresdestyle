import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as nodemailer from 'nodemailer';
import PDFDocument = require('pdfkit');
import { PassThrough } from 'stream';

@Injectable()
export class DevisService {
  constructor(private readonly prisma: PrismaService) {}

  async envoyerDevisParEmail(data: any) {
    await this.prisma.devis.create({
      data: {
        nomEtablissement: data.nomEtablissement,
        contact: data.contact,
        email: data.email,
        telephone: data.telephone || '',
        nombreEleves: Number(data.nombreEleves),
        options: JSON.stringify(data.options || []),
        prix: Number(data.prix),
      },
    });

    // Email optionnel : on tente mais on n'échoue pas si les credentials manquent
    if (process.env.MAIL_USER && process.env.MAIL_PASS) {
      try {
        const doc = new PDFDocument();
        const stream = new PassThrough();
        const chunks: Buffer[] = [];
        doc.pipe(stream);
        doc.fontSize(18).text('Devis établissement scolaire', { underline: true });
        doc.moveDown();
        doc.fontSize(12);
        doc.text(`Nom de l'établissement : ${data.nomEtablissement || ''}`);
        doc.text(`Contact : ${data.contact || ''}`);
        doc.text(`Email : ${data.email || ''}`);
        doc.text(`Téléphone : ${data.telephone || ''}`);
        doc.text(`Nombre d'élèves : ${data.nombreEleves || ''}`);
        doc.text(`Options : ${(data.options || []).join(', ')}`);
        doc.text(`Prix estimé : ${data.prix || ''} €`);
        doc.end();

        await new Promise<void>((resolve, reject) => {
          stream.on('data', (chunk) => chunks.push(chunk));
          stream.on('end', async () => {
            const pdfBuffer = Buffer.concat(chunks);
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
            });
            await transporter.sendMail({
              from: process.env.MAIL_USER,
              to: [data.email, process.env.ADMIN_EMAIL].filter(Boolean),
              subject: 'Votre devis établissement scolaire',
              text: 'Veuillez trouver votre devis en pièce jointe.',
              attachments: [{ filename: 'devis-ecole.pdf', content: pdfBuffer }],
            });
            resolve();
          });
          stream.on('error', reject);
        });
      } catch (e) {
        console.warn('[Devis] Envoi email échoué (non bloquant) :', e);
      }
    }
  }
}
