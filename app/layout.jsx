import 'bootstrap/dist/css/bootstrap.min.css';
import '@/sass/style.scss';
import AosProvider from '@/components/providers/AosProvider';

export const metadata = {
  title: 'Hassan - Personal portfolio',
  description: 'Hassan Raza - Personal portfolio website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/images/favi-icon.png" />
      </head>
      <body suppressHydrationWarning>
        <AosProvider>{children}</AosProvider>
      </body>
    </html>
  );
}
