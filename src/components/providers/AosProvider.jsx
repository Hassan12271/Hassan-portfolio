'use client';

import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function AosProvider({ children }) {
  useEffect(() => {
    Aos.init({ once: true });
  }, []);

  return children;
}
