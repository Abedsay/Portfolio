import type { Project } from "../data/content";

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const className = `w-full ${compact ? "max-w-md" : "max-w-xl"}`;

  if (project.slug === "lenet-cnn") return <ComputeVisual className={className} />;
  if (project.slug === "sentiment-analysis") return <MlVisual className={className} />;
  if (project.slug === "cpc") return <CpcVisual className={className} />;
  if (project.slug === "file-sharing-server") return <FileSharingVisual className={className} />;
  return <CommunityVisual className={className} />;
}

/* ---------- Shared node primitive ---------- */

function Node({
  x,
  y,
  w = 108,
  label,
  accent = false,
  fontSize = 9.5,
}: {
  x: number;
  y: number;
  w?: number;
  label: string;
  accent?: boolean;
  fontSize?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="32" rx="5" fill="#141820" stroke={accent ? "#22d3ee" : "#23282f"} />
      <text
        x={x + w / 2}
        y={y + 20}
        textAnchor="middle"
        fill="#f2f3f0"
        fontSize={fontSize}
        fontFamily="JetBrains Mono, monospace"
      >
        {label}
      </text>
    </g>
  );
}

/* ---------- CPC: two clients branching into one shared backend, plus a messaging channel ---------- */

function CpcVisual({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 320 140"
      className={className}
      role="img"
      aria-label="Clinic Platform system topology: Android app and web platform branching into one shared PHP/MySQL backend, with a separate TCP messaging channel"
    >
      <title>Clinic Platform system topology</title>
      <line x1="112" y1="30" x2="172" y2="58" stroke="#5b6169" />
      <line x1="112" y1="86" x2="172" y2="58" stroke="#5b6169" />
      <line x1="172" y1="74" x2="172" y2="96" stroke="#5b6169" strokeDasharray="3 3" />
      <Node x={4} y={14} w={108} label="Android app" />
      <Node x={4} y={70} w={108} label="Web platform" />
      <Node x={172} y={42} w={116} label="PHP / MySQL" accent />
      <Node x={172} y={96} w={116} label="TCP messaging" />
      <text x="230" y="34" textAnchor="middle" fill="#8b929c" fontSize="8" fontFamily="JetBrains Mono, monospace">
        shared backend, per role
      </text>
    </svg>
  );
}

/* ---------- File sharing: linear pipeline with a resume feedback loop ---------- */

function FileSharingVisual({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 340 120"
      className={className}
      role="img"
      aria-label="File Sharing Server flow: client GUI through chunked transfer to a Flask server, with a resume feedback loop on dropped connections"
    >
      <title>File Sharing Server topology</title>
      <line x1="88" y1="30" x2="112" y2="30" stroke="#5b6169" />
      <line x1="228" y1="30" x2="252" y2="30" stroke="#22d3ee" strokeOpacity=".7" />
      <path d="M300 46 C 300 82, 88 82, 88 46" fill="none" stroke="#5b6169" strokeDasharray="3 3" />
      <Node x={4} y={14} w={84} label="Client GUI" />
      <Node x={112} y={14} w={116} label="Chunked transfer" accent />
      <Node x={252} y={14} w={84} label="Flask server" />
      <text x="194" y="98" textAnchor="middle" fill="#8b929c" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
        resume on dropped connection
      </text>
    </svg>
  );
}

/* ---------- Community platform: simple linear client / UI / API / DB chain ---------- */

