# AGENTS.md for Daily Horoscope API

This repo teaches AI coding agents (Cursor, Claude Code, Aider, Codex, Windsurf, RooCode, Gemini CLI) how to use the RoxyAPI daily horoscope endpoint.

## Endpoint
- Method: `GET`
- URL: `https://roxyapi.com/api/v2/astrology/horoscope/{sign}/daily`
- Auth: `X-API-Key` header
- Domain: `astrology` (one of 14+ in the RoxyAPI catalog)
- Operation ID: `getDailyHoroscope` matches the SDK method name in camelCase
- MCP tool: `get_astrology_horoscope_sign_daily` on `https://roxyapi.com/mcp/astrology`

## TypeScript SDK
```ts
import { createRoxy } from '@roxyapi/sdk';
const roxy = createRoxy(process.env.ROXY_API_KEY!);
const { data, error } = await roxy.astrology.getDailyHoroscope({
  path: { sign: 'aries' },
});
```

## Python SDK
```python
import os
from roxy_sdk import create_roxy
roxy = create_roxy(os.environ["ROXY_API_KEY"])
result = roxy.astrology.get_daily_horoscope(sign="aries")
```

## Setup step (only when the endpoint requires coordinates)
Always call `GET /location/search?q={city}` first. Take `latitude`, `longitude`, `timezone` from `cities[0]` and pipe them in. Never ask the user to type coordinates.

Note: the daily horoscope endpoint does NOT require coordinates. Pass `sign` only. Optional query params: `date` (YYYY-MM-DD) and `lang` (en, tr, de, es, hi).

## Request fields
- `sign` (path, required): zodiac sign. Case-insensitive. Accepts aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces.
- `date` (query, optional): YYYY-MM-DD. Defaults to today. Supports future and past dates for editorial scheduling.
- `lang` (query, optional): interpretation language. Supported: en, tr, de, es, hi. Defaults to en.

## Response top level keys
- `sign`: zodiac sign for this horoscope
- `date`: date of this daily horoscope (YYYY-MM-DD)
- `overview`: general daily overview based on Moon house activation and planetary transits, unique per sign
- `love`: love and relationship forecast based on Venus house position relative to this sign
- `career`: career and professional outlook based on Mars house position with Saturn and Jupiter influences
- `health`: health, energy, and wellness guidance for the day
- `finance`: financial outlook and money-related guidance
- `advice`: actionable daily advice based on the dominant transit energy
- `luckyNumber`: lucky number for the day (number)
- `luckyColor`: lucky color for the day, derived from the sign element
- `compatibleSigns`: array of most compatible zodiac signs (trine partners then a sextile partner)
- `activeTransits`: array of active planetary transits with house activations relative to the queried sign
- `moonSign`: current Moon sign, changes every 2-3 days
- `moonPhase`: current lunar phase string
- `energyRating`: overall energy intensity 1-10

## Domain rules
- The forecast is built from real-time planetary transits using whole-sign house positions, so every sign receives different content for the same date.
- `activeTransits` strings already include the house number relative to the queried sign. The same transit will show a different house for each sign (Moon in Libra is the 7th house for Aries, the 4th house for Cancer, etc.).
- `compatibleSigns` lists trine partners (same element) followed by a sextile partner (complementary element). Use for compatibility widgets, dating app onboarding, and horoscope cards.
- `energyRating` scales 1-10 based on how many transits activate this sign directly. Use for visual indicators in content widgets.
- The endpoint emits an `X-Cache-TTL` of 3600 (1 hour). Server-side response cache is safe to layer on top.
- For weekly content use `GET /astrology/horoscope/{sign}/weekly`. For monthly content with key dates use `GET /astrology/horoscope/{sign}/monthly`.

## Related endpoints
- `GET /astrology/horoscope/{sign}/weekly` (`getWeeklyHoroscope`): 7-day forecast with lucky days, lucky numbers, and compatible signs
- `GET /astrology/horoscope/{sign}/monthly` (`getMonthlyHoroscope`): 30-day forecast with week-by-week breakdown and real lunar phase key dates from ephemeris data
- `GET /astrology/moon-phase/current` (`getCurrentMoonPhase`): current lunar phase, illumination, age, and upcoming phases

## Verified
2026-Q2 against `https://roxyapi.com/api/v2/openapi.json`. Re-fetch the spec for ground truth before changing this file.

## Discovery
- Full catalog: https://roxyapi.com/AGENTS.md
- LLM index: https://roxyapi.com/llms.txt
- Methodology: https://roxyapi.com/methodology
