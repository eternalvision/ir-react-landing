# Карточки Google Business Profile, Firmy.cz и каталоги

Готовые тексты для локальных карточек. Главное правило: **NAP (название, адрес, телефон) везде символ в символ как на сайте.**

| Поле | Значение |
|---|---|
| Название | InstaRum s.r.o. |
| Адрес | Vorařská 2386/1, 143 00 Praha 12-Belárie |
| Телефон | +420 724 257 857 |
| Сайт | https://www.instarum.cz/?utm_source=google&utm_medium=organic&utm_campaign=gbp |
| E-mail | instarumcz@gmail.com |
| IČO / DIČ | 22348760 / CZ22348760 |

## 1. Google Business Profile (business.google.com)

1. Тип: **сервис с выездом к клиенту** (service-area business). Если в офисе на Vorařská не принимаете клиентов, адрес скройте и укажите зону обслуживания: Praha, Praha-západ, Praha-východ, Středočeský kraj.
2. Основная категория: **Instalatér** (Plumber). Дополнительные: *Topenář* (Heating contractor), *Dodavatel tepelných čerpadel* (Heat pump supplier), *Služba havarijních oprav vodovodu* (Emergency plumbing service) — если есть в списке.
3. Часы работы: как на сайте (24/7). Если реальный график другой — поставьте реальный и одинаковый на сайте.
4. Языки / атрибуты: «mluvíme anglicky», «rusky», «ukrajinsky» (где доступно).
5. Фото: минимум 10 (реальные объекты, команда, машина, логотип 720×720, обложка 1080×608).
6. Услуги: добавить 8 услуг ниже, каждой — ссылка на страницу сайта.
7. Отзывы: после каждого заказа отправлять клиенту короткую ссылку на отзыв (GBP → «Požádat o recenze»). Отвечать на каждый отзыв.
8. Публикации (Příspěvky): 1–2 в месяц — фото завершённого объекта + ссылка на страницу услуги.

### Описание (cs, до 750 символов)

> InstaRum s.r.o. je instalatérská a topenářská firma z Prahy 12. Zajišťujeme instalatérské práce, montáž a opravy ústředního topení, výměnu kotlů a bojlerů, montáž tepelných čerpadel, podlahové topení a nové rozvody vody a kanalizace. Pracujeme pro byty, rodinné domy, firmy i stavební společnosti v Praze a Středočeském kraji. Havarijní výjezd zajišťujeme nonstop 24/7. Cenovou nabídku připravíme zdarma, na provedené práce poskytujeme záruku. Komunikujeme česky, anglicky, rusky i ukrajinsky.

### Услуги и ссылки

| Služba | URL |
|---|---|
| Instalatérské práce | https://www.instarum.cz/sluzby/instalaterske-prace |
| Havarijní instalatér 24/7 | https://www.instarum.cz/sluzby/havarijni-sluzba |
| Výměna kotle a kotelny | https://www.instarum.cz/sluzby/vymena-kotle |
| Tepelná čerpadla | https://www.instarum.cz/sluzby/tepelna-cerpadla |
| Ústřední topení | https://www.instarum.cz/sluzby/topeni |
| Podlahové topení a radiátory | https://www.instarum.cz/sluzby/podlahove-vytapeni |
| Výměna bojleru | https://www.instarum.cz/sluzby/bojlery |
| Voda a kanalizace | https://www.instarum.cz/sluzby/voda-a-kanalizace |

## 2. Firmy.cz (Seznam) — firmy.cz → «Přidat firmu»

- Kategorie: Instalatéři; Topenáři; Tepelná čerpadla — montáž.
- Popis: тот же текст, что для GBP.
- Сайт с UTM: `?utm_source=seznam&utm_medium=organic&utm_campaign=firmy`.
- Затем **Seznam Webmaster** (search.seznam.cz/wmt): добавить сайт, отправить `https://www.instarum.cz/sitemap.xml`.

## 3. Google Search Console

1. Добавить ресурс-домен `instarum.cz` (DNS TXT на Vercel/регистраторе).
2. Sitemaps → `https://www.instarum.cz/sitemap.xml`.
3. Проверка URL → «Požádat o indexování» для главной и 8 страниц услуг (cs), затем /en, /ru, /uk.
4. Через 2–4 недели: Výkon → смотреть реальные запросы и позиции.
5. Rich Results Test (search.google.com/test/rich-results) для главной и одной страницы услуги — должны найтись LocalBusiness, FAQ, Breadcrumb.

## 4. Каталоги (одинаковый NAP)

- Mapy.com (Seznam) — появится через Firmy.cz
- Zlaté stránky (zlatestranky.cz)
- Najisto.cz
- Apple Business Connect (Apple Maps)
- Bing Places (импорт из Google)
- Для RU/UK аудитории: ruprofi.cz, vseuslugi.cz, группы «Русские/Українці в Празі» в Facebook/Telegram (ссылка на /ru и /uk)

## 5. Отзывы — важно

Показывать на сайте только настоящие отзывы клиентов (с их согласия). Выдуманные отзывы запрещены чешским законом о защите потребителей (zákon č. 634/1992 Sb., ČOI штрафует) и правилами Google. Лучший источник отзывов для SEO — сама карточка Google.
