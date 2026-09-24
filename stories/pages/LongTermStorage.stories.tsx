import type { Meta, StoryObj } from "@storybook/react-vite"

import { LongTermStoragePage } from "../../src/components/pages/long-term-storage-page"

const FIG = (id: string) => ({ design: { type: "figma" as const, url: `https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=${id}` } })
const vp = (value: "kdMobile" | "kdTablet") => ({ viewport: { value, isRotated: false } })

const meta = {
  title: "Pages/LongTermStorage",
  component: LongTermStoragePage,
  parameters: { layout: "fullscreen", ...FIG("1753-51025") },
  args: {
    step: "intro",
    homeProps: {
      viewMode: "grid",
      sidebarProps: {
        activePage: "Pessoal",
        tags: ["Image"],
        storageProps: { quickAccessValue: 66, quickAccessLabel: "20 GB de 30 GB usados", longTermValue: 50, longTermLabel: "1 TB de 2 TB usados" },
      },
      gridItems: [
        { name: "Arquivo 1", kind: "folder" },
        { name: "Arquivo 2", kind: "image" },
        { name: "Arquivo 3", kind: "folder" },
      ],
    },
    introProps: {
      files: [
        { name: "Relatorio-Q1.pdf", meta: "PDF · 12 MB · 19 Jul" },
        { name: "Backup-Financeiro.zip", meta: "ZIP · 2.1 GB · 19 Jul" },
        { name: "Fotos-Evento.zip", meta: "ZIP · 450 MB · 19 Jul" },
      ],
      selectedCount: 1,
      savingsLabel: "12 MB",
    },
    archiveBrowserProps: {
      breadcrumb: ["Pessoal", "Fotos", "Casamento Ana & Bruno"],
      files: [
        { name: "Ceremonia-001.jpg", meta: "JPG · 7.82 MB · 19 Jun" },
        { name: "Ceremonia-002.jpg", meta: "JPG · 7.53 MB · 19 Jun" },
        { name: "Festa-014.jpg", meta: "JPG · 8.68 MB · 19 Jun" },
      ],
      selectedCount: 2,
      savingsLabel: "15.35 MB",
    },
    mobileFiles: [
      { name: "Projeto Alpha.pdf", meta: "4.2 MB" },
      { name: "Fotos_Viagem_2024.zip", meta: "812 MB" },
      { name: "Relatório Mensal.docx", meta: "1.1 MB" },
      { name: "Video_Apresentação.mp4", meta: "2.3 GB" },
      { name: "Design_System_v2.fig", meta: "38 MB" },
      { name: "Backup_Documentos.tar", meta: "156 MB" },
    ],
    recoveryFileName: "Backup_Documentos.tar",
  },
} satisfies Meta<typeof LongTermStoragePage>

export default meta
type Story = StoryObj<typeof meta>

/** Home com o modal "Guardar no longo prazo". Figma `LongTermStorage/Intro/Desktop`. */
export const Intro: Story = {}
/** Home com o modal "Adicionar arquivos". Figma `LongTermStorage/ArchiveBrowser/Desktop`. */
export const ArchiveBrowser: Story = { args: { step: "archive-browser" }, parameters: FIG("1755-55661") }
/** Feedback de tela cheia, igual no Light e no Dark. Figma `LongTermStorage/Stored/Mobile`. */
export const Stored: Story = { args: { step: "stored" }, parameters: FIG("1765-61536") }
/** Estado: o arquivo está voltando do longo prazo. Figma `LongTermStorage/RecoveryPending/Mobile`. */
export const RecoveryPending: Story = { args: { step: "recovery-pending" }, parameters: FIG("1765-61487") }

// ─── Responsividade (2026-09-24) ─────────────────────────────────────────
/** Tablet · 720. Figma `LongTermStorage/Intro/Tablet`. */
export const IntroTablet: Story = { ...Intro, parameters: FIG("1765-60425"), globals: vp("kdTablet") }
/** Tablet · 720. Figma `LongTermStorage/ArchiveBrowser/Tablet`. */
export const ArchiveBrowserTablet: Story = { ...ArchiveBrowser, parameters: FIG("1765-60708"), globals: vp("kdTablet") }
/** Mobile · 390: os dois modais viram a tela SelectFiles. TabBar em Guardar, BottomNav Confirmar + ✕. Figma `LongTermStorage/SelectFiles/Mobile`. */
export const SelectFilesMobile: Story = { ...Intro, parameters: FIG("1715-10181"), globals: vp("kdMobile") }
/** Mobile · 390, com arquivos marcados: entra o `ContextHeader` Minimal. Figma `LongTermStorage/SelectFilesSelected/Mobile`. */
export const SelectFilesSelectedMobile: Story = {
  ...Intro,
  args: { defaultSelected: ["Projeto Alpha.pdf", "Backup_Documentos.tar"] },
  parameters: FIG("1729-25014"),
  globals: vp("kdMobile"),
}
/** Mobile · 390. Figma `LongTermStorage/Stored/Mobile`. */
export const StoredMobile: Story = { ...Stored, globals: vp("kdMobile") }
/** Mobile · 390: sem TabBar, BottomNav Adicionar. Figma `LongTermStorage/RecoveryPending/Mobile`. */
export const RecoveryPendingMobile: Story = { ...RecoveryPending, globals: vp("kdMobile") }
