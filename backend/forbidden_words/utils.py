"""
Проверка текста на запрещённые слова.

Как это работает:
1. Текст и слова из списка приводятся к одному виду: нижний регистр, «ё» → «е».
   Для русских слов латинские буквы-двойники и цифры заменяются на русские буквы
   (например, «xyй» или «3ло» ловятся как «хуй» и «зло»).
2. Текст делится на слова. Буквы, разделённые пробелами или точками («х у й», «х.у.й»),
   склеиваются обратно в одно слово.
3. Совпадение ищется по целым словам, поэтому «ass» не ловит «class».
   Чтобы ловить все формы слова, в админке добавьте его со звёздочкой в конце:
   «дурак*» поймает «дурак», «дурака», «дураки».
"""

import re
from typing import Iterable, Optional

from .models import ForbiddenWords

# Латинские буквы и цифры, похожие на русские буквы.
_CYRILLIC_LOOKALIKES = str.maketrans(
    {
        "a": "а",
        "b": "в",
        "c": "с",
        "e": "е",
        "h": "н",
        "k": "к",
        "m": "м",
        "o": "о",
        "p": "р",
        "t": "т",
        "x": "х",
        "y": "у",
        "u": "и",
        "0": "о",
        "3": "з",
        "4": "ч",
        "6": "б",
    }
)
_WORD_RE = re.compile(r"\w+", re.UNICODE)


def _normalize(text: str, to_cyrillic: bool) -> str:
    text = text.lower().replace("ё", "е")
    if to_cyrillic:
        text = text.translate(_CYRILLIC_LOOKALIKES)
    return text


def _tokens(text: str) -> list[str]:
    """Слова текста + склейки подряд идущих одиночных букв («х у й» → «хуй»)."""

    words = _WORD_RE.findall(text)
    result = list(words)
    glued: list[str] = []
    for word in words + [""]:
        if len(word) == 1:
            glued.append(word)
            continue
        if len(glued) > 1:
            result.append("".join(glued))
        glued = []
    return result


def _match(tokens: Iterable[str], entry: str) -> bool:
    if entry.endswith("*"):
        prefix = entry[:-1]
        return bool(prefix) and any(token.startswith(prefix) for token in tokens)
    return entry in tokens


def _find(text: str, words: Iterable[str], to_cyrillic: bool) -> Optional[str]:
    tokens = set(_tokens(_normalize(text, to_cyrillic)))
    for word in words:
        if not word or not word.strip():
            continue
        entry = _normalize(word.strip(), to_cyrillic)
        if _match(tokens, entry):
            return word
    return None


def find_forbidden_word_in(
    texts: Iterable[Optional[str]],
    russian_words: Iterable[str],
    english_words: Iterable[str],
) -> Optional[str]:
    """Ищет запрещённое слово в текстах без обращения к БД (удобно для тестов)."""

    for text in texts:
        if not text:
            continue
        found = _find(text, russian_words, to_cyrillic=True) or _find(
            text, english_words, to_cyrillic=False
        )
        if found:
            return found
    return None


def _load_words() -> tuple[list[str], list[str]]:
    forbidden_words = ForbiddenWords.objects.first()
    if not forbidden_words:
        return [], []
    return forbidden_words.russian_words or [], forbidden_words.english_words or []


def find_forbidden_word(*texts: Optional[str]) -> Optional[str]:
    """Возвращает первое запрещённое слово, найденное в любом из текстов, или None. Один запрос к БД."""

    russian_words, english_words = _load_words()
    return find_forbidden_word_in(texts, russian_words, english_words)


def find_forbidden_fields(fields: dict[str, Optional[str]]) -> dict[str, str]:
    """
    Проверяет несколько полей за один запрос к БД.

    Возвращает {имя поля: найденное слово} только для полей с нарушениями.
    """

    russian_words, english_words = _load_words()
    result = {}
    for name, text in fields.items():
        word = find_forbidden_word_in([text], russian_words, english_words)
        if word:
            result[name] = word
    return result
