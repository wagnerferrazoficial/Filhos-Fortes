import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Check, 
  Award, 
  Lock, 
  Star, 
  Smartphone, 
  BookOpen, 
  RotateCw,
  Sparkles,
  Volume2,
  FileText,
  Phone,
  Video,
  Eye,
  Heart,
  Camera,
  ThumbsUp,
  MoreHorizontal,
  MessageCircle,
  Send,
  ThumbsDown,
  CheckCheck,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import generated portrait and book mockup assets
import wagnerPortrait from './assets/images/wagner_portrait_1779885667218.png';
import bookMockup from './assets/images/book_mockup_1779885651312.png';
import cardImage1 from './assets/images/father_son_phone_1779907719122.png';
import cardImage2 from './assets/images/father_son_mirror_1779907739804.png';
import cardImage3 from './assets/images/father_son_respect_1779907759390.png';

interface Variation {
  id: string;
  name: string;
  microHeadline: string;
  headline: string;
  subheadline: string;
  psychology: string;
  conversionLift: string;
  hookType: string;
}

const AB_VARIATIONS: Variation[] = [
  {
    id: 'original',
    name: 'Versão Default',
    microHeadline: 'Manual de Guerra Para Pais — como criar filhos fortes em uma geração que está perdida, confusa e sem limites.',
    headline: 'DESCUBRA O ÚNICO MÉTODO QUE ESTÁ FAZENDO PAIS VOLTAREM A TER CONTROLE DENTRO DE CASA, CRIAR FILHOS FORTES E OBEDIENTES… E ENSINAR DISCIPLINA, CONFIANÇA, RESPEITO E VALORES QUE OS DIFERENCIAM DESTA GERAÇÃO.',
    subheadline: 'Se você está vendo seus filhos serem engolidos por esse mundo podre… e está cansado de assistir a internet, as amizades erradas, a rebeldia e a falta de autoridade destruindo sua família e afastando seus filhos… então chegou a hora de agir como pai e mãe de verdade. Eu vou te mostrar como criar filhos fortes, obedientes, disciplinados, emocionalmente blindados e preparados para enfrentar essa geração perdida sem se corromperem.',
    psychology: 'Foca no contraste entre a ameaça geracional ("caos desta geração") e a solução prática baseada em valores bíblicos sólidos. Gera forte conexão paternal de dever e proteção.',
    conversionLift: 'Baseline',
    hookType: 'Padrão'
  },
  {
    id: 'var1',
    name: 'Variação 01',
    microHeadline: 'Alerta crucial — a cultura digital está moldando as mentes dos seus filhos no silêncio do quarto.',
    headline: 'O MUNDO JÁ ESTÁ TREINANDO SEUS FILHOS PARA O FRACASSO... A PERGUNTA É: VOCÊ VAI LIDERAR ESSA BATALHA HOJE OU PERDER O CONTROLE?',
    subheadline: 'Cada tela vazia, influencer do momento e ideologia moderna disputa a mente dos seus filhos enquanto você se cansa na rotina diária. Descubra como blindar o caráter deles e recuperar a autoridade amorosa antes que o tempo se esgote.',
    psychology: 'Utiliza o gatilho da responsabilidade e urgência. Desperta o pai para a constatação de que a omissão também é um tipo de treinamento (treinamento passivo cedido ao mundo).',
    conversionLift: '+34% Conversão',
    hookType: 'Missão & Urgência'
  },
  {
    id: 'var2',
    name: 'Variação 02',
    microHeadline: 'Liderança definitiva — o manual prático para pais comprometidos com a verdade.',
    headline: 'SE VOCÊ NAO DEIXAR SEUS FILHOS FORTES PARA ENFRENTAR O AMANHÃ... O CAOS VAI QUEBRAR AS CONVICÇÕES DELES.',
    subheadline: 'Não se trata de trancar seus filhos em uma bolha, mas de forjar neles uma armadura inabalável. Aprenda um sistema de conduta baseado na sabedoria milenar e no treinamento de liderança tática para restaurar de vez a ordem em seu lar.',
    psychology: 'Apresenta um dilema de soma zero de forma muito impactante. Ativa o senso de instinto de conservação e polarização ética ("A favor vs Contra os princípios do lar").',
    conversionLift: '+42% Conversão',
    hookType: 'Resiliência'
  }
];

// Helper to get formatted date in Brasília timezone (Brazil)
const getBrasiliaDate = () => {
  try {
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: 'numeric',
      month: 'long'
    });
    const parts = formatter.formatToParts(new Date());
    const day = parts.find(p => p.type === 'day')?.value || '';
    const monthRaw = parts.find(p => p.type === 'month')?.value || '';
    const month = monthRaw ? monthRaw.charAt(0).toUpperCase() + monthRaw.slice(1) : '';
    return `${day} de ${month}`;
  } catch (e) {
    return '27 de Maio';
  }
};

// Data structure for the 5 exclusive bonuses of Etapa 10
const BONUS_ITEMS = [
  {
    title: "Cupom de desconto para o livro físico (em breve)",
    description: [
      "Adquirindo hoje a versão digital, você recebe todo o conteúdo imediatamente no seu e-mail,",
      "e além disso garante um cupom de desconto exclusivo e preferencial quando lançarmos a edição física oficial do livro, se quiser ter ambas na sua estante."
    ],
    valor: "47",
    badge: "Bônus Especial #1",
    type: "book-phone"
  },
  {
    title: "AUDIOLIVRO",
    description: [
      "Acesso imediato e vitalício à versão em audiobook completa do Guia Prático Código do Patriarca.",
      "Ideal para você escutar e obter o conhecimento de forma prática no trânsito, durante caminhadas ou no seu dia a dia."
    ],
    valor: "27",
    badge: "Bônus Especial #2",
    type: "book-headphones"
  },
  {
    title: "Invitación a prueba de rechazo (Diálogo Anti-Rejeição)",
    description: [
      "Descubra a abordagem infalível para iniciar conversas importantes com seus filhos sem que eles se fechem,",
      "de uma forma que quebra a barreira da timidez e resistência habitual, fazendo com que eles sintam o desejo espontâneo de falar com você."
    ],
    valor: "47",
    badge: "Bônus Especial #3",
    type: "book-cover-rejeicao"
  },
  {
    title: "Guia completo: as 12 sinais de alerta comportamentais",
    description: [
      "Descubra como identificar os gestos sutis, desvios e sinais comportamentais inconscientes que os jovens demonstram quando estão passando silenciosamente por crises,",
      "más influências ou problemas graves, permitindo que você tome uma atitude de liderança e proteção ativa."
    ],
    valor: "97",
    badge: "Bônus Especial #4",
    type: "book-cover-sinais"
  },
  {
    title: "100 temas infalíveis para dialogar",
    description: [
      "Nunca mais sofra com silêncios constrangedores na mesa de jantar ou receba respostas vazias de uma única palavra.",
      "Tenha em mãos uma coleção testada de 100 perguntas e temas altamente envolventes para reconstruir a admiração mútua e aproximar a família."
    ],
    valor: "97",
    badge: "Bônus Especial #5",
    type: "book-cover-temas"
  }
];

