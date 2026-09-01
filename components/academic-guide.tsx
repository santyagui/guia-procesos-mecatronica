'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarCheck,
  CalendarPlus,
  Clock,
  CreditCard,
  Ear,
  Factory,
  FilePenLine,
  FileX,
  FolderOpen,
  GraduationCap,
  HandHeart,
  Handshake,
  Languages,
  ListMinus,
  ListOrdered,
  ListPlus,
  Map,
  Menu,
  Receipt,
  RotateCcw,
  Route,
  Search,
  Settings2,
  Trash2,
  Users,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

type Guide = { title: string; meta: string; description: string; href: string; icon: LucideIcon; resource?: boolean };

const normalizeSearch = (value: string) => value
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLocaleLowerCase('es');

const guideAnchor = (title: string) => `tramite-${normalizeSearch(title).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;

const categories: Array<{
  id: string;
  title: string;
  short: string;
  description: string;
  icon: typeof GraduationCap;
  guides: Guide[];
}> = [
  {
    id: 'matriculas', title: 'Matrículas', short: 'Matrículas', icon: GraduationCap,
    description: 'Opciones y autorizaciones según tu situación académica.',
    guides: [
      { title: 'Matrícula extraordinaria', meta: 'Presencial · Matrículas', description: 'Para estudiantes que necesitan matricularse una vez finalizado el período ordinario.', href: 'https://drive.google.com/file/d/1aXkuI_FhpspELh2yiQ-ZlR1y8VUXQbGd/view', icon: CalendarPlus },
      { title: 'Matrícula especial', meta: 'Presencial · 15 días', description: 'Solicita autorización después del cierre de las matrículas extraordinarias.', href: 'https://drive.google.com/file/d/1_pBP8m1jOoOOo_KUTyyiRAaoOvclRIzM/view', icon: CalendarCheck },
      { title: 'Matrícula como condicionado oyente', meta: 'Tercera matrícula', description: 'Trámite obligatorio cuando cursarás una asignatura por tercera ocasión.', href: 'https://drive.google.com/file/d/1JHwhK0MDlgpeVEtHr17smUYNakD9qZe_/view', icon: Ear },
      { title: 'Matrícula con aprobación previa', meta: 'Condicionado oyente', description: 'Registra asignaturas de condicionado oyente aprobadas en un período anterior.', href: 'https://drive.google.com/file/d/1UnQ_fb4dCAGhrKZIM60JLlQi8Xu0x4eP/view', icon: BadgeCheck },
      { title: 'Matrícula después de eliminar la prefactura', meta: 'Falta de pago · Presencial', description: 'Solicita una nueva matrícula cuando la prefactura inicial fue eliminada.', href: 'https://drive.google.com/file/d/1q3Q9QpWobg34qqplVdqgTxAv6xvoh7pZ/view', icon: Receipt },
      { title: 'Reingreso a la carrera', meta: 'En línea · Primer mes', description: 'Orientación para retomar la carrera dentro del plazo institucional.', href: 'https://drive.google.com/file/d/1DZS04S8ol4MgiK31bib91jxR69QjgHQD/view', icon: RotateCcw },
    ],
  },
  {
    id: 'asignaturas', title: 'Asignaturas', short: 'Asignaturas', icon: Settings2,
    description: 'Ajustes de carga, grupo e itinerario.',
    guides: [
      { title: 'Incremento de asignaturas', meta: 'En línea · Primer mes', description: 'Agrega asignaturas después de haber realizado tu matrícula.', href: 'https://drive.google.com/file/d/19nRpbLDon_nqLnDr7m9v2nehjKYJwev0/view', icon: ListPlus },
      { title: 'Extensión de horas', meta: 'Antes de matricularse', description: 'Solicita autorización para superar la carga académica regular.', href: 'https://drive.google.com/file/d/1r6vNMcVUEx6lxtrxfOiCPLIVu-1Oos-e/view', icon: Clock },
      { title: 'Retiro de asignaturas', meta: 'En línea', description: 'Gestiona el retiro y consulta las condiciones de transferencia de valores.', href: 'https://drive.google.com/file/d/1lZr3LxzwhRoJg6ggdStPVxxan2mTgpWj/view', icon: ListMinus },
      { title: 'Cambio de grupo', meta: 'En línea · Primer mes', description: 'Solicita el cambio según horarios y cupos disponibles.', href: 'https://drive.google.com/file/d/1_3RgcJowROdNwFFPYfmL7z0yLW9moYAW/view', icon: Users },
      { title: 'Itinerario para nivel de grado', meta: '7.º y 8.º nivel', description: 'Activa el itinerario requerido para las asignaturas ofertadas.', href: 'https://drive.google.com/file/d/1GMvBoX2M6rrTNQb4SS5N1jmAC6Sa3cn9/view', icon: Map },
    ],
  },
  {
    id: 'ingles', title: 'Inglés', short: 'Inglés', icon: Languages,
    description: 'Procesos vinculados con suficiencia de lengua extranjera.',
    guides: [
      { title: 'Matrícula en nivel superior sin suficiencia', meta: 'Desde 5.º nivel', description: 'Gestiona tu matrícula si todavía no cuentas con suficiencia B1.', href: 'https://drive.google.com/file/d/1Qu6Yw9daAB2VOBClWvuvsFyV5xoB4j-y/view', icon: BookOpenCheck },
      { title: 'Continuidad sin requisito de lengua extranjera', meta: 'Solicitud en línea', description: 'Consulta la autorización para continuar estudios sin haber cumplido la suficiencia.', href: 'https://drive.google.com/file/d/1Qu6Yw9daAB2VOBClWvuvsFyV5xoB4j-y/view', icon: Route },
      { title: 'Eliminación de prematrícula de inglés', meta: 'Primer mes', description: 'Solicita eliminar la prematrícula y revisa las condiciones aplicables.', href: 'https://drive.google.com/file/d/1V1Fky_zCresTK0LV2TTX3byVmog7JELa/view', icon: Trash2 },
    ],
  },
  {
    id: 'practicas', title: 'Prácticas y servicio comunitario', short: 'Prácticas', icon: BriefcaseBusiness,
    description: 'Asignaturas paracadémicas obligatorias según el nivel.',
    guides: [
      { title: 'Prácticas de Servicio Comunitario I', meta: '5.º nivel · En línea', description: 'Registra la institución receptora e inicia la asignación.', href: 'https://drive.google.com/file/d/1nkmRaRM3fgVnh9-1AKZF5CL0U8dgtiKH/view', icon: HandHeart },
      { title: 'Prácticas de Servicio Comunitario II', meta: '6.º nivel · En línea', description: 'Consulta el proceso según el calendario de matrículas.', href: 'https://drive.google.com/file/d/1nkmRaRM3fgVnh9-1AKZF5CL0U8dgtiKH/view', icon: Handshake },
      { title: 'Prácticas Preprofesionales', meta: '7.º nivel · En línea', description: 'Gestiona la asignación e informa los datos de la empresa.', href: 'https://drive.google.com/file/d/1nkmRaRM3fgVnh9-1AKZF5CL0U8dgtiKH/view', icon: Factory },
    ],
  },
  {
    id: 'pagos', title: 'Pagos y prefactura', short: 'Pagos', icon: CreditCard,
    description: 'Canales de pago y correcciones previas a una nueva matrícula.',
    guides: [
      { title: 'Formas de pago UPS', meta: 'En línea y presencial', description: 'Revisa los canales habilitados en la Sede Quito.', href: 'https://drive.google.com/file/d/1pXUlL4p8IAgaOSrgem3-fe7mt5-rjb0c/view', icon: WalletCards },
      { title: 'Eliminación de prefactura', meta: 'Sin pagos realizados', description: 'Solicita eliminar una prefactura con datos o método de pago incorrectos.', href: 'https://drive.google.com/file/d/1Aak6LjH7hE8x9bhRyWgBUlnHc2raRjZi/view', icon: FileX },
    ],
  },
  {
    id: 'recursos', title: 'Recursos académicos', short: 'Recursos', icon: FolderOpen,
    description: 'Documentos de consulta rápida para completar tus trámites.',
    guides: [
      { title: 'Formulario de Registro de Asignaturas', meta: 'Documento editable', description: 'Registra datos personales, facturación y asignaturas.', href: 'https://docs.google.com/document/d/1gI3LVrwhPHljCGo2amzLJHshPYgdgt2S/edit', icon: FilePenLine, resource: true },
      { title: 'Códigos de asignaturas – Malla Ajuste', meta: 'Consulta rápida', description: 'Consulta códigos, nombres y horas de la malla ajustada.', href: 'https://drive.google.com/file/d/1eykjYWsewnkDJhWBAK_AqH-vbDvgs67T/view', icon: ListOrdered, resource: true },
    ],
  },
];

export default function AcademicGuide() {
  const [query, setQuery] = useState('');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const normalizedQuery = normalizeSearch(query.trim());
  const visibleCategories = useMemo(() => categories.map((category) => ({
    ...category,
    guides: category.guides.filter((guide) => !normalizedQuery || normalizeSearch(`${guide.title} ${guide.meta} ${guide.description} ${category.title}`).includes(normalizedQuery)),
  })).filter((category) => category.guides.length), [normalizedQuery]);

  const searchSuggestions = useMemo(() => {
    if (normalizedQuery.length < 2) return [];
    return categories
      .flatMap((category) => category.guides.map((guide) => ({ category, guide })))
      .filter(({ category, guide }) => normalizeSearch(`${guide.title} ${guide.meta} ${guide.description} ${category.title}`).includes(normalizedQuery))
      .sort((a, b) => Number(normalizeSearch(b.guide.title).startsWith(normalizedQuery)) - Number(normalizeSearch(a.guide.title).startsWith(normalizedQuery)))
      .slice(0, 7);
  }, [normalizedQuery]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const chooseSuggestion = (guide: Guide) => {
    setQuery(guide.title);
    setSuggestionsOpen(false);
    window.setTimeout(() => scrollTo(guideAnchor(guide.title)), 0);
  };

  return (
    <main id="inicio" className="min-h-screen bg-[#f4f7fb] text-[#082f5d]">
      <header className="sticky top-0 z-40 border-b border-white/15 bg-[#073b75]/95 text-white shadow-sm backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-3 px-3 sm:gap-4 sm:px-6 lg:px-8">
          <Sheet>
            <SheetTrigger className="grid size-11 place-items-center rounded-xl border border-white/20 bg-white/10 transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              <Menu className="size-6" /><span className="sr-only">Abrir menú de trámites</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(88vw,360px)] border-r-0 bg-[#062f5f] text-white">
              <SheetHeader className="border-b border-white/15 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex shrink-0 items-center gap-1 rounded-xl bg-white p-1.5">
                    <img src="assets/logo-ups-vertical.jpg" alt="Universidad Politécnica Salesiana" className="h-14 w-10 object-contain" />
                    <img src="assets/escudo-mecatronica.jpeg" alt="Escudo de Ingeniería Mecatrónica UPS" className="h-14 w-12 object-contain" />
                  </div>
                  <div>
                    <SheetTitle className="text-xl font-bold text-white">Guía académica</SheetTitle>
                    <SheetDescription className="text-blue-100">Ingeniería Mecatrónica · Sede Quito</SheetDescription>
                  </div>
                </div>
              </SheetHeader>
              <nav aria-label="Menú principal" className="grid gap-1 px-4">
                <SheetClose className="rounded-xl px-4 py-3 text-left font-semibold text-blue-50 transition hover:bg-white/12" onClick={() => scrollTo('inicio')}>Inicio</SheetClose>
                {categories.map((category) => (
                  <SheetClose key={category.id} className="rounded-xl px-4 py-3 text-left font-semibold text-blue-50 transition hover:bg-white/12" onClick={() => scrollTo(category.id)}>{category.title}</SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <span className="flex shrink-0 items-center rounded-xl bg-white px-2 py-1.5 shadow-sm">
              <img src="assets/logo-ups-horizontal.webp" alt="Universidad Politécnica Salesiana Ecuador" className="h-7 w-auto sm:h-9" />
            </span>
            <span className="hidden h-9 w-px shrink-0 bg-white/25 sm:block" />
            <span className="hidden shrink-0 rounded-xl bg-white px-2 py-1.5 shadow-sm sm:block">
              <img src="assets/logo-mecatronica.jpeg" alt="Carrera de Mecatrónica, Sede Quito" className="h-8 w-auto lg:h-9" />
            </span>
            <img src="assets/escudo-mecatronica.jpeg" alt="Escudo de Ingeniería Mecatrónica UPS" className="size-10 shrink-0 rounded-xl bg-white object-contain p-1 sm:hidden" />
            <div className="ml-1 hidden min-w-0 xl:block">
              <p className="truncate text-sm font-extrabold tracking-wide">Guía de Procesos Académicos</p>
              <p className="truncate text-xs text-blue-100">Ingeniería Mecatrónica · Sede Quito</p>
            </div>
          </div>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-[#082f5d] text-white">
        <img src="https://www.ups.edu.ec/documents/20121/354720/mecatronicauio-banner1.jpg" alt="Estudiante trabajando en un proyecto de Mecatrónica" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,35,70,.96)_0%,rgba(5,35,70,.82)_48%,rgba(5,35,70,.25)_100%)]" />
        <div className="mx-auto grid min-h-[430px] max-w-7xl content-center px-5 py-16 sm:px-8 lg:min-h-[500px] lg:px-10">
          <div className="mb-7 flex w-fit max-w-full items-center gap-3 rounded-2xl border border-white/30 bg-white/95 px-3 py-2.5 shadow-xl sm:gap-4 sm:px-4 sm:py-3">
            <img src="assets/logo-ups-horizontal.webp" alt="Universidad Politécnica Salesiana Ecuador" className="h-9 w-auto sm:h-12" />
            <span className="h-9 w-px shrink-0 bg-slate-200 sm:h-12" />
            <img src="assets/logo-mecatronica.jpeg" alt="Carrera de Mecatrónica, Sede Quito" className="h-8 w-auto sm:h-11" />
          </div>
          <p className="mb-4 text-sm font-black uppercase tracking-[.2em] text-[#f5c400]">Sede Quito · Ingeniería Mecatrónica</p>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">Tus trámites académicos, claros y en un solo lugar</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-blue-50 sm:text-lg">Consulta requisitos, plazos y documentos oficiales sin perder tiempo buscando entre diferentes plataformas.</p>
          <a href="#explorar" className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-[#f5c400] px-5 py-3 font-extrabold text-[#082f5d] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#ffd72f]">Explorar procesos <ArrowRight className="size-5" /></a>
        </div>
      </section>

      <section id="explorar" className="scroll-mt-24 border-b border-blue-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <nav aria-label="Categorías de trámites" className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
              {categories.map((category) => <a key={category.id} href={`#${category.id}`} className="shrink-0 rounded-full border border-blue-100 bg-[#f2f7fd] px-4 py-2 text-sm font-bold text-[#08447e] transition hover:border-[#0b69b4] hover:bg-blue-50">{category.short}</a>)}
            </nav>
            <div className="relative w-full lg:w-96">
              <Command shouldFilter={false} className="overflow-visible bg-transparent p-0 [&_[data-slot=command-input-wrapper]]:p-0 [&_[data-slot=input-group]]:h-11! [&_[data-slot=input-group]]:rounded-xl! [&_[data-slot=input-group]]:border-blue-100 [&_[data-slot=input-group]]:bg-[#f8fbff] [&_[data-slot=input-group]]:shadow-none!">
                <CommandInput
                  value={query}
                  onValueChange={(value) => { setQuery(value); setSuggestionsOpen(true); }}
                  onFocus={() => setSuggestionsOpen(true)}
                  onBlur={() => window.setTimeout(() => setSuggestionsOpen(false), 120)}
                  placeholder="Buscar un trámite…"
                  aria-label="Buscar un trámite"
                  className="text-base"
                />
                {suggestionsOpen && normalizedQuery.length >= 2 && searchSuggestions.length > 0 && (
                  <CommandList className="absolute left-0 right-0 top-[calc(100%+.5rem)] z-50 max-h-80 rounded-2xl border border-blue-100 bg-white p-2 shadow-[0_18px_45px_rgba(8,47,93,.18)]">
                    <CommandGroup heading="Trámites sugeridos">
                      {searchSuggestions.map(({ category, guide }) => {
                        const SuggestionIcon = guide.icon;
                        return (
                          <CommandItem key={guide.title} value={guide.title} onSelect={() => chooseSuggestion(guide)} className="gap-3 rounded-xl px-3 py-3 data-selected:bg-blue-50">
                            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#eef6ff] text-[#0b69b4]"><SuggestionIcon className="size-5" /></span>
                            <span className="min-w-0">
                              <span className="block truncate font-bold text-[#073b75]">{guide.title}</span>
                              <span className="block truncate text-xs text-slate-500">{category.short} · {guide.meta}</span>
                            </span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                )}
              </Command>
            </div>
          </div>
        </div>
      </section>

      <div className="py-8 sm:py-12">
        {visibleCategories.map((category, categoryIndex) => {
          const Icon = category.icon;
          return (
            <section key={category.id} id={category.id} className="scroll-mt-24 py-8 sm:py-12">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-start gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-blue-100 text-[#0b63a8]"><Icon className="size-7" /></span>
                  <div>
                    <p className="mb-1 text-xs font-black uppercase tracking-[.16em] text-[#0b69b4]">Categoría {String(categoryIndex + 1).padStart(2, '0')}</p>
                    <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{category.title}</h2>
                    <p className="mt-1 max-w-2xl text-base text-slate-600 sm:text-lg">{category.description}</p>
                  </div>
                </div>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {category.guides.map((guide) => {
                    const GuideIcon = guide.icon;
                    return (
                      <article key={guide.title} id={guideAnchor(guide.title)} className="group flex min-h-72 scroll-mt-36 flex-col rounded-2xl border border-blue-100 border-t-4 border-t-[#0b69b4] bg-white p-6 shadow-[0_10px_32px_rgba(8,47,93,.07)] transition hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(8,47,93,.12)]">
                        <span className="mb-7 grid size-12 place-items-center rounded-xl bg-[#eef6ff] text-[#0b69b4] transition group-hover:bg-[#0b69b4] group-hover:text-white">
                          <GuideIcon className="size-7" strokeWidth={1.8} />
                        </span>
                        <h3 className="text-xl font-extrabold text-[#073b75] sm:text-2xl">{guide.title}</h3>
                        <span className="mt-3 w-fit rounded-lg bg-[#fff0ad] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#765800]">{guide.meta}</span>
                        <p className="mt-4 flex-1 leading-7 text-slate-600">{guide.description}</p>
                        <a href={guide.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 border-b-2 border-[#f5c400] pb-1 font-extrabold text-[#07529a] transition group-hover:gap-3">{guide.resource ? 'Abrir recurso' : 'Ver guía'} <ArrowRight className="size-4" /></a>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}

        {!visibleCategories.length && (
          <div className="mx-auto max-w-xl px-4 py-24 text-center">
            <Search className="mx-auto size-10 text-blue-300" />
            <h2 className="mt-4 text-2xl font-black">No encontramos ese trámite</h2>
            <p className="mt-2 text-slate-600">Prueba con palabras como “matrícula”, “inglés”, “retiro” o “prefactura”.</p>
          </div>
        )}
      </div>

      <aside className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-[0_10px_32px_rgba(8,47,93,.06)] sm:flex-row sm:items-center">
          <img src="assets/promocion-mecatronica.webp" alt="Estudiante de Ingeniería Mecatrónica de la UPS en un laboratorio" className="h-48 w-full object-cover object-[center_35%] opacity-90 sm:h-44 sm:w-44" />
          <div className="flex-1 px-6 py-6 sm:px-8">
            <p className="text-xs font-black uppercase tracking-[.16em] text-[#0b69b4]">Identidad de carrera</p>
            <h2 className="mt-2 text-2xl font-black text-[#073b75]">Ingeniería Mecatrónica · Sede Quito</h2>
            <p className="mt-2 max-w-xl leading-7 text-slate-600">Una guía preparada para acompañar de forma clara y práctica los principales procesos académicos de la carrera.</p>
          </div>
          <img src="assets/escudo-mecatronica.jpeg" alt="Escudo de Ingeniería Mecatrónica UPS" className="mr-8 hidden h-28 w-24 rounded-2xl object-contain p-2 opacity-85 lg:block" />
        </div>
      </aside>

      <footer className="bg-[#062f5f] text-blue-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div><p className="font-extrabold text-white">Guía de Procesos Académicos</p><p className="mt-1 text-sm text-blue-200">Ingeniería Mecatrónica · Universidad Politécnica Salesiana · Sede Quito</p></div>
          <a href="#inicio" className="font-bold text-[#f5c400]">Volver al inicio ↑</a>
        </div>
      </footer>
    </main>
  );
}
