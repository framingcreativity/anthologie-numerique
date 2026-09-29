import { editorialEase } from '../lib/motion';
import {
  motion,
  useReducedMotion,
} from 'motion/react';

import {
  Menu,
  X,
} from 'lucide-react';

import {
  useEffect,
  useState,
  useRef,
} from 'react';

import {
  getRoutePath,
  withBase,
} from '../lib/site';

export default function Header() {
  const [open, setOpen] =
    useState(false);

  const reduceMotion = useReducedMotion();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);


  const [hash, setHash] =
    useState(
      () =>
        typeof window !== 'undefined'
          ? window.location.hash
          : '',
    );

  useEffect(
    () => {
      const syncHash = () => {
        setOpen(false);
        setHash(
          window.location.hash,
        );
      };

      window.addEventListener(
        'hashchange',
        syncHash,
      );

      return () => {
        window.removeEventListener(
          'hashchange',
          syncHash,
        );
      };
    },
    [],
  );

  const pathname =
    getRoutePath();

  const isHome =
    pathname === '/';

  const isAbout =
    pathname === '/a-propos/';

  const links = [
    {
      label: 'Œuvres',
      href: withBase('#pages'),
      active:
        isHome &&
        (
          hash === '#pages' ||
          hash === '#fragments'
        ),
    },
    {
      label: 'Manifeste',
      href: withBase(
        '#algorithmiques',
      ),
      active:
        isHome &&
        hash === '#algorithmiques',
    },
    {
      label: 'À propos',
      href: withBase(
        'a-propos/',
      ),
      active: isAbout,
    },
  ];

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 bg-ink px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-bg transition-transform duration-200 focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gold"
      >
        Aller au contenu
      </a>

      <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-gold/35 bg-bg/82 backdrop-blur-xl"
      initial={reduceMotion ? false : {
        y: reduceMotion ? 0 : -72,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        ease: editorialEase,
      }}
    >
      <div className="mx-auto flex h-[var(--header-height)] max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-14">
        <a
          href={withBase(
            '#fragments',
          )}
          aria-label="Anthologie numérique — revenir à l’accueil"
          className="group flex min-h-11 min-w-0 flex-wrap content-center items-center gap-x-2 gap-y-0"
          onClick={() =>
            setOpen(false)
          }
        >
          <span className="text-sm font-semibold tracking-[0.24em] text-ink transition-colors duration-300 group-hover:text-gold">
            ANTHOLOGIE
          </span>

          <span className="font-mono text-[10px] tracking-[0.18em] text-gold">
            NUMÉRIQUE / 01
          </span>
        </a>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Navigation principale"
        >
          {links.map(
            link => (
              <a
                key={link.href}
                href={link.href}
                aria-current={
                  link.active
                    ? (
                        link.label ===
                        'À propos'
                          ? 'page'
                          : 'location'
                      )
                    : undefined
                }
                className={`inline-flex min-h-11 items-center text-xs uppercase tracking-[0.16em] transition-colors duration-300 hover:text-[#e6d39a] ${
                  link.active
                    ? 'text-gold'
                    : 'text-white/55'
                }`}
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <button
          ref={menuButton}
          type="button"
          className="grid h-11 w-11 shrink-0 place-items-center border border-white/15 text-white transition-colors duration-300 hover:border-gold/60 hover:text-gold md:hidden"
          aria-expanded={
            open
          }
          aria-controls="mobile-navigation"
          aria-label={
            open
              ? 'Fermer le menu'
              : 'Ouvrir le menu'
          }
          onClick={() =>
            setOpen(
              value =>
                !value,
            )
          }
        >
          {open
            ? (
                <X
                  size={18}
                  aria-hidden="true"
                />
              )
            : (
                <Menu
                  size={18}
                  aria-hidden="true"
                />
              )}
        </button>
      </div>


          <motion.nav
            id="mobile-navigation"
            aria-label="Navigation mobile"
            className="border-t border-white/10 bg-panel px-5 py-6 md:hidden"
            hidden={!open}
            initial={false}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            <div className="mx-auto flex max-w-[1440px] flex-col">
              {links.map(
                (
                  link,
                  index,
                ) => (
                  <a
                    key={
                      link.href
                    }
                    href={
                      link.href
                    }
                    aria-current={
                      link.active
                        ? (
                            link.label ===
                            'À propos'
                              ? 'page'
                              : 'location'
                          )
                        : undefined
                    }
                    onClick={() =>
                      setOpen(
                        false,
                      )
                    }
                    className={`flex min-h-12 items-center justify-between border-b border-white/10 py-4 text-sm uppercase tracking-[0.15em] transition-colors duration-300 ${
                      link.active
                        ? 'text-gold'
                        : 'text-white/75'
                    }`}
                  >
                    {link.label}

                    <span
                      aria-hidden="true"
                      className="font-mono text-[10px] text-gold"
                    >
                      0
                      {index + 1}
                    </span>
                  </a>
                ),
              )}
            </div>
          </motion.nav>

      </motion.header>
    </>
  );
}