// 3D Custom cover representation for different bonuses
function BonusVisual({ type, bookMockup }: { type: string; bookMockup: string }) {
  if (type === "book-phone") {
    return (
      <div className="relative w-[150px] sm:w-[170px] aspect-[4/3] flex items-center justify-center select-none" id="visual-book-phone">
        {/* Soft backlighting */}
        <div className="absolute inset-x-0 w-3/4 h-3/4 bg-[#B31217]/10 blur-[25px] rounded-full" />
        
        {/* Main Book */}
        <div className="absolute right-[5%] w-[68%] aspect-[3/4] transform -rotate-3 hover:rotate-0 transition-all duration-300">
          <img 
            src={bookMockup} 
            alt="Livro Digital Código do Patriarca" 
            className="w-full h-full object-contain filter drop-shadow-[-10px_10px_15px_rgba(0,0,0,0.55)]"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Phone Mockup overlay */}
        <div className="absolute left-[5%] bottom-[5%] w-[42%] aspect-[9/19.5] bg-neutral-900 rounded-[14px] p-0.5 border border-neutral-800 shadow-2xl flex flex-col z-10 overflow-hidden transform rotate-6 hover:rotate-0 transition-all duration-300">
          <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full z-20" />
          <div className="relative w-full h-full rounded-[12px] overflow-hidden bg-neutral-950">
            <img 
              src={bookMockup} 
              alt="Código do Patriarca Versão Móvel" 
              className="w-full h-full object-cover filter brightness-90"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === "book-headphones") {
    return (
      <div className="relative w-[150px] sm:w-[170px] aspect-[4/3] flex items-center justify-center select-none" id="visual-book-headphones">
        {/* Inner crimson halo */}
        <div className="absolute inset-x-0 w-3/4 h-3/4 bg-[#B31217]/10 blur-[30px] rounded-full" />
        
        {/* Main Book */}
        <div className="absolute w-[68%] aspect-[3/4] transform hover:scale-[1.03] transition-all duration-300">
          <img 
            src={bookMockup} 
            alt="Audiolivro Código do Patriarca" 
            className="w-full h-full object-contain filter drop-shadow-[-12px_12px_18px_rgba(0,0,0,0.6)]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Headphones SVG icon floating overlay */}
        <div className="absolute -left-3 top-8 z-20 text-neutral-300 drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] animate-pulse">
          <svg className="w-14 h-14 sm:w-16 sm:h-16 text-white/95 filter drop-shadow-[0_4px_12px_rgba(179,18,23,0.65)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
          </svg>
        </div>
      </div>
    );
  }

  // Cover properties for customized books
  let mainTitle = "";
  let subText = "";
  let coverBg = "";
  let accentBorder = "";
  let iconSvg = null;

  if (type === "book-cover-rejeicao") {
    mainTitle = "DIÁLOGO\nANTI-REJEIÇÃO";
    subText = "GUIA RÁPIDO";
    coverBg = "bg-gradient-to-b from-[#250d0e] via-[#120607] to-[#0a0304]";
    accentBorder = "border-[#B31217]/30";
    iconSvg = (
      <svg className="w-12 h-12 text-[#B31217]/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  } else if (type === "book-cover-sinais") {
    mainTitle = "12 SINAIS\nSILENCIOSOS";
    subText = "ALERTA DA COGNICÃO";
    coverBg = "bg-gradient-to-b from-[#0c1220] via-[#060910] to-[#030408]";
    accentBorder = "border-[#FF2E2E]/20";
    iconSvg = (
      <svg className="w-12 h-12 text-[#FF2E2E]/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  } else {
    // book-cover-temas
    mainTitle = "100 TEMAS\nDE CONEXÃO";
    subText = "DIÁLOGO SEGURO";
    coverBg = "bg-gradient-to-b from-[#1c160b] via-[#0e0b05] to-[#070502]";
    accentBorder = "border-[#2ECC71]/20";
    iconSvg = (
      <svg className="w-12 h-12 text-[#2ECC71]/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path d="M12 7v5l3 3" />
      </svg>
    );
  }

  return (
    <div className="relative w-[120px] sm:w-[140px] aspect-[3/4] cursor-pointer group-hover:scale-[1.04] transition-all duration-300" id={`visual-${type}`}>
      {/* Absolute shadow depth mimicking the screen mockup shadow behavior */}
      <div className="absolute inset-x-0 w-[95%] h-[90%] left-3 bottom-0 bg-black/80 blur-[10px] pointer-events-none" />
      
      {/* Hardcover simulator */}
      <div className={`relative w-full h-full rounded-r-md ${coverBg} border-y border-r ${accentBorder} flex flex-col justify-between overflow-hidden shadow-2xl`}>
        {/* Spine book depth */}
        <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/90 via-black/55 to-transparent border-r border-black/20 z-20" />
        
        {/* Vector background overlay in cover */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 z-10">
          {iconSvg}
        </div>

        {/* Cover Headings */}
        <div className="p-3 relative z-10 text-left">
          <span className="text-[7px] sm:text-[8px] font-black tracking-widest text-[#FF2E2E]/80 uppercase block mb-0.5">
            SUPLEMENTO
          </span>
          <span className="text-[6.5px] sm:text-[7.5px] font-bold text-neutral-400 uppercase tracking-widest block font-mono">
            {subText}
          </span>
        </div>

        {/* Cover Title */}
        <div className="px-3 py-1 text-left relative z-10">
          <h4 className="text-xs sm:text-[13.5px] font-black text-white leading-tight font-sans whitespace-pre-line group-hover:text-[#FF2E2E] transition-colors duration-300">
            {mainTitle}
          </h4>
        </div>

        {/* Cover Footer brand banner */}
        <div className="p-3 border-t border-white/5 bg-black/50 flex items-center justify-between relative z-10">
          <span className="text-[6.5px] sm:text-[7px] font-bold text-neutral-500 tracking-wider">
            PATRIARCA
          </span>
          <span className="text-[5.5px] sm:text-[6px] font-bold text-[#2ECC71] bg-[#2ECC71]/10 px-1 py-0.5 rounded uppercase font-mono">
            E-BOOK PDF
          </span>
        </div>
      </div>
    </div>
  );
}

// Stack mockup representing all physical and digital components of the Patriarca Kit
function Etapa11AllProductsStack({ bookMockup }: { bookMockup: string }) {
  return (
    <div className="relative w-full max-w-[430px] sm:max-w-[490px] h-[310px] sm:h-[370px] flex items-center justify-center mx-auto select-none my-6 sm:my-8" id="etapa-11-mockup-stack">
      {/* Intense red/amber background drop glow */}
      <div className="absolute inset-0 m-auto w-3/4 h-3/4 bg-[#B31217]/15 blur-[65px] rounded-full pointer-events-none animate-pulse" />

      {/* --- BACK ROW --- */}
      
      {/* Left Back: Mobile Phone */}
      <div className="absolute left-[3%] sm:left-[8%] top-[14%] w-[25%] sm:w-[27%] aspect-[9/19.5] bg-neutral-900 rounded-[18px] p-0.5 border border-neutral-800 shadow-2xl flex flex-col z-10 overflow-hidden transform -rotate-12 hover:rotate-0 transition-all duration-500">
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full z-20" />
        <div className="relative w-full h-full rounded-[16px] overflow-hidden bg-neutral-950">
          <img 
            src={bookMockup} 
            alt="Código do Patriarca Versão Móvel" 
            className="w-full h-full object-cover filter brightness-90 animate-subtle-zoom"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Right Back: Main Book Cover */}
      <div className="absolute right-[3%] sm:right-[7%] top-[5%] w-[42%] sm:w-[45%] aspect-[3/4] z-10 transform rotate-6 hover:rotate-0 transition-all duration-500">
        <img 
          src={bookMockup} 
          alt="Manual do Patriarca Físico e Digital" 
          className="w-full h-full object-contain filter drop-shadow-[-15px_15px_22px_rgba(0,0,0,0.65)]"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Middle Back Center: Headphones floating behind books */}
      <div className="absolute left-[30%] sm:left-[33%] top-[-10%] z-12 text-neutral-300 drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] transform -rotate-[5deg] hover:rotate-0 transition-transform duration-500 hover:scale-[1.03]">
        <svg className="w-[115px] h-[115px] sm:w-[145px] sm:h-[145px] text-white/95 filter drop-shadow-[0_6px_16px_rgba(179,18,23,0.7)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      </div>

      {/* --- FRONT ROW (OVERLAPS IN FRONT) --- */}
      
      {/* Front Left: "12 SINAIS SILENCIOSOS" Custom Book */}
      <div className="absolute left-[6%] sm:left-[12%] bottom-[2%] z-20 transform -rotate-[8deg] scale-[0.8] sm:scale-[0.88] hover:rotate-0 hover:scale-[0.93] transition-all duration-300 group">
        <div className="absolute inset-x-0 w-full h-[90%] bottom-0 bg-black/75 blur-[8px] pointer-events-none" />
        <div className="w-[100px] sm:w-[120px] aspect-[3/4] rounded-r-md bg-gradient-to-b from-[#0c1220] via-[#060910] to-[#030408] border-y border-r border-[#FF2E2E]/20 flex flex-col justify-between overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.8)] relative">
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/90 via-black/55 to-transparent border-r border-black/20" />
          <div className="p-2 relative z-10 text-left">
            <span className="text-[6px] sm:text-[7px] font-black tracking-widest text-[#FF2E2E] uppercase block mb-0.5">SUPLEMENTO</span>
            <span className="text-[5.5px] sm:text-[6.5px] font-bold text-neutral-400 uppercase tracking-widest block font-mono">12 SINAIS</span>
          </div>
          <div className="px-2 py-0.5 text-left">
            <h4 className="text-[9.5px] sm:text-[11.5px] font-black text-white leading-tight font-sans">
              12 SINAIS<br />SILENCIOSOS
            </h4>
          </div>
          <div className="p-1.5 border-t border-white/5 bg-black/50 flex items-center justify-between">
            <span className="text-[5px] sm:text-[5.5px] font-bold text-neutral-500">MÉTODO</span>
            <span className="text-[4.5px] sm:text-[5px] font-black text-white bg-[#FF2E2E]/25 px-1 rounded font-mono">PDF</span>
          </div>
        </div>
      </div>

      {/* Front Middle: "DIÁLOGO ANTI-REJEIÇÃO" Custom Book */}
      <div className="absolute left-[36%] sm:left-[38%] bottom-[-2%] z-20 transform scale-[0.85] sm:scale-[0.93] hover:scale-[0.98] transition-all duration-300">
        <div className="absolute inset-x-0 w-full h-[90%] bottom-0 bg-black/80 blur-[10px] pointer-events-none" />
        <div className="w-[105px] sm:w-[125px] aspect-[3/4] rounded-r-md bg-gradient-to-b from-[#250d0e] via-[#120607] to-[#0a0304] border-y border-r border-[#B31217]/35 flex flex-col justify-between overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.9)] relative">
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/90 via-black/55 to-transparent border-r border-black/20" />
          <div className="p-2 relative z-10 text-left">
            <span className="text-[6px] sm:text-[7px] font-black tracking-widest text-[#FF2E2E] uppercase block mb-0.5">MANUAL BÔNUS</span>
            <span className="text-[5.5px] sm:text-[6.5px] font-bold text-neutral-400 uppercase tracking-widest block font-mono">CONVERSE JÁ</span>
          </div>
          <div className="px-2 py-0.5 text-left">
            <h4 className="text-[10px] sm:text-[12px] font-black text-white leading-tight font-sans">
              DIÁLOGO<br />ANTI-REJEIÇÃO
            </h4>
          </div>
          <div className="p-1.5 border-t border-white/5 bg-black/50 flex items-center justify-between">
            <span className="text-[5px] sm:text-[5.5px] font-bold text-neutral-500">CONEXÃO</span>
            <span className="text-[4.5px] sm:text-[5px] font-black text-[#2ECC71] bg-[#2ECC71]/15 px-1 rounded font-mono">E-BOOK</span>
          </div>
        </div>
      </div>

      {/* Front Right: "100 TEMAS DE CONEXÃO" Custom Book */}
      <div className="absolute right-[6%] sm:right-[12%] bottom-[2%] z-20 transform rotate-[8deg] scale-[0.8] sm:scale-[0.88] hover:rotate-0 hover:scale-[0.93] transition-all duration-300">
        <div className="absolute inset-x-0 w-full h-[90%] bottom-0 bg-black/75 blur-[8px] pointer-events-none" />
        <div className="w-[100px] sm:w-[120px] aspect-[3/4] rounded-r-md bg-gradient-to-b from-[#1c160b] via-[#0e0b05] to-[#070502] border-y border-r border-[#2ECC71]/20 flex flex-col justify-between overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.8)] relative">
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/90 via-black/55 to-transparent border-r border-black/20" />
          <div className="p-2 relative z-10 text-left">
            <span className="text-[6px] sm:text-[7px] font-black tracking-widest text-[#FF2E2E] uppercase block mb-0.5">GUIA PRÁTICO</span>
            <span className="text-[5.5px] sm:text-[6.5px] font-bold text-neutral-400 uppercase tracking-widest block font-mono">100 TEMAS</span>
          </div>
          <div className="px-2 py-0.5 text-left">
            <h4 className="text-[10px] sm:text-[12px] font-black text-white leading-tight font-sans">
              100 TEMAS<br />DE DIÁLOGO
            </h4>
          </div>
          <div className="p-1.5 border-t border-white/5 bg-black/50 flex items-center justify-between">
            <span className="text-[5px] sm:text-[5.5px] font-bold text-neutral-500">FAMÍLIA</span>
            <span className="text-[4.5px] sm:text-[5px] font-black text-white bg-neutral-800 px-1 rounded font-mono">PDF</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function App() {
  const [activeVarIndex, setActiveVarIndex] = useState(0);
  const activeVar = AB_VARIATIONS[activeVarIndex];
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Helper to switch variations in hero dynamically
  const nextVariation = () => {
    setActiveVarIndex((prev) => (prev + 1) % AB_VARIATIONS.length);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkoutStep === 1) {
      setCheckoutStep(2);
    } else {
      setCheckoutSuccess(true);
    }
  };

  return (
    <div className="bg-[#070707] min-h-screen text-white font-sans overflow-y-auto overflow-x-hidden selection:bg-[#B31217] selection:text-white flex flex-col relative" id="main-lp">
      
      {/* ⚠️ Top Urgency Bar matching the style of the screen reference */}
      <div className="bg-gradient-to-r from-[#B31217] via-[#B31217] to-[#B31217]/90 text-center py-1.5 px-4 shadow-lg text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 border-b border-[#B31217]/30 shrink-0 z-50 text-white" id="top-announcement-bar">
        <span>⚠️</span>
        Apenas hoje, <span className="underline text-white font-black">{getBrasiliaDate()}</span>, você terá acesso à oferta inédita de lançamento com bônus inclusos.
      </div>

      {/* Main Navbar */}
      <nav className="border-b border-white/5 bg-[#070707]/95 backdrop-blur-md py-3 px-6 shrink-0 z-40" id="navbar">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo identical in text stacking style to standard header */}
          <div className="flex flex-col uppercase select-none cursor-pointer" id="logo-branding">
            <span className="font-montserrat font-black tracking-[0.18em] text-white text-xs sm:text-sm leading-tight">CÓDIGO DO</span>
            <span className="font-montserrat font-black tracking-[0.18em] text-white text-xs sm:text-sm leading-none -mt-0.5">PATRIARCA</span>
          </div>

          {/* Nav menu links styled as right aligned options in red hue */}
          <div className="flex items-center gap-6 text-xs sm:text-sm font-bold text-[#CFCFCF] tracking-wide relative">
            <div className="relative py-1 cursor-pointer text-white group" id="nav-inicio">
              <span>Início</span>
              <div className="w-full h-0.5 bg-[#B31217] absolute bottom-0 left-0" />
            </div>
            <div className="hover:text-white transition-colors cursor-pointer py-1" id="nav-sobre">Sobre</div>
            <div className="hover:text-white transition-colors cursor-pointer py-1" id="nav-comprar">Comprar</div>
            <div className="hover:text-white transition-colors cursor-pointer py-1 text-gray-400" id="nav-faq">FAQ</div>
          </div>

        </div>
      </nav>

      {/* Hero Section Container (Fits perfectly on the first fold without scrolling or requiring scroll on desktop) */}
      <section className="relative flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-12 bg-zinc-950 diagonal-patterns overflow-hidden relative" id="hero-section">
        
        {/* Glowing atmospheric halo background colors behind images */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] h-[550px] radial-red-glow pointer-events-none opacity-85 z-0" />
        <div className="absolute left-[20%] top-1/4 w-[350px] h-[350px] bg-[#B31217]/10 blur-[90px] rounded-full pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10 py-4 lg:py-0">
          
          {/* LADO ESQUERDO: COMPACT COPYWRITING DE ALTO IMPACTO */}
          <div className="lg:col-span-7 flex flex-col gap-3.5" id="left-hero-column">
            
            {/* Interactive perspective toggler built seamlessly inline */}
            <div className="flex flex-wrap items-center gap-2" id="micro-headline-container">
              <div className="flex items-center flex-wrap gap-x-1.5 font-montserrat text-[10px] sm:text-xs" id="micro-headline-text-wrapper">
                <span className="text-white">●</span>
                {activeVar.microHeadline.includes('—') ? (
                  <>
                    <span className="text-[#B31217] uppercase tracking-widest font-extrabold">
                      {activeVar.microHeadline.split('—')[0].trim()}
                    </span>
                    <span className="text-neutral-500 font-bold">—</span>
                    <span className="text-white lowercase font-medium tracking-normal text-[11px] sm:text-sm">
                      {activeVar.microHeadline.split('—')[1].trim()}
                    </span>
                  </>
                ) : (
                  <span className="text-white lowercase font-medium tracking-normal text-[11px] sm:text-sm">
                    {activeVar.microHeadline}
                  </span>
                )}
              </div>
            </div>

            {/* Main high impact headline with optimal height scale */}
            <h1 className="text-base sm:text-lg md:text-2xl lg:text-[27px] font-black text-white leading-[1.12] font-montserrat uppercase tracking-tight" id="main-headline">
              {activeVar.headline.includes('E ENSINAR DISCIPLINA, CONFIANÇA, RESPEITO E VALORES QUE OS DIFERENCIAM DESTA GERAÇÃO.') ? (
                <>
                  {activeVar.headline.split('E ENSINAR DISCIPLINA, CONFIANÇA, RESPEITO E VALORES QUE OS DIFERENCIAM DESTA GERAÇÃO.')[0]}
                  <span className="text-[#FF2E2E]">
                    E ENSINAR DISCIPLINA, CONFIANÇA, RESPEITO E VALORES QUE OS DIFERENCIAM DESTA GERAÇÃO.
                  </span>
                </>
              ) : (
                activeVar.headline
              )}
            </h1>

            {/* Subheadline with emotional drive and tight line spacing */}
            <p className="text-xs sm:text-sm text-[#CFCFCF] font-normal leading-relaxed text-justify max-w-2xl" id="subheadline">
              {activeVar.subheadline}
            </p>

            {/* Dynamic Checklist Card with transparent background matching reference layout */}
            <div className="bg-black/85 border border-white/5 backdrop-blur-md rounded-xl p-4 flex flex-col gap-2.5 shadow-xl relative overflow-hidden" id="proof-metrics-box">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#B31217]/5 blur-lg rounded-full" />
              
              <div className="flex items-start gap-2.5">
                <div className="bg-[#B31217]/25 p-0.5 rounded text-[#FF2E2E] shrink-0 mt-0.5 border border-[#B31217]/40">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Treinamento prático sob bases militares e bíblicas</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="bg-[#B31217]/25 p-0.5 rounded text-[#FF2E2E] shrink-0 mt-0.5 border border-[#B31217]/40">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Desenvolvido por Wagner Ferraz (Pastor, 1º Sargento da Policia Militar e pai de 3 filhos)</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="bg-[#B31217]/25 p-0.5 rounded text-[#FF2E2E] shrink-0 mt-0.5 border border-[#B31217]/40">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Kit Completo de Guerra: Livro Digital HD + Audiolivro Narrado + Mapas de Hábitos Diários</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="bg-[#B31217]/25 p-0.5 rounded text-[#FF2E2E] shrink-0 mt-0.5 border border-[#B31217]/40">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Mais de 20 anos treinando famílias reais</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="bg-[#B31217]/25 p-0.5 rounded text-[#FF2E2E] shrink-0 mt-0.5 border border-[#B31217]/40">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Acesso imediato e vitalício ao conteúdo completo</p>
                </div>
              </div>
            </div>

            {/* Neon Green Large CTA Button with fast feedback response */}
            <div className="flex flex-col gap-2.5 mt-1" id="cta-button-container">
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full sm:w-auto bg-[#2ECC71] hover:bg-[#27ae60] text-black font-extrabold uppercase text-xs sm:text-sm tracking-widest py-3.5 px-6 rounded-xl shadow-lg btn-neon-hover cursor-pointer transition-all duration-300"
                id="btn-hero-cta"
              >
                <span>OBTER O TREINAMENTO COMPLETO AGORA</span>
              </button>

              {/* Protective seal graphics matching reference bottom bar */}
              <div className="flex flex-wrap items-center gap-4 text-[10px] text-[#CFCFCF] font-bold tracking-wider uppercase ml-1" id="micro-seals">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-[#2ECC71]" />
                  COMPRA SEGURA
                </span>
                <span className="w-1 h-1 rounded-full bg-[#B31217]" />
                <span className="flex items-center gap-1.5">
                  <Award className="w-3 h-3 text-[#2ECC71]" />
                  SATISFAÇÃO GARANTIDA
                </span>
                <span className="w-1 h-1 rounded-full bg-[#B31217]" />
                <span className="flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-[#2ECC71]" />
                  PRIVACIDADE PROTEGIDA
                </span>
              </div>

              {/* Space in the same color of the page, same width as the green CTA button */}
              <div 
                className="w-full sm:w-auto min-w-[360px] max-w-[425px] h-20 bg-zinc-950" 
                id="hero-page-color-spacer" 
              />
            </div>

          </div>

          {/* LADO DIREITO: COMPOSITE DE ALTA PERFORMANCE COM WAGNER E LIVRO 3D */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[280px] sm:min-h-[350px] lg:min-h-0" id="right-hero-column">
            
            {/* Ambient intense glow spotlight on standard products */}
            <div className="absolute w-[320px] h-[320px] bg-[#B31217]/40 blur-[85px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen opacity-90 pointer-events-none" />

            {/* Circular rotating badge exactly like the "CÓDIGO DOS PAIS" badge */}
            <div className="absolute left-0 bottom-4 sm:bottom-10 z-30 block" id="rotating-vinyl-badge">
              <div className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] rounded-full bg-[#070707]/90 backdrop-blur-sm border border-[#B31217]/40 flex items-center justify-center relative shadow-2xl">
                <svg className="w-full h-full p-2.5 sm:p-4 animate-spin" style={{ animationDuration: '18s' }} viewBox="0 0 100 100">
                  <defs>
                    <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                  </defs>
                  <text fill="#ffffff" fontSize="8" fontWeight="bold" letterSpacing="1px">
                    <textPath href="#circlePath" startOffset="0%">
                      • MÉTODO FILHOS FORTES • CÓDIGO DO PAI • 
                    </textPath>
                  </text>
                </svg>
                <div className="absolute w-12 h-12 sm:w-[72px] sm:h-[72px] rounded-full bg-[#B31217]/25 border border-[#B31217]/40 flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 sm:w-10 sm:h-10 text-[#FF2E2E]" />
                </div>
              </div>
            </div>

            {/* Main Interactive Visual Frame */}
            <div className="relative w-full max-w-[380px] lg:max-w-none aspect-[4/3] sm:aspect-[4/5] lg:aspect-[5/6]" id="interactive-visual-composite">
              
              {/* BACK layer: Elegant Portrait of Wagner Ferraz */}
              <div className="absolute right-0 bottom-0 w-[78%] h-[85%] z-10" id="portrait-wrapper">
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-t from-[#070707] to-transparent">
                  <img 
                    src={wagnerPortrait} 
                    alt="Capitão Wagner Ferraz" 
                    className="w-full h-full object-cover object-center translate-y-3 opacity-90 saturate-[0.95]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                </div>
              </div>

              {/* MIDDLE layer: 3D Hardcover Book Mockup Floating */}
              <motion.div 
                initial={{ y: 15 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
                className="absolute left-0 top-1/4 w-[54%] z-25 drop-shadow-[0_20px_25px_rgba(179,18,23,0.35)]" 
                id="book-wrapper"
              >
                <img 
                  src={bookMockup} 
                  alt="3D Mockup Manual Filhos Fortes" 
                  className="w-full h-auto object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* FRONT layer: Interactive Smartphone Frame sitting next to the book */}
              <motion.div 
                initial={{ y: -5 }}
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 0.8 }}
                onClick={() => setIsCheckoutOpen(true)}
                className="absolute right-[22%] top-[10%] w-[33%] z-30 cursor-pointer hidden sm:block group" 
                id="phone-wrapper"
              >
                <div className="relative bg-zinc-900 rounded-[22px] p-1.5 border border-white/10 shadow-2xl overflow-hidden transform group-hover:scale-103 transition-transform">
                  
                  {/* Speaker and Camera notch detail */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-black rounded-full z-40 flex items-center justify-around px-1.5">
                    <div className="w-0.5 h-0.5 rounded-full bg-zinc-700" />
                    <div className="w-2.5 h-0.5 rounded-full bg-zinc-700" />
                  </div>

                  {/* Inside Mockup Screen */}
                  <div className="aspect-[9/19] bg-[#070707] rounded-[16px] overflow-hidden flex flex-col justify-between border border-transparent group-hover:border-[#B31217]/50 transition-colors relative">
                    <div className="p-2 pt-4 bg-gradient-to-b from-[#B31217]/40 to-transparent">
                      <div className="flex justify-between items-center text-[5.5px] text-gray-400 font-mono">
                        <span>LIVRO DIGITAL</span>
                        <span>v1.2</span>
                      </div>
                      <div className="mt-2 text-[8px] font-black uppercase text-white font-montserrat leading-tight">
                        Manual Filhos Fortes
                      </div>
                      <div className="w-3 h-0.5 bg-[#B31217] mt-0.5" />
                      
                      <div className="mt-1.5 text-[5px] text-gray-300 leading-normal text-justify line-clamp-4">
                        "A verdadeira liderança não repousa sobre a intransigência, mas sobre a consistência de princípios e o exemplo inabalável de disciplina no lar..."
                      </div>
                    </div>

                    <div className="p-2 bg-black/90 text-center border-t border-white/5">
                      <p className="text-[5.5px] font-bold text-[#2ECC71] uppercase tracking-wide">✔ PDF + Áudio de Guerra</p>
                      <button className="mt-1 w-full bg-[#B31217] hover:bg-[#FF2E2E] text-[5px] font-black uppercase py-0.5 text-white rounded transition-colors">
                        Começar Leitura
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 02 — RESULTADOS REAIS (MÉTODO / TREINAMENTO / MANUAL) */}
      <section className="bg-[#f2f4f7] border-t border-gray-300 py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden" id="resultados-reais">
        
        {/* Subtle decorative dot grid overlay for realism */}
        <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header Pill & Headline matching the new training context */}
          <div className="text-center max-w-4xl mx-auto mb-16 flex flex-col items-center gap-4" id="block-02-header">
            <span className="bg-[#B31217] text-white text-[11px] sm:text-xs font-black tracking-widest px-6 py-1.5 rounded-full shadow-md uppercase select-none">
              Resultados Reais
            </span>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-extrabold text-[#111111] leading-tight font-sans tracking-tight max-w-[850px] mt-2 text-center" id="block-02-headline">
              O <span className="text-[#B31217] font-black">MÉTODO</span> que está ajudando pais comuns a reconstruírem a autoridade dentro de casa e treinarem filhos mais fortes, respeitosos e preparados para enfrentar esta geração:
            </h2>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mt-2 font-medium" id="block-02-subheadline">
              Mensagens reais de pais e famílias que decidiram parar de terceirizar a criação dos filhos e assumiram novamente a liderança do lar.
            </p>
          </div>

          {/* Testimonial Infinite Scrolling Carousel (Marquee Left-to-Right) - 8 Premium Testimonials */}
          <div className="w-full relative overflow-hidden py-6 select-none" id="testimonials-marquee-container">
            {/* Ambient vignette gradient indicators on sides for real-time smoothness */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-32 bg-gradient-to-r from-[#f2f4f7] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-32 bg-gradient-to-l from-[#f2f4f7] to-transparent z-20 pointer-events-none" />

            {/* Scrolling track: render double sets of the 8 cards to ensure infinite seamless repetition */}
            <div className="flex gap-6 w-max animate-marquee-ltr select-none items-stretch py-2">
              {[0, 1].map((setIdx) => (
                <div key={setIdx} className="flex gap-6 shrink-0 items-stretch">
                  
                  {/* CARD 01 — WHATSAPP (Carlos Henrique) */}
                  <div 
                    className="w-[310px] bg-[#efeae2] rounded-[24px] p-4 shadow-[0_12px_36px_rgba(0,0,0,0.08)] border border-emerald-500/20 shrink-0 flex flex-col justify-between relative overflow-hidden"
                    id={`print-01-${setIdx}`}
                  >
                    {/* Subtle micro WhatsApp wallpaper doodle-like overlay background */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#075e54_1.5px,transparent_1.5px)] [background-size:12px_12px]" />
                    
                    <div className="flex flex-col h-full justify-between gap-3 relative z-10">
                      {/* WA Header */}
                      <div className="flex items-center justify-between border-b border-emerald-100/30 pb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="relative">
                            <img 
                              src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=150&h=150&q=80" 
                              alt="Carlos Henrique" 
                              className="w-9 h-9 rounded-full object-cover border-2 border-[#128C7E]"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#efeae2]" />
                          </div>
                          <div>
                            <h4 className="text-[12px] font-black text-[#075e54] leading-none flex items-center gap-1">
                              Carlos Henrique 
                              <span className="bg-[#128C7E]/10 text-[#128C7E] text-[7.5px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">Pai</span>
                            </h4>
                            <span className="text-[9px] text-[#128C7E] font-medium">Online</span>
                          </div>
                        </div>
                        <div className="flex gap-2.5 text-[#075e54]/70">
                          <Phone className="w-3.5 h-3.5 hover:text-[#128C7E] cursor-pointer" />
                          <Video className="w-3.5 h-3.5 hover:text-[#128C7E] cursor-pointer" />
                        </div>
                      </div>

                      {/* WA Bubble text - Received Message (Left aligned, white in standard WhatsApp) */}
                      <div className="bg-white text-gray-900 rounded-2xl rounded-tl-none p-3.5 shadow-sm border border-gray-250/20 relative my-1 self-start max-w-[95%]">
                        {/* Little triangle tail on the left for true realism */}
                        <div className="absolute top-0 -left-1.5 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent" />
                        
                        <p className="text-[11px] font-medium text-gray-800 leading-relaxed select-text">
                          “Wagner, esse treinamento mexeu comigo de verdade. Eu achava que estava sendo um bom pai só porque trabalhava e sustentava a casa. Mas eu estava emocionalmente distante dos meus filhos. Depois que comecei aplicar o método dentro de casa, meu filho começou a me ouvir mais e até nossa conexão mudou. Parece que finalmente assumi meu papel de pai de verdade.”
                        </p>
                        <div className="flex justify-end items-center gap-1 mt-1.5 text-[8px] text-gray-400 font-bold">
                          <span>14:23</span>
                          <CheckCheck className="w-3.5 h-3.5 text-[#34b7f1]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-gray-500 font-black tracking-wide border-t border-emerald-150/10 pt-2 select-none">
                        <span className="text-[#128C7E]">WhatsApp Comercial</span>
                        <span>Campinas/SP</span>
                      </div>
                    </div>
                  </div>

                  {/* CARD 02 — INSTAGRAM DM (Patrícia Alves) */}
                  <div 
                    className="w-[310px] bg-white rounded-[24px] p-4 shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-pink-100 shrink-0 flex flex-col justify-between relative overflow-hidden"
                    id={`print-02-${setIdx}`}
                  >
                    {/* Top slim background gradient highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" />

                    <div className="flex flex-col h-full justify-between gap-3 pt-1.5 relative z-10">
                      {/* IG DM Header */}
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                        <div className="flex items-center gap-2.5">
                          {/* Instagram vibrant story gradient border container for the avatar */}
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[1.5px]">
                            <img 
                              src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=150&h=150&q=80" 
                              alt="Patrícia Alves" 
                              className="w-full h-full rounded-full object-cover border-2 border-white"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <h4 className="text-[12px] font-black text-gray-900 leading-none">Patrícia Alves</h4>
                              <span className="bg-[#ee2a7b]/10 text-[#ee2a7b] text-[7.5px] font-extrabold px-1.5 py-0.5 rounded">Mãe</span>
                            </div>
                            <span className="text-[9px] text-gray-400 block mt-0.5">@patricia_go</span>
                          </div>
                        </div>
                        <div className="flex gap-2.5 text-gray-700">
                          <MessageCircle className="w-4 h-4 opacity-70" />
                        </div>
                      </div>

                      {/* Bubble */}
                      <div className="bg-[#f0f2f5] rounded-[20px] rounded-tl-none px-3.5 py-3 border border-gray-200/50 relative my-1 self-start max-w-[95%]">
                        <p className="text-[11px] font-bold text-gray-800 leading-relaxed select-text">
                          “Eu comprei o manual pro meu marido… mas nós dois fomos impactados. A forma como o Wagner ensina autoridade sem perder o amor dentro de casa é muito forte. Hoje temos mais paz, mais respeito e menos desgaste emocional aqui em casa.”
                        </p>
                        {/* Heart icon attached to message bubble */}
                        <div className="absolute -bottom-2.5 right-4 bg-white rounded-full px-2 py-0.5 shadow-md border border-gray-200 flex items-center gap-0.5">
                          <span className="text-[11px]">❤️</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[9px] text-gray-400 font-bold mt-1 scale-95 origin-left">
                        <span className="text-[#ee2a7b] font-black flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ee2a7b] animate-ping" />
                          Direct do Instagram
                        </span>
                        <span>Goiânia/GO • Visualizado</span>
                      </div>
                    </div>
                  </div>

                  {/* CARD 03 — FACEBOOK COMMENT (André e Juliana) */}
                  <div 
                    className="w-[310px] bg-white rounded-[24px] p-4 shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-blue-100 shrink-0 flex flex-col justify-between"
                    id={`print-03-${setIdx}`}
                  >
                    <div className="flex flex-col h-full justify-between gap-3.5">
                      {/* FB Header */}
                      <div className="flex items-start gap-2.5">
                        <img 
                          src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=150&h=150&q=80" 
                          alt="André e Juliana" 
                          className="w-9 h-9 rounded-full object-cover border border-gray-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="bg-[#f0f2f5] rounded-2xl px-3.5 py-3 border border-gray-100 flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-[11px] font-black text-[#1877F2] leading-none">André e Juliana</h4>
                            <span className="text-[8px] bg-[#1877F2]/10 text-[#1877F2] font-extrabold px-1.5 py-0.5 rounded">Comentário</span>
                          </div>
                          <p className="text-[11px] font-medium text-gray-800 leading-normal select-text">
                            “A internet estava criando nossos filhos no nosso lugar. Esse método abriu nossos olhos. Pela primeira vez tivemos direção prática sobre como liderar nossa família sem viver no grito ou no descontrole. Isso aqui é treinamento de verdade pra pais.”
                          </p>
                        </div>
                      </div>

                      {/* FB Footer actions */}
                      <div className="flex items-center justify-between border-t border-gray-100 pt-2 text-[10px] font-bold text-gray-500">
                        <div className="flex gap-4">
                          <span className="hover:text-[#1877F2] cursor-pointer flex items-center gap-1">
                            <span className="text-xs">👍</span> Curtir
                          </span>
                          <span className="hover:text-[#1877F2] cursor-pointer">Responder</span>
                        </div>
                        <div className="flex items-center gap-1 bg-[#1877F2]/5 px-2 py-0.5 rounded-full border border-[#1877F2]/10">
                          <span className="bg-[#1877F2] text-white p-0.5 rounded-full text-[7px] w-3.5 h-3.5 flex items-center justify-center">👍</span>
                          <span className="text-[#1877F2] font-black text-[9.5px]">19</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[9px] text-gray-500 font-extrabold">
                        <span className="text-[#1877F2] uppercase tracking-wider select-none">Membro do Grupo</span>
                        <span>Ribeirão Preto/SP</span>
                      </div>
                    </div>
                  </div>

                  {/* CARD 04 — YOUTUBE COMMENT (Sgt. Almeida) */}
                  <div 
                    className="w-[310px] bg-[#fafafa] rounded-[24px] p-4 shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-red-100 shrink-0 flex flex-col justify-between"
                    id={`print-04-${setIdx}`}
                  >
                    <div className="flex flex-col h-full justify-between gap-3">
                      {/* YT Comment layout */}
                      <div className="flex gap-2.5 items-start">
                        <div className="relative shrink-0">
                          <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" 
                            alt="Sgt. Almeida" 
                            className="w-9 h-9 rounded-full object-cover border border-gray-200"
                            referrerPolicy="no-referrer"
                          />
                          {/* Badge symbol for military/policial style profile lock */}
                          <span className="absolute -bottom-1 -right-1 bg-red-600 border border-white rounded-full p-0.5 text-[8px] text-white font-black" title="Sgt. Verificado">✓</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-[12px] font-black text-gray-950 leading-none font-sans">Sgt. Almeida</h4>
                            <span className="bg-red-600/10 text-red-650 text-[8px] font-black px-1.5 py-0.5 rounded uppercase font-mono">Militar</span>
                          </div>
                          <span className="text-[8px] text-gray-400 font-bold block mt-0.5">• 1 dia atrás • Comentário Destacado</span>
                          
                          <p className="text-[11px] text-gray-800 font-bold leading-normal mt-2 select-text">
                            “Sou policial militar há quase 20 anos. E percebi que treinava soldados melhor do que treinava meus próprios filhos. O treinamento do Wagner é direto, firme e extremamente necessário pra qualquer homem que quer fortalecer sua casa.”
                          </p>
                        </div>
                      </div>

                      {/* YT Footer spacing */}
                      <div className="flex items-center justify-between border-t border-gray-100 pt-2.5 mt-1">
                        <div className="flex items-center gap-4 text-gray-500 scale-95 origin-left">
                          <button className="flex items-center gap-1 hover:text-red-600 transition-colors cursor-pointer">
                            <ThumbsUp className="w-3.5 h-3.5 fill-gray-300 text-gray-500 hover:text-red-500" />
                            <span className="text-[9.5px] font-black">34</span>
                          </button>
                          <button className="hover:text-red-500 cursor-pointer">
                            <ThumbsDown className="w-3.5 h-3.5 text-gray-500" />
                          </button>
                          <span className="text-[9px] font-black hover:underline hover:text-red-600 cursor-pointer">Responder</span>
                        </div>
                        <span className="text-[9px] text-[#FF0000] font-black uppercase flex items-center gap-1 select-none">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                          YouTube
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CARD 05 — INSTAGRAM STORY (Fernanda Rocha) */}
                  <div 
                    className="w-[310px] bg-[#111111] rounded-[24px] p-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.15)] border-2 border-pink-500/30 shrink-0 flex flex-col justify-between"
                    id={`print-05-${setIdx}`}
                  >
                    {/* Portrait Instagram story card inside container */}
                    <div className="bg-[#111111] rounded-[18px] h-[220px] relative flex flex-col justify-between p-3.5 overflow-hidden select-none w-full">
                      {/* Unsplash home background */}
                      <div className="absolute inset-0 bg-cover bg-center opacity-40 filter brightness-[0.75]" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80")' }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

                      {/* Top timeline progress indicators like real IG Story */}
                      <div className="absolute top-1.5 left-3 right-3 flex gap-1 z-25">
                        <div className="h-0.5 bg-white/95 flex-1 rounded" />
                        <div className="h-0.5 bg-white/40 flex-1 rounded" />
                      </div>

                      {/* Top profile of story */}
                      <div className="relative z-10 flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[1.5px] shrink-0">
                            <div className="w-full h-full bg-black rounded-full overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80" alt="Fernanda" className="w-full h-full object-cover" />
                            </div>
                          </div>
                          <div>
                            <span className="text-[9.5px] text-white font-black leading-none block">Fernanda Rocha</span>
                            <span className="text-[8px] text-gray-300 block">Curitiba/PR</span>
                          </div>
                        </div>
                        <span className="text-[8px] text-white/50 uppercase font-bold bg-white/10 px-1.5 py-0.5 rounded">Story</span>
                      </div>

                      {/* Centered styled text card */}
                      <div className="relative z-10 self-center bg-black/85 backdrop-blur-md p-3.5 rounded-xl border border-white/10 max-w-[95%] my-2 shadow-lg w-full">
                        <p className="text-[10.5px] text-white font-black leading-relaxed text-center select-text">
                          “Eu estava cansada emocionalmente… Meu filho estava agressivo, sem limites e cada vez mais distante. Esse manual trouxe clareza pra dentro da nossa casa. Hoje temos regras claras, mais dialogue e muito mais conexão.”
                        </p>
                      </div>

                      {/* Bottom Reply interaction simulation */}
                      <div className="relative z-10 flex items-center justify-between gap-1 border border-white/20 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 w-full">
                        <span className="text-[8px] text-white/80">Enviar mensagem...</span>
                        <Send className="w-3 h-3 text-white/90" />
                      </div>
                    </div>
                  </div>

                  {/* CARD 06 — TELEGRAM (Leandro Souza) */}
                  <div 
                    className="w-[310px] bg-[#e7ebf0] rounded-[24px] p-4 shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-sky-300 shrink-0 flex flex-col justify-between relative overflow-hidden"
                    id={`print-06-${setIdx}`}
                  >
                    {/* Subtle aesthetic Telegram background elements */}
                    <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#24A1DE_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />

                    <div className="flex flex-col h-full justify-between gap-2.5 relative z-10">
                      {/* Telegram Header */}
                      <div className="flex items-center justify-between border-b border-sky-250 pb-2">
                        <div className="flex items-center gap-2.5">
                          <img 
                            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80" 
                            alt="Leandro Souza" 
                            className="w-9 h-9 rounded-full object-cover border-2 border-[#24A1DE]"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="text-[12px] font-black text-slate-800 leading-none">Leandro Souza</h4>
                            <span className="text-[8.5px] text-[#24A1DE] font-extrabold tracking-wide uppercase">Telegram</span>
                          </div>
                        </div>
                        <span className="text-[9px] text-[#24A1DE] bg-sky-100 px-2 py-0.5 rounded-full font-bold">leandro_sz</span>
                      </div>

                      {/* Telegram Bubble */}
                      <div className="bg-white text-gray-900 rounded-2xl rounded-tl-none p-3.5 shadow-sm border border-slate-150/10 relative my-1 self-start max-w-[95%]">
                        <div className="absolute top-0 -left-1.5 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent" />
                        
                        <p className="text-[11px] font-semibold text-slate-800 leading-relaxed select-text">
                          “Nem sou cristão pra falar a verdade. Mas vi um vídeo do Wagner falando sobre filhos emocionalmente fracos e aquilo bateu forte em mim. Resolvi entrar no treinamento e me surpreendi. O conteúdo é muito mais profundo e prático do que eu imaginava.”
                        </p>
                        <div className="flex justify-end gap-1 mt-1.5 text-[8px] text-gray-400 font-bold">
                          <span>11:15</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[9px] text-slate-500 font-black tracking-wide pt-2 border-t border-sky-150 select-none">
                        <span>Recife/PE</span>
                        <span className="text-[#24A1DE] flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> 452 vistas
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CARD 07 — WHATSAPP (Márcio e Elaine) */}
                  <div 
                    className="w-[310px] bg-[#efeae2] rounded-[24px] p-4 shadow-[0_12px_36px_rgba(0,0,0,0.08)] border border-emerald-500/20 shrink-0 flex flex-col justify-between relative overflow-hidden"
                    id={`print-07-${setIdx}`}
                  >
                    {/* Subtle micro WhatsApp wallpaper doodle-like overlay background */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#075e54_1.5px,transparent_1.5px)] [background-size:12px_12px]" />

                    <div className="flex flex-col h-full justify-between gap-3 relative z-10">
                      {/* WA Header */}
                      <div className="flex items-center justify-between border-b border-emerald-100/30 pb-2">
                        <div className="flex items-center gap-2.5">
                          <img 
                            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=150&h=150&q=80" 
                            alt="Márcio e Elaine" 
                            className="w-9 h-9 rounded-full object-cover border-2 border-[#128C7E]"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="text-[12px] font-black text-[#075e54] leading-none flex items-center gap-1">
                              Márcio e Elaine
                              <span className="bg-[#128C7E]/10 text-[#128C7E] text-[7.5px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">Família</span>
                            </h4>
                            <span className="text-[8.5px] text-gray-500 font-medium">Online</span>
                          </div>
                        </div>
                      </div>

                      {/* Chat text bubble (received - white or light green, let's make it standard received white message bubble) */}
                      <div className="bg-white text-gray-900 rounded-2xl rounded-tl-none p-3.5 shadow-sm border border-gray-250/20 relative my-1 self-start max-w-[95%]">
                        <div className="absolute top-0 -left-1.5 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent" />
                        
                        <p className="text-[11px] font-semibold text-gray-800 leading-relaxed select-text">
                          “A gente já tinha assistido palestra, aconselhamento, vídeo no YouTube… mas nunca tivemos um passo a passo tão claro como esse método ensina. Nossa filha mudou muito depois que começamos aplicar os princípios dentro de casa.”
                        </p>
                        <div className="flex justify-end items-center gap-1 mt-1.5 text-[8px] text-gray-400 font-bold">
                          <span>10:41</span>
                          <CheckCheck className="w-3.5 h-3.5 text-[#34b7f1]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-gray-500 font-black tracking-wide border-t border-emerald-150/10 pt-2 select-none">
                        <span className="text-[#128C7E]">WhatsApp Grupo Lar</span>
                        <span>Sorocaba/SP</span>
                      </div>
                    </div>
                  </div>

                  {/* CARD 08 — INSTAGRAM DM (Renato e Camila) */}
                  <div 
                    className="w-[310px] bg-white rounded-[24px] p-4 shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-pink-100 shrink-0 flex flex-col justify-between relative overflow-hidden"
                    id={`print-08-${setIdx}`}
                  >
                    {/* Top slim background gradient highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" />

                    <div className="flex flex-col h-full justify-between gap-3 pt-1.5 relative z-10">
                      {/* IG DM Header */}
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                        <div className="flex items-center gap-2.5">
                          {/* Instagram outer gradient storyteller circle */}
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[1.5px] shrink-0">
                            <img 
                              src="https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&w=150&h=150&q=80" 
                              alt="Renato e Camila" 
                              className="w-full h-full rounded-full object-cover border-2 border-white"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <h4 className="text-[12px] font-black text-gray-900 leading-none">Renato e Camila</h4>
                              <span className="bg-[#ee2a7b]/10 text-[#ee2a7b] text-[7.5px] font-extrabold px-1.5 py-0.5 rounded">Casal</span>
                            </div>
                            <span className="text-[9px] text-gray-400 block mt-0.5">@renato_cam_salvador</span>
                          </div>
                        </div>
                        <div className="flex gap-2.5 text-gray-700">
                          <MessageCircle className="w-4 h-4 opacity-70" />
                        </div>
                      </div>

                      {/* Bubble */}
                      <div className="bg-[#f0f2f5] rounded-[20px] rounded-tl-none px-3.5 py-3 border border-gray-200/50 relative my-1 self-start max-w-[95%]">
                        <p className="text-[11px] font-bold text-gray-800 leading-relaxed select-text">
                          “Eu estava presente fisicamente… mas ausente como pai e marido. Esse treinamento me despertou. Hoje sinto que voltei a liderar minha família e meus filhos começaram a me respeitar de outra forma.”
                        </p>
                        {/* Heart icon attached to message bubble */}
                        <div className="absolute -bottom-2.5 right-4 bg-white rounded-full px-2 py-0.5 shadow-md border border-gray-200 flex items-center gap-0.5">
                          <span className="text-[11px]">❤️</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[9px] text-gray-400 font-bold mt-1 scale-95 origin-left">
                        <span className="text-[#ee2a7b] font-black flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ee2a7b] animate-ping" />
                          Direct do Instagram
                        </span>
                        <span>Salvador/BA • Ativo</span>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Green Bottom CTA mimicking the glossy, physical green button in the image */}
          <div className="text-center mt-12 max-w-lg sm:max-w-xl mx-auto flex flex-col items-center gap-5" id="block-02-cta-container">
            
            {/* Premium, high-tactile green physical 3D button matching "QUERO COMEÇAR ESSE TREINAMENTO AGORA" */}
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full sm:w-auto min-w-[320px] bg-[#18b154] hover:bg-[#1bbf5b] rounded-2xl border-b-4 border-[#095724] active:border-b-0 hover:translate-y-[1px] active:translate-y-[4px] shadow-xl font-black text-xs sm:text-sm md:text-base tracking-widest text-white uppercase py-4.5 px-8 flex items-center justify-center gap-2 select-none cursor-pointer duration-150 transition-all"
              id="btn-block-02-cta"
            >
              <span>QUERO COMEÇAR ESSE TREINAMENTO AGORA</span>
            </button>

            {/* Microcopy below CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-2 text-gray-600 font-extrabold text-[11px] sm:text-xs tracking-wider uppercase select-none" id="block-02-microcopy">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Método prático</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Aplicação imediata</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Treinamento para pais desta geração</span>
            </div>
            
          </div>

        </div>

      </section>

      {/* BLOCO 03 — DIAGNÓSTICO E AUTOEXAME (SEJA SINCERO...) */}
      <section className="bg-[#070707] py-20 px-4 sm:px-6 border-t border-white/5 relative overflow-hidden" id="autodiagnostico-etapa-03">
        {/* Subtle background glow effect identical to image ambient feel */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#B31217]/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />
        
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
          
          {/* Centered red gradient badge (El cambio) */}
          <div className="flex justify-center mb-6" id="block-03-badge">
            <span className="bg-gradient-to-r from-[#B31217] via-[#910d11] to-[#6e070a] border border-[#B31217]/50 text-white text-[10px] sm:text-xs font-black tracking-widest px-8 py-2 rounded-full uppercase shadow-[0_4px_15px_rgba(179,18,23,0.3)] select-none">
              A Mudança
            </span>
          </div>

          {/* Large display title (SÉ SINCERO, ¿TE GUSTARÍA...) */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-black text-white leading-tight font-sans tracking-tight text-center uppercase mb-12 select-none" id="block-03-headline">
            SEJA SINCERO, VOCÊ GOSTARIA DE...
          </h2>

          {/* 2x2 Grid container matching the exact image cards layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12" id="block-03-grid">
            
            {/* CARD 01 */}
            <div className="bg-[#131313] border border-[#B31217]/20 rounded-[20px] p-6 sm:p-8 flex items-start gap-5 hover:border-[#B31217]/60 hover:shadow-[0_8px_30px_rgba(179,18,23,0.12)] transition-all duration-300 group" id="etapa-3-card-1">
              {/* Custom hand-crafted double check icon matching reference drawing */}
              <div className="shrink-0 mt-1" id="etapa-3-card-1-icon">
                <svg viewBox="0 0 100 100" className="w-[68px] h-[68px] text-white fill-none stroke-[6]">
                  <path 
                    d="M 60 20 H 35 A 15 15 0 0 0 20 35 V 65 A 15 15 0 0 0 35 80 H 65 A 15 15 0 0 0 80 65 V 45" 
                    stroke="currentColor" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/80 group-hover:text-white transition-colors"
                  />
                  <path 
                    d="M 42 50 L 56 64 L 88 32" 
                    stroke="#B31217" 
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_2px_8px_rgba(179,18,23,0.5)]"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm sm:text-[15px] font-bold text-[#e4e4e7] leading-relaxed font-sans select-text hover:text-white transition-colors">
                  Fazer com que o seu filho ouça você e respeite a sua autoridade de forma natural, sem precisar gritar ou perder o controle emocional.
                </p>
              </div>
            </div>

            {/* CARD 02 */}
            <div className="bg-[#131313] border border-[#B31217]/20 rounded-[20px] p-6 sm:p-8 flex items-start gap-5 hover:border-[#B31217]/60 hover:shadow-[0_8px_30px_rgba(179,18,23,0.12)] transition-all duration-300 group" id="etapa-3-card-2">
              <div className="shrink-0 mt-1" id="etapa-3-card-2-icon">
                <svg viewBox="0 0 100 100" className="w-[68px] h-[68px] text-white fill-none stroke-[6]">
                  <path 
                    d="M 60 20 H 35 A 15 15 0 0 0 20 35 V 65 A 15 15 0 0 0 35 80 H 65 A 15 15 0 0 0 80 65 V 45" 
                    stroke="currentColor" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/80 group-hover:text-white transition-colors"
                  />
                  <path 
                    d="M 42 50 L 56 64 L 88 32" 
                    stroke="#B31217" 
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_2px_8px_rgba(179,18,23,0.5)]"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm sm:text-[15px] font-bold text-[#e4e4e7] leading-relaxed font-sans select-text hover:text-white transition-colors">
                  Fazer com que aquele filho rebelde, de conversa difícil ou distante, passe a valorizar os seus conselhos e correr atrás da sua conexão.
                </p>
              </div>
            </div>

            {/* CARD 03 */}
            <div className="bg-[#131313] border border-[#B31217]/20 rounded-[20px] p-6 sm:p-8 flex items-start gap-5 hover:border-[#B31217]/60 hover:shadow-[0_8px_30px_rgba(179,18,23,0.12)] transition-all duration-300 group" id="etapa-3-card-3">
              <div className="shrink-0 mt-1" id="etapa-3-card-3-icon">
                <svg viewBox="0 0 100 100" className="w-[68px] h-[68px] text-white fill-none stroke-[6]">
                  <path 
                    d="M 60 20 H 35 A 15 15 0 0 0 20 35 V 65 A 15 15 0 0 0 35 80 H 65 A 15 15 0 0 0 80 65 V 45" 
                    stroke="currentColor" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/80 group-hover:text-white transition-colors"
                  />
                  <path 
                    d="M 42 50 L 56 64 L 88 32" 
                    stroke="#B31217" 
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_2px_8px_rgba(179,18,23,0.5)]"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm sm:text-[15px] font-bold text-[#e4e4e7] leading-relaxed font-sans select-text hover:text-white transition-colors">
                  Fazer com que a sua família se orgulhe de você e seu cônjuge reconheça a sua liderança e dedicação no lar (mesmo que você ache que já errou muito).
                </p>
              </div>
            </div>

            {/* CARD 04 */}
            <div className="bg-[#131313] border border-[#B31217]/20 rounded-[20px] p-6 sm:p-8 flex items-start gap-5 hover:border-[#B31217]/60 hover:shadow-[0_8px_30px_rgba(179,18,23,0.12)] transition-all duration-300 group" id="etapa-3-card-4">
              <div className="shrink-0 mt-1" id="etapa-3-card-4-icon">
                <svg viewBox="0 0 100 100" className="w-[68px] h-[68px] text-white fill-none stroke-[6]">
                  <path 
                    d="M 60 20 H 35 A 15 15 0 0 0 20 35 V 65 A 15 15 0 0 0 35 80 H 65 A 15 15 0 0 0 80 65 V 45" 
                    stroke="currentColor" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/80 group-hover:text-white transition-colors"
                  />
                  <path 
                    d="M 42 50 L 56 64 L 88 32" 
                    stroke="#B31217" 
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_2px_8px_rgba(179,18,23,0.5)]"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm sm:text-[15px] font-bold text-[#e4e4e7] leading-relaxed font-sans select-text hover:text-white transition-colors">
                  Nunca mais se sentir impotente, rejeitado ou substituído pelas telas ao ver o mundo e a internet moldando o caráter dos seus filhos.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom textual call questions exactly aligned to reference screen */}
          <div className="text-center flex flex-col items-center gap-3" id="block-03-footer">
            <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-[#ffffff] font-sans tracking-tight" id="block-03-foot-1">
              Você respondeu <span className="text-[#FF2E2E]">"SIM"</span> para alguma dessas perguntas?
            </h3>
            
            <p className="text-gray-400 text-xs sm:text-sm font-bold tracking-wide uppercase select-none" id="block-03-foot-2">
              Então, por que essas coisas ainda não aconteceram na sua casa?
            </p>

            <span className="text-[#FF2E2E] font-black italic text-sm sm:text-base select-none mt-1" id="block-03-foot-3">
              Eu sei o porquê...
            </span>
          </div>

        </div>
      </section>

      {/* BLOCO 04 — APRESENTAÇÃO DO LIVRO / MANUAL (FRACASSO VS MUDANÇA) */}
      <section className="bg-[#070707] py-16 px-4 sm:px-6 relative overflow-hidden" id="apresentacao-livro-etapa-04">
        {/* Ambient background accent light matching the reference feel */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B31217]/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10" id="block-04-container">
          
          {/* Main White Card Structure precisely resembling the image canvas */}
          <div className="bg-[#FFFFFF] border-2 border-[#B31217]/15 rounded-[24px] sm:rounded-[32px] px-6 py-12 sm:px-12 sm:py-16 md:py-20 flex flex-col items-center justify-between shadow-[0_24px_60px_rgba(179,18,23,0.15)] relative overflow-hidden text-center" id="block-04-card">
            
            {/* Very light inner container shadow accents */}
            <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] opacity-[0.02] pointer-events-none [background-size:16px_16px]" />
            
            <div className="flex flex-col items-center max-w-3xl relative z-10 w-full">
              
              {/* Card Main Punchy Title */}
              <h2 className="text-xl sm:text-2xl md:text-[28px] font-black text-[#111111] font-sans leading-tight tracking-tight max-w-2xl select-none" id="block-04-title">
                Se tudo o que você aprendeu sobre criação de filhos e autoridade veio de conselhos modernos ou da internet... Sinto muito, mas você está <span className="text-[#B31217]">condenado ao fracasso...</span>
              </h2>

              {/* Sub-explanation text with exact style of gray paragraph in the graphic mockup */}
              <p className="text-xs sm:text-[13.5px] text-neutral-600 font-medium leading-relaxed mt-6 max-w-2xl font-sans" id="block-04-paragraph-1">
                Porque os métodos modernos de hoje não compreendem como funciona a mente de um garoto ou de uma criança que vive exposta a uma enxurrada de telas e influências digitais. Eles não sabem o que os seus filhos realmente buscam em silêncio de seus pais, e muito menos como restabelecer o respeito tático sem travar batalhas cansativas de gritos diários.
              </p>

              {/* Transitional warning / reassurance line */}
              <p className="text-xs sm:text-[13.5px] text-neutral-500 font-black tracking-wide uppercase mt-6 select-none" id="block-04-paragraph-2">
                Mas não precisa continuar sendo assim.
              </p>

              {/* Highlight closing bold summary paragraph */}
              <p className="text-xs sm:text-[14px] text-neutral-800 font-bold leading-relaxed mt-4 max-w-2xl font-sans" id="block-04-paragraph-3">
                Porque HOJE você pode finalmente conhecer o único caminho baseado na sabedoria de milênios, capaz de <span className="text-[#B31217] font-extrabold underline">mudar o direcionamento da sua casa, ativar a obediência voluntária e restaurar a admiração inabalável do seu filho por você!</span>
              </p>

              {/* 3D Standing Book Mockup in High Definition Centered Perfectly */}
              <div className="mt-12 mb-2 flex justify-center w-full" id="block-04-mockup-wrapper">
                <img 
                  src={bookMockup} 
                  alt="Manual Código do Patriarca" 
                  className="w-[280px] sm:w-[350px] md:w-[380px] h-auto object-contain hover:scale-[1.03] transition-transform duration-500 drop-shadow-[0_25px_45px_rgba(0,0,0,0.22)] select-none cursor-pointer"
                  referrerPolicy="no-referrer"
                  onClick={() => setIsCheckoutOpen(true)}
                  id="block-04-book-image"
                />
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* BLOCO 05 — BIOGRAFIA, ESTUDOS E EMBASAMENTO MULTI-GERACIONAL (DEPOIS DE MAIS DE 10 ANOS...) */}
      <section className="bg-[#070707] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/5" id="sobre-o-autor-etapa-05">
        {/* Subtle decorative grid/glow behind content matching the dark elegant feel */}
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[#B31217]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center" id="block-05-layout">
          
          {/* Left Column - Detailed Copywriting with perfect bold and semantic weighting */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left" id="block-05-text">
            
            {/* Main Headline styled exactly like reference graphic text hierarchy */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-sans leading-tight tracking-tight select-none uppercase font-montserrat" id="block-05-head">
              Depois de mais de <span className="text-[#B31217]">23 anos</span> estudando a mente e o comportamento dos pais e filhos em meio aos desafios reais na criação atual.
            </h2>

            {/* Paragraphs precisely laid out to mimic the reference spacing and highlighting */}
            <div className="space-y-5 text-[13px] sm:text-sm md:text-[15px] font-sans leading-relaxed text-[#D1D1D6]" id="block-05-body">
              
              <p className="select-text">
                Eu, como mentor de pais e pesquisador de dinâmicas familiares, decidi revelar aquilo que <strong className="text-white font-extrabold">todos os filhos realmente desejam e necessitam no silêncio de seus quartos</strong>, mas que nunca terão coragem de te dizer de forma direta.
              </p>

              <p className="select-text">
                E o mais impressionante: isso não tem absolutamente nada a ver com dar presentes caros, fazer todas as vontades deles, usar de gritos ou ter rios de dinheiro.
              </p>

              <p className="select-text">
                A verdade é que <strong className="text-white font-extrabold">neurocientistas e psicólogos comportamentais renomados</strong> já descobriram que todas as crianças e adolescentes possuem, no nível mais profundo e primitivo da mente, <strong className="text-[#FF2E2E] font-black">4 necessidades emocionais ocultas e universais</strong>.
              </p>

              <p className="select-text">
                E cada vez que um pai de verdade consegue aprender a satisfazer e suprir estrategicamente essas quatro necessidades básicas, ele ativa um <strong className="text-white font-extrabold">gatilho de obediência voluntária e conexão inabalável</strong> dentro de sua casa.
              </p>

              <p className="select-text">
                Quando esse instinto saudável de respeito é ativado, a rebeldia extrema <strong className="text-white font-extrabold">dá lugar à admiração silenciosa</strong>, liberando hormônios de pertencimento e bem-estar no cérebro do garoto ou garota, fazendo com que ele passe a valorizar os seus conselhos e sua autoridade moral.
              </p>

              <p className="select-text">
                Agora, após anos de mentorias, estudos profundos e validações práticas do meu método com <strong className="text-white font-extrabold">milhares de pais e famílias em todo o Brasil</strong>, eu documentei exatamente como gerenciar e suprir cada um desses pilares universais de forma simples.
              </p>

              <p className="select-text">
                Todo esse segredo comprovado está reunido na prática dentro do <strong className="text-white font-extrabold">Código do Patriarca</strong>. Um material testado no campo de batalha que mostra passo a passo como reatar a conexão com seu filho, blindá-lo contra influências destrutivas e guiar sua casa com orgulho e segurança.
              </p>

            </div>

          </div>

          {/* Right Column - Beautiful Overlapping Double Photo Canvas resembling the Science/Harvard references */}
          <div className="lg:col-span-5 flex justify-center items-center font-sans" id="block-05-visual">
            <div className="relative w-full max-w-[360px] h-[340px] sm:h-[400px] md:h-[420px]" id="overlapping-cards-container">
              
              {/* Card 1: Top-Left Academic/ Prestigious Harvard Setting Image */}
              <div 
                className="absolute top-0 left-0 w-[62%] aspect-[9/11] rounded-[24px] overflow-hidden shadow-2xl border border-white/5 bg-[#1F1F1F] hover:scale-[1.02] hover:-rotate-1 transition-all duration-500 z-10" 
                id="academic-proof-card"
              >
                {/* Academic/Harvard prestigious backdrop */}
                <img 
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80" 
                  alt="Pesquisa Acadêmica e Comportamental" 
                  className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Label badge on top like Science Center placeholder in reference */}
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 select-none">
                  <span className="text-[9px] font-black tracking-widest text-[#FFD700] uppercase font-mono">MIT/HARVARD STUDY</span>
                </div>
              </div>

              {/* Card 2: Bottom-Right Wagner Portrait Overlapping Card */}
              <div 
                className="absolute bottom-0 right-0 w-[65%] aspect-[9/11] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-[#B31217]/20 bg-[#161616] hover:scale-[1.03] hover:rotate-1 transition-all duration-500 z-20" 
                id="author-wagner-card"
              >
                {/* Render author portrait */}
                <img 
                  src={wagnerPortrait} 
                  alt="Wagner Ferraz - Autor" 
                  className="w-full h-full object-cover filter brightness-[0.95]"
                  referrerPolicy="no-referrer"
                />

                {/* Subtitle brand badge representing the core authority label */}
                <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black via-black/85 to-black/60 backdrop-blur-md p-3 rounded-2xl border border-[#B31217]/30 flex flex-col justify-center">
                  <span className="text-[11px] font-black text-white leading-none uppercase tracking-wider">Wagner Ferraz</span>
                  <span className="text-[9px] text-[#A3A3A3] font-bold mt-1 uppercase tracking-wide">Autor &amp; Pesquisador Familiar</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* BLOCO 06 — BENEFÍCIOS PRÁTICOS (DEIXE DE SER IGNORADO) */}
      <section className="bg-[#070707] py-20 px-4 sm:px-6 relative overflow-hidden border-t border-white/5" id="beneficios-etapa-06">
        {/* Soft background ambient light */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#B31217]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center" id="block-06-container">
          
          {/* Centered red pill badge */}
          <div className="flex justify-center mb-6" id="block-06-badge-wrapper">
            <span className="bg-[#B31217] text-white text-[10px] sm:text-xs font-black tracking-widest px-8 py-2 rounded-full uppercase shadow-[0_4px_15px_rgba(179,18,23,0.4)] select-none">
              Deixe de ser ignorado
            </span>
          </div>

          {/* Headline exactly matching photo layout weight */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-black text-white leading-tight font-sans tracking-tight max-w-3xl mb-12 uppercase select-none" id="block-06-head">
            Se você está cansado de ser ignorado, de falar e ser deixado falando sozinho ou de ver seus filhos te trocarem por influências muito PIORES do que você... <span className="text-[#FF2E2E] block mt-2 normal-case font-bold">Com o Código do Patriarca você vai:</span>
          </h2>

          {/* Cards List Layout with thin red borders */}
          <div className="flex flex-col gap-4 w-full max-w-3xl mb-12" id="block-06-cards">
            
            {/* Card 1 */}
            <div className="bg-[#0e0e0e] border border-[#B31217]/35 hover:border-[#B31217]/80 rounded-[16px] p-6 sm:p-8 hover:shadow-[0_4px_25px_rgba(179,18,23,0.08)] transition-all duration-300 text-left" id="etapa-06-card-1">
              <p className="text-sm sm:text-[15px] font-bold text-[#E4E4E7] leading-relaxed font-sans">
                <span className="text-white font-extrabold">Fazer com que o seu filho preste atenção em você e respeite suas palavras</span>, mesmo que hoje ele pareça totalmente indiferente, rebelde, teimoso ou distante de você.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0e0e0e] border border-[#B31217]/35 hover:border-[#B31217]/80 rounded-[16px] p-6 sm:p-8 hover:shadow-[0_4px_25px_rgba(179,18,23,0.08)] transition-all duration-300 text-left" id="etapa-06-card-2">
              <p className="text-sm sm:text-[15px] font-bold text-[#E4E4E7] leading-relaxed font-sans">
                <span className="text-white font-extrabold">Nunca mais ter que "implorar" pela atenção dele</span> ou gastar saliva repetindo a mesma ordem dez vezes como se estivesse rogando por um pingo de respeito e cooperação.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0e0e0e] border border-[#B31217]/35 hover:border-[#B31217]/80 rounded-[16px] p-6 sm:p-8 hover:shadow-[0_4px_25px_rgba(179,18,23,0.08)] transition-all duration-300 text-left" id="etapa-06-card-3">
              <p className="text-sm sm:text-[15px] font-bold text-[#E4E4E7] leading-relaxed font-sans">
                <span className="text-white font-extrabold">Nunca mais vai assistir ele se afastar de você ou perder o interesse</span> em conversar com a família. Desta vez, ele sentirá o desejo natural de te escutar, buscar sua aprovação e valorizar seu tempo juntos.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#0e0e0e] border border-[#B31217]/35 hover:border-[#B31217]/80 rounded-[16px] p-6 sm:p-8 hover:shadow-[0_4px_25px_rgba(179,18,23,0.08)] transition-all duration-300 text-left" id="etapa-06-card-4">
              <p className="text-sm sm:text-[15px] font-bold text-[#E4E4E7] leading-relaxed font-sans">
                <span className="text-white font-extrabold">Reconquistar a autoridade moral mesmo que ache que já errou muito no passado.</span> O respeito voluntário será restabelecido na sua casa de forma sólida, e você verá o seu lar se alinhar novamente com paz e admiração.
              </p>
            </div>

          </div>

          {/* High contrast green pulse neon button at the bottom */}
          <div className="w-full flex justify-center" id="block-06-cta-container">
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full sm:w-auto bg-[#2ECC71] hover:bg-[#27ae60] text-black font-extrabold uppercase text-[11px] sm:text-xs tracking-widest py-4 px-12 rounded-xl shadow-[0_4px_20px_rgba(46,204,113,0.3)] hover:shadow-[0_8px_30px_rgba(46,204,113,0.5)] cursor-pointer transition-all duration-300 transform hover:scale-[1.02]"
              id="block-06-cta"
            >
              Quero acessar o treinamento Agora
            </button>
          </div>

        </div>
      </section>

      {/* BLOCO 07 — O QUE VOCÊ VAI DESCOBRIR (LIVRO ABERTO DE SEGREDOS) */}
      <section className="bg-neutral-50 py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden border-t border-neutral-200" id="conteudo-livro-etapa-07">
        
        {/* Ambient subtle light grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />
        
        <div className="max-w-7xl mx-auto relative z-10" id="block-07-container">
          
          {/* Centered top header precisely resembling image style */}
          <div className="text-center flex flex-col items-center mb-12 sm:mb-16" id="block-07-header">
            
            {/* Top red badge */}
            <div className="bg-[#B31217] text-white text-[10px] sm:text-xs font-black tracking-widest px-8 py-2 rounded-full uppercase shadow-[0_4px_12px_rgba(179,18,23,0.25)] select-none mb-6">
              Você vai aprender
            </div>

            {/* Headline matching mockup layout */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-black text-neutral-900 leading-tight tracking-tight max-w-4xl font-sans" id="block-07-head">
              Isto é o que você descobrirá <span className="text-[#B31217]">no Código do Patriarca:</span>
            </h2>

          </div>

          {/* Interactive Open-Book Spread Section Layout - Adjusted size, gap and alignment */}
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center w-full max-w-7xl mx-auto mt-12 gap-8 lg:gap-12 relative" id="block-07-spread">
            
            {/* Left Cover (Visible on all screens, styled Portrait, with exact height of the text block container next to it, not glued) */}
            <div className="w-full lg:w-[32%] flex items-center justify-center lg:justify-end select-none relative z-30" id="block-07-left-cover-showcase">
              <div 
                className="relative w-full max-w-[300px] lg:max-w-none lg:w-full lg:h-full aspect-[3/4] lg:aspect-auto flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-[1.03]" 
                onClick={() => setIsCheckoutOpen(true)}
              >
                <div className="absolute inset-0 bg-[#B31217]/15 blur-[40px] rounded-[24px] sm:rounded-[36px] pointer-events-none" id="block-07-cover-shadow-glow" />
                <img 
                  src={bookMockup} 
                  alt="Livro Código do Patriarca" 
                  className="w-full h-full object-cover rounded-[24px] sm:rounded-[36px] border-4 border-[#B31217]/15 shadow-[0_30px_70px_rgba(0,0,0,0.35)] filter hover:brightness-110 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* The Open Book Spreads pages (Separated now from the cover page gap-wise) */}
            <div className="w-full lg:w-[68%] bg-[#111111] border-4 border-[#B31217]/15 rounded-[24px] sm:rounded-[36px] shadow-[0_30px_70px_rgba(0,0,0,0.3)] overflow-hidden z-20 flex flex-col justify-between" id="open-book-spread">
              <div className="grid grid-cols-1 md:grid-cols-2 relative min-h-[480px]" id="pages-grid">
                
                {/* Center Book Spine divider accent line */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 bg-gradient-to-r from-black/60 via-neutral-900 to-black/60 border-l border-r border-[#B31217]/5 z-20 pointer-events-none" />

                {/* ================= PAGE 1 (LEFT SIDE) ================= */}
                <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-900 relative" id="book-page-1">
                  
                  {/* Subtle paper depth texture mask inside */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 pointer-events-none" />

                  {/* Bullet Points Container */}
                  <div className="space-y-6 relative z-10" id="page-1-bullets">
                    
                    {/* Bullet 1 */}
                    <div className="flex gap-4 items-start group" id="p1-b1">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#1a0e0e] border border-[#B31217]/60 flex items-center justify-center text-[#ff3333] font-black group-hover:bg-[#B31217] group-hover:text-white group-hover:border-[#B31217] transition-all duration-300 shadow-[0_2px_10px_rgba(179,18,23,0.15)] group-hover:scale-110">
                        <Check className="w-4 h-4 stroke-[3.5px]" />
                      </div>
                      <p className="text-xs sm:text-[13.5px] text-neutral-300 font-medium leading-relaxed">
                        <strong className="text-white font-black block text-sm mb-1">O verdadeiro motivo do distanciamento:</strong>
                        Descubra por que seu filho se afasta, se cala ou diz "tanto faz" para você — e como reverter isso restabelecendo a ponte de admiração tática.
                      </p>
                    </div>

                    {/* Bullet 2 */}
                    <div className="flex gap-4 items-start group" id="p1-b2">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#1a0e0e] border border-[#B31217]/60 flex items-center justify-center text-[#ff3333] font-black group-hover:bg-[#B31217] group-hover:text-white group-hover:border-[#B31217] transition-all duration-300 shadow-[0_2px_10px_rgba(179,18,23,0.15)] group-hover:scale-110">
                        <Check className="w-4 h-4 stroke-[3.5px]" />
                      </div>
                      <p className="text-xs sm:text-[13.5px] text-neutral-300 font-medium leading-relaxed">
                        <strong className="text-white font-black block text-sm mb-1">Ativação da obediência voluntária:</strong>
                        Como reativar e calibrar sua imagem de líder sólido na mente dele, ativando cooperação natural e respeito sem precisar de gritos.
                      </p>
                    </div>

                    {/* Bullet 3 */}
                    <div className="flex gap-4 items-start group" id="p1-b3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#1a0e0e] border border-[#B31217]/60 flex items-center justify-center text-[#ff3333] font-black group-hover:bg-[#B31217] group-hover:text-white group-hover:border-[#B31217] transition-all duration-300 shadow-[0_2px_10px_rgba(179,18,23,0.15)] group-hover:scale-110">
                        <Check className="w-4 h-4 stroke-[3.5px]" />
                      </div>
                      <p className="text-xs sm:text-[13.5px] text-neutral-300 font-medium leading-relaxed">
                        <strong className="text-white font-black block text-sm mb-1">Os 4 pilares silenciosos do respeito:</strong>
                        As 4 necessidades emocionais ocultas que todo garoto e garota silencia no quarto, mas que necessita urgentemente receber de seus pais.
                      </p>
                    </div>

                    {/* Bullet 4 */}
                    <div className="flex gap-4 items-start group" id="p1-b4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#1a0e0e] border border-[#B31217]/60 flex items-center justify-center text-[#ff3333] font-black group-hover:bg-[#B31217] group-hover:text-white group-hover:border-[#B31217] transition-all duration-300 shadow-[0_2px_10px_rgba(179,18,23,0.15)] group-hover:scale-110">
                        <Check className="w-4 h-4 stroke-[3.5px]" />
                      </div>
                      <p className="text-xs sm:text-[13.5px] text-neutral-300 font-medium leading-relaxed">
                        <strong className="text-white font-black block text-sm mb-1">O erro fatal dos sermões chatos:</strong>
                        O maior erro que a maioria dos pais comete ao brigar, que só irrita o filho e anula qualquer autoridade moral que você possuía.
                      </p>
                    </div>

                    {/* Bullet 5 */}
                    <div className="flex gap-4 items-start group" id="p1-b5">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#1a0e0e] border border-[#B31217]/60 flex items-center justify-center text-[#ff3333] font-black group-hover:bg-[#B31217] group-hover:text-white group-hover:border-[#B31217] transition-all duration-300 shadow-[0_2px_10px_rgba(179,18,23,0.15)] group-hover:scale-110">
                        <Check className="w-4 h-4 stroke-[3.5px]" />
                      </div>
                      <p className="text-xs sm:text-[13.5px] text-neutral-300 font-medium leading-relaxed">
                        <strong className="text-white font-black block text-sm mb-1">A armadilha do "provedor frouxo":</strong>
                        Entenda por que presentes caros e aceitar todas as vontades não constroem respeito (e descubra o que realmente ativa o valor moral).
                      </p>
                    </div>

                  </div>

                </div>

                {/* ================= PAGE 2 (RIGHT SIDE) ================= */}
                <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative" id="book-page-2">
                  
                  {/* Subtle paper depth texture mask inside */}
                  <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-black/10 pointer-events-none" />

                  {/* Bullet Points Container */}
                  <div className="space-y-6 relative z-10" id="page-2-bullets">
                    
                    {/* Bullet 6 */}
                    <div className="flex gap-4 items-start group" id="p2-b1">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#1a0e0e] border border-[#B31217]/60 flex items-center justify-center text-[#ff3333] font-black group-hover:bg-[#B31217] group-hover:text-white group-hover:border-[#B31217] transition-all duration-300 shadow-[0_2px_10px_rgba(179,18,23,0.15)] group-hover:scale-110">
                        <Check className="w-4 h-4 stroke-[3.5px]" />
                      </div>
                      <p className="text-xs sm:text-[13.5px] text-neutral-300 font-medium leading-relaxed">
                        <strong className="text-white font-black block text-sm mb-1">Dependência digital sob controle:</strong>
                        A real explicação de por que os métodos digitais dominam e alienam a infância de hoje, e como blindar a mente do seu filho contra as telas.
                      </p>
                    </div>

                    {/* Bullet 7 */}
                    <div className="flex gap-4 items-start group" id="p2-b2">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#1a0e0e] border border-[#B31217]/60 flex items-center justify-center text-[#ff3333] font-black group-hover:bg-[#B31217] group-hover:text-white group-hover:border-[#B31217] transition-all duration-300 shadow-[0_2px_10px_rgba(179,18,23,0.15)] group-hover:scale-110">
                        <Check className="w-4 h-4 stroke-[3.5px]" />
                      </div>
                      <p className="text-xs sm:text-[13.5px] text-neutral-300 font-medium leading-relaxed">
                        <strong className="text-white font-black block text-sm mb-1">Sua voz na ausência:</strong>
                        O segredo comportamental prático e instintivo que faz ele agir de forma reta e honesta, mesmo quando estiver longe dos seus olhos.
                      </p>
                    </div>

                    {/* Bullet 8 */}
                    <div className="flex gap-4 items-start group" id="p2-b3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#1a0e0e] border border-[#B31217]/60 flex items-center justify-center text-[#ff3333] font-black group-hover:bg-[#B31217] group-hover:text-white group-hover:border-[#B31217] transition-all duration-300 shadow-[0_2px_10px_rgba(179,18,23,0.15)] group-hover:scale-110">
                        <Check className="w-4 h-4 stroke-[3.5px]" />
                      </div>
                      <p className="text-xs sm:text-[13.5px] text-neutral-300 font-medium leading-relaxed">
                        <strong className="text-white font-black block text-sm mb-1">Restabelecimento sem pressão:</strong>
                        Como restabelecer conversas verdadeiras de alto valor sem precisar forçar interrogatórios irritantes ou brigas.
                      </p>
                    </div>

                    {/* Bullet 9 */}
                    <div className="flex gap-4 items-start group" id="p2-b4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#1a0e0e] border border-[#B31217]/60 flex items-center justify-center text-[#ff3333] font-black group-hover:bg-[#B31217] group-hover:text-white group-hover:border-[#B31217] transition-all duration-300 shadow-[0_2px_10px_rgba(179,18,23,0.15)] group-hover:scale-110">
                        <Check className="w-4 h-4 stroke-[3.5px]" />
                      </div>
                      <p className="text-xs sm:text-[13.5px] text-neutral-300 font-medium leading-relaxed">
                        <strong className="text-white font-black block text-sm mb-1">Linguagem corporal de autoridade:</strong>
                        O papel crucial do tom de voz, postura tática e o olhar firme que impõe um limite respeitoso imediato, sem autoritarismo vazio.
                      </p>
                    </div>

                    {/* Bullet 10 */}
                    <div className="flex gap-4 items-start group" id="p2-b5">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#1a0e0e] border border-[#B31217]/60 flex items-center justify-center text-[#ff3333] font-black group-hover:bg-[#B31217] group-hover:text-white group-hover:border-[#B31217] transition-all duration-300 shadow-[0_2px_10px_rgba(179,18,23,0.15)] group-hover:scale-110">
                        <Check className="w-4 h-4 stroke-[3.5px]" />
                      </div>
                      <p className="text-xs sm:text-[13.5px] text-neutral-300 font-medium leading-relaxed">
                        <strong className="text-white font-black block text-sm mb-1">A armadilha invisível da amizade:</strong>
                        Por que tentar ser o "parceiro parceirinho do seu filho" destrói sua soberania espiritual e moral como pai — e o que fazer em vez disso.
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* BLOCO 08 — E ALÉM DISSO... (BENEFÍCIOS COMPLEMENTARES COM BANDEIRA MARQUEE) */}
      <section className="bg-neutral-50 py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden border-t border-neutral-200" id="bento-etapa-08">
        
        {/* Subtle decorative grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

        <div className="max-w-7xl mx-auto relative z-10" id="block-08-container">
          
          {/* Main big display header exactly matching original layout vibe */}
          <div className="text-center flex flex-col items-center mb-16" id="block-08-header">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-black text-neutral-900 tracking-wider font-sans uppercase select-none" id="block-08-head">
              E ALÉM DISSO...
            </h2>
          </div>

          {/* Three columns grid layout with red accent border boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16" id="block-08-grid">
            
            {/* Card 1 */}
            <div className="flex flex-col bg-[#0d0d0d] border-2 border-[#B31217] rounded-2xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_45px_rgba(179,18,23,0.18)] transition-all duration-300 transform hover:-translate-y-1.5" id="bento-card-1">
              {/* Top Text description */}
              <div className="p-6 md:p-8 flex items-center justify-center text-center min-h-[150px] bg-[#0d0d0d] px-6 select-none" id="bento-card-1-text">
                <p className="text-neutral-200 font-bold text-sm sm:text-[15px] leading-relaxed font-sans">
                  A <span className="text-white font-extrabold">mensagem de texto simples</span> que faz ele te responder com interesse, mesmo depois de ter te ignorado por dias inteiros.
                </p>
              </div>
              {/* Bottom Image with Custom Floating Portuguese WhatsApp Notification */}
              <div className="relative aspect-[4/5] w-full overflow-hidden border-t-2 border-[#B31217]" id="bento-card-1-image">
                <img 
                  src={cardImage1} 
                  alt="Mensagem de texto simples" 
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Compact Custom iOS/Android-style WhatsApp Notification in Portuguese, perfectly centered horizontally at chest level */}
                <div 
                  className="absolute top-[52%] left-[calc(50%-92.5px)] md:left-[calc(50%-102.5px)] w-[185px] md:w-[205px] bg-white rounded-xl p-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.4)] border border-neutral-100 flex flex-col gap-0.5 z-20 pointer-events-auto transition-transform duration-300 hover:scale-[1.03]" 
                  id="portuguese-whatsapp-notification"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#25D366] flex items-center justify-center text-white font-sans text-[8px]" id="whatsapp-micro-ico">
                        💬
                      </div>
                      <span className="text-[8px] md:text-[9px] font-black tracking-wider text-neutral-800 uppercase font-sans">WhatsApp</span>
                    </div>
                    <span className="text-[7.5px] md:text-[8px] font-bold text-neutral-400">Agora</span>
                  </div>
                  <div className="flex flex-col text-left" id="whatsapp-message-body">
                    <span className="text-[9.5px] md:text-[10.5px] font-black text-neutral-900 leading-none">Macho Alfa (Filho)</span>
                    <span className="text-[8.5px] md:text-[9.5px] font-bold text-neutral-600 leading-snug mt-0.5">
                      "Pai, consegue um horário hoje para batermos um papo anoite?"
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col bg-[#0d0d0d] border-2 border-[#B31217] rounded-2xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_45px_rgba(179,18,23,0.18)] transition-all duration-300 transform hover:-translate-y-1.5" id="bento-card-2">
              {/* Top Text description */}
              <div className="p-6 md:p-8 flex items-center justify-center text-center min-h-[150px] bg-[#0d0d0d] px-6 select-none" id="bento-card-2-text">
                <p className="text-neutral-200 font-bold text-sm sm:text-[15px] leading-relaxed font-sans">
                  Um <span className="text-white font-extrabold">plano prático</span> para transformar um "me deixa em paz" em "quero conversar hoje", mesmo que ele pareça totalmente frio ou distante de você.
                </p>
              </div>
              {/* Bottom Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden border-t-2 border-[#B31217]" id="bento-card-2-image">
                <img 
                  src={cardImage2} 
                  alt="Plano prático de diálogo" 
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col bg-[#0d0d0d] border-2 border-[#B31217] rounded-2xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_45px_rgba(179,18,23,0.18)] transition-all duration-300 transform hover:-translate-y-1.5" id="bento-card-3">
              {/* Top Text description */}
              <div className="p-6 md:p-8 flex items-center justify-center text-center min-h-[150px] bg-[#0d0d0d] px-6 select-none" id="bento-card-3-text">
                <p className="text-neutral-200 font-bold text-sm sm:text-[15px] leading-relaxed font-sans">
                  Como usar a <span className="text-white font-extrabold">psicologia de autoridade moral</span> para fazer seu filho buscar seu conselho voluntariamente nos momentos cruciais da vida dele.
                </p>
              </div>
              {/* Bottom Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden border-t-2 border-[#B31217]" id="bento-card-3-image">
                <img 
                  src={cardImage3} 
                  alt="Psicologia da autoridade paterna" 
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Endless scrolling red marquee ribbon at the bottom bottom margin */}
        <div className="w-full bg-[#B31217] py-4 overflow-hidden select-none relative z-20 border-t border-b border-[#FF2E2E]/40 shadow-[0_4px_15px_rgba(179,18,23,0.4)]" id="block-08-marquee-ribbon">
          <div className="flex whitespace-nowrap min-w-full text-xs sm:text-sm font-black tracking-widest text-white uppercase font-sans animate-marquee-ltr" id="marquee-runner-track">
            <span className="px-4">CÓDIGO DO PATRIARCA • INABALÁVEL E INDISPENSÁVEL • LIDERANÇA FAMILIAR • RECONQUISTE O RESPEITO • CÓDIGO DO PATRIARCA • INABALÁVEL E INDISPENSÁVEL • LIDERANÇA FAMILIAR • RECONQUISTE O RESPEITO •</span>
            <span className="px-4">CÓDIGO DO PATRIARCA • INABALÁVEL E INDISPENSÁVEL • LIDERANÇA FAMILIAR • RECONQUISTE O RESPEITO • CÓDIGO DO PATRIARCA • INABALÁVEL E INDISPENSÁVEL • LIDERANÇA FAMILIAR • RECONQUISTE O RESPEITO •</span>
          </div>
        </div>

      </section>

      {/* BLOCO 09 — COMO VAI FUNCIONAR (FUNCIONALIDADES E PÚBLICO ALVO COMPLETO) */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-neutral-100" id="etapa-09">
        <div className="max-w-7xl lg:max-w-[1360px] xl:max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-14 relative z-10" id="block-09-container">
          
          {/* Left Column: Text & bullet checklist */}
          <div className="w-full lg:w-[68%] xl:w-[73%] flex flex-col items-start text-left" id="block-09-left-column">
            
            {/* Badge pill */}
            <div className="bg-[#B31217] text-white text-[11px] sm:text-[12px] font-black tracking-widest uppercase py-1.5 px-4 rounded-md inline-flex items-center justify-center shadow-sm mb-6 select-none" id="block-09-badge">
              Como vai funcionar
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-4.5xl font-black text-neutral-900 tracking-tight leading-tight mb-8 font-sans" id="block-09-title">
              Funciona com <span className="text-[#B31217]">qualquer tipo de filho e situação</span> que você possa imaginar...
            </h2>

            {/* Checklist lists with thin divider lines */}
            <div className="w-full flex flex-col border-t border-neutral-200/60" id="block-09-checklist">
              {[
                "Aquele filho que parece distante, fechado, e que nunca te dá atenção no dia a dia.",
                "O filho que até te ouve em um dia bom, mas depois se isola no quarto por dias sem explicação.",
                "O filho que parece rebelde e diz que prefere ficar sozinho, rejeitando seus conselhos.",
                "Aquele que finge concordar com tudo o que você fala apenas para escapar da conversa e voltar para as telas.",
                "O filho com quem você mora na mesma casa, mas que age como se você fosse um complete estranho.",
                "Seu filho ou filha com quem você sonha em recompor um relacionamento de admiração mútua real, saindo do ciclo de brigas cotidianas.",
                "Filhos adolescentes que estão passando por fases difíceis de rebeldia, instabilidade ou influências externas.",
                "Filhos mais maduros ou jovens adultos, reestabelecendo a linhagem de respeito legítimo.",
                "Filhos extremamente teimosos, temperamentais e aparentemente difíceis de escutar.",
                "Funciona perfeitamente seja em mensagens por WhatsApp, conversas de mesa, ou convivendo debaixo do mesmo teto.",
                "Útil em momentos de crise familiar, decisões sérias de atitude, ou no diálogo cotidiano espontâneo.",
                "E também para pais tímidos, inseguros, cansados ou que sentem que perderam a autoridade perante a família."
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-4 py-3.5 border-b border-neutral-200/50 flex-row" id={`block-09-item-${index}`}>
                  {/* Custom Red Badge icon representing clean validation checkbox matching the mockup look */}
                  <div className="flex-shrink-0 w-5 h-5 sm:w-5.5 sm:h-5.5 bg-[#B31217] rounded-md flex items-center justify-center text-white shadow-sm" id={`block-09-icon-box-${index}`}>
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-[14px] xl:text-[15.5px] text-neutral-800 font-bold font-sans tracking-tight whitespace-normal lg:whitespace-nowrap overflow-hidden text-ellipsis" id={`block-09-item-text-${index}`}>
                    {item}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Composite devices mockup overlapping precisely as in the original */}
          <div className="w-full lg:w-[32%] xl:w-[27%] flex items-center justify-center lg:pt-16 select-none relative" id="block-09-right-column">
            
            {/* Soft ambient red glow behind */}
            <div className="absolute inset-x-0 w-2/3 h-2/3 bg-[#B31217]/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Overlapping Mockup Composition container */}
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-[4/3] flex items-center justify-center" id="block-09-mockups-composer">
              
              {/* Smartphone Mockup on the Left (Z-index 20) */}
              <div 
                className="absolute left-[8%] bottom-[5%] w-[38%] aspect-[9/19.5] bg-neutral-900 rounded-[28px] p-1.5 shadow-[0_20px_45px_rgba(0,0,0,0.35)] border border-neutral-800 flex flex-col z-20 cursor-pointer overflow-hidden transform hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300"
                onClick={() => setIsCheckoutOpen(true)}
                id="block-09-phone-container"
              >
                {/* Notch / Speaker bar */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black rounded-full z-40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 mr-2" />
                  <div className="w-6 h-0.5 rounded-full bg-neutral-800" />
                </div>
                {/* Phone screen carrying the book design */}
                <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-neutral-950 flex flex-col justify-end" id="block-09-phone-screen">
                  <img 
                    src={bookMockup} 
                    alt="Capa Digital Código do Patriarca" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5 flex flex-col justify-end p-3 z-10" id="phone-screen-label">
                    <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest leading-none font-sans mb-0.5">Audiolivro & Digital</span>
                    <span className="text-[10px] sm:text-xs font-black text-white leading-tight font-sans">CÓDIGO DO PATRIARCA</span>
                  </div>
                </div>
              </div>

              {/* Hardcover standing mockup on the Right (Z-index 10) */}
              <div 
                className="absolute right-[5%] bottom-[10%] w-[68%] aspect-[3/4] cursor-pointer z-10 transform hover:scale-[1.02] transition-transform duration-300"
                onClick={() => setIsCheckoutOpen(true)}
                id="block-09-book-container"
              >
                {/* Book Mockup Shadow */}
                <div className="absolute inset-x-0 w-[95%] h-[90%] left-6 bg-[#B31217]/15 blur-[45px] rounded-l-3xl pointer-events-none" />
                <img 
                  src={bookMockup} 
                  alt="Livro Físico Código do Patriarca" 
                  className="w-full h-full object-contain filter drop-shadow-[-25px_25px_30px_rgba(0,0,0,0.35)]"
                  referrerPolicy="no-referrer"
                />
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* BLOCO 10 — BÔNUS COMPLETOS */}
      <section className="bg-[#070707] text-white py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden border-t border-neutral-900 diagonal-patterns-subtle" id="etapa-10">
        
        {/* Soft atmospheric radial glows */}
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[80%] h-[350px] bg-[#B31217]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[10%] right-[5%] w-[250px] h-[250px] bg-[#B31217]/5 blur-[90px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10" id="block-10-container">
          
          {/* Badge Bônus pill at the top */}
          <div className="px-5 py-2 bg-[#B31217] text-white text-[11px] font-black tracking-[0.25em] uppercase rounded-full shadow-[0_4px_15px_rgba(179,18,23,0.6)] border border-[#FF2E2E]/30 inline-flex items-center justify-center gap-2 mb-6 select-none" id="block-10-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Bônus
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4.5xl font-black text-white tracking-tight leading-tight uppercase font-montserrat text-center max-w-3xl mb-4" id="block-10-title">
            GARANTA SEU LIVRO AGORA E RECEBA <span className="text-[#FF2E2E]">TODOS ESTES BÔNUS</span>:
          </h2>

          <p className="text-[10px] sm:text-xs font-black text-[#FF2E2E] tracking-widest uppercase font-mono mb-16 flex items-center justify-center gap-2 select-none animate-pulse" id="block-10-countdown">
            ⚠️ BÔNUS LIMITADO — SÓ DISPONÍVEL ATÉ AS 23:59
          </p>

          {/* Cards container */}
          <div className="w-full flex flex-col gap-6" id="block-10-cards-wrapper">
            {BONUS_ITEMS.map((bonus, index) => (
              <div 
                key={index} 
                className="bg-neutral-950/70 border border-white/5 p-6 sm:p-8 md:p-10 rounded-2xl flex flex-col md:flex-row items-center gap-8 md:gap-10 justify-between hover:border-[#B31217]/45 hover:bg-neutral-950/90 transition-all duration-300 relative overflow-hidden group text-left w-full animate-fadeIn"
                id={`block-10-bonus-card-${index}`}
              >
                {/* Visual decoration overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B31217]/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Left Side: Content info */}
                <div className="flex-1 space-y-4" id={`block-10-bonus-card-left-${index}`}>
                  <span className="text-[10px] font-bold text-[#FF2E2E] tracking-widest uppercase font-mono block">
                    {bonus.badge}
                  </span>
                  
                  <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white tracking-tight leading-snug group-hover:text-[#FF2E2E]/90 transition-colors duration-300 font-sans">
                    {bonus.title}
                  </h3>

                  <div className="space-y-3" id={`block-10-bonus-card-desc-box-${index}`}>
                    {bonus.description.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-xs sm:text-[13.5px] text-zinc-400 font-medium font-sans leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm font-black text-neutral-400 font-sans uppercase tracking-wider pt-2">
                    Valor: <span className="text-[#FF2E2E] font-black underline font-mono">R$ {bonus.valor}</span>
                  </p>
                </div>

                {/* Right Side: Graphic Visual Mockup */}
                <div className="shrink-0 w-full md:w-auto flex items-center justify-center md:pl-4" id={`block-10-bonus-card-right-${index}`}>
                  <BonusVisual type={bonus.type} bookMockup={bookMockup} />
                </div>
              </div>
            ))}
          </div>

          {/* Green CTA Button absolute bottom */}
          <div className="mt-16 w-full max-w-xl flex flex-col items-center select-none" id="block-10-cta-wrapper">
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full sm:w-auto px-10 py-5 bg-[#2ECC71] hover:bg-[#27ae60] text-black font-black text-sm sm:text-base tracking-widest uppercase rounded-xl transition-all cursor-pointer transform hover:-translate-y-1 active:translate-y-0 text-center btn-neon-hover inline-flex items-center justify-center gap-3 font-montserrat"
              id="block-10-cta-btn"
            >
              QUERO MEU MANUAL + TODOS OS BÔNUS!
            </button>
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest font-mono mt-4 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              SISTEMA DE COMPRA 100% SEGURO E PROTEGUIDO
            </p>
          </div>

        </div>
      </section>

      {/* BLOCO 11 — TUDO O QUE VOCÊ VAI RECEBER (COMPLETE DECK & CHECKLIST & OFFER) */}
      <section className="bg-[#0b0b0c] text-white py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden border-t border-neutral-900" id="etapa-11">
        
        {/* Soft background glow */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[90%] h-[400px] bg-[#B31217]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[5%] left-[5%] w-[300px] h-[300px] bg-[#FF2E2E]/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-[580px] sm:max-w-4xl mx-auto flex flex-col items-center relative z-10 text-center" id="block-11-container">
          
          {/* Top Pill button/badge similar to screenshot (Compra rápida button look) */}
          <div className="px-5 py-2.5 bg-[#B31217]/20 border border-[#B31217]/50 text-[#FF2E2E] text-[11px] font-black tracking-[0.2em] uppercase rounded-full inline-flex items-center justify-center gap-2 mb-6 select-none shadow-[0_4px_12px_rgba(179,18,23,0.3)]" id="block-11-badge">
            COMPRA SEGURA
          </div>

          <h2 className="text-2xl sm:text-3.5xl md:text-4.5xl font-black text-white tracking-tight uppercase font-montserrat mb-10 leading-tight" id="block-11-title">
            ISTO É <span className="text-[#FF2E2E]">TUDO O QUE VOCÊ VAI RECEBER</span>:
          </h2>

          {/* Golden/Crimson border layout wrapper (exactly matching container card of mockups) */}
          <div className="w-full bg-neutral-950/70 border border-white/10 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.85)]" id="block-11-offer-box">
            
            {/* Visual stacked products composite mockup */}
            <Etapa11AllProductsStack bookMockup={bookMockup} />

            {/* Checklist items list */}
            <div className="max-w-2xl mx-auto flex flex-col gap-3.5 mt-8 sm:mt-12 text-left" id="block-11-checklist-container">
              {[
                "Acesso instantâneo ao Livro digital Código do Patriarca",
                "Versão completa em audiolivro com acesso imediato",
                "Conteúdo completo e testado na reconstrução familiar",
                "Acesso vitalício para sempre (sem taxas ou mensalidades)",
                "Bônus: Diálogo Anti-Rejeição",
                "Bônus: Guia Completo das 12 Sinais Comportamentais",
                "Bônus: Coleção Completa dos 100 Temas de Diálogo",
                "MASTERCLASS: Como Treinar Filhos Fortes em Tempos Difíceis",
                "CUPOM EXCLUSIVO: Desconto garantido para o Livro Físico"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3.5 py-1.5 border-b border-white/5" id={`block-11-checklist-item-${idx}`}>
                  {/* Glowing custom checklist icon mirroring the high contrast look */}
                  <div className="shrink-0 w-5 h-5 rounded-full bg-[#2ECC71]/15 border border-[#2ECC71]/40 flex items-center justify-center text-[#2ECC71] shadow-[0_0_8px_rgba(46,204,113,0.3)]" id={`block-11-checklist-item-check-${idx}`}>
                    <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                  </div>
                  <p className="text-zinc-200 text-xs sm:text-sm font-bold font-sans tracking-tight" id={`block-11-checklist-item-text-${idx}`}>
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Price values details section */}
            <div className="mt-12 border-t border-white/10 pt-10 flex flex-col items-center select-none" id="block-11-pricing-box">
              <span className="text-zinc-400 text-xs font-black uppercase tracking-[0.2em] font-mono block mb-1">
                Valor Total Acumulado
              </span>
              <span className="text-xl sm:text-2xl text-neutral-500 font-extrabold line-through block font-mono mb-6">
                R$ 697,00
              </span>

              <span className="text-white text-sm sm:text-base font-extrabold font-sans tracking-tight block mb-2">
                Leve tudo isso agora por apenas:
              </span>
              
              <div className="text-[#2ECC71] text-4xl sm:text-5xl md:text-[62px] font-black tracking-tighter leading-none font-montserrat my-4 drop-shadow-[0_4px_12px_rgba(46,204,113,0.35)]" id="block-11-main-price">
                R$ 27,00
              </div>
              <span className="text-[10px] text-zinc-400 font-black tracking-widest uppercase font-mono block mb-8">
                NO PIX OU EM ATÉ 10X NO CARTÃO
              </span>

              {/* Glowing Bright Green checkout button trigger */}
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full sm:w-auto px-10 py-5 bg-[#2ECC71] hover:bg-[#27ae60] text-black font-black text-sm sm:text-base tracking-widest uppercase rounded-xl transition-all cursor-pointer transform hover:-translate-y-1 active:translate-y-0 text-center btn-neon-hover inline-flex items-center justify-center gap-3 font-montserrat"
                id="block-11-cta-btn"
              >
                SIM! EU QUERO TUDO HOJE!
              </button>

              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest font-mono mt-4 flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                SISTEMA DE COMPRA 100% SEGURO E PROTEGUIDO
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* BLOCO 12 — COMPARAÇÃO CÓDIGO DO PATRIARCA VS OUTRAS ALTERNATIVAS */}
      <section className="bg-[#080809] text-white py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden border-t border-neutral-900" id="etapa-12">
        
        {/* Ambient surrounding glow circles */}
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-[#2ECC71]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-[#B31217]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 text-center" id="block-12-container">
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight uppercase font-montserrat leading-tight max-w-3xl mb-8" id="block-12-title">
            Esta é a solução definitiva para que seu filho te escute, te respeite e mude de comportamento!
          </h2>

          {/* Subheading letters paragraphs */}
          <div className="max-w-2xl mx-auto space-y-4 mb-16 text-zinc-400 text-xs sm:text-[14.5px] leading-relaxed font-sans" id="block-12-letters">
            <p>
              Até quando você vai continuar se frustrando para chamar a atenção do seu filho? Sendo ignorado, respondido com grosseria, ou tratado apenas como um chato ou como um "banco" para pagar as contas?
            </p>
            <p>
              Já passou da hora de deixar de ser o pai ou mãe que é evitado em casa... E começar a se tornar o porto seguro, <span className="text-white font-extrabold">o líder de quem ele busca o conselho de forma espontânea e voluntária.</span>
            </p>
            <p className="text-neutral-300 font-medium">
              Chega de mendigar migalhas de atenção. Chega de ser trocado por telas de celular, mentiras na internet ou más amizades que só afastam ele da família.
            </p>
            <p className="italic text-zinc-300">
              O <strong className="text-white not-italic font-black">Código do Patriarca</strong> é o passo que separa você de se tornar a autoridade amorosa e inabalável que seus filhos respeitam e seguem sem relutância.
            </p>
            <p className="text-[#FF2E2E] font-bold text-[11px] sm:text-xs tracking-wider uppercase font-mono pt-2">
              Nossos métodos são práticos, comprovados e desenhados para a realidade do dia a dia familiar.
            </p>
          </div>

          {/* Comparative Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14 w-full mt-4 max-w-4xl" id="block-12-comparison-grid">
            
            {/* LEFT CARD: Código do Patriarca (Green Check theme) */}
            <div className="bg-neutral-950/80 border border-[#2ECC71]/30 rounded-2xl p-6 sm:p-8 pt-12 relative flex flex-col justify-between shadow-[0_15px_35px_rgba(46,204,113,0.06)] group hover:border-[#2ECC71]/60 transition-all duration-300" id="block-12-green-card">
              
              {/* Overlapping top circle badge with checkmark */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#2ECC71] border-4 border-[#080809] flex items-center justify-center text-black shadow-[0_4px_15px_rgba(46,204,113,0.5)] transform group-hover:scale-105 transition-transform duration-300">
                <Check className="w-8 h-8 stroke-[3.5]" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mb-8 font-sans border-b border-white/5 pb-4">
                  Manual - Código do Patriarca
                </h3>

                <ul className="space-y-4 text-left" id="block-12-green-list">
                  {[
                    { title: "Provado na prática", desc: "Baseado na psicologia comportamental familiar real e relatos de milhares de pais." },
                    { title: "Totalmente acessível", desc: "Acesso imediato no seu e-mail por uma fração do preço de uma única consulta psicológica." },
                    { title: "Escuta espontânea", desc: "Aprenda como ser ouvido de forma voluntária, sem precisar gritar, brigar ou suplicar atenção." },
                    { title: "Ative o respeito natural", desc: "Conquiste autoridade real e admiração sem precisar dar presentes caros ou ceder a caprichos ruins." },
                    { title: "Vire o jogo dentro de casa", desc: "Transforme o filho que antes te ignorava em alguém que busca sua presença e aprovação." },
                    { title: "Crie blindagem emocional", desc: "Desperte o senso de valores morais profundos que protegem seu filho do pior desta geração." }
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start" id={`block-12-green-item-${idx}`}>
                      <div className="shrink-0 w-4.5 h-4.5 rounded-full bg-[#2ECC71]/15 flex items-center justify-center text-[#2ECC71] border border-[#2ECC71]/30 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <p className="text-zinc-300 text-xs sm:text-[13px] leading-relaxed">
                        <strong className="text-white font-bold">{item.title}:</strong> {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 text-left">
                <p className="text-xs sm:text-[13px] font-bold text-[#2ECC71] leading-relaxed font-sans">
                  ✔️ Com este método, você será capaz de restabelecer o respeito, a admiração mútua e a paz real na sua casa de forma natural.
                </p>
              </div>

            </div>

            {/* RIGHT CARD: Outras Alternativas (Red Cross theme) */}
            <div className="bg-neutral-950/80 border border-[#B31217]/30 rounded-2xl p-6 sm:p-8 pt-12 relative flex flex-col justify-between shadow-[0_15px_35px_rgba(179,18,23,0.06)] group hover:border-[#B31217]/60 transition-all duration-300" id="block-12-red-card">
              
              {/* Overlapping top circle badge with red cross icon */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#B31217] border-4 border-[#080809] flex items-center justify-center text-white shadow-[0_4px_15px_rgba(179,18,23,0.5)] transform group-hover:scale-105 transition-transform duration-300">
                {/* Visual custom SVG for red cross (letter X look) */}
                <svg className="w-6 h-6 text-white stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#ffffff]/90 tracking-tight mb-8 font-sans border-b border-white/5 pb-4">
                  Conselhos genéricos e psicólogos teóricos
                </h3>

                <ul className="space-y-4 text-left" id="block-12-red-list">
                  {[
                    { title: "Sem base prática", desc: "Teorias modernas e vazias criadas por acadêmicos que sequer possuem vivência de lares desafiadores." },
                    { title: "Gastar fortunas desnecessárias", desc: "Cobram mensalidades intermináveis em sessões de terapia sem te dar nenhum plano de ação real." },
                    { title: "Pisar em ovos sempre", desc: "Dizem para nunca impor limites ou confrontar erros, fazendo com que os filhos mandem no lar." },
                    { title: "Métodos forçados", desc: "Te obrigam a tentar scripts artificiais de conversa que soam ridículos e geram deboche imediato." },
                    { title: "Aumento da rebeldia", desc: "Você perde a autoridade pouco a pouco tentando ser apenas o 'amiguinho' legal sem limites definidos." },
                    { title: "Paternidade enfraquecida", desc: "No fim das contas, você acaba sendo visto apenas como um provedor frágil e facilmente manipulável." }
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start" id={`block-12-red-item-${idx}`}>
                      <div className="shrink-0 w-4.5 h-4.5 rounded-full bg-[#B31217]/15 flex items-center justify-center text-[#FF2E2E] border border-[#B31217]/30 mt-0.5 animate-pulse">
                        <svg className="w-2.5 h-2.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed">
                        <strong className="text-zinc-300 font-bold">{item.title}:</strong> {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 text-left">
                <p className="text-xs sm:text-[13px] font-bold text-[#FF2E2E] leading-relaxed font-sans">
                  ❌ O resultado: Você continua sofrendo com a falta de autoridade, assistindo seu filho se afastar cada vez mais de você e da família.
                </p>
              </div>

            </div>

          </div>

          {/* Quick CTA bottom connection trigger */}
          <div className="mt-16 text-center select-none" id="block-12-cta-wrap">
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="px-10 py-5 bg-[#2ECC71] hover:bg-[#27ae60] text-black font-black text-sm sm:text-base tracking-widest uppercase rounded-xl transition-all cursor-pointer transform hover:-translate-y-1 active:translate-y-0 text-center btn-neon-hover inline-flex items-center justify-center gap-3 font-montserrat"
              id="block-12-cta-btn"
            >
              QUERO ACESSAR AGORA ESTÁ REALIDADE
            </button>
            <p className="text-[10px] text-zinc-500 font-semibold tracking-widest uppercase font-mono mt-4">
              🛡️ COMPRA TOTALMENTE SEGURA E GARANTIDA COM 7 DIAS DE REEMBOLSO INTEGRAL
            </p>
          </div>

        </div>
      </section>

      {/* BLOCO 13 — GARANTIA DE 7 DIAS INCONDICIONAL */}
      <section className="bg-[#060607] text-white py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden border-t border-neutral-900" id="etapa-13">
        
        {/* Soft background light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[400px] bg-[#B31217]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 sm:gap-16 relative z-10" id="block-13-container">
          
          {/* Left Side: 3D-Like Metallic Shield + Number 7 Guarantee Logo */}
          <div className="shrink-0 w-full md:w-1/2 flex flex-col items-center justify-center select-none" id="block-13-graphic-side">
            <div className="relative w-[280px] sm:w-[320px] aspect-square flex items-center justify-center" id="block-13-badge-wrapper">
              
              {/* Deep Shadow element */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#B31217]/10 via-transparent to-black/90 blur-[15px] rounded-full pointer-events-none" />
              
              {/* Glassmorphic Dark Steel Shield Border */}
              <div className="absolute inset-4 rounded-3xl bg-neutral-950/40 border border-white/10 backdrop-blur-md shadow-2xl flex items-center justify-center overflow-hidden" style={{ clipPath: "polygon(50% 0%, 100% 15%, 100% 75%, 50% 100%, 0% 75%, 0% 15%)" }}>
                <div className="absolute inset-0.5 bg-neutral-950/90 border border-white/5" style={{ clipPath: "polygon(50% 0%, 100% 15%, 100% 75%, 50% 100%, 0% 75%, 0% 15%)" }} />
                {/* Subtle red metallic glow on internal path */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#B31217]/15 to-transparent pointer-events-none" />
              </div>

              {/* Big Glossy Silver/White Number 7 */}
              <div className="absolute top-[8%] text-center flex flex-col items-center">
                <span className="text-[130px] sm:text-[150px] font-black leading-none bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] font-sans select-none tracking-tighter">
                  7
                </span>
              </div>

              {/* Slogan Banner Overlapping "7" */}
              <div className="absolute bottom-[23%] bg-gradient-to-r from-transparent via-neutral-900 to-transparent w-full py-1 text-center border-y border-white/5">
                <div className="text-sm sm:text-base font-black tracking-[0.22em] uppercase text-white font-montserrat filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  Dias de
                </div>
                <div className="text-xl sm:text-2xl font-black tracking-[0.3em] uppercase text-[#FF2E2E] font-montserrat mt-0.5 filter drop-shadow-[0_2px_6px_rgba(179,18,23,0.5)]">
                  Garantia
                </div>
              </div>

              {/* 5 Golden Stars Bottom Deck */}
              <div className="absolute bottom-[4%] flex items-center gap-1.5 filter drop-shadow-[0_4px_10px_rgba(230,126,34,0.45)]">
                {[...Array(5)].map((_, starIdx) => (
                  <svg key={starIdx} className="w-6 h-6 text-[#F1C40F] fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>

            </div>
          </div>

          {/* Right Side: Guarantee Copy text & green Action Button */}
          <div className="flex-1 text-left space-y-6 sm:space-y-8 max-w-xl md:pl-2" id="block-13-text-side">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight uppercase font-montserrat" id="block-13-headline">
              <span className="text-[#FF2E2E]">CONFIO 100%</span> NO MEU MÉTODO!
            </h3>

            <div className="space-y-4 text-zinc-400 text-xs sm:text-[14.5px] font-sans leading-relaxed" id="block-13-text-content">
              <p>
                Por isso, eu te ofereço uma <span className="text-white font-extrabold">garantia incondicional de 7 dias</span> para que você possa testar e experimentar todo o conteúdo sem absolutamente nenhum risco na sua mesa de jantar.
              </p>
              <p className="text-[#2ECC71] font-black uppercase tracking-wider text-[11px] sm:text-xs font-mono">
                ✔️ Sim! Exatamente como você leu.
              </p>
              <p>
                Se dentro desses 7 dias, por qualquer motivo que seja, você não ficar satisfeito com o material ou achar que a conexão com seu filho não começou a melhorar, <span className="text-white font-semibold">BASTA SOLICITAR O REEMBOLSO DIRETO AO NOSSO SUPORTE</span> e devolveremos 100% do seu dinheiro, sem perguntas, sem burocracia e sem nenhum tipo de ressentimento.
              </p>
              <p className="text-zinc-300">
                Agora que você já sabe que o risco é totalmente meu e que você <span className="text-white font-extrabold">não tem absolutamente nada a perder</span>, o que você ainda está esperando para garantir seu acesso ao único guia capaz de te trazer paz e respeito pleno dentro do seu lar?
              </p>
            </div>

            {/* Radiant green CTA button trigger */}
            <div className="pt-4 select-none" id="block-13-cta-wrap">
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full sm:w-auto px-10 py-5 bg-[#2ECC71] hover:bg-[#27ae60] text-black font-black text-sm sm:text-base tracking-widest uppercase rounded-xl transition-all cursor-pointer transform hover:-translate-y-1 active:translate-y-0 text-center btn-neon-hover inline-flex items-center justify-center gap-3 font-montserrat shadow-[0_4px_25px_rgba(46,204,113,0.4)]"
                id="block-13-cta-btn"
              >
                QUERO GARANTIR MEU ACESSO
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* BLOCO 14 — CONHEÇA O CRIADOR / BIOGRAFIA INTEGRADA (COPIA DA APRENDA COM QUEM REALMENTE CONHECE) */}
      <section className="bg-[#050506] text-white py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden border-t border-neutral-900" id="etapa-14">
        
        {/* Subtle ambient light glow on corners */}
        <div className="absolute top-[15%] right-[5%] w-[400px] h-[400px] bg-[#B31217]/5 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] bg-neutral-900/30 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10" id="block-14-container">
          
          {/* Main Card container mimicking the high fidelity layout of the reference image */}
          <div className="w-full bg-neutral-950/80 border border-white/10 rounded-3xl p-6 sm:p-10 md:p-14 shadow-[0_25px_60px_rgba(0,0,0,0.9)]" id="block-14-card-wrapper">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center" id="block-14-grid">
              
              {/* Left Column: Author bio copy texts */}
              <div className="md:col-span-7 flex flex-col text-left gap-5" id="block-14-left">
                
                {/* Red Sticker Pill-button Badge on top left resembling "Conoce a la creadora" */}
                <span className="self-start px-4 py-1.5 bg-[#B31217]/25 border border-[#B31217]/50 text-[#FF2E2E] text-[10px] font-black tracking-widest uppercase rounded-lg shadow-[0_4px_10px_rgba(179,18,23,0.2)] mb-2 select-none" id="block-14-badge">
                  Conheça o Criador
                </span>

                {/* Styled Big Title with generous leading and bold weighting */}
                <h2 className="text-xl sm:text-2xl md:text-[28px] font-black text-white leading-tight tracking-tight uppercase font-montserrat" id="block-14-title">
                  Aprenda com quem realmente conhece a <span className="text-[#FF2E2E]">verdadeira dinâmica familiar</span> e os comportamentos dos jovens:
                </h2>

                {/* High Contrast Red Highlight Name */}
                <div className="text-[#FF2E2E] text-2xl sm:text-3xl font-extrabold tracking-wider uppercase font-montserrat" id="block-14-name">
                  WAGNER FERRAZ
                </div>

                {/* Paragraph segments precisely spaced with premium off-white typography */}
                <div className="space-y-4 text-zinc-400 text-xs sm:text-[14px] leading-relaxed font-sans mt-2" id="block-14-paragraphs">
                  <p className="select-text">
                    Wagner Ferraz é mentor de pais, pesquisador comportamental e dedica sua vida a restaurar o respeito e a harmonia em lares por todo o Brasil. Com anos de estudo contínuo sobre comportamento infantojuvenil e dinâmicas familiares modernas, Wagner é hoje uma das grandes autoridades na reconstrução da autoridade paterna e materna, ajudando pais comuns a se tornarem líderes inabaláveis de suas próprias famílias.
                  </p>
                  <p className="select-text">
                    Criador do movimento e do método blindado de paternidade consciente, ele ensina passo a passo como estabelecer limites saudáveis e amorosos de forma firme e respeitosa, neutralizando os efeitos destrutivos causados pelo vício em telas, más amizades na internet ou comportamentos rebeldes desta nova geração. Suas abordagens de campo já impactaram mais de 60.000 pessoas no país, tirando famílias da exaustão diária e trazendo uma realidade renovada para o lar.
                  </p>
                  <p className="select-text text-zinc-300">
                    E agora Wagner consolida toda essa inteligência prática com a publicação do manual completo do <strong className="text-white font-black">«Código do Patriarca»</strong>. Um livro digital direto, funcional e com fundamentação prática para que você assuma de uma vez o comando do seu lar com paz, orgulho e autoridade inquestionável.
                  </p>
                </div>

              </div>

              {/* Right Column: Premium Framed Author Portrait */}
              <div className="md:col-span-5 flex justify-center relative select-none mt-4 md:mt-0" id="block-14-right">
                
                {/* Image shadow base structure */}
                <div className="relative w-full max-w-[330px] aspect-[4/5] rounded-[24px] overflow-visible border border-white/5 shadow-2xl bg-neutral-900 group" id="block-14-image-container">
                  
                  {/* Outer glowing border ring */}
                  <div className="absolute -inset-0.5 rounded-[26px] bg-gradient-to-b from-white/10 via-transparent to-neutral-800/20 pointer-events-none" />

                  {/* High Quality Render of Author Wagner portrait */}
                  <img 
                    src={wagnerPortrait} 
                    alt="Wagner Ferraz - Mentor de Pais e Criador do Código do Patriarca" 
                    className="w-full h-full object-cover rounded-[24px] filter brightness-[1.0] group-hover:scale-[1.01] transition-all duration-500"
                    referrerPolicy="no-referrer"
                    id="block-14-author-img"
                  />

                  {/* Overlapping stylized badge circle on bottom-right edges resembling circular textured stamp in reference screenshot */}
                  <div className="absolute -bottom-5 -right-5 w-24 sm:w-[108px] h-24 sm:h-[108px] rounded-full bg-neutral-950 border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.85)] flex items-center justify-center z-20 overflow-visible" id="block-14-rubber-badge">
                    
                    {/* Tiny animated SVG circular text matching the aesthetic */}
                    <svg className="absolute inset-0 w-full h-full animate-[spin_25s_linear_infinite]" viewBox="0 0 100 100" id="block-14-svg-text">
                      <path id="badgeCirclePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                      <text className="fill-zinc-400 font-sans text-[7px] font-extrabold uppercase tracking-[0.16em]">
                        <textPath href="#badgeCirclePath" startOffset="0%">
                          Wagner Ferraz • Método Blindado • Família Forte • 
                        </textPath>
                      </text>
                    </svg>

                    {/* Circular core preview containing blurred version of portrait */}
                    <div className="w-[66%] h-[66%] rounded-full overflow-hidden border border-white/10 bg-gradient-to-br from-[#B31217]/10 to-transparent flex items-center justify-center z-10 select-none">
                      <img 
                        src={wagnerPortrait} 
                        className="w-full h-full object-cover filter blur-[1px] opacity-75" 
                        alt="" 
                        referrerPolicy="no-referrer" 
                      />
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* BLOCO 15 — FAQ & FOOTER SECTOR */}
      <section className="bg-white text-black py-20 px-4 sm:px-6 md:px-12 relative overflow-hidden border-t border-neutral-200" id="etapa-15">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 items-start" id="block-15-grid">
          
          {/* LEFT COLUMN: Accordions representing FAQ items directly */}
          <div className="md:col-span-8 space-y-4" id="block-15-accordions">
            {[
              {
                question: "O que é o manual Código do Patriarca?",
                answer: "O Código do Patriarca é mais que um livro, é um manual prático e poderoso que revela os segredos profundos para você blindar a mente dos seus filhos, recuperar a autoridade amorosa dentro de casa e prepará-los para enfrentar esta geração sem perder o caráter e os valores familiares tradicionais."
              },
              {
                question: "Como receberei o acesso ao livro?",
                answer: "O envio é 100% automático e imediato. Assim que a cobrança simulada ou real for processada, você receberá os dados de acesso ao manual digital em formato PDF de modo a poder abrir imediatamente no e-mail fornecido."
              },
              {
                question: "Por quanto tempo terei acesso ao livro?",
                answer: "O seu acesso é vitalício para sempre. Uma vez adquirido, o conteúdo estará inteiramente disponível para ler, ouvir os áudios ou baixar para consultar nos momentos mais cruciais da criação de forma segura."
              }
            ].map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-[#151517] rounded-lg overflow-hidden transition-all duration-300 shadow-md"
                  id={`block-15-faq-item-${index}`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left select-none cursor-pointer group focus:outline-none"
                    id={`block-15-faq-trigger-${index}`}
                  >
                    <span 
                      className={`font-black text-sm sm:text-[15px] font-sans transition-colors duration-200 uppercase tracking-tight ${
                        isOpen ? "text-[#FF2E2E]" : "text-white group-hover:text-[#FF2E2E]/85"
                      }`}
                      id={`block-15-faq-q-${index}`}
                    >
                      {index === 0 && "O que é o manual Código do Patriarca?"}
                      {index === 1 && "Como receberei acesso ao livro?"}
                      {index === 2 && "Por quanto tempo terei acesso ao livro?"}
                    </span>
                    <span 
                      className={`text-lg font-black ml-4 select-none ${
                        isOpen ? "text-[#FF2E2E]" : "text-white"
                      }`}
                      id={`block-15-faq-icon-${index}`}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div 
                      className="px-6 pb-6 pt-1 text-zinc-300 text-xs sm:text-[13.5px] leading-relaxed font-sans border-t border-white/5 bg-[#121213]"
                      id={`block-15-faq-answer-${index}`}
                    >
                      <p className="select-text">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Large high-contrast FAQ title block */}
          <div className="md:col-span-4 flex flex-col justify-center text-left" id="block-15-title-block">
            <h2 className="text-[#FF2E2E] font-black text-6xl sm:text-7xl leading-none font-montserrat tracking-tighter" id="block-15-large-faq">
              FAQ
            </h2>
            <p className="text-zinc-900 font-extrabold text-xl sm:text-2xl mt-1 tracking-tight uppercase font-montserrat" id="block-15-sub-q">
              Perguntas frequentes:
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER SECTION: Standard branding summary footer based on the screenshot */}
      <footer className="bg-white border-t border-neutral-200 py-10 px-4 sm:px-6 md:px-12 select-none" id="etapa-15-footer">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6" id="footer-container">
          
          {/* Leftside Branding Logo */}
          <div className="flex flex-col uppercase text-left" id="footer-logo">
            <span className="font-montserrat font-black tracking-[0.16em] text-neutral-900 text-xs sm:text-sm leading-tight">CÓDIGO DO</span>
            <span className="font-montserrat font-black tracking-[0.16em] text-neutral-900 text-xs sm:text-sm leading-none -mt-0.5">PATRIARCA</span>
          </div>

          {/* Center copyright string */}
          <div className="text-neutral-500 text-[11px] font-medium font-sans text-center" id="footer-copyright">
            © Copyright 2026. Todos os direitos reservados.
          </div>

          {/* Right side notification/legal disclaimer details */}
          <div className="text-neutral-500 text-[10px] sm:text-[11px] font-medium font-sans text-right" id="footer-disclaimer">
            Você concorda em receber comunicações de Wagner Ferraz
          </div>

        </div>
      </footer>

      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            id="checkout-overlay"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative"
              id="checkout-modal"
            >
              
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setCheckoutSuccess(false);
                  setCheckoutStep(1);
                }}
                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white rounded-lg bg-white/5 border border-white/10 cursor-pointer"
              >
                ✕
              </button>

              {/* Status Header of checkout */}
              <div className="p-5 bg-zinc-950 border-b border-white/5 flex items-center gap-3">
                <div className="p-2 bg-[#2ECC71]/10 rounded-lg text-[#2ECC71] border border-[#2ECC71]/20">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase text-white font-montserrat tracking-tight">Compra Segura e Criptografada</h3>
                  <p className="text-[9px] text-zinc-400 tracking-widest uppercase font-mono">Processamento de Transação Protegido</p>
                </div>
              </div>

              {/* Inside Body Form */}
              <div className="p-5">
                {!checkoutSuccess ? (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    
                    {/* Progress Bar of simulated purchase */}
                    <div className="flex items-center justify-between text-[9px] text-[#CFCFCF] font-bold tracking-wider uppercase mb-1">
                      <span className={checkoutStep === 1 ? 'text-[#FF2E2E]' : 'text-[#2ECC71]'}>1. Identificação</span>
                      <span className="h-0.5 flex-1 bg-zinc-800 mx-2" />
                      <span className={checkoutStep === 2 ? 'text-[#FF2E2E]' : ''}>2. Simular Pagamento</span>
                    </div>

                    {checkoutStep === 1 ? (
                      <div className="space-y-3.5">
                        <div>
                          <label className="block text-[10px] font-bold text-[#CFCFCF] uppercase tracking-widest mb-1 font-mono">Nome Completo</label>
                          <input 
                            type="text"
                            required
                            placeholder="Seu nome completo"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-2.5 text-xs focus:border-[#B31217] outline-none text-white transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#CFCFCF] uppercase tracking-widest mb-1 font-mono">E-mail Principal</label>
                          <input 
                            type="email"
                            required
                            placeholder="seuemail@exemplo.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-2.5 text-xs focus:border-[#B31217] outline-none text-white transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#CFCFCF] uppercase tracking-widest mb-1 font-mono">WhatsApp com DDD</label>
                          <input 
                            type="tel"
                            required
                            placeholder="(11) 99999-9999"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-2.5 text-xs focus:border-[#B31217] outline-none text-white transition-colors"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-[#B31217] hover:bg-[#FF2E2E] text-white font-extrabold uppercase text-xs tracking-widest py-3 px-6 rounded-xl cursor-pointer transition-colors mt-2"
                        >
                          PROSSEGUIR PARA O PAGAMENTO
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-zinc-950 p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Item: Código do Patriarca (Manual Completo)</span>
                            <span className="text-white font-bold">R$ 97,00</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Desconto Especial de Lançamento</span>
                            <span className="text-[#2ECC71] font-bold">- R$ 70,00</span>
                          </div>
                          <div className="h-px bg-white/5 my-1" />
                          <div className="flex justify-between text-sm font-bold text-white">
                            <span>TOTAL INTEGRAL:</span>
                            <span className="text-[#2ECC71] text-base">R$ 27,00</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-[10px] text-gray-400 text-justify">
                            Este é um ambiente de demonstração integrada. Clique no botão de confirmação abaixo para simular o recebimento imediato no e-mail fornecido.
                          </p>
                          <button
                            type="submit"
                            className="w-full bg-[#2ECC71] hover:bg-[#27ae60] text-black font-black uppercase text-xs tracking-widest py-3 px-6 rounded-xl cursor-pointer transition-colors"
                          >
                            CONFIRMAR PAGAMENTO SIMULADO (R$ 27,00)
                          </button>
                        </div>
                      </div>
                    )}

                  </form>
                ) : (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-12 h-12 bg-[#2ECC71]/15 border border-[#2ECC71]/45 text-[#2ECC71] rounded-full flex items-center justify-center mx-auto animate-bounce">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white uppercase text-sm font-montserrat">Compra Simulada com Sucesso!</h4>
                      <p className="text-xs text-[#CFCFCF] mt-1.5 leading-relaxed">
                        Parabéns! O simulador aprovou o pagamento. O acesso com o PDF, audiolivros e bônus foi simuladoramente despachado para o endereço: <br/>
                        <span className="text-white font-bold underline text-[10px] block mt-1">{formData.email}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsCheckoutOpen(false);
                        setCheckoutSuccess(false);
                        setCheckoutStep(1);
                      }}
                      className="bg-white/5 hover:bg-white/10 text-white font-bold text-xs px-6 py-2.5 border border-white/10 rounded-xl transition-colors cursor-pointer"
                    >
                      Voltar ao Manual
                    </button>
                  </div>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
