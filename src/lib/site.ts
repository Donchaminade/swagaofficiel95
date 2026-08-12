export const site = {
  name: "SwAgA-Officiel95",
  shortName: "SwAgA",
  tagline: "Danse · Contenu · Pubs · Coaching — énergie street depuis Lomé",
  email: "soualiouadinan1@gmail.com",
  whatsapp: [
    { label: "WhatsApp 1", phone: "22890664116", display: "+228 90 66 41 16" },
    { label: "WhatsApp 2", phone: "22896666200", display: "+228 96 66 62 00" },
  ],
  /** Distinction — Africa Fox Experience 2026 (Cameroun). */
  achievement: {
    place: 2,
    placeLabel: "2e",
    event: "Africa Fox Experience 2026",
    location: "Cameroun",
    short: "2e · Africa Fox Experience 2026",
    long: "2e place à la compétition Africa Fox Experience 2026 au Cameroun.",
  },
  social: {
    tiktok: {
      label: "TikTok",
      handle: "@swaga_officiel95",
      url: "https://www.tiktok.com/@swaga_officiel95",
      blurb:
        "Le terrain principal — freestyle, chorés et clips qui font le buzz depuis Lomé.",
      preview: "/images/social/tiktok.png",
      stats: [
        { value: "919,2k", label: "followers" },
        { value: "23,9M", label: "j'aimes" },
      ],
      cta: "Voir le profil",
    },
    instagram: {
      label: "Instagram",
      handle: "Swaga Off-cial",
      url: "https://www.instagram.com/swaga.offcial/",
      blurb:
        "Behind the scenes, looks street et Reels — le vibe hors TikTok.",
      preview: "/images/social/instagram.png",
      stats: [{ value: "+1000", label: "followers" }],
      cta: "Voir le profil",
    },
    facebook: {
      label: "Facebook",
      handle: "SwAgA-Officiel95",
      url: "https://www.facebook.com/search/top?q=SwAgA-Officiel95",
      blurb:
        "Communauté, lives et actus — pour ceux qui restent branchés au fil.",
      preview: "/images/social/facebook.png",
      stats: [{ value: "12k", label: "followers" }],
      cta: "Voir la page",
    },
    snapchat: {
      label: "Snapchat",
      handle: "via WhatsApp",
      url: "/contact",
      blurb:
        "Pas de handle public — DM WhatsApp ou page contact pour le Snap.",
      preview: "/images/social/snapchat.png",
      stats: [{ value: "Contact", label: "WhatsApp" }],
      cta: "Contacter",
    },
  },
  /** Stats réseaux — source unique pour le hero. */
  stats: [
    { value: "919,2k", label: "Followers TikTok", platform: "tiktok" },
    { value: "23,9M", label: "J'aimes TikTok", platform: "tiktok" },
    { value: "+1000", label: "Followers Instagram", platform: "instagram" },
    { value: "12k", label: "Followers Facebook", platform: "facebook" },
  ],
  /**
   * Badges « passes » hero (3 positions).
   * Les 4 stats : TikTok solo ×2 + IG/FB combinés sur le badge titre.
   */
  passBadges: [
    {
      id: "tiktok-followers",
      position: "top-left" as const,
      eyebrow: "PASS · TIKTOK",
      lines: [{ value: "919,2k", label: "followers", platform: "tiktok" as const }],
    },
    {
      id: "tiktok-likes",
      position: "top-right" as const,
      eyebrow: "PASS · TIKTOK",
      lines: [{ value: "23,9M", label: "j'aimes", platform: "tiktok-likes" as const }],
    },
    {
      id: "ig-fb",
      position: "title" as const,
      eyebrow: "PASS · RÉSEAUX",
      lines: [
        { value: "+1000", label: "IG followers", platform: "instagram" as const },
        { value: "12k", label: "FB followers", platform: "facebook" as const },
      ],
    },
  ],
  /** Diaporama hero : photos SwAgA distinctes (rotation ~4s). Crops très différents pour un morphing évident. */
  heroSlides: [
    {
      src: "/images/swaga-real.png",
      alt: "SwAgA — portrait street réel",
      objectPosition: "center 12%",
    },
    {
      src: "/images/swaga-slide-01.png",
      alt: "SwAgA — street night",
      objectPosition: "left center",
    },
    {
      src: "/images/swaga-slide-02.png",
      alt: "SwAgA — close-up",
      objectPosition: "center top",
    },
    {
      src: "/images/swaga-slide-03.png",
      alt: "SwAgA — énergie danse",
      objectPosition: "right 35%",
    },
    {
      src: "/images/swaga-slide-04.png",
      alt: "SwAgA — profil street",
      objectPosition: "70% 40%",
    },
  ],
  /** Heroes full-bleed des pages internes. */
  pageHeroes: {
    about: {
      src: "/images/swaga-real.png",
      alt: "SwAgA — portrait",
      objectPosition: "center 18%",
      eyebrow: "À propos",
      title: "Qui est SwAgA",
      subtitle: "Street, danse et contenu depuis Lomé.",
    },
    services: {
      src: "/images/services/danse-01.png",
      alt: "SwAgA — énergie danse",
      objectPosition: "center 25%",
      eyebrow: "Services",
      title: "Ce que j'apporte",
      subtitle: "Huit offres street — du live au UGC, sur le bitume.",
    },
    collabs: {
      src: "/images/illustrations/collabs-scene.png",
      alt: "Scène collabs",
      objectPosition: "center 40%",
      eyebrow: "Collabs",
      title: "Sur scène avec",
      subtitle: "Artistes & moments qui claquent.",
    },
    social: {
      src: "/images/illustrations/reseaux-connect.png",
      alt: "Réseaux SwAgA",
      objectPosition: "center 40%",
      eyebrow: "Réseaux",
      title: "Suis le mouvement",
      subtitle: "TikTok, Instagram, Facebook, Snap — le vibe en live.",
    },
    contact: {
      src: "/images/illustrations/contact-booking.png",
      alt: "Booking SwAgA",
      objectPosition: "center 40%",
      eyebrow: "Contact",
      title: "Booke-moi",
      subtitle: "Marques, artistes, events — on parle.",
    },
  },
  services: [
    {
      slug: "danse",
      title: "Danse pour artistes",
      copy: "Chorés, clips, scènes live — énergie brute pour tes sorties.",
      accent: "01",
      image: "/images/services/danse-01.png",
      heroImage: "/images/services/danse-02.png",
      frames: [
        "/images/services/danse-01.png",
        "/images/services/danse-02.png",
        "/images/services/danse-03.png",
      ],
      description:
        "Je crée des chorés street qui collent à ton son et à ton image. Clips, lives, showcases : des mouvements nets, de l’énergie, et une présence caméra qui reste dans la tête. De la direction de mouvement au freestyle sur scène, on construit un moment qui fait bouger le public.",
      forWho: [
        "Artistes (singles, albums, EP)",
        "Labels & managers qui préparent une sortie",
        "Collectifs / showcases qui veulent un punch live",
      ],
      deliverables: [
        "Choré complète ou sections (couplet / drop / outro)",
        "Repères caméra & placements scène",
        "Option : présence danseur sur le clip / live",
      ],
      process: [
        "Brief son + références vibe",
        "Création / ajustements en salle ou en call",
        "Répétition & livrable prêt tournage / scène",
      ],
      benefits: [
        "Chorés sur mesure pour singles & albums",
        "Présence scène / showcase / events",
        "Énergie street authentique, caméra-ready",
        "Repères clairs pour toute l’équipe",
      ],
    },
    {
      slug: "contenu",
      title: "Création de contenu",
      copy: "Reels, TikToks, storytelling street qui convertissent en vues.",
      accent: "02",
      image: "/images/services/contenu-01.png",
      heroImage: "/images/services/contenu-02.png",
      frames: [
        "/images/services/contenu-01.png",
        "/images/services/contenu-02.png",
        "/images/services/contenu-03.png",
      ],
      description:
        "Du concept au post : formats courts pensés pour TikTok et Reels. Hooks forts, rythme street, storytelling clair — pour faire grimper les vues sans perdre ton identité. Idéal artistes, marques et créateurs qui veulent du contenu qui performe vraiment.",
      forWho: [
        "Artistes & créateurs qui sortent du stock",
        "Marques qui veulent du volume organique",
        "Agences qui cherchent une signature street",
      ],
      deliverables: [
        "Batch de formats courts (reels / TikToks)",
        "Hooks écrits + angles de tournage",
        "Fichiers prêts à publier (vertical)",
      ],
      process: [
        "Call brief + objectifs (vues, notoriété, drop)",
        "Idéation + tournage (solo ou collab)",
        "Sélection / cut léger & envoi des livrables",
      ],
      benefits: [
        "Idéation + tournage formats courts",
        "Hooks & storytelling adaptés aux algos",
        "Série de contenus cohérente (batch)",
        "Style SwAgA reconnaissable, prêt à publier",
      ],
    },
    {
      slug: "pubs",
      title: "Pubs & collabs marques",
      copy: "Campagnes authentiques : ton produit, mon style, ton audience.",
      accent: "03",
      image: "/images/services/pubs-01.png",
      heroImage: "/images/services/pubs-02.png",
      frames: [
        "/images/services/pubs-01.png",
        "/images/services/pubs-02.png",
        "/images/services/pubs-03.png",
      ],
      description:
        "Des collabs pubs qui ne sentent pas le catalogue. Ton produit entre dans mon univers street : danse, vibe, audience engagée. Brief clair, livrables nets, ton authentique — pour une campagne qui parle aux gens, pas seulement aux slides marketing.",
      forWho: [
        "Marques lifestyle, mode, tech, boissons…",
        "Agences & community managers",
        "Projets qui veulent de l’influence street crédible",
      ],
      deliverables: [
        "1 à N posts / stories / vidéos campaign",
        "Mentions & hashtags selon brief",
        "Reporting simple (liens, stats de base)",
      ],
      process: [
        "Brief produit + ton de marque",
        "Proposition d’angles street",
        "Tournage → validation → publication",
      ],
      benefits: [
        "Intégration produit naturelle",
        "Reach TikTok + Instagram + Facebook",
        "Brief → tournage → livrables prêts",
        "Ton authentique, pas catalogue",
      ],
    },
    {
      slug: "coaching-danse",
      title: "Coaching & workshops danse",
      copy: "Sessions 1:1 ou groupe — technique street, présence, confiance.",
      accent: "04",
      image: "/images/services/coaching-danse-01.png",
      heroImage: "/images/services/coaching-danse-02.png",
      frames: [
        "/images/services/coaching-danse-01.png",
        "/images/services/coaching-danse-02.png",
        "/images/services/coaching-danse-03.png",
      ],
      description:
        "Tu veux progresser en street, préparer un show, ou booster la présence caméra de ton équipe ? Sessions coaching (solo) ou workshops (groupe) : technique, musicalité, attitude. Niveau débutant à avancé — on travaille ce qui compte vraiment sur le bitume et devant l’objectif.",
      forWho: [
        "Danseurs qui montent en niveau",
        "Artistes qui veulent bouger mieux sur scène",
        "Écoles, crews, entreprises (team building danse)",
      ],
      deliverables: [
        "Plan de session clair (objectifs + drills)",
        "Feedbacks corrects + vidéos de reprise",
        "Option workshop : choré groupe à retenir",
      ],
      process: [
        "Diagnostic niveau & objectifs",
        "Session coaching / atelier pratique",
        "Bilan + axes de progression",
      ],
      benefits: [
        "Technique street + musicalité",
        "Présence scène & caméra",
        "Formats 1:1 ou groupe",
        "Feedbacks concrets, actionnables",
      ],
    },
    {
      slug: "direction-artistique",
      title: "Direction artistique clips",
      copy: "Vision mouvement + image pour un clip qui claque du premier plan.",
      accent: "05",
      image: "/images/services/direction-artistique-01.png",
      heroImage: "/images/services/direction-artistique-02.png",
      frames: [
        "/images/services/direction-artistique-01.png",
        "/images/services/direction-artistique-02.png",
        "/images/services/direction-artistique-03.png",
      ],
      description:
        "Au-delà de la choré : je t’aide à poser la direction artistique danse du clip — intentions, rythme des plans, énergie des performers, cohérence look & mouvement. Idéal quand tu veux que le clip raconte quelque chose dès les premières secondes, sans perdre le vibe street.",
      forWho: [
        "Artistes & réalisateurs de clips",
        "Labels qui packagent une sortie visuelle",
        "Collectifs qui tournent un projet ambiance",
      ],
      deliverables: [
        "Moodboard mouvement / références",
        "Plan de séquences danse (beat map)",
        "Direction on-set des performers",
      ],
      process: [
        "Écoute du titre + références visuelles",
        "Proposition DA mouvement",
        "Accompagnement répétition & tournage",
      ],
      benefits: [
        "Cohérence son ↔ image ↔ mouvement",
        "Beat map & intentions par plan",
        "Direction performers on-set",
        "Résultat caméra-ready",
      ],
    },
    {
      slug: "apparitions-events",
      title: "Apparitions events & dance floor",
      copy: "Guest scène, openers, MC dance floor — je fais monter la salle.",
      accent: "06",
      image: "/images/services/apparitions-events-01.png",
      heroImage: "/images/services/apparitions-events-02.png",
      frames: [
        "/images/services/apparitions-events-01.png",
        "/images/services/apparitions-events-02.png",
        "/images/services/apparitions-events-03.png",
      ],
      description:
        "Festivals, club nights, showcases, activations : je débarque en guest danseur, opener, ou pour chauffer le dance floor. Présence forte, interaction public, freestyle qui booste l’énergie de ton event — sans script glacé, avec le vrai vibe SwAgA.",
      forWho: [
        "Organisateurs d’events & festivals",
        "Clubs, bars, showcases artistes",
        "Marques qui activent un live street",
      ],
      deliverables: [
        "Slot live (durée & format définis)",
        "Option : interaction / battle / opener",
        "Captures éventuelles pour réseaux (sur demande)",
      ],
      process: [
        "Brief event (lieu, public, timing)",
        "Proposition format d’apparition",
        "Jour J : warmup, passage, wrap",
      ],
      benefits: [
        "Énergie live garantie",
        "Formats flexibles (guest / opener / floor)",
        "Adaptation au public & au lieu",
        "Visibilité réseaux en option",
      ],
    },
    {
      slug: "ugc-marques",
      title: "UGC & créa marques",
      copy: "Contenu authentique type user-generated — ton produit, mon réel.",
      accent: "07",
      image: "/images/services/ugc-marques-01.png",
      heroImage: "/images/services/ugc-marques-02.png",
      frames: [
        "/images/services/ugc-marques-01.png",
        "/images/services/ugc-marques-02.png",
        "/images/services/ugc-marques-03.png",
      ],
      description:
        "Du UGC brut et crédible : unboxing, try-on, routines, tests produit, hooks « first impression ». Tourné comme du vrai contenu créateur — parfait pour ads Meta/TikTok ou organique. Moins glossy qu’une pub TV, plus efficace pour la conversion.",
      forWho: [
        "E-commerces & D2C",
        "Marques qui scale les ads créatives",
        "Agences performance qui cherchent du volume UGC",
      ],
      deliverables: [
        "Vidéos UGC verticales (raw ou lightly edited)",
        "Plusieurs hooks / angles par produit",
        "Droits d’usage ads selon accord",
      ],
      process: [
        "Brief produit + angles à tester",
        "Tournage batch (plusieurs takes)",
        "Livraison fichiers + variantes hooks",
      ],
      benefits: [
        "Look créateur authentique",
        "Variantes pour tester en ads",
        "Formats verticaux natifs",
        "Droits d’usage clarifiés",
      ],
    },
    {
      slug: "challenges-tiktok",
      title: "Challenges TikTok sur-mesure",
      copy: "Un move signature, un son, une vague — challenge pensé pour virer.",
      accent: "08",
      image: "/images/services/challenges-tiktok-01.png",
      heroImage: "/images/services/challenges-tiktok-02.png",
      frames: [
        "/images/services/challenges-tiktok-01.png",
        "/images/services/challenges-tiktok-02.png",
        "/images/services/challenges-tiktok-03.png",
      ],
      description:
        "Je conçois un challenge danse simple à reproduire, fort à regarder : signature move, timing sur ton son, tutorial clair. Lancement avec mon audience + options seed creators — pour transformer une sortie ou une campagne en mouvement viral.",
      forWho: [
        "Artistes qui sortent un single",
        "Marques qui veulent un challenge branded",
        "Labels / agences qui poussent un drop",
      ],
      deliverables: [
        "Choré challenge (8–16 temps) + tutorial",
        "Vidéo seed originale SwAgA",
        "Guide hashtag / caption / appel à duet",
      ],
      process: [
        "Brief son + objectif (vues / UGC volume)",
        "Création du move + test facilité",
        "Lancement seed + recommandations push",
      ],
      benefits: [
        "Move reproductible + mémorable",
        "Tutorial clair pour la communauté",
        "Seed sur audience SwAgA",
        "Playbook hashtag & duet",
      ],
    },
  ],
  /**
   * Embeds TikTok (carousel accueil).
   * `short` = lien vt.tiktok fourni ; `url` = URL canonique résolue (pour embed).
   * `poster` = fallback local si oEmbed thumbnail indisponible.
   */
  tiktokEmbeds: [
    {
      short: "https://vt.tiktok.com/ZS4woBqsc/",
      url: "https://www.tiktok.com/@swaga_officiel95/video/7672703931159563553",
      title: "Clip 1",
      poster: "/images/swaga-real.png",
    },
    {
      short: "https://vt.tiktok.com/ZS4woUu32/",
      url: "https://www.tiktok.com/@swaga_officiel95/video/7672720418041531681",
      title: "Clip 2",
      poster: "/images/swaga-slide-01.png",
    },
    {
      short: "https://vt.tiktok.com/ZS4worjMk/",
      url: "https://www.tiktok.com/@swaga_officiel95/video/7672722595527019808",
      title: "Clip 3",
      poster: "/images/swaga-slide-02.png",
    },
    {
      short: "https://vt.tiktok.com/ZS4woyoc6/",
      url: "https://www.tiktok.com/@swaga_officiel95/video/7672762539003923744",
      title: "Clip 4",
      poster: "/images/swaga-slide-03.png",
    },
    {
      short: "https://vt.tiktok.com/ZS4woF6vN/",
      url: "https://www.tiktok.com/@swaga_officiel95/video/7673061603201322272",
      title: "Clip 5",
      poster: "/images/swaga-slide-04.png",
    },
    {
      short: "https://vt.tiktok.com/ZS4woAJPm/",
      url: "https://www.tiktok.com/@swaga_officiel95/video/7672495670904835360",
      title: "Clip 6",
      poster: "/images/services/danse-01.png",
    },
    {
      short: "https://vt.tiktok.com/ZS4woVpBg/",
      url: "https://www.tiktok.com/@swaga_officiel95/video/7672466284533075233",
      title: "Clip 7",
      poster: "/images/services/contenu-01.png",
    },
    {
      short: "https://vt.tiktok.com/ZS4woTaCD/",
      url: "https://www.tiktok.com/@swaga_officiel95/video/7671962394712755489",
      title: "Clip 8",
      poster: "/images/social/tiktok.png",
    },
  ],
  sectionArt: {
    collabs: "/images/illustrations/collabs-scene.png",
    social: "/images/illustrations/reseaux-connect.png",
    contact: "/images/illustrations/contact-booking.png",
  },
  /**
   * Collabs « Sur scène avec » — portraits dans /public/images/artists/
   * Orthographe : Santrinos (pas Santrisnos) ; Anadaboy = Anodaboy.
   * Paths must match files on disk (never "").
   */
  collabs: [
    {
      name: "Axel Merryl",
      role: "ARTISTE",
      image: "/images/artists/axel-merryl.jpg",
    },
    {
      name: "Santrinos",
      role: "ARTISTE",
      image: "/images/artists/santrinos.jpg",
    },
    {
      name: "Sethlo",
      role: "ARTISTE",
      image: "/images/artists/sethlo.jpg",
    },
    {
      name: "Anadaboy",
      role: "ARTISTE",
      image: "/images/artists/anadaboy.jpg",
    },
    {
      name: "TALAKAKA",
      role: "ARTISTE",
      image: "/images/artists/talakaka.jpg",
    },
    {
      name: "Ralycia",
      role: "ARTISTE",
      image: "/images/artists/ralycia.jpg",
    },
  ],
  marquee: [
    "FREESTYLE",
    "STREET",
    "TIKTOK",
    "CLIPS",
    "PUBS",
    "LOMÉ",
    "SWAGA",
    "DANSE",
  ],
} as const;

