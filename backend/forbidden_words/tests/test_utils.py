import pytest

from forbidden_words.utils import find_forbidden_word_in

RUSSIAN = ["дурак*", "хлам"]
ENGLISH = ["ass", "scam*"]


@pytest.mark.parametrize(
    "text, expected",
    [
        ("Продам байк", None),
        ("Хлам не продаю", "хлам"),
        ("Ты дурак", "дурак*"),
        ("Дураки везде", "дурак*"),  # звёздочка — ловит все формы слова
        ("ДУРАКА видно", "дурак*"),
        ("xлaм", "хлам"),  # латинские буквы-двойники
        ("х л а м", "хлам"),  # буквы через пробел
        ("х.л.а.м", "хлам"),
        ("big ass sale", "ass"),
        ("first class service", None),  # целое слово: «class» не содержит «ass»
        ("scammer here", "scam*"),
        ("Ёлка и Нячанг", None),
        ("", None),
        (None, None),
    ],
)
def test_find_forbidden_word_in(text, expected):
    assert find_forbidden_word_in([text], RUSSIAN, ENGLISH) == expected
