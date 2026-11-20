export const MODULE_ID = "tormenta20-correcoes";

/** Versão do sistema Tormenta20 contra a qual as correções foram escritas e conferidas. */
/** Versões do sistema em que o módulo foi conferido (a 1.6.7 em 19/11/2026, numa instalação separada). */
export const SYSTEM_VERSIONS_VERIFIED = ["1.6.5", "1.6.7"];
export const SYSTEM_VERSION_VERIFIED = SYSTEM_VERSIONS_VERIFIED.at(-1);

/** Chaves antigas (v13) que marcavam a quem um efeito de uso se aplica. */
export const LEGACY_USE_TYPES = ["self", "ability", "attack", "consumable", "equipment", "power", "skill", "spell"];