export type TikTokEmbed = {
  short: string;
  url: string;
  title?: string;
  /** Poster local si oEmbed échoue. */
  poster?: string;
};

export type ServiceSlug = (typeof site.services)[number]["slug"];

export function getServiceBySlug(slug: string) {
  return site.services.find((s) => s.slug === slug);
}

export function waLink(phone: string, text?: string) {
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${phone}${q}`;
}

/** Extrait l’ID vidéo d’une URL TikTok canonique (@user/video/ID). */
export function tiktokVideoId(url: string) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    const videoIdx = parts.indexOf("video");
    if (videoIdx >= 0 && parts[videoIdx + 1]) {
      return parts[videoIdx + 1].replace(/\D/g, "") || parts[videoIdx + 1];
    }
  } catch {
    /* ignore */
  }
  return null;
}

/**
 * Player embed officiel (player/v1) — autoplay/muted/loop supportés.
 * Doc : https://developers.tiktok.com/doc/embed-player
 * (embed/v2 ignore souvent autoplay → gros bouton Play.)
 */
export function tiktokEmbedSrc(url: string) {
  const id = tiktokVideoId(url);
  if (!id) return null;
  return `https://www.tiktok.com/player/v1/${id}`;
}

/** Query string Player v1 : lecture muette en boucle, UI minimale. */
export const TIKTOK_PLAYER_QUERY =
  "autoplay=1&muted=1&loop=1&controls=0&play_button=0&progress_bar=0&volume_control=0&fullscreen_button=0&timestamp=0&music_info=0&description=0&closed_caption=0&native_context_menu=0&rel=0";
