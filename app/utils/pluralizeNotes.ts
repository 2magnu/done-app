const pluralRules = new Intl.PluralRules('ru-RU')

const forms: Record<Intl.LDMLPluralRule, string> = {
  zero: 'заметок',
  one: 'заметка',
  two: 'заметки',
  few: 'заметки',
  many: 'заметок',
  other: 'заметок',
}

export function pluralizeNotes(count: number): string {
  const category = pluralRules.select(count)
  return forms[category]
}