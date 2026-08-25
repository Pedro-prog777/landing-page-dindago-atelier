import { useEffect, useState } from 'react';

/** Indica se a página já rolou além do limite informado (usado no header sticky). */
export function useScrollPosition(limite = 24): boolean {
  const [passou, setPassou] = useState(false);

  useEffect(() => {
    function verificar() {
      setPassou(window.scrollY > limite);
    }

    verificar();
    window.addEventListener('scroll', verificar, { passive: true });
    return () => window.removeEventListener('scroll', verificar);
  }, [limite]);

  return passou;
}
