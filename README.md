[![Daily Horoscope API](banner.png)](https://roxyapi.com/products/astrology-api)

# Daily Horoscope API

> Daily horoscope by zodiac sign with transit-based forecasts and house activations. One key covers 18+ spiritual domains. MCP-first, no local setup required.

[![Get API Key](https://img.shields.io/badge/Get_API_Key-RoxyAPI-14b8a6?style=for-the-badge&logo=key&logoColor=white)](https://roxyapi.com/pricing)
[![Try Live](https://img.shields.io/badge/Try_API_Live-Free_in_browser-22c55e?style=for-the-badge&logo=swagger&logoColor=white)](https://roxyapi.com/api-reference)
[![Methodology](https://img.shields.io/badge/Methodology-NASA_JPL_verified-f59e0b?style=for-the-badge&logo=nasa&logoColor=white)](https://roxyapi.com/methodology)
[![MCP Server](https://img.shields.io/badge/MCP_Server-Streamable_HTTP-8b5cf6?style=for-the-badge&logo=anthropic&logoColor=white)](https://roxyapi.com/docs/mcp)
[![SDK](https://img.shields.io/badge/SDK-TypeScript_+_Python_+_PHP_+_C%23_+_Go_+_WordPress-3b82f6?style=for-the-badge&logo=npm&logoColor=white)](https://roxyapi.com/docs/sdk)

## What is Daily Horoscope API

The RoxyAPI daily horoscope endpoint returns a transit-based forecast for any zodiac sign with house activations unique to each sign. The forecast is generated from real-time planetary transits using whole-sign house positions, so every sign receives different content. Each call ships overview, love, career, health, finance, daily advice, lucky number, lucky color, compatible signs, active transits, Moon sign, Moon phase, and an energy rating from 1 to 10. One RoxyAPI subscription covers 18+ spiritual domains, all calculations powered by Roxy Ephemeris, verified against NASA JPL Horizons.

## Why this API

| Property | Value |
|----------|-------|
| Coverage | 18+ spiritual domains in one subscription |
| Calculation | Roxy Ephemeris, verified against NASA JPL Horizons |
| MCP server | `https://roxyapi.com/mcp/astrology` (Streamable HTTP, no local setup) |
| SDKs | TypeScript on npm `@roxyapi/sdk`, Python on PyPI `roxy-sdk`, PHP on Packagist `roxyapi/sdk`, C# on NuGet `RoxyApi.Sdk`, Go `github.com/RoxyAPI/sdk-go`, WordPress plugin `roxyapi` |
| Pricing | One key, flat per call, from $39/mo |
| Licensing | Personal and commercial use, including closed source apps. No AGPL or GPL entanglement. [Full terms](https://roxyapi.com/policy/license) |
| Last verified | 2026-Q3 |

## Quick start

1. Get a key at [roxyapi.com/pricing](https://roxyapi.com/pricing)
2. Pick a language below
3. Copy the snippet, run, ship

### cURL

```bash
# Daily horoscope by sign. Defaults to today. Pass ?date=YYYY-MM-DD for a specific day.
curl -s "https://roxyapi.com/api/v2/astrology/horoscope/aries/daily" \
  -H "X-API-Key: $ROXY_API_KEY"

# Or with an explicit date for editorial scheduling
curl -s "https://roxyapi.com/api/v2/astrology/horoscope/aries/daily?date=2026-05-07" \
  -H "X-API-Key: $ROXY_API_KEY"
```

### Python

```python
import os
from roxy_sdk import create_roxy

roxy = create_roxy(os.environ["ROXY_API_KEY"])

# Daily horoscope. Highest per-user call frequency in the catalog, drives DAUs and push.
horoscope = roxy.astrology.get_daily_horoscope(sign="aries")

print(horoscope["sign"])           # Aries
print(horoscope["date"])           # 2026-05-07
print(horoscope["overview"])       # The Moon highlights your tenth house of career...
print(horoscope["love"])           # Venus in your third house makes your words sweet...
print(horoscope["luckyNumber"])    # 9
print(horoscope["luckyColor"])     # Red
print(horoscope["moonPhase"])      # Waning Gibbous Moon
print(horoscope["energyRating"])   # 4
```

### JavaScript (Node)

```js
import { createRoxy } from '@roxyapi/sdk';

const roxy = createRoxy(process.env.ROXY_API_KEY);

// Daily horoscope by zodiac sign with transit-driven content unique per sign
const { data, error } = await roxy.astrology.getDailyHoroscope({
  path: { sign: 'aries' },
});

if (error) throw new Error(error.error);

console.log('Sign:', data.sign);                    // Aries
console.log('Date:', data.date);                    // 2026-05-07
console.log('Overview:', data.overview);
console.log('Love:', data.love);
console.log('Career:', data.career);
console.log('Lucky number:', data.luckyNumber);     // 9
console.log('Lucky color:', data.luckyColor);       // Red
console.log('Moon phase:', data.moonPhase);         // Waning Gibbous Moon
console.log('Energy rating:', data.energyRating);   // 4 / 10
```

### TypeScript

```ts
import { createRoxy } from '@roxyapi/sdk';

const roxy = createRoxy(process.env.ROXY_API_KEY!);

// Daily horoscope: returns sign, date, the six sections, a long-form column, the dated events behind it, lucky fields, transits, moon data
const { data, error } = await roxy.astrology.getDailyHoroscope({
  path: { sign: 'aries' },
});

if (error) throw new Error(error.error);

console.log('Sign:', data.sign);
console.log('Date:', data.date);
console.log('Overview:', data.overview);
console.log('Compatible signs:', data.compatibleSigns);
console.log('Active transits:', data.activeTransits);
console.log('Moon sign:', data.moonSign);
console.log('Moon phase:', data.moonPhase);
console.log('Energy rating:', data.energyRating, '/ 10');
```

## Request schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sign` | string (path) | yes | Zodiac sign, case-insensitive (e.g., aries, Aries, ARIES all work). |
| `date` | string (query) | no | Forecast date in YYYY-MM-DD format. Defaults to today. Supports future and past dates for editorial scheduling. |
| `lang` | string (query) | no | Interpretation language. Supported: en, tr, de, es, hi. Defaults to en. |

## Response shape

```json
{
  "sign": "Aries",
  "date": "2026-05-07",
  "overview": "The Moon highlights your tenth house of career and public reputation. Professional matters and long-term ambitions are emotionally charged today. Your public image matters more than usual. No single event is running this, so the shape of it comes from what was already in motion.",
  "love": "Venus in your third house makes your words sweet and persuasive. Flirtatious conversations and heartfelt messages hit their mark. Express affection through thoughtful communication. Attention is the only variable left when nothing external is stirring the situation.",
  "career": "Mars energizes your first house, fueling personal drive and initiative. You come across as bold and decisive in every interaction. Take the lead on projects that require courage. Nothing is forcing a move at work, which makes this a good stretch for the work nobody is watching.",
  "health": "The Sun in your second house connects wellbeing with comfort and stability. Nourishing food, steady routines, and sensory pleasures support your health. Ground yourself in what feels good. Minor repairs are cheapest before anything makes them urgent.",
  "finance": "Jupiter in your fourth house favors real estate, home investments, and family-related finances. Property matters carry extra luck. Spending on your living space pays dividends in comfort. Anything on autopilot keeps running, and autopilot is where the waste usually sits.",
  "advice": "Mercury in your second house sharpens financial thinking. Review budgets, negotiate deals, and research purchases. Your mind is tuned to value and practical matters today. Decisions are not being asked for, which makes it a good moment to finish one already made.",
  "column": "The sky is quiet enough that nothing outside is setting the terms. Among the things that simply are, Mars in Aries puts effort, appetite, conflict, and whatever has to be pushed inside your first house of identity and self-expression. Your fourth house carries Jupiter in Cancer, and the household sits, along with everything it inherited from before. Underlying all of it, the Moon is in Capricorn and your tenth house of career and public image carries it, over mood, habit, the household, and what counts as comfort. Position before motion: Pluto stands in Aquarius and your eleventh house answers for it, since a wider circle decides what is possible, and the plan runs past the immediate. Use a quiet stretch on the thing that never gets done when something louder is available.",
  "events": [],
  "luckyNumber": 9,
  "luckyColor": "Red",
  "compatibleSigns": [
    "Leo",
    "Sagittarius",
    "Gemini"
  ],
  "activeTransits": [
    "Sun in Taurus (2nd house of finances and personal values)",
    "Moon in Capricorn (10th house of career and public image)",
    "Mercury in Taurus (2nd house of finances and personal values)",
    "Venus in Gemini (3rd house of communication and learning)",
    "Mars in Aries (1st house of identity and self-expression)",
    "Jupiter in Cancer (4th house of home and emotional foundations)",
    "Saturn in Aries (1st house of identity and self-expression)"
  ],
  "moonSign": "Capricorn",
  "moonPhase": "Waning Gibbous Moon",
  "energyRating": 4
}
```

| Field | Type | Description |
|-------|------|-------------|
| `sign` | string | Zodiac sign for this horoscope. |
| `date` | string | Date of this daily horoscope (YYYY-MM-DD). |
| `overview` | string | General daily overview based on Moon house activation and planetary transits. Unique per sign based on whole-sign house positions. |
| `love` | string | Love and relationship forecast. Based on Venus house position relative to this sign. |
| `career` | string | Career and professional outlook. Based on Mars house position relative to this sign, with Saturn and Jupiter influences. |
| `health` | string | Health, energy, and wellness guidance for the day. |
| `finance` | string | Financial outlook and money-related guidance. |
| `advice` | string | Actionable daily advice based on the dominant transit energy. |
| `luckyNumber` | number | Lucky number for the day, 1 to 9, from the classical numbering of the sign ruling planet. |
| `luckyColor` | string | Lucky color for the day, derived from the sign element. |
| `compatibleSigns` | array | Most compatible zodiac signs. Trine partners (same element) followed by a sextile partner (complementary element). Use for compatibility widgets, dating app onboarding, and horoscope cards. |
| `activeTransits` | array | Active planetary transits affecting this sign today, with house activations. Each transit shows the planet, its current sign, and which house it activates for the queried sign. |
| `moonSign` | string | Current Moon sign. Changes every 2-3 days, sets the emotional tone for all signs. |
| `moonPhase` | string | Current lunar phase (New Moon, Waxing Crescent, First Quarter, Waxing Gibbous, Full Moon, Waning Gibbous, Last Quarter, Waning Crescent). |
| `energyRating` | number | Overall energy intensity for this sign today (1-10), from the density and nature of the aspects standing over the sign, weighted by the houses they fall in for it. Harmonious aspects lift it and hard ones weigh on it, so a busy but difficult day does not score high on its own. Useful for content widgets and visual indicators. |
| `column` | string | The whole reading as one continuous piece of long-form prose, for a layout that wants a single paragraph rather than six labelled ones. |
| `events` | array | The dated astronomical events the reading is built on, each with the bodies involved, the exact instant it perfects, the house it falls in for this sign, and how long it holds. Lets an editor check any sentence against the sky. |

## Common use cases

| Use case | Endpoint flow |
|----------|---------------|
| Daily zodiac widget for a content site | GET `/astrology/horoscope/{sign}/daily` for each sign at 00:00 UTC, cache for 1 hour |
| Push notification copy for a horoscope app | GET `/astrology/horoscope/{sign}/daily?date=tomorrow` overnight, schedule local-time delivery |
| Dating app onboarding compatibility prompt | GET `/astrology/horoscope/{sign}/daily`, surface `compatibleSigns` and Moon sign |
| Editorial scheduling for a magazine | GET `/astrology/horoscope/{sign}/daily?date=YYYY-MM-DD` to pre-generate a week of content |
| Lunar-cycle wellness card | GET `/astrology/horoscope/{sign}/daily`, surface `moonPhase` and `energyRating` |

## Related endpoints in this domain

- `GET /astrology/horoscope/{sign}/weekly` (`getWeeklyHoroscope`) - 7-day transit forecast with lucky days, lucky numbers, and compatible signs
- `GET /astrology/horoscope/{sign}/monthly` (`getMonthlyHoroscope`) - 30-day forecast with week-by-week breakdown and real lunar phase key dates
- `GET /astrology/moon-phase/current` (`getCurrentMoonPhase`) - current lunar phase, illumination, age, and upcoming phases for context

## Use this in your AI agent

Connect Claude, GPT, Gemini, or Cursor to RoxyAPI through the remote MCP server. No Docker. No self hosting. The full MCP tool catalog for this domain is at `https://roxyapi.com/mcp/astrology`.

```json
{
  "mcpServers": {
    "astrology": {
      "url": "https://roxyapi.com/mcp/astrology",
      "headers": { "X-API-Key": "$ROXY_API_KEY" }
    }
  }
}
```

See [docs/mcp](https://roxyapi.com/docs/mcp) for Claude Desktop, Cursor, Windsurf, VS Code, and Claude Code setup.

## For AI coding agents

This repo ships an [AGENTS.md](AGENTS.md) execution playbook. Cursor, Claude Code, Aider, Codex, Windsurf, RooCode, and Gemini CLI will pick it up automatically. Top level overview lives at [roxyapi.com/AGENTS.md](https://roxyapi.com/AGENTS.md).

## Resources

- [Methodology and gold standard tests](https://roxyapi.com/methodology) verified against NASA JPL Horizons
- [Full API reference](https://roxyapi.com/api-reference) interactive Scalar UI
- [TypeScript SDK on npm](https://www.npmjs.com/package/@roxyapi/sdk)
- [Python SDK on PyPI](https://pypi.org/project/roxy-sdk/)
- [PHP SDK on Packagist](https://packagist.org/packages/roxyapi/sdk)
- [C# SDK on NuGet](https://www.nuget.org/packages/RoxyApi.Sdk)
- [Go SDK on pkg.go.dev](https://pkg.go.dev/github.com/RoxyAPI/sdk-go)
- [WordPress plugin](https://wordpress.org/plugins/roxyapi/)
- [llms.txt](https://roxyapi.com/llms.txt) full LLM citation index
- [Top level AGENTS.md](https://roxyapi.com/AGENTS.md)

## Other RoxyAPI samples

[![KP Astrology API](https://img.shields.io/badge/KP_Astrology_API-RoxyAPI-14b8a6?style=flat-square)](https://github.com/RoxyAPI/kp-astrology-api)
[![Kundli API](https://img.shields.io/badge/Kundli_API-RoxyAPI-14b8a6?style=flat-square)](https://github.com/RoxyAPI/kundli-api)
[![Synastry API](https://img.shields.io/badge/Synastry_API-RoxyAPI-14b8a6?style=flat-square)](https://github.com/RoxyAPI/synastry-api)
[![Panchang API](https://img.shields.io/badge/Panchang_API-RoxyAPI-14b8a6?style=flat-square)](https://github.com/RoxyAPI/panchang-api)
[![Biorhythm API](https://img.shields.io/badge/Biorhythm_API-RoxyAPI-14b8a6?style=flat-square)](https://github.com/RoxyAPI/biorhythm-api)

## License

MIT for this sample repo. See [LICENSE](LICENSE).

**Catalog licensing:** Personal and commercial use, including closed source proprietary apps. No AGPL or GPL entanglement. RoxyAPI APIs and SDKs are safe to embed in commercial products. Full terms at [roxyapi.com/policy/license](https://roxyapi.com/policy/license).

## Contact

- Site: [roxyapi.com](https://roxyapi.com)
- Status: [roxyapi.com/api-reference](https://roxyapi.com/api-reference)
