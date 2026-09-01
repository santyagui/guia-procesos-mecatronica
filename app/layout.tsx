import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const githubRepository = process.env.GITHUB_REPOSITORY;
const githubPagesUrl = githubRepository
  ? `https://${githubRepository.split('/')[0]}.github.io/${githubRepository.split('/')[1]}`
  : null;
const siteUrl = githubPagesUrl ?? 'https://guia-procesos-mecatronica-quito.s-santiagoa73.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Guía de Procesos Académicos | Ingeniería Mecatrónica UPS',
  description: 'Guías oficiales para matrículas, asignaturas, inglés, prácticas, pagos y recursos académicos de Ingeniería Mecatrónica en la UPS Sede Quito.',
  openGraph: {
    title: 'Guía de Procesos Académicos | Ingeniería Mecatrónica UPS',
    description: 'Encuentra rápidamente guías de matrículas, asignaturas, inglés, prácticas, pagos y recursos académicos.',
    type: 'website',
    images: [{
      url: `${siteUrl}/og.png`,
      width: 1200,
      height: 630,
      alt: 'Guía de Procesos Académicos de Ingeniería Mecatrónica, UPS Sede Quito',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guía de Procesos Académicos | Ingeniería Mecatrónica UPS',
    description: 'Encuentra rápidamente guías de matrículas, asignaturas, inglés, prácticas, pagos y recursos académicos.',
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${geist.variable} antialiased`}>{children}</body></html>;
}