function CommunityVisual({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 380 110"
      className={className}
      role="img"
      aria-label="Community Web Platform architecture: browser through a React UI and REST API to a MySQL database"
    >
      <title>Community Web Platform architecture</title>
      <line x1="50" y1="30" x2="78" y2="30" stroke="#5b6169" />
      <line x1="186" y1="30" x2="212" y2="30" stroke="#5b6169" />
      <line x1="292" y1="30" x2="318" y2="30" stroke="#22d3ee" strokeOpacity=".7" />
      <rect x="4" y="14" width="46" height="32" rx="6" fill="none" stroke="#23282f" />
      <text x="27" y="34" textAnchor="middle" fill="#8b929c" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
        Browser
      </text>
      <Node x={78} y={14} w={108} label="React UI" />
      <Node x={212} y={14} w={80} label="REST API" accent />
      <Node x={318} y={14} w={58} label="MySQL" />
      <text x="132" y="68" textAnchor="middle" fill="#8b929c" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
        login · profile · data views
      </text>
    </svg>
  );
}

/* ---------- LeNet: sequential baseline fanning into three acceleration strategies ---------- */

function ComputeVisual({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 360 130"
      className={className}
      role="img"
      aria-label="Parallel CNN compute comparison: sequential baseline fans into MPI, OpenMP, and CUDA C, converging on speedup and correctness measurements"
    >
      <title>Parallel CNN compute comparison</title>
      <Node x={0} y={49} w={86} label="Sequential" />
      <line x1="86" y1="65" x2="132" y2="24" stroke="#5b6169" />
      <Node x={132} y={8} w={78} label="MPI" />
      <line x1="86" y1="65" x2="132" y2="64" stroke="#5b6169" />
      <Node x={132} y={48} w={78} label="OpenMP" />
      <line x1="86" y1="65" x2="132" y2="104" stroke="#5b6169" />
      <Node x={132} y={88} w={78} label="CUDA C" accent />
      <line x1="210" y1="48" x2="234" y2="48" stroke="#22d3ee" strokeOpacity=".7" />
      <Node x={234} y={32} w={120} label="Speedup vs. base" accent fontSize={9} />
      <Node x={234} y={72} w={120} label="Correctness check" fontSize={9} />
    </svg>
  );
}

/* ---------- Sentiment analysis: ML pipeline ending in two distinct metric readouts ---------- */

function MlVisual({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 380 120"
      className={className}
      role="img"
      aria-label="Sentiment analysis pipeline: IMDB reviews through TF-IDF feature extraction to Logistic Regression and Random Forest, ending in accuracy and AUC metrics"
    >
      <title>Sentiment analysis pipeline and metrics</title>
      <line x1="84" y1="30" x2="112" y2="30" stroke="#5b6169" />
      <line x1="222" y1="20" x2="248" y2="20" stroke="#5b6169" />
      <line x1="222" y1="40" x2="248" y2="50" stroke="#5b6169" />
      <Node x={4} y={14} w={80} label="IMDB reviews" />
      <Node x={112} y={14} w={110} label="TF-IDF · 5k words" accent />
      <Node x={248} y={4} w={128} label="Logistic Regression" fontSize={9} />
      <Node x={248} y={40} w={128} label="Random Forest" />
      <line x1="112" y1="60" x2="120" y2="76" stroke="#5b6169" strokeOpacity=".5" />
      <line x1="290" y1="60" x2="231" y2="76" stroke="#5b6169" strokeOpacity=".5" />
      <rect x="70" y="76" width="100" height="40" rx="6" fill="#141820" stroke="#22d3ee" />
      <text x="120" y="98" textAnchor="middle" fill="#22d3ee" fontSize="15" fontFamily="Space Grotesk, sans-serif">
        ~90% acc.
      </text>
      <text x="120" y="110" textAnchor="middle" fill="#8b929c" fontSize="8" fontFamily="JetBrains Mono, monospace">
        Logistic Regression
      </text>
      <rect x="186" y="76" width="90" height="40" rx="6" fill="#141820" stroke="#23282f" />
      <text x="231" y="98" textAnchor="middle" fill="#f2f3f0" fontSize="15" fontFamily="Space Grotesk, sans-serif">
        0.962
      </text>
      <text x="231" y="110" textAnchor="middle" fill="#8b929c" fontSize="8" fontFamily="JetBrains Mono, monospace">
        AUC
      </text>
    </svg>
  );
}
