import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Phone,
  Instagram,
  MapPin,
  ChevronDown,
  Star,
  Shield,
  Truck,
  Award,
  ArrowRight,
  Menu,
  X,
  MessageCircle,
} from 'lucide-react'

const WHATSAPP = '5500000000000' // TODO: substituir pelo número real
const WHATSAPP_MSG = encodeURIComponent('Olá! Vim pelo site e gostaria de um orçamento.')
const INSTAGRAM = 'https://www.instagram.com/exclusivaporcelanatos/'

const galleryImages = [
  { src: '/images/instagram/img1.jpg', label: 'Banheiro Luxo' },
  { src: '/images/instagram/img2.jpg', label: 'Cozinha Gourmet' },
  { src: '/images/instagram/img3.jpg', label: 'Ambiente Moderno' },
  { src: '/images/instagram/img4.jpg', label: 'Cozinha Integrada' },
  { src: '/images/instagram/img5.jpg', label: 'Sala de Estar' },
  { src: '/images/instagram/img6.jpg', label: 'Revestimento Premium' },
  { src: '/images/instagram/img7.jpg', label: 'Espaço Gourmet' },
  { src: '/images/instagram/img8.jpg', label: 'Banheiro Master' },
  { src: '/images/instagram/img9.jpg', label: 'Hall de Entrada' },
  { src: '/images/instagram/img10.jpg', label: 'Área Social' },
  { src: '/images/instagram/img11.jpg', label: 'Varanda Gourmet' },
  { src: '/images/instagram/img12.jpg', label: 'Espaço Premium' },
]

const categories = [
  { name: 'Pisos', desc: 'Porcelanatos para salas, quartos e áreas sociais', emoji: '🏠' },
  { name: 'Revestimentos', desc: 'Paredes e fachadas com acabamento impecável', emoji: '🧱' },
  { name: 'Mármore & Pedras', desc: 'Superfícies nobres que elevam qualquer projeto', emoji: '✨' },
  { name: 'Madeira', desc: 'Porcelanato com efeito madeira, durabilidade total', emoji: '🌿' },
  { name: 'Externos', desc: 'Soluções para áreas externas e fachadas', emoji: '🏗️' },
  { name: 'Banheiros', desc: 'Linhas exclusivas para ambientes íntimos', emoji: '🛁' },
]

