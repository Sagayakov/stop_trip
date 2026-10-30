from typing import Optional

from .models import ForbiddenWords


def find_forbidden_word(text: Optional[str]) -> Optional[str]:
    """
    Возвращает первое запрещённое слово, найденное в тексте, или None.

    Делает один запрос к БД. Поиск — по вхождению подстроки без учёта регистра
    (так было и раньше, логика не менялась, только собрана в одном месте).
    """

    if not text:
        return None

    forbidden_words = ForbiddenWords.objects.first()
    if not forbidden_words:
        return None

    all_words = (forbidden_words.russian_words or []) + (forbidden_words.english_words or [])
    lowered_text = text.lower()
    for word in all_words:
        if word and word.lower() in lowered_text:
            return word
    return None
