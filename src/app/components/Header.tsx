import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { label: 'Œuvres', href: '#pages' },
  { label: 'Manifeste', href: '#algorithmiques' },
  { label: 'À propos', href: '#contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080808]/82 backdrop-blur-xl"
      initial={{ y: -72 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-14">
        <a
          href="#fragments"
          className="group flex items-baseline gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="text-sm font-semibold tracking-[0.24em] text-[#f4f0e8]">
            ANTHOLOGIE
          </span>

          <span className="font-mono text-[10px] tracking-[0.18em] text-[#d6b86f]">
            NUMÉRIQUE / 01
          </span>
        </a>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Navigation principale"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-[#e6d39a]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center border border-white/15 text-white md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="border-t border-white/10 bg-[#0b0b0b] px-5 py-6 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="mx-auto flex max-w-[1440px] flex-col">
              {links.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/10 py-4 text-sm uppercase tracking-[0.15em] text-white/75"
                >
                  {link.label}

                  <span className="font-mono text-[10px] text-[#d6b86f]">
                    0{index + 1}
                  </span>
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