const diferenciais = [
  { icon: <Star size={28} />, title: 'Qualidade Premium', desc: 'Produtos selecionados das melhores marcas do mercado nacional e importado.' },
  { icon: <Shield size={28} />, title: 'Garantia Total', desc: 'Todos os nossos produtos possuem garantia e assistência técnica especializada.' },
  { icon: <Truck size={28} />, title: 'Entrega Segura', desc: 'Logística cuidadosa para que seu porcelanato chegue intacto até a obra.' },
  { icon: <Award size={28} />, title: 'Consultoria Grátis', desc: 'Ajudamos você a escolher o porcelanato ideal para cada ambiente do projeto.' },
]

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = lightbox || menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox, menuOpen])

  const navLinks = [
    { label: 'Início', href: '#hero' },
    { label: 'Produtos', href: '#produtos' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ]

  return (
    <div className="min-h-screen bg-white text-[#111]">

      {/* ── NAVBAR ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 shadow-lg backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#hero" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Exclusiva Porcelanatos" className="h-12 w-auto" />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#CC1C1C] ${
                  scrolled ? 'text-[#1a1a1a]' : 'text-white drop-shadow'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#CC1C1C] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#a81414] hover:shadow-[#CC1C1C]/30 hover:shadow-xl md:flex"
          >
            <MessageCircle size={16} />
            Solicitar Orçamento
          </a>

          <button
            onClick={() => setMenuOpen(true)}
            className={`rounded-xl p-2 md:hidden ${scrolled ? 'text-[#111]' : 'text-white'}`}
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-y-0 right-0 w-72 bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <img src="/images/logo.png" alt="Exclusiva Porcelanatos" className="h-10" />
                <button onClick={() => setMenuOpen(false)}>
                  <X size={24} className="text-[#111]" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 px-4 pt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-[#1a1a1a] transition-colors hover:bg-red-50 hover:text-[#CC1C1C]"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-[#CC1C1C] px-5 py-3.5 text-sm font-semibold text-white"
                >
                  <MessageCircle size={18} />
                  Solicitar Orçamento
                </a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/instagram/img2.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center text-white sm:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-block rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur-sm"
          >
            ✦ Artes em Porcelanato
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          >
            Superfícies que
            <br />
            <span className="text-[#e83030]">transformam</span>
            <br />
            ambientes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-10 text-lg text-white/80 sm:text-xl"
          >
            Porcelanatos de alto padrão para cada ambiente do seu projeto.
            <br className="hidden sm:block" />
            Do piso ao revestimento — elegância e durabilidade em cada detalhe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#CC1C1C] px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-red-900/40 transition-all hover:bg-[#a81414] hover:scale-105"
            >
              <MessageCircle size={20} />
              Solicitar Orçamento
            </a>
            <a
              href="#galeria"
              className="flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Ver Portfólio
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>

        <motion.a
          href="#produtos"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm"
          >
            <ChevronDown size={22} />
          </motion.div>
        </motion.a>
      </section>

      {/* ── NÚMEROS / CREDENCIAIS ── */}
      <section className="border-b border-gray-100 bg-white py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5 sm:grid-cols-4 sm:px-8">
          {[
            { value: '10+', label: 'Anos de experiência' },
            { value: '500+', label: 'Obras realizadas' },
            { value: '200+', label: 'Modelos disponíveis' },
            { value: '100%', label: 'Clientes satisfeitos' },
          ].map((stat, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-[#CC1C1C]">{stat.value}</p>
                <p className="mt-1 text-sm text-[#666]">{stat.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── PRODUTOS / CATEGORIAS ── */}
      <section id="produtos" className="bg-[#f8f8f8] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <FadeUp>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-[#CC1C1C]">
                Nossas Categorias
              </span>
              <h2 className="font-display mt-2 text-4xl font-bold text-[#111] sm:text-5xl">
                Produto certo para cada ambiente
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[#666]">
                Trabalhamos com as melhores linhas do mercado para atender projetos residenciais e comerciais.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(204,28,28,0.12)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group cursor-pointer rounded-3xl bg-white p-7 shadow-sm"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-3xl group-hover:bg-[#CC1C1C] group-hover:text-white transition-colors">
                    {cat.emoji}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[#111] group-hover:text-[#CC1C1C] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#666]">{cat.desc}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#CC1C1C] opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver produtos <ArrowRight size={15} />
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERIA ── */}
      <section id="galeria" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <FadeUp>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-[#CC1C1C]">
                Portfólio
              </span>
              <h2 className="font-display mt-2 text-4xl font-bold text-[#111] sm:text-5xl">
                Ambientes que inspiram
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[#666]">
                Veja como os nossos porcelanatos transformam cada espaço em uma obra de arte.
              </p>
            </div>
          </FadeUp>

          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
            {galleryImages.map((img, i) => (
              <FadeUp key={i} delay={i * 0.04}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setLightbox(img.src)}
                  className="group mb-4 cursor-pointer overflow-hidden rounded-2xl shadow-md"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="p-3 text-sm font-semibold text-white">{img.label}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <div className="mt-10 text-center">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#CC1C1C] px-8 py-3.5 text-sm font-semibold text-[#CC1C1C] transition-all hover:bg-[#CC1C1C] hover:text-white"
              >
                <Instagram size={18} />
                Ver mais no Instagram
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
          >
            <motion.img
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              src={lightbox}
              alt="Ampliado"
              className="max-h-[90vh] max-w-full rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <X size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DIFERENCIAIS ── */}
      <section className="bg-[#f8f8f8] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <FadeUp>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-[#CC1C1C]">
                Por que a Exclusiva?
              </span>
              <h2 className="font-display mt-2 text-4xl font-bold text-[#111] sm:text-5xl">
                Nossos diferenciais
              </h2>
            </div>
          </FadeUp>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {diferenciais.map((d, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="rounded-3xl bg-white p-7 shadow-sm">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#CC1C1C]">
                    {d.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#111]">{d.title}</h3>
                  <p className="text-sm leading-relaxed text-[#666]">{d.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section id="sobre" className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <FadeUp>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="/images/instagram/img9.jpg"
                  alt="Sobre a Exclusiva"
                  className="w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 rounded-3xl bg-[#CC1C1C] p-6 text-white shadow-xl">
                <p className="font-display text-3xl font-bold">10+</p>
                <p className="text-sm text-white/80">anos no mercado</p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div>
              <span className="mb-3 inline-block rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-[#CC1C1C]">
                Quem Somos
              </span>
              <h2 className="font-display mt-3 text-4xl font-bold text-[#111] sm:text-5xl">
                Exclusiva Porcelanatos
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#555]">
                Somos uma empresa especializada em porcelanatos e revestimentos de alto padrão, com mais de uma década
                transformando ambientes residenciais e comerciais em espaços sofisticados e duráveis.
              </p>
              <p className="mt-4 text-[#666] leading-relaxed">
                Nossa equipe de consultores está pronta para ajudá-lo a encontrar o produto ideal para cada
                ambiente do seu projeto — do piso ao revestimento, de obras simples a projetos de alto luxo.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#CC1C1C] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-200 transition-all hover:bg-[#a81414] hover:scale-105"
                >
                  <MessageCircle size={17} />
                  Fale Conosco
                </a>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border-2 border-[#CC1C1C] px-7 py-3.5 text-sm font-semibold text-[#CC1C1C] transition-all hover:bg-[#CC1C1C] hover:text-white"
                >
                  <Instagram size={17} />
                  Instagram
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative overflow-hidden bg-[#CC1C1C] py-20">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <FadeUp>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
              Pronto para transformar seu espaço?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Fale com nossos consultores e receba um orçamento personalizado sem compromisso.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 text-base font-bold text-[#CC1C1C] shadow-2xl transition-all hover:scale-105 hover:shadow-white/30"
            >
              <MessageCircle size={22} />
              Solicitar Orçamento Grátis
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ── CONTATO ── */}
      <section id="contato" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <FadeUp>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-[#CC1C1C]">
                Entre em Contato
              </span>
              <h2 className="font-display mt-2 text-4xl font-bold text-[#111] sm:text-5xl">
                Estamos prontos para te atender
              </h2>
            </div>
          </FadeUp>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: <MessageCircle size={28} />,
                title: 'WhatsApp',
                value: 'Clique para conversar',
                href: `https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`,
                cta: 'Enviar mensagem',
              },
              {
                icon: <Instagram size={28} />,
                title: 'Instagram',
                value: '@exclusivaporcelanatos',
                href: INSTAGRAM,
                cta: 'Ver perfil',
              },
              {
                icon: <MapPin size={28} />,
                title: 'Localização',
                value: 'Consulte nosso endereço',
                href: '#',
                cta: 'Ver no mapa',
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <motion.a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="group flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-xl"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#CC1C1C] transition-colors group-hover:bg-[#CC1C1C] group-hover:text-white">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#111]">{item.title}</h3>
                  <p className="mt-1 text-sm text-[#666]">{item.value}</p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#CC1C1C]">
                    {item.cta} <ArrowRight size={14} />
                  </span>
                </motion.a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#111] py-12 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <img src="/images/logo.png" alt="Exclusiva Porcelanatos" className="h-14 brightness-0 invert" />
            <div className="flex gap-6 text-sm text-white/50">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex gap-4">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#CC1C1C] transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#CC1C1C] transition-colors"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/30">
            © {new Date().getFullYear()} Exclusiva Porcelanatos. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLOATING BUTTON ── */}
      <motion.a
        href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 280, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-green-500/40"
        title="Fale no WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" className="h-8 w-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.14 1.532 5.878L0 24l6.296-1.507A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-4.999-1.37l-.359-.213-3.718.889.923-3.611-.233-.372A9.818 9.818 0 1112 21.818z" />
        </svg>
        <motion.span
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: 3 }}
          className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#CC1C1C]"
        />
      </motion.a>
    </div>
  )
}
